import getProduct from "@/actions/get-product"
import getProducts from "@/actions/get-products"
import Container from "@/components/container"
import type { Metadata } from "next"
import Breadcrumb from "./components/breadcrumb"
import ProductView from "./components/product-view"
import RelatedProducts from "./components/related-products"
import Header from "@/components/Header"

interface ProductPageProps {
  params: {
    productId: string
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.productId)

  return {
    title: `${product?.name || "Product"} | Quibeez Restaurant`,
    description: product?.description || "Delicious food from Quibeez Restaurant",
    openGraph: {
      images: product?.images?.[0]?.url ? [product.images[0].url] : [],
    },
  }
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const product = await getProduct(params.productId)
  const suggestedProducts = await getProducts({ category: product?.category })

  if (!product) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center min-h-[50vh] py-20">
          <h2 className="text-2xl font-bold text-neutral-800">Product not found</h2>
          <p className="text-neutral-600 mt-2">The product you're looking for doesn't exist or has been removed.</p>
        </div>
      </Container>
    )
  }

  return (
    <div className=" min-h-screen pb-20">
      <Container>
        <Header userId={''} />
        {/* Breadcrumb Navigation */}
        <Breadcrumb product={product} />

        {/* Product View */}
        <ProductView product={product} />

        {/* Related Products */}
        <RelatedProducts
          products={suggestedProducts.filter((item) => item.id !== params.productId)}
          category={product.category}
        />
      </Container>
    </div>
  )
}

export default ProductPage
