import { Category } from "@/types-d";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;


const getCategories = async (): Promise<Category[]> => {
    const res = await fetch(URL)
    return res.json()
}

export default getCategories