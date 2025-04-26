"use client"

import { ChevronRight, Home } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import type { Product } from "@/types-d"

interface BreadcrumbProps {
  product: Product
}

const Breadcrumb = ({ product }: BreadcrumbProps) => {
  return (
    <motion.nav
      className="flex items-center gap-1 py-4 px-11 text-sm text-neutral-500 overflow-x-auto whitespace-nowrap"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link href="/" className="flex items-center gap-1 hover:text-neutral-800 transition-colors">
        <Home className="w-4 h-4" />
        <span>Home</span>
      </Link>
      <ChevronRight className="w-4 h-4 flex-shrink-0" />

      <Link href="/menu" className="hover:text-neutral-800 transition-colors">
        Menu
      </Link>
      <ChevronRight className="w-4 h-4 flex-shrink-0" />

      {product.category && (
        <>
          <Link href={`/menu?category=${product.category}`} className="hover:text-neutral-800 transition-colors">
            {product.category}
          </Link>
          <ChevronRight className="w-4 h-4 flex-shrink-0" />
        </>
      )}

      <span className="font-medium text-neutral-800 truncate">{product.name}</span>
    </motion.nav>
  )
}

export default Breadcrumb
