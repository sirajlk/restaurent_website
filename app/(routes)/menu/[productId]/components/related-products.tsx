"use client"

import type { Product } from "@/types-d"
import { motion } from "framer-motion"
import ProductCard from "./product-card"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface RelatedProductsProps {
  products: Product[]
  category?: string
}

const RelatedProducts = ({ products, category }: RelatedProductsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  if (products.length === 0) return null

  return (
    <motion.div
      className="mt-16 mb-8 mx-11"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-neutral-800">{category ? `More ${category}` : "You might also like"}</h2>

        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="rounded-full" onClick={scrollLeft}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full" onClick={scrollRight}>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 snap-x scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
      >
        {products.slice(0, 10).map((product) => (
          <div key={product.id} className="min-w-[250px] max-w-[250px] snap-start">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default RelatedProducts
