import getProducts from "@/actions/get-products";
import DiningEvents from "@/components/Dining-event";
import HeroSection from "@/components/HeroSection";
import OurSpecialties from "@/components/our-specialties";
import TodaysSpecial from "@/components/todays-special";
import React from "react";

export const revalidate = 0;
const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  console.log(products);
  return (
    <>
      <HeroSection />
       

        {/*  why choose us  */}
     <TodaysSpecial />

        <OurSpecialties />
        <DiningEvents />
    </>
  );
};

export default HomePage;
