import { ProductProvider } from "./context/ProductContext"
import ProductDetail from "./components/ProductDetail/ProductDetail"
import Header from "./components/common/Header"
import Footer from "./components/common/Footer"
import "./App.css"

function App() {
  return (
    <div className="app">
      <ProductProvider>
        <Header />
        <main>
          <ProductDetail />
        </main>
        <Footer />
      </ProductProvider>
    </div>
  )
}

export default App
