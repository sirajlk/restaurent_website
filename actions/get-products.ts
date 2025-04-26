import type { Product } from "@/types-d"
import qs from "query-string"

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`

interface Query {
  size?: string
  isFeatured?: boolean
  cuisine?: string
  category?: string
  kitchen?: string
}

const getProducts = async (query: Query): Promise<Product[]> => {
  try {
    const url = qs.stringifyUrl({
      url: URL,
      query: {
        size: query.size,
        isFeatured: query.isFeatured,
        cuisine: query.cuisine,
        category: query.category,
        kitchen: query.kitchen,
      },
    })

    // Use server-side fetch with next: { revalidate: 0 } to avoid caching
    const res = await fetch(url, {
      next: { revalidate: 0 },
      // Add cache: 'no-store' to ensure fresh data
      cache: "no-store",
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`)
    }

    return res.json()
  } catch (error) {
    console.error("Error fetching products:", error)
    // Return empty array on error
    return []
  }
}

export default getProducts
