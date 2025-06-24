"use server";

import { serializeCarData } from "@/lib/helpers";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

/**
 * Get simplified filters for the car marketplace
 */
// Helper to extract mapped values from getDistinctCarField
function extractField(arr, field) {
  return arr.map((item) => item[field]);
}

function buildCarWhere({
  search,
  brand,
  bodyType,
  fuelType,
  transmission,
  minPrice,
  maxPrice,
}) {
  const where = { status: "AVAILABLE" };
  if (search) {
    where.OR = [
      { brand: { contains: search, mode: "insensitive" } },
      { model: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }
  if (brand) where.brand = { equals: brand, mode: "insensitive" };
  if (bodyType) where.bodyType = { equals: bodyType, mode: "insensitive" };
  if (fuelType) where.fuelType = { equals: fuelType, mode: "insensitive" };
  if (transmission)
    where.transmission = { equals: transmission, mode: "insensitive" };
  where.price = { gte: parseFloat(minPrice) || 0 };
  if (maxPrice && maxPrice < Number.MAX_SAFE_INTEGER) {
    where.price.lte = parseFloat(maxPrice);
  }
  return where;
}

function getOrderBy(sortBy) {
  switch (sortBy) {
    case "priceAsc":
      return { price: "asc" };
    case "priceDesc":
      return { price: "desc" };
    case "newest":
    default:
      return { createdAt: "desc" };
  }
}

export async function getCarFilters() {
  try {
    const [brands, bodyTypes, fuelTypes, transmissions] = await Promise.all([
      getDistinctCarField("brand"),
      getDistinctCarField("bodyType"),
      getDistinctCarField("fuelType"),
      getDistinctCarField("transmission"),
    ]);
    const priceAggregations = await db.car.aggregate({
      where: { status: "AVAILABLE" },
      _min: { price: true },
      _max: { price: true },
    });

    return {
      success: true,
      data: {
        brands: extractField(brands, "brand"),
        bodyTypes: extractField(bodyTypes, "bodyType"),
        fuelTypes: extractField(fuelTypes, "fuelType"),
        transmissions: extractField(transmissions, "transmission"),
        priceRange: {
          min: priceAggregations._min.price
            ? parseFloat(priceAggregations._min.price.toString())
            : 0,
          max: priceAggregations._max.price
            ? parseFloat(priceAggregations._max.price.toString())
            : 100000,
        },
      },
    };
  } catch (error) {
    throw new Error("Error fetching car filters:" + error.message);
  }
}

/**
 * Get cars with simplified filters
 */
export async function getCars({
  search = "",
  brand = "",
  bodyType = "",
  fuelType = "",
  transmission = "",
  minPrice = 0,
  maxPrice = Number.MAX_SAFE_INTEGER,
  sortBy = "newest", // Options: newest, priceAsc, priceDesc
  page = 1,
  limit = 6,
}) {
  try {
    // Get current user if authenticated
    const dbUser = await getCurrentUser(false);

    // Build where conditions
    const where = buildCarWhere({
      search,
      brand,
      bodyType,
      fuelType,
      transmission,
      minPrice,
      maxPrice,
    });

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Determine sort order
    const orderBy = getOrderBy(sortBy);

    // Get total count for pagination
    const [totalCars, cars] = await Promise.all([
      db.car.count({ where }),
      db.car.findMany({
        where,
        take: limit,
        skip,
        orderBy,
      }),
    ]);

    // If we have a user, check which cars are wishlisted
    let wishlisted = new Set();
    if (dbUser) {
      const savedCars = await db.userSavedCar.findMany({
        where: { userId: dbUser.id },
        select: { carId: true },
      });

      wishlisted = new Set(savedCars.map((saved) => saved.carId));
    }

    // Serialize and check wishlist status
    const serializedCars = cars.map((car) =>
      serializeCarData(car, wishlisted.has(car.id))
    );

    return {
      success: true,
      data: serializedCars,
      pagination: {
        total: totalCars,
        page,
        limit,
        pages: Math.ceil(totalCars / limit),
      },
    };
  } catch (error) {
    throw new Error("Error fetching cars:" + error.message);
  }
}

/**
 * Toggle car in user's wishlist
 */
export async function toggleSavedCar(carId) {
  try {
    const user = await getCurrentUser();

    const car = await db.car.findUnique({
      where: { id: carId },
    });

    if (!car) {
      return {
        success: false,
        error: "Car not found",
      };
    }

    // Check if car is already saved
    const existingSave = await db.userSavedCar.findUnique({
      where: {
        userId_carId: {
          userId: user.id,
          carId,
        },
      },
    });

    // If car is already saved, remove it
    if (existingSave) {
      await db.userSavedCar.delete({
        where: {
          userId_carId: {
            userId: user.id,
            carId,
          },
        },
      });

      revalidatePath(`/saved-cars`);
      return {
        success: true,
        saved: false,
        message: "Car removed from favorites",
      };
    }

    // If car is not saved, add it
    await db.userSavedCar.create({
      data: {
        userId: user.id,
        carId,
      },
    });

    revalidatePath(`/saved-cars`);
    return {
      success: true,
      saved: true,
      message: "Car added to favorites",
    };
  } catch (error) {
    throw new Error("Error toggling saved car:" + error.message);
  }
}

/**
 * Get car details by ID
 */
export async function getCarById(carId) {
  try {
    const dbUser = await getCurrentUser(false);
    const car = await db.car.findUnique({ where: { id: carId } });
    if (!car) {
      return { success: false, error: "Car not found" };
    }

    // Check if car is wishlisted by user
    let isWishlisted = false;
    if (dbUser) {
      isWishlisted = !!(await db.userSavedCar.findUnique({
        where: { userId_carId: { userId: dbUser.id, carId } },
      }));
    }
    const existingTestDrive = dbUser && (await db.testDriveBooking.findFirst({
      where: {
        carId,
        userId: dbUser.id,
        status: { in: ["PENDING", "CONFIRMED", "COMPLETED"] },
      },
      orderBy: { createdAt: "desc" },
    }));
    const userTestDrive = existingTestDrive
      ? {
          id: existingTestDrive.id,
          status: existingTestDrive.status,
          bookingDate: existingTestDrive.bookingDate.toISOString(),
        }
      : null;
    const dealership = await db.dealershipInfo.findFirst({
      include: { workingHours: true },
    });

    return {
      success: true,
      data: {
        ...serializeCarData(car, isWishlisted),
        testDriveInfo: {
          userTestDrive,
          dealership: dealership && {
            ...dealership,
            createdAt: dealership.createdAt.toISOString(),
            updatedAt: dealership.updatedAt.toISOString(),
            workingHours: dealership.workingHours?.map((hour) => ({
              ...hour,
              createdAt: hour.createdAt.toISOString(),
              updatedAt: hour.updatedAt.toISOString(),
            })),
          },
        },
      },
    };
  } catch (error) {
    throw new Error("Error fetching car details:" + error.message);
  }
}

/**
 * Get user's saved cars
 */
export async function getSavedCars() {
  try {
    const user = await getCurrentUser();
    const savedCars = await db.userSavedCar.findMany({
      where: { userId: user.id },
      include: { car: true },
      orderBy: { savedAt: "desc" },
    });
    return {
      success: true,
      data: savedCars.map((saved) => serializeCarData(saved.car)),
    };
  } catch (error) {
    console.error("Error fetching saved cars:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// Utility: Get current user from auth and DB
export async function getCurrentUser(throwIfNotFound = true) {
  const { userId } = await auth();
  if (!userId) {
    if (throwIfNotFound) throw new Error("Unauthorized");
    return null;
  }
  const user = await db.user.findUnique({ where: { clerkUserId: userId } });
  if (!user && throwIfNotFound) throw new Error("User not found");
  return user;
}

// Get distinct values for a specific car field
async function getDistinctCarField(field) {
  return db.car.findMany({
    where: { status: "AVAILABLE" },
    select: { [field]: true },
    distinct: [field],
    orderBy: { [field]: "asc" },
  });
}
