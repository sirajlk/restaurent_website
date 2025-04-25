import Box from "@/components/box";
import Container from "@/components/container";
import { auth } from "@clerk/nextjs/server";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import React from "react";
import CartContent from "./components/CartContent";

const CartPage = () => {
  const { userId } = auth();
  return (
    <div className="h-[100vh]">
      <Container className=" py-12 my-4 h-full">
        <div className="w-full px-4 z-10 md:px-12 space-y-7 h-full">
          <Box className="text-neutral-700 text-sm items-center mt-12">
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-5 h-5" />
            </Link>

            <ChevronRight className="w-5 h-5 text-muted-foreground" />
            <Link
              href="/menu"
              className="flex items-center gap-2 text-muted-foreground"
            >
              Products
            </Link>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
            <p className="flex items-center gap-2 text-muted-foreground">
              Cart
            </p>
          </Box>
          <CartContent userId={userId} />
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
