"use client"

import Box from "@/components/box"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import qs from "query-string"

// Generic interface for filter items
interface FilterItem {
  id: string
  name: string
  value: number | string
}

interface ReusableFilterProps {
  title: string
  items: FilterItem[]
  paramName: string // The URL parameter name (e.g., 'kitchen', 'size', 'category', 'cuisine')
  className?: string
}

const ReusableFilter = ({ title, items, paramName, className }: ReusableFilterProps) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const handleClick = (itemName: string) => {
    const currentParams = Object.fromEntries(searchParams.entries())

    if (currentParams[paramName] === itemName) {
      delete currentParams[paramName]
    } else {
      currentParams[paramName] = itemName
    }

    const href = qs.stringifyUrl({
      url: "/menu",
      query: currentParams,
    })

    router.push(href)
  }

  return (
    <Box className={cn("flex-col gap-2 border-b pb-4 cursor-pointer", className)}>
      <h2 className="text-xl font-semibold text-neutral-700">{title}</h2>
      <Box className="flex-col gap-2 mt-2">
        {items?.map((item) => (
          <div
            onClick={() => handleClick(item.name)}
            key={item.id}
            className={cn(
              "text-sm font-semibold text-neutral-500 hover:text-hero flex items-center gap-2",
              item.name === searchParams.get(paramName) && "text-hero",
            )}
          >
            <p>
              {item.name} ({item.value})
            </p>
            {item.name === searchParams.get(paramName) && <Check className="w-4 h-4 text-hero" />}
          </div>
        ))}
      </Box>
    </Box>
  )
}

export default ReusableFilter
