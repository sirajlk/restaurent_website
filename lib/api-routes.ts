// Optional: Create this file if you want to use API routes as a proxy

import { NextResponse } from "next/server"

// This is a server-side API route that can proxy requests to your API
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = `${process.env.NEXT_PUBLIC_API_URL}/products?${searchParams.toString()}`

  try {
    const response = await fetch(url)
    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}
