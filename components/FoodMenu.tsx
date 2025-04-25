"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Star, ShoppingCart, Heart, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { menuItems } from "@/lib/constants"
import useCart from "@/hooks/use-carts"

// Categories
const categories = ["All", "Vegetarian", "Pasta", "Curry", "Sides"]

export default function FoodMenuEnhanced() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState("All")
  const [favorites, setFavorites] = useState<string[]>([])
  const [animateStars, setAnimateStars] = useState<{ [key: string]: boolean }>({})
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  // Use your cart hook instead of local state
  const cart = useCart()

  // Filter items by category
  const filteredItems =
    activeCategory === "All" ? menuItems : menuItems.filter((item) => item.category === activeCategory)

  // Toggle favorite
  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  // Add to cart using your cart hook
  const addToCart = (item) => {
    // Add item to cart with quantity 1
    cart.addItem({ ...item, qty: 1 })
  }

  // Check if item is in cart
  const isItemInCart = (id: string) => {
    return cart.items.some((item) => item.id === id)
  }

  // Star animation effect
  useEffect(() => {
    if (hoveredItem) {
      const item = menuItems.find((item) => item.id === hoveredItem)
      if (item) {
        setAnimateStars({ [hoveredItem]: true })

        // Reset animation after it completes
        const timer = setTimeout(() => {
          setAnimateStars({})
        }, 500)

        return () => clearTimeout(timer)
      }
    }
  }, [hoveredItem])

  return (
    <div className="w-full bg-black py-16 px-4">
      <div className="container mx-auto max-w-7xl" ref={containerRef}>
        {/* Header with Category Filters */}
        <motion.div
          className="mb-10 flex flex-col items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white mb-6">Our Menu</h2>

          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {categories.map((category) => (
              <motion.button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-amber-500 text-black"
                    : "bg-neutral-800 text-white hover:bg-neutral-700"
                }`}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Cart indicator - using your cart's item count */}
      
        </motion.div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="wait">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="bg-neutral-900 rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  transition: { duration: 0.2 },
                }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                layout
              >
                {/* Image Container with Overlay */}
                <div className="relative h-48 w-full overflow-hidden">
                  <motion.div
                    animate={{
                      scale: hoveredItem === item.id ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                    className="h-full w-full"
                  >
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </motion.div>

                  {/* Hover Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredItem === item.id ? 1 : 0.4,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Category Tag */}
                  <div className="absolute top-4 left-4 bg-black/60 text-white text-xs py-1 px-2 rounded">
                    {item.category}
                  </div>

                  {/* Price Tag */}
                  <motion.div
                    className="absolute top-4 right-4 bg-amber-500 text-black font-bold py-1 px-3 rounded-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: hoveredItem === item.id ? 1 : 0,
                      scale: hoveredItem === item.id ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.price}
                  </motion.div>

                  {/* Prep Time */}
                  <motion.div
                    className="absolute bottom-4 left-4 bg-black/60 text-white text-xs py-1 px-2 rounded flex items-center gap-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: hoveredItem === item.id ? 1 : 0,
                      y: hoveredItem === item.id ? 0 : 10,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <Clock size={12} />
                    {item.prepTime}
                  </motion.div>

                  {/* Favorite Button */}
                  <motion.button
                    className="absolute bottom-4 right-4 bg-black/60 text-white p-2 rounded-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: hoveredItem === item.id ? 1 : 0,
                      scale: hoveredItem === item.id ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.2 }}
                    onClick={(e) => toggleFavorite(item.id, e)}
                  >
                    <Heart
                      size={16}
                      className={favorites.includes(item.id) ? "fill-red-500 text-red-500" : "text-white"}
                    />
                  </motion.button>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-white font-medium text-lg mb-1">{item.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">{item.description}</p>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          scale: hoveredItem === item.id && i < item.rating && animateStars[item.id] ? 1.2 : 1,
                          rotate: hoveredItem === item.id && i < item.rating && animateStars[item.id] ? 10 : 0,
                        }}
                        transition={{
                          duration: 0.3,
                          delay: i * 0.05,
                          type: "spring",
                          stiffness: 300,
                        }}
                      >
                        <Star
                          size={16}
                          className={i < item.rating ? "fill-amber-500 text-amber-500" : "text-gray-600"}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Button - using your cart system */}
                  <motion.button
                    className={`w-full ${
                      isItemInCart(item.id) ? "bg-green-600 hover:bg-green-700" : "bg-amber-500 hover:bg-amber-600"
                    } text-black font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => addToCart(item)}
                  >
                    {isItemInCart(item.id) ? <>Added to Cart</> : <>Order Now</>}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center mt-10 gap-4">
          <motion.button
            className="bg-neutral-800 hover:bg-neutral-700 text-white p-3 rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={20} />
          </motion.button>
          <motion.button
            className="bg-neutral-800 hover:bg-neutral-700 text-white p-3 rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </div>
    </div>
  )
}
