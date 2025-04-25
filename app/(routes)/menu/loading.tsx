import Container from "@/components/container"
import Box from "@/components/box"
import FilterContainer from "@/components/FilterContainer"

export default function Loading() {
  return (
    <Container className="px-4 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-12 py-12 gap-2">
        {/* Sidebar skeleton */}
        <div className="hidden md:block col-span-2 border-r border-gray-100 top-24">
          <FilterContainer>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
          </FilterContainer>
        </div>

        {/* Main content skeleton */}
        <Box className="col-span-12 md:col-span-10 flex-col items-start justify-start w-full">
          <div className="w-full">
            {/* Header skeleton */}
            <div className="flex justify-between items-center mb-6">
              <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Products grid skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="rounded-lg overflow-hidden">
                  <div className="aspect-square w-full bg-gray-200 animate-pulse"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-6 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Box>
      </div>
    </Container>
  )
}
