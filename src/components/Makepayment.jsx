import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Makepayment = () => {
  const { product } = useLocation().state || {}
  const img_url = "http://dumarisper.alwaysdata.net/static/images/"
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (!user) {
      navigate("/signup", { state: { redirect: "/payment", product } })
    }
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    setMessage("please wait as we process...")
    setError("")
    try {
      const data = new FormData()
      data.append("phone", phone)
      data.append("amount", product.product_cost)
      const response = await axios.post("http://dumarisper.alwaysdata.net/api/mpesa_payment", data)
      setMessage(response.data.message)
    } catch (err) {
      setMessage("")
      setError(err.message)
    }
  }

  const user = localStorage.getItem("user")
  if (!user) return null

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500&display=swap');

        .payment-section {
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1208 50%, #0a0a0a 100%);
          min-height: 100vh;
          padding: 70px 24px 80px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .payment-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle at 20% 50%, rgba(201,168,76,0.04) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(201,168,76,0.03) 0%, transparent 40%);
          pointer-events: none;
        }

        .payment-inner {
          max-width: 880px;
          width: 100%;
          position: relative;
          z-index: 1;
        }

        /* Header */
        .payment-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .payment-brandmark {
          display: inline-block;
          border-top: 1px solid rgba(201,168,76,0.4);
          border-bottom: 1px solid rgba(201,168,76,0.4);
          padding: 10px 36px;
          letter-spacing: 0.35em;
          font-size: 11px;
          text-transform: uppercase;
          color: #c9a84c;
          font-family: 'Montserrat', sans-serif;
          font-weight: 300;
          margin-bottom: 24px;
        }

        .payment-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(30px, 4vw, 46px);
          font-weight: 400;
          color: #f5d98b;
          letter-spacing: 0.05em;
          margin: 0 0 16px;
          line-height: 1.15;
        }

        .payment-title em {
          font-style: italic;
          color: #f5f0e8;
        }

        .payment-divider {
          width: 36px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #c9a84c, transparent);
          margin: 0 auto;
        }

        /* Card layout */
        .payment-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border: 1px solid rgba(201,168,76,0.15);
          border-radius: 2px;
          overflow: hidden;
          background: rgba(255,255,255,0.02);
          animation: fadeUp 0.5s ease both;
        }

        @media (max-width: 640px) {
          .payment-card {
            grid-template-columns: 1fr;
          }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Left — product summary */
        .payment-product {
          position: relative;
          overflow: hidden;
        }

        .payment-product-img {
          width: 100%;
          height: 100%;
          min-height: 260px;
          object-fit: cover;
          display: block;
          transition: transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .payment-product:hover .payment-product-img {
          transform: scale(1.04);
        }

        .payment-product-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10,8,5,0.92) 0%, rgba(10,8,5,0.3) 60%, transparent 100%);
        }

        .payment-product-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 28px 28px 32px;
        }

        .product-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #c9a84c;
          font-weight: 300;
          margin-bottom: 8px;
        }

        .product-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 26px;
          font-weight: 400;
          color: #f5d98b;
          margin: 0 0 10px;
          line-height: 1.2;
          letter-spacing: 0.03em;
        }

        .product-description {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          font-weight: 300;
          color: rgba(245,240,232,0.5);
          line-height: 1.75;
          margin: 0 0 20px;
          letter-spacing: 0.02em;
        }

        .product-price-row {
          display: flex;
          align-items: flex-end;
          gap: 6px;
          padding-top: 16px;
          border-top: 1px solid rgba(201,168,76,0.2);
        }

        .product-price-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.3);
          font-weight: 300;
          margin-bottom: 2px;
        }

        .product-price-value {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 28px;
          font-weight: 600;
          color: #c9a84c;
          line-height: 1;
          letter-spacing: 0.02em;
        }

        .product-price-currency {
          font-size: 15px;
          font-weight: 400;
          margin-right: 2px;
        }

        /* Right — payment form */
        .payment-form-side {
          padding: 40px 36px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-left: 1px solid rgba(201,168,76,0.1);
        }

        @media (max-width: 640px) {
          .payment-form-side {
            border-left: none;
            border-top: 1px solid rgba(201,168,76,0.1);
            padding: 32px 24px;
          }
        }

        .form-heading {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 22px;
          font-weight: 400;
          color: #f5d98b;
          margin: 0 0 6px;
          letter-spacing: 0.04em;
        }

        .form-sub {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 300;
          color: rgba(245,240,232,0.35);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 32px;
        }

        .form-field {
          margin-bottom: 20px;
        }

        .form-field label {
          display: block;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(201,168,76,0.7);
          font-weight: 300;
          margin-bottom: 8px;
        }

        .form-field input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 2px;
          padding: 12px 16px;
          color: #f5f0e8;
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          font-weight: 300;
          letter-spacing: 0.05em;
          outline: none;
          transition: border-color 0.3s ease, background 0.3s ease;
          box-sizing: border-box;
        }

        .form-field input::placeholder {
          color: rgba(245,240,232,0.2);
        }

        .form-field input:focus {
          border-color: rgba(201,168,76,0.55);
          background: rgba(201,168,76,0.04);
        }

        .pay-btn {
          width: 100%;
          background: transparent;
          border: 1px solid #c9a84c;
          border-radius: 2px;
          padding: 14px 20px;
          color: #c9a84c;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.3s ease, color 0.3s ease;
          margin-top: 8px;
        }

        .pay-btn:hover {
          background: #c9a84c;
          color: #0a0a0a;
        }

        .pay-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        /* Feedback messages */
        .feedback-message {
          margin-top: 18px;
          padding: 12px 16px;
          border-radius: 2px;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          font-weight: 300;
          letter-spacing: 0.05em;
          line-height: 1.6;
        }

        .feedback-message.info {
          background: rgba(201,168,76,0.06);
          border: 1px solid rgba(201,168,76,0.2);
          color: rgba(245,215,130,0.8);
        }

        .feedback-message.error {
          background: rgba(220,80,80,0.06);
          border: 1px solid rgba(220,80,80,0.2);
          color: rgba(245,150,150,0.8);
        }

        /* Mpesa badge */
        .mpesa-note {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid rgba(201,168,76,0.1);
        }

        .mpesa-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4caf76;
          flex-shrink: 0;
        }

        .mpesa-text {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 300;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.25);
        }
      `}</style>

      <section className="payment-section">
        <div className="payment-inner">

          <div className="payment-header">
            <div className="payment-brandmark">Wonder Luxe Tours &amp; Travels</div>
            <h2 className="payment-title">Complete Your <em>Booking</em></h2>
            <div className="payment-divider" />
          </div>

          <div className="payment-card">

            {/* Left: Product Summary */}
            <div className="payment-product">
              <img
                className="payment-product-img"
                src={img_url + product?.product_photo}
                alt={product?.product_name}
              />
              <div className="payment-product-overlay" />
              <div className="payment-product-info">
                <div className="product-label">Selected Destination</div>
                <h3 className="product-name">{product?.product_name}</h3>
                <p className="product-description">{product?.product_description}</p>
                <div className="product-price-row">
                  <div>
                    <div className="product-price-label">Total Amount</div>
                    <div className="product-price-value">
                      <span className="product-price-currency">Ksh</span>
                      {Number(product?.product_cost).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Payment Form */}
            <div className="payment-form-side">
              <h4 className="form-heading">M-Pesa Payment</h4>
              <p className="form-sub">Secure mobile checkout</p>

              <form onSubmit={submit}>
                <div className="form-field">
                  <label htmlFor="phone">M-Pesa Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="2547XXXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="pay-btn"
                  disabled={!!message && message.includes("please wait")}
                >
                  Confirm &amp; Pay
                </button>
              </form>

              {message && (
                <div className="feedback-message info">{message}</div>
              )}
              {error && (
                <div className="feedback-message error">{error}</div>
              )}

              <div className="mpesa-note">
                <div className="mpesa-dot" />
                <span className="mpesa-text">Powered by Safaricom M-Pesa</span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default Makepayment