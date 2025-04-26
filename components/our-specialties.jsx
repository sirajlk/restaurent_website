"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { categories, specialtyItems } from "@/lib/constants";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

export default function OurSpecialties() {
  return (
    <div className="w-full bg-black text-white py-16 px-4 md:px-8 relative overflow-hidden">
      {/* Background Knife */}
      <div className="absolute top-96 left-48 -rotate-[120deg] z-0 opacity-10 pointer-events-none">
        <Image src={"/img/knife.png"} alt={"knife"} width={900} height={400} />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-amber-500 font-serif text-3xl md:text-4xl font-medium mb-2">
            Our Specialities
          </h2>
          <p className="text-gray-300 text-sm md:text-base max-w-lg mx-auto">
            Authentic meals from our restaurant served with high quality
            ingredients.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category, index) => (
            <Button
              key={category}
              className={`${
                index === 0
                  ? "bg-amber-500 hover:bg-amber-600 text-black"
                  : "bg-transparent hover:bg-gray-800 text-white border border-gray-700"
              } rounded-full text-xs px-4 py-1 h-auto`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Menu Items - Staggered Layout */}
        <div className="space-y-24 mt-32">
          {specialtyItems.map((item, index) => (
            <MenuItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Separate component for each menu item with its own animation state
function MenuItem({ item, index }) {
  const isEven = index % 2 === 0;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div
      ref={ref}
      className={`flex items-center gap-32 justify-center flex-col ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } items-center`}
    >
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div>
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            width={300}
            height={200}
            className={`object-cover ${
              isEven
                ? "rounded-tr-[5rem] rounded-bl-[5rem]"
                : "rounded-tl-[5rem] rounded-br-[5rem]"
            } items-center`}
          />
        </div>
      </motion.div>

      <motion.div
        className={`max-w-80 md:w-1/2 ${
          isEven ? "md:pl-8" : "md:pr-8"
        } mt-6 md:mt-0`}
        initial={{ opacity: 0, x: isEven ? -100 : 100 }}
        animate={
          isInView
            ? { opacity: 1, x: 0 }
            : { opacity: 0, x: isEven ? -100 : 100 }
        }
        transition={{ duration:1, delay: 0.4 }}
      >
        <h3 className="text-xl font-medium mb-2">{item.name}</h3>
        <p className="text-gray-400 text-sm mb-2">{item.description}</p>
        <div className="flex w-full gap-7 items-center">
          <p className="text-amber-500 font-medium">${item.price}</p>
          <Button
            className={
              "hover:bg-amber-500 hover:text-black bg-transparent  text-white border border-gray-700 rounded-full text-xs px-4 py-1 h-auto"
            }
          >
            Add to Cart
          </Button> 
        </div>
      </motion.div>
    </div>
  );
}
