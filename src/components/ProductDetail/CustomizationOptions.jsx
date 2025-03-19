import { useState } from "react"
import { useProduct } from "../../context/ProductContext"
import { AlertCircle } from "react-feather"
import "./CustomizationOptions.css"

const CustomizationOptions = () => {
  const { product, selectedVariations, updateVariation, addToCart, isVariationAvailable, validationErrors } =
    useProduct()
  const [showSizeGuide, setShowSizeGuide] = useState(false)

  if (!product) return null

  const handleVariationChange = (type, value) => {
    updateVariation(type, value)
  }

  const toggleSizeGuide = () => {
    setShowSizeGuide(!showSizeGuide)
  }

  return (
    <div className="customization-options">
      <h2 className="section-title">Customize Your Ring</h2>

      {validationErrors.combination && (
        <div className="error-message">
          <AlertCircle size={16} />
          <span>{validationErrors.combination}</span>
        </div>
      )}

      <div className="option-group">
        <label className="option-label">Gemstone Type</label>
        <div className="option-buttons">
          {product.variations.gemstone.map((gemstone) => {
            const isAvailable = isVariationAvailable("gemstone", gemstone)
            return (
              <button
                key={gemstone}
                className={`option-button ${selectedVariations.gemstone === gemstone ? "selected" : ""} ${!isAvailable ? "out-of-stock" : ""}`}
                onClick={() => handleVariationChange("gemstone", gemstone)}
                disabled={!isAvailable}
                title={!isAvailable ? "Out of stock" : ""}
              >
                {gemstone}
                {!isAvailable && <span className="out-of-stock-label">Out of Stock</span>}
              </button>
            )
          })}
        </div>
        {validationErrors.gemstone && (
          <div className="error-message">
            <AlertCircle size={16} />
            <span>{validationErrors.gemstone}</span>
          </div>
        )}
      </div>

      <div className="option-group">
        <label className="option-label">Gemstone Quality</label>
        <div className="option-buttons">
          {product.variations.quality.map((quality) => {
            const isAvailable = isVariationAvailable("quality", quality)
            return (
              <button
                key={quality}
                className={`option-button ${selectedVariations.quality === quality ? "selected" : ""} ${!isAvailable ? "out-of-stock" : ""}`}
                onClick={() => handleVariationChange("quality", quality)}
                disabled={!isAvailable}
                title={!isAvailable ? "Out of stock" : ""}
              >
                {quality}
                {!isAvailable && <span className="out-of-stock-label">Out of Stock</span>}
              </button>
            )
          })}
        </div>
        {validationErrors.quality && (
          <div className="error-message">
            <AlertCircle size={16} />
            <span>{validationErrors.quality}</span>
          </div>
        )}
      </div>

      <div className="option-group">
        <label className="option-label">Metal Type</label>
        <div className="option-buttons">
          {product.variations.metal.map((metal) => {
            const isAvailable = isVariationAvailable("metal", metal)
            return (
              <button
                key={metal}
                className={`option-button ${selectedVariations.metal === metal ? "selected" : ""} ${!isAvailable ? "out-of-stock" : ""}`}
                onClick={() => handleVariationChange("metal", metal)}
                disabled={!isAvailable}
                title={!isAvailable ? "Out of stock" : ""}
              >
                {metal}
                {!isAvailable && <span className="out-of-stock-label">Out of Stock</span>}
              </button>
            )
          })}
        </div>
        {validationErrors.metal && (
          <div className="error-message">
            <AlertCircle size={16} />
            <span>{validationErrors.metal}</span>
          </div>
        )}
      </div>

      <div className="option-group">
        <label className="option-label">Carat Weight</label>
        <div className="option-buttons">
          {product.variations.carat_weight.map((carat) => {
            const isAvailable = isVariationAvailable("carat_weight", carat)
            return (
              <button
                key={carat}
                className={`option-button ${selectedVariations.carat_weight === carat ? "selected" : ""} ${!isAvailable ? "out-of-stock" : ""}`}
                onClick={() => handleVariationChange("carat_weight", carat)}
                disabled={!isAvailable}
                title={!isAvailable ? "Out of stock" : ""}
              >
                {carat} ct
                {!isAvailable && <span className="out-of-stock-label">Out of Stock</span>}
              </button>
            )
          })}
        </div>
        {validationErrors.carat_weight && (
          <div className="error-message">
            <AlertCircle size={16} />
            <span>{validationErrors.carat_weight}</span>
          </div>
        )}
      </div>

      <div className="option-group">
        <div className="size-header">
          <label className="option-label">Ring Size</label>
          <button className="size-guide-button" onClick={toggleSizeGuide}>
            Size Guide
          </button>
        </div>
        <div className="option-buttons">
          {product.variations.ring_size.map((size) => {
            const isAvailable = isVariationAvailable("ring_size", size)
            return (
              <button
                key={size}
                className={`option-button ${selectedVariations.ring_size === size ? "selected" : ""} ${!isAvailable ? "out-of-stock" : ""}`}
                onClick={() => handleVariationChange("ring_size", size)}
                disabled={!isAvailable}
                title={!isAvailable ? "Out of stock" : ""}
              >
                {size}
                {!isAvailable && <span className="out-of-stock-label">Out of Stock</span>}
              </button>
            )
          })}
        </div>
        {validationErrors.ring_size && (
          <div className="error-message">
            <AlertCircle size={16} />
            <span>{validationErrors.ring_size}</span>
          </div>
        )}
      </div>

      {showSizeGuide && (
        <div className="size-guide-modal">
          <div className="size-guide-content">
            <button className="close-button" onClick={toggleSizeGuide}>
              ×
            </button>
            <h3>Ring Size Guide</h3>
            <div className="size-guide-info">
              <p>To find your ring size:</p>
              <ol>
                <li>Wrap a piece of string or paper around your finger</li>
                <li>Mark where the ends meet</li>
                <li>Measure the length in millimeters</li>
                <li>Use the chart below to find your size</li>
              </ol>
              <table className="size-chart">
                <thead>
                  <tr>
                    <th>US Size</th>
                    <th>Diameter (mm)</th>
                    <th>Circumference (mm)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>6</td>
                    <td>16.5</td>
                    <td>51.9</td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>17.3</td>
                    <td>54.4</td>
                  </tr>
                  <tr>
                    <td>8</td>
                    <td>18.1</td>
                    <td>56.9</td>
                  </tr>
                  <tr>
                    <td>9</td>
                    <td>18.9</td>
                    <td>59.4</td>
                  </tr>
                  <tr>
                    <td>10</td>
                    <td>19.8</td>
                    <td>62.1</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <button className="add-to-bag-button" onClick={addToCart}>
        Add to Bag
      </button>
    </div>
  )
}

export default CustomizationOptions

