import React from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CarFront, Heart, Layout } from "lucide-react";
import { Button } from "./ui/button";
import { CheckUser } from "@/lib/check-user";

const Header = async ({ isAdminPage = false }) => {
  const user = await CheckUser();
  const isAdmin = user?.role === "ADMIN";
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b z-50">
      <nav className="justify-between items-center flex mx-auto px-4 py-4">
        <Link href={isAdmin ? "/admin" : "/"}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={200}
            height={50}
            className="h-12 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center space-x-4">
          <SignedIn>
            {isAdminPage ? (
              <>
                <Link href={"/"}>
                  <Button variant={"outline"}>
                    <ArrowLeft size={18} />
                    <span>Return</span>
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href={"/saved-carts"}>
                  <Button>
                    <Heart size={18} />
                    <span className="hidden md:inline">Saved cars</span>
                  </Button>
                </Link>
                {!isAdmin ? (
                  <Link href={"/reservations"}>
                    <Button variant="outline">
                      <CarFront size={18} />
                      <span className="hidden md:inline">
                        Your reservations
                      </span>
                    </Button>
                  </Link>
                ) : (
                  <Link href={"/admin"}>
                    <Button variant="outline">
                      <Layout size={18} />
                      <span className="hidden md:inline">Admin dashboard</span>
                    </Button>
                  </Link>
                )}
              </>
            )}
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Link href={"/sign-in"}>
              <SignInButton>
                <Button variant="outline">Sign In/Sign Up</Button>
              </SignInButton>
            </Link>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
};

export default Header;
