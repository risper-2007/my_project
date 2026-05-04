import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-4 pb-3 mt-5">
      <div className="container">
        <div className="row">
          
          {/* Left Column */}
          <div className="col-md-4 mb-3">
            <h5>About Us</h5>
            <p>
              Wonder Luxe Tours and Travels positions itself as a brand that blends elegance with exploration—helping travelers discover beautiful destinations, enjoy high-end experiences, and create unforgettable memories without the stress of planning every detail themselves.
            </p>
          </div>

          {/* Middle Column (Form) */}
          <div className="col-md-4 mb-3">
            <h5>Subscribe</h5>
            <form>
              <div className="mb-2">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>
              <button className="btn btn-primary w-100">
                Subscribe
              </button>
            </form>
          </div>

          {/* Right Column (Social Links) */}
          <div className="col-md-4 mb-3">
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li>
               <a href="#" className="text-light text-decoration-none d-flex align-items-center gap-2">
                <img
                 src="/projectphotos/facebook.webp"
                 height="20"
                 width="20"
                 alt="Facebook"
                 />
                <span>Facebook</span>
               </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none d-flex align-items-center gap-2">
                  <img
                    src="/projectphotos/x.webp"
                    height="20"
                    width="20"
                    alt="X"
                  />
                  <span>X</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none d-flex align-items-center gap-2">
                  <img
                    src="/projectphotos/instagram.png"
                    height="20"
                    width="20"
                    alt="Instagram"
                  />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none d-flex align-items-center gap-2">
                  <img
                    src="/projectphotos/linkedin.webp"
                    height="20"
                    width="20"
                    alt="LinkedIn"
                  />
                  <span>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="text-center pt-3 border-top">
          <small>© Wonder Luxe tours and travels. All rights reserved.</small>
        </div>
      </div>
    </footer>
  )
}

export default Footer