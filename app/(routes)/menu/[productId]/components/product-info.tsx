"use client"

import { Button } from "@/components/ui/button"
import type { Product } from "@/types-d"
import { CookingPot, Heart, Minus, Plus, Share2, ShoppingCart, Soup, Star, Utensils } from "lucide-react"
import { useState } from "react"
import useCart from "@/hooks/use-carts"
import { motion } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface ProductInfoProps {
  product: Product
  quantity: number
  setQuantity: (quantity: number) => void
  selectedSize: string
  setSelectedSize: (size: string) => void
}

const ProductInfo = ({ product, quantity, setQuantity, selectedSize, setSelectedSize }: ProductInfoProps) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const cart = useCart()

  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(1, Math.min(10, value)))
  }

  const addToCart = () => {
    setIsAddingToCart(true)

    // Simulate network delay for better UX
    setTimeout(() => {
      cart.addItem({ ...product, qty: quantity, size: selectedSize })
      setIsAddingToCart(false)
    }, 600)
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  // Available sizes based on product type
  const availableSizes = product.size ? [product.size] : ["Small", "Regular", "Large"]

  return (
    <div className="space-y-8  ">
      {/* Product Name and Actions */}
      <div className="flex justify-between items-start">
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-neutral-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {product.name}
        </motion.h1>

        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="rounded-full" onClick={toggleFavorite}>
            <Heart
              className={cn("w-5 h-5 transition-colors", isFavorite ? "fill-red-500 text-red-500" : "text-neutral-500")}
            />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <Share2 className="w-5 h-5 text-neutral-500" />
          </Button>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={i < (product.rating || 4) ? "fill-amber-400 text-amber-400" : "text-gray-300"}
            size={18}
          />
        ))}
        <span className="text-sm text-neutral-500 ml-2">
          {product.rating || 4}.0 ({product.reviewCount || 24} reviews)
        </span>
      </div>

      {/* Description */}
      <motion.p
        className="text-neutral-600 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {product.description ||
          "Delicious and freshly prepared with high-quality ingredients. Our chefs take pride in creating this amazing dish that will satisfy your cravings and leave you wanting more."}
      </motion.p>

      {/* Tags */}
      <motion.div
        className="flex flex-wrap gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {product.cuisine && (
          <Badge
            variant="outline"
            className="bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100 flex gap-1.5 py-1.5"
          >
            <CookingPot className="w-4 h-4" />
            {product.cuisine}
          </Badge>
        )}

        {product.category && (
          <Badge
            variant="outline"
            className="bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100 flex gap-1.5 py-1.5"
          >
            <Soup className="w-4 h-4" />
            {product.category}
          </Badge>
        )}

        {product.kitchen && (
          <Badge
            variant="outline"
            className="bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100 flex gap-1.5 py-1.5"
          >
            <Utensils className="w-4 h-4" />
            {product.kitchen}
          </Badge>
        )}
      </motion.div>

      <Separator />

      {/* Price and Size Selection */}
      <div className="space-y-6">
        {/* Size Selection */}
        {availableSizes.length > 1 && (
          <div className="space-y-3">
            <label className="text-sm font-medium text-neutral-700">Size</label>
            <div className="flex gap-3">
              {availableSizes.map((size) => (
                <Button
                  key={size}
                  type="button"
                  variant={selectedSize === size ? "default" : "outline"}
                  onClick={() => setSelectedSize(size)}
                  className={cn("rounded-full px-6", selectedSize === size ? "bg-amber-500 hover:bg-amber-600" : "")}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-500">Price</p>
            <p className="text-3xl font-bold text-amber-600">{product.price}</p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center border border-neutral-200 rounded-full">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-l-full h-10 w-10"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="w-10 text-center font-medium">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-r-full h-10 w-10"
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= 10}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Add to Cart Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Button
          onClick={addToCart}
          className="w-full py-6 text-lg font-semibold bg-amber-500 hover:bg-amber-600 text-white"
          disabled={isAddingToCart}
        >
          {isAddingToCart ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
              Adding...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              Add to cart
              <ShoppingCart className="w-5 h-5" />
            </div>
          )}
        </Button>
      </motion.div>

      {/* Additional Info */}
      <div className="grid grid-cols-2 gap-4 text-sm text-neutral-500">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          Free delivery
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-500"></div>
          {product.prepTime || "30 min"} preparation
        </div>
      </div>
    </div>
  )
}

export default ProductInfo
