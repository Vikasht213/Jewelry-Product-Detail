import { useProduct } from "../../context/ProductContext"
import "./PriceBreakdown.css"

const PriceBreakdown = () => {
  const { product, formatPrice } = useProduct()

  if (!product) return null

  const { price_breakdown } = product

  // Function to format price based on selected currency
  const formatValue = (value) => {
    return formatPrice(value)
  }

  return (
    <div className="price-breakdown">
      <h2 className="section-title">Price Breakdown</h2>

      <div className="breakdown-table-container">
        <table className="breakdown-table">
          <thead>
            <tr>
              <th>Component</th>
              <th>Weight</th>
              <th>Rate</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Metal ({price_breakdown.metal.weight}g {product.selectedVariations?.metal || "White Gold"})
              </td>
              <td>{price_breakdown.metal.weight}g</td>
              <td>{formatValue(price_breakdown.metal.rate)}/g</td>
              <td>{formatValue(price_breakdown.metal.value)}</td>
            </tr>

            {price_breakdown.stones.map((stone, index) => (
              <tr key={index}>
                <td>
                  {stone.type} ({stone.carat} ct)
                </td>
                <td>{stone.carat} ct</td>
                <td>{formatValue(Math.round(stone.value / stone.carat))}/ct</td>
                <td>{formatValue(stone.value)}</td>
              </tr>
            ))}

            <tr>
              <td>Making Charges</td>
              <td colSpan="2"></td>
              <td>{formatValue(price_breakdown.making_charges)}</td>
            </tr>

            <tr className="subtotal-row">
              <td colSpan="3">Subtotal</td>
              <td>{formatValue(price_breakdown.subtotal)}</td>
            </tr>

            <tr>
              <td colSpan="3">GST (3%)</td>
              <td>{formatValue(price_breakdown.gst)}</td>
            </tr>

            <tr className="total-row">
              <td colSpan="3">Grand Total</td>
              <td>{formatValue(price_breakdown.grand_total)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PriceBreakdown

