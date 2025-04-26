"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import PopularContent from "@/components/PopularContent"
import type { Product } from "@/types-d"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { X } from "lucide-react"

interface FoodMenuSectionProps {
  products: Product[]
  categories: any[] // Use your actual category type
  searchParams:
    | {
        size?: string
        isFeatured?: boolean
        cuisine?: string
        category?: string
        kitchen?: string
      }
    | null
    | undefined
}

export default function FoodMenuSection({ products, categories, searchParams = {} }: FoodMenuSectionProps) {
  const router = useRouter()
  const pathname = usePathname()
  const queryParams = useSearchParams()

  // Initialize activeCategory based on the current searchParams
  const [activeCategory, setActiveCategory] = useState(searchParams?.category || "All")

  // Update activeCategory when searchParams change
  useEffect(() => {
    setActiveCategory(searchParams?.category || "All")
  }, [searchParams?.category])

  // Ensure searchParams is an object
  const safeSearchParams = searchParams || {}

  // Handle category filter click
  const handleCategoryClick = (categoryId: string) => {
    // Create a new URLSearchParams object
    const params = new URLSearchParams(queryParams.toString())

    if (categoryId === "All") {
      params.delete("category")
    } else {
      params.set("category", categoryId)
    }

    // Use the pathname to ensure we stay on the same page
    router.push(`${pathname}?${params.toString()}`)
  }

  // Handle filter removal
  const handleFilterRemove = (key: string) => {
    const params = new URLSearchParams(queryParams.toString())
    params.delete(key)

    router.push(`${pathname}?${params.toString()}`)
  }

  // Get current filters - safely handle null/undefined
  const currentFilters = Object.entries(safeSearchParams).filter(([_, value]) => value !== undefined)

  return (
    <div className="w-full">
      {/* Section Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Our Menu</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Explore our delicious menu with a variety of options to satisfy your cravings
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <motion.button
          key="all"
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === "All" ? "bg-amber-500 text-black" : "bg-neutral-800 text-white hover:bg-neutral-700"
          }`}
          onClick={() => handleCategoryClick("All")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          All
        </motion.button>

        {categories.map((category) => (
          <motion.button
            key={category.id}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category.id
                ? "bg-amber-500 text-black"
                : "bg-neutral-800 text-white hover:bg-neutral-700"
            }`}
            onClick={() => handleCategoryClick(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.name}
          </motion.button>
        ))}
      </div>

      {/* Active Filters */}
      {currentFilters.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {currentFilters.map(([key, value]) => (
            <div
              key={key}
              onClick={() => handleFilterRemove(key)}
              className="px-3 py-1 flex items-center gap-1 cursor-pointer bg-neutral-800 text-white rounded-full text-sm"
            >
              {key}: {value?.toString()}
              <X className="w-4 h-4" />
            </div>
          ))}
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-12">
        <AnimatePresence mode="wait">
          {products.length > 0 ? (
            products.map((product) => <PopularContent key={product.id} data={product} />)
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              No products available for the selected filters.
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
