import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-heading">Shop</h3>
          <ul className="footer-links">
            <li>
              <a href="/collections">Collections</a>
            </li>
            <li>
              <a href="/new-arrivals">New Arrivals</a>
            </li>
            <li>
              <a href="/engagement">Engagement Rings</a>
            </li>
            <li>
              <a href="/wedding">Wedding Bands</a>
            </li>
            <li>
              <a href="/gifts">Gifts</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">About</h3>
          <ul className="footer-links">
            <li>
              <a href="/our-story">Our Story</a>
            </li>
            <li>
              <a href="/craftsmanship">Craftsmanship</a>
            </li>
            <li>
              <a href="/sustainability">Sustainability</a>
            </li>
            <li>
              <a href="/ethical-sourcing">Ethical Sourcing</a>
            </li>
            <li>
              <a href="/careers">Careers</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Customer Care</h3>
          <ul className="footer-links">
            <li>
              <a href="/contact">Contact Us</a>
            </li>
            <li>
              <a href="/shipping">Shipping & Returns</a>
            </li>
            <li>
              <a href="/warranty">Warranty</a>
            </li>
            <li>
              <a href="/ring-sizing">Ring Sizing</a>
            </li>
            <li>
              <a href="/faq">FAQ</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Stay Connected</h3>
          <p className="newsletter-text">Subscribe to receive updates, access to exclusive deals, and more.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email" className="newsletter-input" />
            <button className="newsletter-button">Subscribe</button>
          </div>
          <div className="social-links">
            <a href="https://instagram.com" aria-label="Instagram" className="social-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://facebook.com" aria-label="Facebook" className="social-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="https://pinterest.com" aria-label="Pinterest" className="social-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright">© {new Date().getFullYear()} Luxury Jewelry Co. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
          <a href="/accessibility">Accessibility</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

