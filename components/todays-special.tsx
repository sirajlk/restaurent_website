"use client"

import { useState } from "react"
import Arrow from "@/components/ui/arrow"
import type { Product } from "@/types-d"
import FoodMenuEnhanced from "./FoodMenu"

interface TodaysSpecialProps {
  initialProducts: Product[]
}

export default function TodaysSpecial({ initialProducts }: TodaysSpecialProps) {
  // Use the server-provided products
  const [products] = useState<Product[]>(initialProducts)

  return (
    <div className="w-full bg-black py-16 relative">
      <div className="container mx-auto px-4 max-w-3xl relative">
        {/* Left Arrow */}
        <Arrow
          className="absolute left-0 top-2/3 transform -translate-y-1/2 w-32 md:w-40"
          path="M1 1C1 1 50 10 90 50C130 90 149 99 149 99"
          strokeColor="#4D4D4D"
          strokeWidth={1.5}
        />

        {/* Content */}
        <div className="text-center z-10 relative">
          <h2 className="text-amber-500 font-serif text-3xl md:text-4xl font-medium mb-3">Today's Special</h2>
        </div>

        {/* Right Arrow */}
        <Arrow
          className="absolute right-11 top-1/4 transform -translate-y-1/2 w-32 md:w-40"
          path="M149 1C149 1 100 10 60 50C20 90 1 99 1 99"
          strokeColor="#4D4D4D"
          strokeWidth={1.5}
        />
      </div>

      <FoodMenuEnhanced products={products} />
    </div>
  )
}
