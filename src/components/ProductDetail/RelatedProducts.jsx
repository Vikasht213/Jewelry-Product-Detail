
import { useState, useEffect } from "react"
import { fetchRelatedProducts } from "../../utils/api"
import { ChevronLeft, ChevronRight } from "react-feather"
import "./RelatedProducts.css"

const RelatedProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(3)

  useEffect(() => {
    const loadRelatedProducts = async () => {
      try {
        setLoading(true)
        const data = await fetchRelatedProducts()
        setProducts(data)
        setLoading(false)
      } catch (error) {
        console.error("Failed to load related products:", error)
        setLoading(false)
      }
    }

    loadRelatedProducts()
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2)
      } else {
        setItemsPerPage(3)
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const totalPages = Math.ceil(products.length / itemsPerPage)
  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1))
  }
  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0))
  }
  if (loading) {
    return <div className="related-products-loading">Loading related products...</div>
  }
  if (products.length === 0) {
    return null
  }
  const startIndex = currentPage * itemsPerPage
  const visibleProducts = products.slice(startIndex, startIndex + itemsPerPage)
  return (
    <div className="related-products">
      <h2 className="section-title">You May Also Like</h2>
      <div className="carousel-container">
        <button className="carousel-button prev" onClick={handlePrevPage} aria-label="Previous products">
          <ChevronLeft />
        </button>
        <div className="products-grid">
          {visibleProducts.map((product) => (
            <div key={product.id} className="related-product-card">
              <div className="product-image">
                <img src={product.image || "/placeholder.svg"} alt={product.title} loading="lazy" />
              </div>
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price-range">{product.price_range}</p>
              <button className="view-product-button">View Details</button>
            </div>
          ))}
        </div>
        <button className="carousel-button next" onClick={handleNextPage} aria-label="Next products">
          <ChevronRight />
        </button>
      </div>
      <div className="carousel-pagination">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`pagination-dot ${currentPage === index ? "active" : ""}`}
            onClick={() => setCurrentPage(index)}
            aria-label={`Page ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts

