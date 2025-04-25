"use client"

import type { Size } from "@/types-d"
import ReusableFilter from "./ReusableFilter"

interface SizesFiltersProps {
  sizes: Size[]
}

const SizesFilters = ({ sizes }: SizesFiltersProps) => {
  return <ReusableFilter title="Size" paramName="size" items={sizes} />
}

export default SizesFilters
