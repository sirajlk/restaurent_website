"use client"

import type { Kitchen } from "@/types-d"
import ReusableFilter from "./ReusableFilter"

interface KitchenFiltersProps {
  kitchens: Kitchen[]
}

const KitchenFilters = ({ kitchens }: KitchenFiltersProps) => {
  return <ReusableFilter title="Kitchen" items={kitchens} paramName="kitchen" />
}

export default KitchenFilters
