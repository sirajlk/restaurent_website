"use client"

import type { Product } from "@/types-d"
import { useState } from "react"
import Gallery from "./gallery"
import ProductInfo from "./product-info"
import { motion } from "framer-motion"

interface ProductViewProps {
  product: Product
}

const ProductView = ({ product }: ProductViewProps) => {
  const [selectedSize, setSelectedSize] = useState(product.size || "Regular")
  const [quantity, setQuantity] = useState(1)

  return (
    <motion.div
      className=" rounded-2xl shadow-lg overflow-hidden my-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left side - Gallery */}
        <div className="p-6 flex items-center justify-center">
          <Gallery images={product.images} />
        </div>

        {/* Right side - Product Info */}
        <div className="p-8 bg-white shadow-lg rounded-2xl mx-11 md:p-10 lg:p-12">
          <ProductInfo
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default ProductView
