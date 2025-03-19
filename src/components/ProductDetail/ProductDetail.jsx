
import { useEffect } from "react"
import { useProduct } from "../../context/ProductContext"
import ProductImages from "./ProductImages"
import ProductInfo from "./ProductInfo"
import CustomizationOptions from "./CustomizationOptions"
import PriceBreakdown from "./PriceBreakdown"
import RelatedProducts from "./RelatedProducts"
import "./ProductDetail.css"

const ProductDetail = () => {
  const { product, loading, error, notification } = useProduct()

  useEffect(() => {
    // Add structured data for SEO
    if (product) {
      const structuredData = {
        "@context": "https://schema.org/",
        "@type": "Product",
        name: product.title,
        image: product.images,
        description: `Beautiful ${product.title} with customizable options.`,
        sku: product.id,
        brand: {
          "@type": "Brand",
          name: "Luxury Jewelry Co.",
        },
        offers: {
          "@type": "Offer",
          url: window.location.href,
          priceCurrency: "INR",
          price: product.base_price,
          priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
          availability: "https://schema.org/InStock",
        },
      }

      const script = document.createElement("script")
      script.type = "application/ld+json"
      script.text = JSON.stringify(structuredData)
      document.head.appendChild(script)

      return () => {
        document.head.removeChild(script)
      }
    }
  }, [product])

  // Update meta tags for SEO
  useEffect(() => {
    if (product) {
      document.title = product.title + " | Luxury Jewelry Co."

      // Update meta description
      let metaDescription = document.querySelector('meta[name="description"]')
      if (!metaDescription) {
        metaDescription = document.createElement("meta")
        metaDescription.name = "description"
        document.head.appendChild(metaDescription)
      }
      metaDescription.content = `Explore our ${product.title}. Customize with different gemstones, metals, and sizes. Exclusive offers available.`

      // Update meta keywords
      let metaKeywords = document.querySelector('meta[name="keywords"]')
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta")
        metaKeywords.name = "keywords"
        document.head.appendChild(metaKeywords)
      }
      metaKeywords.content = `jewelry, engagement ring, ${product.variations.gemstone.join(", ")}, ${product.variations.metal.join(", ")}, luxury jewelry`
    }
  }, [product])

  if (loading) return <div className="loading">Loading product details...</div>
  if (error) return <div className="error">{error}</div>
  if (!product) return <div className="error">Product not found</div>

  return (
    <div className="product-detail">
      {notification.show && <div className={`notification ${notification.type}`}>{notification.message}</div>}

      <div className="product-detail-main">
        <div className="product-detail-left">
          <ProductImages />
        </div>
        <div className="product-detail-right">
          <ProductInfo />
          <CustomizationOptions />
        </div>
      </div>
      <PriceBreakdown />
      <RelatedProducts />
    </div>
  )
}

export default ProductDetail

