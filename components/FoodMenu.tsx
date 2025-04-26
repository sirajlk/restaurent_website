"use client"

import type React from "react"
import type { Product } from "@/types-d"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Star, Heart, Clock, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import useCart from "@/hooks/use-carts"

interface FoodMenuEnhancedProps {
  products: Product[]
}

export default function FoodMenuEnhanced({ products }: FoodMenuEnhancedProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState("All")
  const [favorites, setFavorites] = useState<string[]>([])
  const [animateStars, setAnimateStars] = useState<{ [key: string]: boolean }>({})
  const [currentPage, setCurrentPage] = useState(0)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  // Use your cart hook
  const cart = useCart()

  // Extract unique categories from products
  const uniqueCategories = [
    "All",
    ...Array.from(new Set(products?.map((product) => product.category || "Uncategorized"))),
  ]

  // Filter items by category
  const filteredItems =
    activeCategory === "All" ? products : products.filter((product) => product.category === activeCategory)

  // Pagination logic - show 4 items per page
  const ITEMS_PER_PAGE = 4
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE)

  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(0)
  }, [activeCategory])

  // Get current page items
  const currentItems = filteredItems.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE)

  // Navigation functions
  const goToNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  // Toggle favorite
  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  // Add to cart using your cart hook
  const addToCart = (product: Product) => {
    // Add item to cart with quantity 1
    cart.addItem({ ...product, qty: 1 })
  }

  // Check if item is in cart
  const isItemInCart = (id: string) => {
    return cart.items.some((item) => item.id === id)
  }

  // Star animation effect
  useEffect(() => {
    if (hoveredItem) {
      const product = products.find((product) => product.id === hoveredItem)
      if (product) {
        setAnimateStars({ [hoveredItem]: true })

        // Reset animation after it completes
        const timer = setTimeout(() => {
          setAnimateStars({})
        }, 500)

        return () => clearTimeout(timer)
      }
    }
  }, [hoveredItem, products])

  return (
    <div className="w-full bg-black py-11 px-4">
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
            {uniqueCategories.map((category) => (
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

          {/* Pagination indicator */}
          {totalPages > 1 && (
            <div className="text-white text-sm mb-4">
              Page {currentPage + 1} of {totalPages}
            </div>
          )}
        </motion.div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
          <AnimatePresence mode="wait">
            {currentItems.length > 0 ? (
              currentItems.map((product, index) => (
                <motion.div
                  key={product.id}
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
                  onMouseEnter={() => setHoveredItem(product.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  layout
                >
                  {/* Image Container with Overlay */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <motion.div
                      animate={{
                        scale: hoveredItem === product.id ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.4 }}
                      className="h-full w-full"
                    >
                      <Image
                        src={product.images?.[0]?.url || "/placeholder.svg?height=300&width=400"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </motion.div>

                    {/* Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: hoveredItem === product.id ? 1 : 0.4,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Category Tag */}
                    {product.category && (
                      <div className="absolute top-4 left-4 bg-black/60 text-white text-xs py-1 px-2 rounded">
                        {product.category}
                      </div>
                    )}

                    {/* Price Tag */}
                    <motion.div
                      className="absolute top-4 right-4 bg-amber-500 text-black font-bold py-1 px-3 rounded-full"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: hoveredItem === product.id ? 1 : 0,
                        scale: hoveredItem === product.id ? 1 : 0.8,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      ${product.price}
                    </motion.div>

                    {/* Cuisine/Kitchen Tag */}
                    {(product.cuisine || product.kitchen) && (
                      <motion.div
                        className="absolute bottom-4 left-4 bg-black/60 text-white text-xs py-1 px-2 rounded flex items-center gap-1"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                          opacity: hoveredItem === product.id ? 1 : 0,
                          y: hoveredItem === product.id ? 0 : 10,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <Clock size={12} />
                        {product.cuisine || product.kitchen}
                      </motion.div>
                    )}

                    {/* Favorite Button */}
                    <motion.button
                      className="absolute bottom-4 right-4 bg-black/60 text-white p-2 rounded-full"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: hoveredItem === product.id ? 1 : 0,
                        scale: hoveredItem === product.id ? 1 : 0.8,
                      }}
                      transition={{ duration: 0.2 }}
                      onClick={(e) => toggleFavorite(product.id, e)}
                    >
                      <Heart
                        size={16}
                        className={favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-white"}
                      />
                    </motion.button>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <Link href={`/menu/${product.id}`}>
                      <h3 className="text-white font-medium text-lg mb-1 hover:text-amber-500 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-gray-400 text-sm mb-3">
                      {"try our cuisine and you will like it"}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => {
                        const rating = 4
                        return (
                          <motion.div
                            key={i}
                            animate={{
                              scale: hoveredItem === product.id && i < rating && animateStars[product.id] ? 1.2 : 1,
                              rotate: hoveredItem === product.id && i < rating && animateStars[product.id] ? 10 : 0,
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
                              className={i < rating ? "fill-amber-500 text-amber-500" : "text-gray-600"}
                            />
                          </motion.div>
                        )
                      })}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.cuisine && (
                        <div className="rounded-md bg-emerald-500/10 px-2 py-[2px] text-[10px] font-semibold capitalize text-emerald-500">
                          {product.cuisine}
                        </div>
                      )}
                      {product.category && (
                        <div className="rounded-md bg-blue-500/10 px-2 py-[2px] text-[10px] font-semibold capitalize text-blue-500">
                          {product.category}
                        </div>
                      )}
                      {product.kitchen && (
                        <div className="rounded-md bg-red-500/10 px-2 py-[2px] text-[10px] font-semibold capitalize text-red-500">
                          {product.kitchen}
                        </div>
                      )}
                      {product.size && (
                        <div className="rounded-md bg-yellow-500/10 px-2 py-[2px] text-[10px] font-semibold capitalize text-yellow-500">
                          {product.size}
                        </div>
                      )}
                    </div>

                    {/* Button - using your cart system */}
                    <div className="flex gap-2">
                      <Link href={`/menu/${product.id}`} className="flex-1">
                        <Button
                          className="w-full bg-amber-500 hover:bg-amber-600 text-black font-medium"
                          variant="default"
                        >
                          Buy Now
                        </Button>
                      </Link>
                      <Button
                        className={`${
                          isItemInCart(product.id) ? "bg-green-600 hover:bg-green-700" : "bg-neutral-800 hover:bg-neutral-700"
                        } text-white`}
                        onClick={() => addToCart(product)}
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full flex items-center justify-center py-20 text-gray-400">
                No products available for this category.
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center mt-10 gap-4">
          <motion.button
            className="bg-neutral-800 hover:bg-neutral-700 text-white p-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToPrevPage}
            disabled={totalPages <= 1}
          >
            <ChevronLeft size={20} />
          </motion.button>
          <motion.button
            className="bg-neutral-800 hover:bg-neutral-700 text-white p-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToNextPage}
            disabled={totalPages <= 1}
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </div>
    </div>
  )
}
