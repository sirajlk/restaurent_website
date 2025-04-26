import getProducts from "@/actions/get-products";
import DiningEvents from "@/components/Dining-event";
import HeroSection from "@/components/HeroSection";
import OurSpecialties from "@/components/our-specialties";
import TodaysSpecial from "@/components/todays-special";
import { auth } from "@clerk/nextjs/server";
import React from "react";

export const revalidate = 0;
const HomePage = async () => {
  const products = await getProducts({});
  console.log(products);
  const { userId } = auth();
  return (
    <>
      <HeroSection userId={userId} />
       

        {/*  why choose us  */}
        <TodaysSpecial initialProducts={products} />

        <OurSpecialties />
        <DiningEvents />
    </>
  );
};

export default HomePage;
