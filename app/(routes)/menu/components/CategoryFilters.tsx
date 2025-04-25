"use client"

import type { Category } from "@/types-d"
import ReusableFilter from "./ReusableFilter"

interface CategoryFiltersProps {
  categories: Category[];
}
const SizesFilters = ({ categories }: CategoryFiltersProps) => {
  return <ReusableFilter title="Category" paramName="category" items={categories} />
}

export default SizesFilters
