// API function to fetch product data
export const fetchProductData = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: "SR0160AQ",
          title: "Classic Aquamarine and Diamond Three Stone Engagement Ring",
          base_price: 237589,
          exclusive_offer: "Get 20% off on making charges",
          reviews: 7,
          images: [
            "https://dummyimage.com/500x500/000/fff",
            "https://dummyimage.com/100x100/000/fff",
            "https://dummyimage.com/100x100/000/fff",
            "https://dummyimage.com/100x100/000/fff",
          ],
          variations: {
            gemstone: ["Aquamarine", "Diamond", "Sapphire"],
            quality: ["Good", "Better", "Best", "Heirloom"],
            metal: ["White Gold", "Yellow Gold", "Rose Gold"],
            carat_weight: [1.5, 1.8, 2.0],
            ring_size: [6, 7, 8, 9, 10],
          },
          availability: {
            gemstone: {
              Aquamarine: true,
              Diamond: true,
              Sapphire: false,
            },
            quality: {
              Good: true,
              Better: true,
              Best: true,
              Heirloom: false,
            },
            metal: {
              "White Gold": true,
              "Yellow Gold": true,
              "Rose Gold": false,
            },
            carat_weight: {
              1.5: true,
              1.8: true,
              "2.0": false,
            },
            ring_size: {
              6: true,
              7: true,
              8: true,
              9: false,
              10: true,
            },
          },
          price_breakdown: {
            metal: { rate: 4567, weight: 3.87, value: 18528 },
            stones: [
              { type: "Aquamarine", carat: 1.12, value: 62748 },
              { type: "Diamond", carat: 0.46, value: 143175 },
            ],
            making_charges: 6218,
            subtotal: 230669,
            gst: 6920,
            grand_total: 237589,
          },
        })
      }, 500) 
    })
  }
  
  // function to fetch related products
  export const fetchRelatedProducts = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "SR0161DI",
            title: "Elegant Diamond Solitaire Ring",
            price_range: "₹180,000 - ₹250,000",
            image: "https://dummyimage.com/200x200/000/fff",
          },
          {
            id: "SR0162SA",
            title: "Sapphire Halo Engagement Ring",
            price_range: "₹220,000 - ₹300,000",
            image: "https://dummyimage.com/200x200/000/fff",
          },
          {
            id: "SR0163RU",
            title: "Ruby and Diamond Three Stone Ring",
            price_range: "₹190,000 - ₹270,000",
            image: "https://dummyimage.com/200x200/000/fff",
          },
          {
            id: "SR0164EM",
            title: "Emerald Cut Diamond Engagement Ring",
            price_range: "₹250,000 - ₹350,000",
            image: "https://dummyimage.com/200x200/000/fff",
          },
          {
            id: "SR0164EP",
            title: "Emerald Cut Diamond Engagement Ring",
            price_range: "₹250,000 - ₹350,000",
            image: "https://dummyimage.com/200x200/000/fff",
          },
          {
            id: "SR0164EK",
            title: "Emerald Cut Diamond Engagement Ring",
            price_range: "₹250,000 - ₹350,000",
            image: "https://dummyimage.com/200x200/000/fff",
          },
        ])
      }, 700)
    })
  }
  
  