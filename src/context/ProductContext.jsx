"use client"

import { createContext, useState, useContext, useEffect } from "react"
import { fetchProductData } from "../utils/api"

const ProductContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useProduct = () => useContext(ProductContext)
export const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedVariations, setSelectedVariations] = useState({
    gemstone: "",
    quality: "",
    metal: "",
    carat_weight: 0,
    ring_size: 0,
  })
  const [currentImage, setCurrentImage] = useState(0)
  const [currency, setCurrency] = useState("INR")
  const exchangeRate = 0.012 
  const [cartItems, setCartItems] = useState([])
  const [notification, setNotification] = useState({ show: false, message: "", type: "" })
  const [validationErrors, setValidationErrors] = useState({})

  useEffect(() => {
    const loadProductData = async () => {
      try {
        setLoading(true)
        const data = await fetchProductData()
        setProduct(data)

        // first available options
        setSelectedVariations({
          gemstone: data.variations.gemstone[0],
          quality: data.variations.quality[0],
          metal: data.variations.metal[0],
          carat_weight: data.variations.carat_weight[0],
          ring_size: data.variations.ring_size[0],
        })

        setLoading(false)
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Failed to load product data")
        setLoading(false)
      }
    }
    loadProductData()
  }, [])

  const updateVariation = (type, value) => {
    setSelectedVariations((prev) => ({
      ...prev,
      [type]: value,
    }))
    setValidationErrors((prev) => ({
      ...prev,
      [type]: null,
    }))
  }

  const isVariationAvailable = (type, value) => {
    if (!product || !product.availability) return true
    return product.availability[type][value.toString()]
  }
  const validateSelections = () => {
    if (!product) return false
    const errors = {}
    let isValid = true
    // Check each variation type
    Object.keys(selectedVariations).forEach((type) => {
      const value = selectedVariations[type]
      if (!isVariationAvailable(type, value)) {
        errors[type] = `This ${type.replace("_", " ")} is currently out of stock`
        isValid = false
      }
    })

    // Check for specific invalid combinations
    if (selectedVariations.gemstone === "Sapphire" && selectedVariations.quality === "Heirloom") {
      errors.combination = "Sapphire is not available in Heirloom quality"
      isValid = false
    }

    setValidationErrors(errors)
    return isValid
  }

  const calculatePrice = () => {
    if (!product) return 0
    let basePrice = product.base_price

    // Apply modifiers based on selections
    const qualityModifiers = {
      Good: 1,
      Better: 1.2,
      Best: 1.5,
      Heirloom: 2,
    }
    const metalModifiers = {
      "White Gold": 1,
      "Yellow Gold": 0.9,
      "Rose Gold": 1.1,
    }
    // Apply quality modifier
    basePrice *= qualityModifiers[selectedVariations.quality] || 1
    // Apply metal modifier
    basePrice *= metalModifiers[selectedVariations.metal] || 1
    // Apply carat weight modifier
    const caratRatio = selectedVariations.carat_weight / product.variations.carat_weight[0]
    basePrice *= caratRatio
    // Convert to selected currency if needed
    return currency === "USD" ? basePrice * exchangeRate : basePrice
  }
  const toggleCurrency = () => {
    setCurrency((prev) => (prev === "INR" ? "USD" : "INR"))
  }
  const formatPrice = (price) => {
    if (currency === "USD") {
      return `$${price.toFixed(2)}`
    }
    return `₹${price.toLocaleString("en-IN")}`
  }
  const addToCart = () => {
    if (!product) return
    // Validate selections before adding to cart
    if (!validateSelections()) {
      setNotification({
        show: true,
        message: "Please correct the errors before adding to cart",
        type: "error",
      })
      return
    }
    const newItem = {
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      title: product.title,
      price: calculatePrice(),
      image: product.images[0],
      variations: { ...selectedVariations },
      quantity: 1,
    }

    setCartItems((prev) => [...prev, newItem])
    // Show success notification
    setNotification({
      show: true,
      message: "Product added to your bag!",
      type: "success",
    })
    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" })
    }, 3000)
  }

  const value = {
    product,
    loading,
    error,
    selectedVariations,
    updateVariation,
    calculatePrice,
    formatPrice,
    currentImage,
    setCurrentImage,
    currency,
    toggleCurrency,
    cartItems,
    addToCart,
    notification,
    isVariationAvailable,
    validationErrors,
  }

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}

