"use client"

import type { Cuisine } from "@/types-d"
import ReusableFilter from "./ReusableFilter"
interface CuisineFiltersProps {
  cuisines: Cuisine[];
}

const KitchenFilters = ({ cuisines }: CuisineFiltersProps) => {
  return <ReusableFilter title="Cuisine" items={cuisines} paramName="cuisine" />
}

export default KitchenFilters
