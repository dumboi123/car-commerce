import CustomCard from "@/components/card";

import SearchBar from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { Car, ChevronRight, Shield, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { carBrands, bodyTypes, faqItems } from "@/lib/data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SignedOut } from "@clerk/nextjs";
import { getFeaturedCars } from "@/actions/home";
// import { Calendar } from "@/components/ui/calendar";
export default async function Home() {

  const featuredCars = await getFeaturedCars();

  return (
    <>
      <div className="pt-20 flex flex-col">
        {/* Hero */}
        <section className="relative py-16 md:py-28 dotted-background">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-5xl md:text-8xl mb-4 gradient-title">
                Let AI Help You Find Your Ideal Car
              </h1>
              <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
                Discover the perfect car for you with the power of AI. Simply
                tell us what you’re looking for, and our intelligent system will
                match you with the best options available.
              </p>
            </div>

            {/*Search bar */}
            <SearchBar />
          </div>
        </section>

        {/* Featured Cars */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* Title & view all */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Featured Cars</h2>
              <Button className="flex items-center" asChild>
                <Link href="/cars">
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            {/* Featuring */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCars.map((car : any) => (
                <CustomCard key={car.id} car={car} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured brands */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* Title & view all */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Brands</h2>
              <Button className="flex items-center" asChild>
                <Link href="/cars">
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            {/* Brands */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {carBrands.map((brand) => (
                <Link
                  key={brand.name}
                  href={`/cars?brand=${brand.name}`}
                  className="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition cursor-pointer border-2"
                >
                  <div className="h-16 w-auto mx-auto mb-2 relative">
                    <Image
                      src={brand.imageUrl}
                      alt={brand.name}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <h3 className="font-medium">{brand.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Title */}
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 gradient-title">
                Why Choose Our Platform?
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Experience a smarter, safer, and more convenient way to find
                your next car. Our AI-driven platform connects you with the best
                vehicles and trusted sellers, making your car search effortless
                and enjoyable.
              </p>
            </div>
            {/* Icon & explain */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-neutral-300 text-black rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Car className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Wide Selection</h3>
                <p className="text-gray-600">
                  Thousands of verified vehicles from trusted dealerships and
                  private sellers.
                </p>
              </div>
            {/* Icon & explain */}
              <div className="text-center">
                <div className="bg-neutral-300 text-black rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Easy Test Drive</h3>
                <p className="text-gray-600">
                  Book a test drive online in minutes, with flexible scheduling
                  options.
                </p>
              </div>
            {/* Icon & explain */}
              <div className="text-center">
                <div className="bg-neutral-300 text-black rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Secure Process</h3>
                <p className="text-gray-600">
                  Verified listings and secure booking process for peace of
                  mind.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured BodyTypes */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Body Types</h2>
            <Button variant="ghost" className="flex items-center" asChild>
              <Link href="/cars">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bodyTypes.map((type) => (
              <Link
                key={type.name}
                href={`/cars?bodyType=${type.name}`}
                className="relative group cursor-pointer"
              >
                <div className="overflow-hidden rounded-lg flex justify-end h-28 mb-4 relative">
                  <Image
                    src={
                      type.imageUrl || `/body/${type.name.toLowerCase()}.webp`
                    }
                    alt={type.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg flex items-end">
                  <h3 className="text-white text-xl font-bold pl-4 pb-2 ">
                    {type.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section with Accordion */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 dotted-background text-white">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 gradient-title">
            Your Car - Our Priority
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Discover a seamless car buying experience where your needs come first. Let us help you find the perfect vehicle with confidence and ease.
            </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/cars">View All Cars</Link>
            </Button>
            <SignedOut>
              <Button size="lg" asChild className="hover:bg-gray-700">
                <Link href="/sign-up">Sign Up Now</Link>
              </Button>
            </SignedOut>
          </div>
        </div>
      </section>
    
      </div>
    </>
  );
}
