import { useState, useRef, useEffect } from "react"
import { useProduct } from "../../context/ProductContext"
import { ChevronLeft, ChevronRight } from "react-feather"
import "./ProductImages.css"

const ProductImages = () => {
  const { product, currentImage, setCurrentImage } = useProduct()
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const [showZoom, setShowZoom] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const imageRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const checkIfDesktop = () => {
      setIsDesktop(window.innerWidth > 1024)
    }
    checkIfDesktop()
    window.addEventListener("resize", checkIfDesktop)
    return () => {
      window.removeEventListener("resize", checkIfDesktop)
    }
  }, [])

  // Add touch swipe functionality for mobile
  useEffect(() => {
    if (!containerRef.current || !product) return
    let touchStartX = 0
    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX
    }
    const handleTouchEnd = (e) => {
      const touchEndX = e.changedTouches[0].clientX
      const diff = touchStartX - touchEndX

      // If swipe distance is significant enough
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          // Swipe left, go to next image
          nextImage()
        } else {
          // Swipe right, go to previous image
          prevImage()
        }
      }
    }

    const container = containerRef.current
    container.addEventListener("touchstart", handleTouchStart, { passive: true })
    container.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchend", handleTouchEnd)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product])

  const handleThumbnailClick = (index) => {
    setCurrentImage(index)
  }

  const handleMouseMove = (e) => {
    if (!imageRef.current || !isDesktop) return
    const { left, top, width, height } = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setZoomPosition({ x, y })
  }
  const handleMouseEnter = () => {
    if (isDesktop) {
      setShowZoom(true)
    }
  }
  const handleMouseLeave = () => {
    setShowZoom(false)
  }
  const nextImage = () => {
    if (!product) return
    setCurrentImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))
  }
  const prevImage = () => {
    if (!product) return
    setCurrentImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))
  }
  if (!product) return null
  return (
    <div className="product-images">
      <div
        className={`main-image-container ${isDesktop ? "desktop" : "mobile"}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={containerRef}
      >
        <button className="carousel-button prev" onClick={prevImage} aria-label="Previous image">
          <ChevronLeft />
        </button>
        <img
          src={product.images[currentImage] || "/placeholder.svg"}
          alt={`${product.title} - View ${currentImage + 1}`}
          className="main-image"
          loading="lazy"
          ref={imageRef}
        />
        <button className="carousel-button next" onClick={nextImage} aria-label="Next image">
          <ChevronRight />
        </button>
        {showZoom && isDesktop && (
          <div
            className="zoom-view"
            style={{
              backgroundImage: `url(${product.images[currentImage]})`,
              backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
            }}
          />
        )}
      </div>
      <div className="thumbnails">
        {product.images.map((image, index) => (
          <div
            key={index}
            className={`thumbnail ${currentImage === index ? "active" : ""}`}
            onClick={() => handleThumbnailClick(index)}
          >
            <img src={image || "/placeholder.svg"} alt={`${product.title} - Thumbnail ${index + 1}`} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductImages

