
import { useProduct } from "../../context/ProductContext"
import { Star } from "react-feather"
import { FaStarHalfAlt } from "react-icons/fa";
import "./ProductInfo.css"

const ProductInfo = () => {
  const { product, calculatePrice, formatPrice, currency, toggleCurrency } = useProduct()

  if (!product) return null
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="star filled" />)
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="star half-filled"/>)
    }
    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="star" />)
    }
    return stars
  }
  return (
    <div className="product-info">
      <h1 className="product-title">{product.title}</h1>
      <div className="product-id">Product ID: {product.id}</div>
      <div className="product-reviews">
        <div className="stars">
          {renderStars(4.5)} 
        </div>
        <span className="review-count">({product.reviews} Reviews)</span>
      </div>
      <div className="product-price">
        <span className="price">{formatPrice(calculatePrice())}</span>
        <button className="currency-toggle" onClick={toggleCurrency}>
          Switch to {currency === "INR" ? "USD" : "INR"}
        </button>
      </div>
      <div className="product-offer">
        <span className="offer-tag">Special Offer</span>
        <span className="offer-text">{product.exclusive_offer}</span>
      </div>
      <div className="product-description">
        <p>
          This exquisite three-stone engagement ring features a stunning center aquamarine gemstone flanked by two
          brilliant diamonds. The elegant design symbolizes your past, present, and future together.
        </p>
        <p>
          Each ring is meticulously crafted with the highest quality materials and can be customized to your preferences
          with various gemstone, metal, and size options.
        </p>
      </div>
    </div>
  )
}

export default ProductInfo

