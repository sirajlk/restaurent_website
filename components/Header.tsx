"use client";

import { cn } from "@/lib/utils";
import Container from "./container";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import MainNav from "./main-nav";
import { useEffect, useState } from "react";
import CartActionButton from "./CartAction";

interface HeaderProps {
    userId: string | null;
}
const Header = ({ userId }: HeaderProps) => {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 0
            setScrolled(isScrolled)
        }

        window.addEventListener('scroll', handleScroll)

        return () => window.addEventListener('scroll', handleScroll)
    }, []) 
  return (
    <header className={cn("w-full z-50 transition", scrolled ? 'fixed top-0 left-0 bg-white shadow-lg': 'bg-transparent')}>
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-12 flex h-16 items-center">
          <Link
            href="/"
            className="uppercase flex gap-x-2 font-bold text-neutral-700 text-lg md:text-xl"
          >
            Foodied
          </Link>

          {/* Main navigation bar */}
          <MainNav scrolled={scrolled} />
          {userId ? (
            <div className="ml-4 flex items-center space-x-4">
              <UserButton />
            </div>
          ) : (
            <div className="flex items-center space-x-2 ml-4">
              <Link href={"/sign-in"}>
                <Button variant="outline">Login </Button>
              </Link>
              <Link href={"/sign-up"}>
                <Button
                  className="bg-green-400 text-black hover:bg-green-500"
                  variant="outline"
                >
                  Sign up{" "}
                </Button>
              </Link>
            </div>
          )}

          {userId && <CartActionButton />}
        </div>
      </Container>
    </header>
  );
};

export default Header;
