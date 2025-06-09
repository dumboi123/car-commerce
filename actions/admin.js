"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const getAdmin = async () => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  // If user not found in our db or not an admin, return not authorized
  if (!user || user.role !== "ADMIN") {
    return { authorized: false, reason: "not-admin" };
  }

  return { authorized: true, user };
};

export const getCurrentUserId = async () => {
  const { userId } = await auth(); // userId này là clerkUserId
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) throw new Error("User not found");

  return user.id; // Đây là id thực trong bảng user
};
