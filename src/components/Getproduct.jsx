import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Getproduct = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [products, setProducts] = useState([])
  const img_url = "http://dumarisper.alwaysdata.net/static/images/"
  const navigate = useNavigate()

  const getproducts = async () => {
    setLoading(true)
    try {
      const response = await axios.get("http://dumarisper.alwaysdata.net/api/get_product_details")
      setProducts(response.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getproducts()
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500&display=swap');

        .destinations-section {
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1208 50%, #0a0a0a 100%);
          min-height: 100vh;
          padding: 70px 40px 80px;
          position: relative;
          overflow: hidden;
        }

        .destinations-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle at 20% 50%, rgba(201,168,76,0.04) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(201,168,76,0.03) 0%, transparent 40%);
          pointer-events: none;
        }

        .destinations-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
        }

        .destinations-header {
          text-align: center;
          margin-bottom: 56px;
        }

        .destinations-brandmark {
          display: inline-block;
          border-top: 1px solid rgba(201,168,76,0.4);
          border-bottom: 1px solid rgba(201,168,76,0.4);
          padding: 10px 36px;
          letter-spacing: 0.35em;
          font-size: 11px;
          text-transform: uppercase;
          color: #c9a84c;
          font-family: 'Montserrat', 'Trebuchet MS', sans-serif;
          font-weight: 300;
          margin-bottom: 28px;
        }

        .destinations-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(34px, 5vw, 52px);
          font-weight: 400;
          color: #f5d98b;
          letter-spacing: 0.05em;
          margin: 0 0 18px;
          line-height: 1.15;
        }

        .destinations-title em {
          font-style: italic;
          color: #f5f0e8;
        }

        .destinations-divider {
          width: 36px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #c9a84c, transparent);
          margin: 0 auto;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 80px 0;
          color: rgba(245,240,232,0.35);
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 300;
        }

        .loading-spinner {
          width: 34px;
          height: 34px;
          border: 1px solid rgba(201,168,76,0.2);
          border-top-color: #c9a84c;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .error-banner {
          background: rgba(220,80,80,0.06);
          border: 1px solid rgba(220,80,80,0.2);
          color: rgba(245,150,150,0.8);
          text-align: center;
          padding: 20px 32px;
          border-radius: 2px;
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          letter-spacing: 0.05em;
          font-weight: 300;
          max-width: 480px;
          margin: 60px auto;
        }

        .destinations-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(272px, 1fr));
          gap: 28px;
        }

        .destination-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(201,168,76,0.12);
          border-radius: 2px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      box-shadow 0.35s ease,
                      border-color 0.35s ease;
          animation: fadeUp 0.5s ease both;
        }

        .destination-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 56px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.25);
          border-color: rgba(201,168,76,0.3);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .destination-card:nth-child(2) { animation-delay: 0.07s; }
        .destination-card:nth-child(3) { animation-delay: 0.14s; }
        .destination-card:nth-child(4) { animation-delay: 0.21s; }
        .destination-card:nth-child(5) { animation-delay: 0.28s; }
        .destination-card:nth-child(6) { animation-delay: 0.35s; }
        .destination-card:nth-child(7) { animation-delay: 0.42s; }
        .destination-card:nth-child(8) { animation-delay: 0.49s; }

        .card-image-wrap {
          position: relative;
          overflow: hidden;
          height: 210px;
        }

        .card-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .destination-card:hover .card-image-wrap img {
          transform: scale(1.06);
        }

        .card-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 45%, rgba(10,8,5,0.85) 100%);
        }

        .card-body {
          padding: 22px 24px 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 8px;
        }

        .card-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 22px;
          font-weight: 400;
          color: #f5d98b;
          margin: 0;
          line-height: 1.2;
          letter-spacing: 0.03em;
        }

        .card-description {
          font-family: 'Montserrat', 'Trebuchet MS', sans-serif;
          font-size: 13px;
          font-weight: 300;
          color: rgba(245,240,232,0.55);
          line-height: 1.75;
          margin: 0;
          flex: 1;
          letter-spacing: 0.02em;
        }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 18px;
          padding-top: 18px;
          border-top: 1px solid rgba(201,168,76,0.15);
        }

        .card-price-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.3);
          margin-bottom: 3px;
          font-weight: 300;
        }

        .card-price-value {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 24px;
          font-weight: 600;
          color: #c9a84c;
          line-height: 1;
          letter-spacing: 0.02em;
        }

        .card-price-currency {
          font-size: 14px;
          font-weight: 400;
          margin-right: 2px;
        }

        .book-btn {
          background: transparent;
          border: 1px solid #c9a84c;
          border-radius: 2px;
          padding: 10px 20px;
          color: #c9a84c;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.3s ease, color 0.3s ease;
          white-space: nowrap;
        }

        .book-btn:hover {
          background: #c9a84c;
          color: #0a0a0a;
        }
      `}</style>

      <section className="destinations-section">
        <div className="destinations-inner">

          <div className="destinations-header">
            <div className="destinations-brandmark">Wonder Luxe Tours &amp; Travels</div>
            <h2 className="destinations-title">Available <em>Destinations</em></h2>
            <div className="destinations-divider" />
          </div>

          {loading && (
            <div className="loading-container">
              <div className="loading-spinner" />
              <span>Curating destinations</span>
            </div>
          )}

          {error && !loading && (
            <div className="error-banner">
              Unable to load destinations — {error}
            </div>
          )}

          {!loading && !error && (
            <div className="destinations-grid">
              {products.map((product) => (
                <div className="destination-card" key={product.id || product.product_name}>
                  <div className="card-image-wrap">
                    <img src={img_url + product.product_photo} alt={product.product_name} />
                    <div className="card-image-overlay" />
                  </div>

                  <div className="card-body">
                    <h5 className="card-name">{product.product_name}</h5>
                    <p className="card-description">{product.product_description}</p>

                    <div className="card-footer">
                      <div>
                        <div className="card-price-label">From</div>
                        <div className="card-price-value">
                          <span className="card-price-currency">Ksh</span>
                          {Number(product.product_cost).toLocaleString()}
                        </div>
                      </div>
                      <button
                        className="book-btn"
                        onClick={() => navigate('/makepayment', { state: { product } })}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  )
}

export default Getproduct