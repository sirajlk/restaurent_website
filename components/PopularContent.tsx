"use client"

import type { Product } from "@/types-d"
import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { Heart, ShoppingCart, Star, Clock } from "lucide-react"
import useCart from "@/hooks/use-carts"
import { motion } from "framer-motion"

interface PopularContentProps {
  data: Product
}

const PopularContent = ({ data }: PopularContentProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [animateStars, setAnimateStars] = useState(false)
  const cart = useCart()

  const addToCart = (data: Product) => {
    cart.addItem({ ...data, qty: 1 })
  }

  const isItemInCart = () => {
    return cart.items.some((item) => item.id === data.id)
  }

  // Star animation effect
  useEffect(() => {
    if (isHovered) {
      setAnimateStars(true)
      const timer = setTimeout(() => {
        setAnimateStars(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isHovered])

  // Toggle favorite
  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsLiked(!isLiked)
  }

  // Assuming data has a rating property, if not, default to 4
  const rating = data.rating || 4

  return (
    <motion.div
      className="bg-neutral-900 rounded-xl  overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -10,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { duration: 0.2 },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Overlay */}
      <div className="relative h-48 w-full overflow-hidden">
        <motion.div
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.4 }}
          className="h-full w-full"
        >
          <Image src={data.images[0].url || "/placeholder.svg"} alt={data.name} fill className="object-cover" />
        </motion.div>

        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0.4,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Category Tag */}
        {data.category && (
          <div className="absolute top-4 left-4 bg-black/60 text-white text-xs py-1 px-2 rounded">{data.category}</div>
        )}

        {/* Price Tag */}
        <motion.div
          className="absolute top-4 right-4 bg-amber-500 text-black font-bold py-1 px-3 rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.2 }}
        >
          ${data.price}
        </motion.div>

        {/* Cuisine/Kitchen Tag */}
        {(data.cuisine || data.kitchen) && (
          <motion.div
            className="absolute bottom-4 left-4 bg-black/60 text-white text-xs py-1 px-2 rounded flex items-center gap-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 10,
            }}
            transition={{ duration: 0.2 }}
          >
            <Clock size={12} />
            {data.cuisine || data.kitchen}
          </motion.div>
        )}

        {/* Favorite Button */}
        <motion.button
          className="absolute bottom-4 right-4 bg-black/60 text-white p-2 rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.2 }}
          onClick={toggleLike}
        >
          <Heart size={16} className={isLiked ? "fill-red-500 text-red-500" : "text-white"} />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-4">
        <Link href={`/menu/${data.id}`}>
          <h3 className="text-white font-medium text-lg mb-1 hover:text-amber-500 transition-colors">{data.name}</h3>
        </Link>
        <p className="text-gray-400 text-sm mb-3">try our cuisine and you will like it</p>

        {/* Rating */}
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: isHovered && i < rating && animateStars ? 1.2 : 1,
                rotate: isHovered && i < rating && animateStars ? 10 : 0,
              }}
              transition={{
                duration: 0.3,
                delay: i * 0.05,
                type: "spring",
                stiffness: 300,
              }}
            >
              <Star size={16} className={i < rating ? "fill-amber-500 text-amber-500" : "text-gray-600"} />
            </motion.div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {data.cuisine && (
            <div className="rounded-md bg-emerald-500/10 px-2 py-[2px] text-[10px] font-semibold capitalize text-emerald-500">
              {data.cuisine}
            </div>
          )}
          {data.category && (
            <div className="rounded-md bg-blue-500/10 px-2 py-[2px] text-[10px] font-semibold capitalize text-blue-500">
              {data.category}
            </div>
          )}
          {data.kitchen && (
            <div className="rounded-md bg-red-500/10 px-2 py-[2px] text-[10px] font-semibold capitalize text-red-500">
              {data.kitchen}
            </div>
          )}
          {data.size && (
            <div className="rounded-md bg-yellow-500/10 px-2 py-[2px] text-[10px] font-semibold capitalize text-yellow-500">
              {data.size}
            </div>
          )}
        </div>

        {/* Button - using your cart system */}
        <div className="flex gap-2">
          <Link href={`/menu/${data.id}`} className="flex-1">
            <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-medium" variant="default">
              Buy Now
            </Button>
          </Link>
          <Button
            className={`${
              isItemInCart() ? "bg-green-600 hover:bg-green-700" : "bg-neutral-800 hover:bg-neutral-700"
            } text-white`}
            onClick={() => addToCart(data)}
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default PopularContent
