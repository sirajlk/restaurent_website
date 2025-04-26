"use client"

import type { Product } from "@/types-d"
import Image from "next/image"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import Link from "next/link"

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
    >
      <Link href={`/menu/${product.id}`}>
        <div className="relative aspect-square">
          <Image
            src={product.images?.[0]?.url || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
            sizes="250px"
          />
          {product.category && (
            <span className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
              {product.category}
            </span>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-medium text-neutral-800 truncate">{product.name}</h3>

          <div className="flex items-center gap-1 mt-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={i < (4) ? "fill-amber-400 text-amber-400" : "text-gray-300"}
                size={14}
              />
            ))}
          </div>

          <div className="flex items-center justify-between">
            <p className="font-bold text-amber-600">{product.price}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard
