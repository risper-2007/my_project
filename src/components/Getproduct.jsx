import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Getproduct = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [products, setProducts] = useState([])
  const [selectedDate, setSelectedDate] = useState({})
  const [openCalendar, setOpenCalendar] = useState(null)
  const [currentMonth, setCurrentMonth] = useState({})
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

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const getMonthData = (productId) => {
    return currentMonth[productId] || new Date(today.getFullYear(), today.getMonth(), 1)
  }

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay()

  const prevMonth = (productId) => {
    const d = getMonthData(productId)
    const newD = new Date(d.getFullYear(), d.getMonth() - 1, 1)
    if (newD >= new Date(today.getFullYear(), today.getMonth(), 1)) {
      setCurrentMonth(prev => ({ ...prev, [productId]: newD }))
    }
  }

  const nextMonth = (productId) => {
    const d = getMonthData(productId)
    setCurrentMonth(prev => ({
      ...prev,
      [productId]: new Date(d.getFullYear(), d.getMonth() + 1, 1)
    }))
  }

  const selectDate = (productId, date) => {
    setSelectedDate(prev => ({ ...prev, [productId]: date }))
    setOpenCalendar(null)
  }

  const formatDate = (date) => {
    if (!date) return null
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  const MONTH_NAMES = ['January','February','March','April','May','June',
    'July','August','September','October','November','December']
  const DAY_NAMES = ['Su','Mo','Tu','We','Th','Fr','Sa']

  const renderCalendar = (productId) => {
    const base = getMonthData(productId)
    const year = base.getFullYear()
    const month = base.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)
    const isCurrentMonth = year === today.getFullYear() && month === today.getMonth()
    const chosen = selectedDate[productId]

    const cells = []
    for (let i = 0; i < firstDay; i++) cells.push(null)
    for (let d = 1; d <= daysInMonth; d++) cells.push(d)

    return (
      <div className="calendar-dropdown" onClick={e => e.stopPropagation()}>
        <div className="calendar-nav">
          <button className="cal-nav-btn" onClick={() => prevMonth(productId)} disabled={isCurrentMonth}>&#8249;</button>
          <span className="cal-month-label">{MONTH_NAMES[month]} {year}</span>
          <button className="cal-nav-btn" onClick={() => nextMonth(productId)}>&#8250;</button>
        </div>
        <div className="calendar-grid">
          {DAY_NAMES.map(d => (
            <div key={d} className="cal-day-name">{d}</div>
          ))}
          {cells.map((day, idx) => {
            if (!day) return <div key={`e-${idx}`} />
            const thisDate = new Date(year, month, day)
            const isPast = thisDate < today
            const isSelected = chosen &&
              chosen.getDate() === day &&
              chosen.getMonth() === month &&
              chosen.getFullYear() === year
            const isToday = thisDate.getTime() === today.getTime()

            return (
              <button
                key={day}
                className={`cal-day${isPast ? ' cal-day--past' : ''}${isSelected ? ' cal-day--selected' : ''}${isToday ? ' cal-day--today' : ''}`}
                onClick={() => !isPast && selectDate(productId, thisDate)}
                disabled={isPast}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

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

        /* KEY FIX: overflow visible so calendar is not clipped */
        .destination-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(201,168,76,0.12);
          border-radius: 2px;
          overflow: visible;
          display: flex;
          flex-direction: column;
          transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      box-shadow 0.35s ease,
                      border-color 0.35s ease;
          animation: fadeUp 0.5s ease both;
          position: relative;
        }

        .destination-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 56px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.25);
          border-color: rgba(201,168,76,0.3);
          overflow: visible;
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

        /* Image overflow hidden stays here, not on the card */
        .card-image-wrap {
          position: relative;
          overflow: hidden;
          height: 210px;
          border-radius: 2px 2px 0 0;
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
          background: rgba(255,255,255,0.02);
          border-radius: 0 0 2px 2px;
          position: relative;
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

        /* KEY FIX: z-index so calendar layers above other cards */
        .date-picker-wrap {
          position: relative;
          margin-top: 4px;
          z-index: 10;
        }

        .date-trigger {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 2px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          transition: border-color 0.3s ease, background 0.3s ease;
          gap: 8px;
          box-sizing: border-box;
        }

        .date-trigger:hover {
          border-color: rgba(201,168,76,0.45);
          background: rgba(201,168,76,0.04);
        }

        .date-trigger-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(201,168,76,0.65);
          font-weight: 300;
        }

        .date-trigger-value {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 400;
          color: #f5d98b;
          letter-spacing: 0.05em;
          white-space: nowrap;
          flex: 1;
          text-align: right;
          padding-right: 8px;
        }

        .date-trigger-icon {
          width: 14px;
          height: 14px;
          flex-shrink: 0;
          opacity: 0.5;
        }

        /* KEY FIX: fixed width dropdown that escapes card bounds */
        .calendar-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          width: 260px;
          z-index: 9999;
          background: #111008;
          border: 1px solid rgba(201,168,76,0.3);
          border-radius: 2px;
          padding: 18px 16px 16px;
          box-shadow: 0 20px 48px rgba(0,0,0,0.85), 0 0 0 1px rgba(201,168,76,0.08);
          animation: calDrop 0.2s ease both;
        }

        @keyframes calDrop {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .calendar-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .cal-nav-btn {
          background: transparent;
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 2px;
          color: #c9a84c;
          width: 26px;
          height: 26px;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          line-height: 1;
        }

        .cal-nav-btn:hover:not(:disabled) {
          background: rgba(201,168,76,0.1);
          border-color: rgba(201,168,76,0.4);
        }

        .cal-nav-btn:disabled {
          opacity: 0.25;
          cursor: not-allowed;
        }

        .cal-month-label {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 15px;
          font-weight: 400;
          color: #f5d98b;
          letter-spacing: 0.08em;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 3px;
        }

        .cal-day-name {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          font-weight: 400;
          letter-spacing: 0.1em;
          color: rgba(201,168,76,0.45);
          text-align: center;
          padding-bottom: 6px;
          text-transform: uppercase;
        }

        .cal-day {
          background: transparent;
          border: 1px solid transparent;
          border-radius: 2px;
          color: rgba(245,240,232,0.75);
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 300;
          padding: 5px 2px;
          text-align: center;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
          line-height: 1;
        }

        .cal-day:hover:not(:disabled) {
          background: rgba(201,168,76,0.1);
          border-color: rgba(201,168,76,0.25);
          color: #f5d98b;
        }

        .cal-day--today {
          border-color: rgba(201,168,76,0.35) !important;
          color: #c9a84c !important;
        }

        .cal-day--selected {
          background: #c9a84c !important;
          border-color: #c9a84c !important;
          color: #0a0a0a !important;
          font-weight: 500 !important;
        }

        .cal-day--past {
          opacity: 0.2;
          cursor: not-allowed;
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
          transition: background 0.3s ease, color 0.3s ease, opacity 0.3s ease;
          white-space: nowrap;
        }

        .book-btn:hover:not(:disabled) {
          background: #c9a84c;
          color: #0a0a0a;
        }

        .book-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        .book-btn-hint {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.2);
          text-align: right;
          margin-top: 6px;
          font-weight: 300;
        }
      `}</style>

      <section
        className="destinations-section"
        onClick={() => setOpenCalendar(null)}
      >
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
              {products.map((product) => {
                const pid = product.id || product.product_name
                const chosenDate = selectedDate[pid]

                return (
                  <div className="destination-card" key={pid}>
                    <div className="card-image-wrap">
                      <img src={img_url + product.product_photo} alt={product.product_name} />
                      <div className="card-image-overlay" />
                    </div>

                    <div className="card-body">
                      <h5 className="card-name">{product.product_name}</h5>
                      <p className="card-description">{product.product_description}</p>

                      <div className="date-picker-wrap">
                        <div
                          className="date-trigger"
                          onClick={(e) => {
                            e.stopPropagation()
                            setOpenCalendar(openCalendar === pid ? null : pid)
                          }}
                        >
                          <span className="date-trigger-label">
                            {chosenDate ? 'Travel Date' : 'Select Date'}
                          </span>
                          {chosenDate && (
                            <span className="date-trigger-value">{formatDate(chosenDate)}</span>
                          )}
                          <svg className="date-trigger-icon" viewBox="0 0 16 16" fill="none">
                            <rect x="1" y="3" width="14" height="12" rx="1" stroke="#c9a84c" strokeWidth="1.2"/>
                            <path d="M1 7h14" stroke="#c9a84c" strokeWidth="1.2"/>
                            <path d="M5 1v4M11 1v4" stroke="#c9a84c" strokeWidth="1.2" strokeLinecap="round"/>
                          </svg>
                        </div>

                        {openCalendar === pid && renderCalendar(pid)}
                      </div>

                      <div className="card-footer">
                        <div>
                          <div className="card-price-label">From</div>
                          <div className="card-price-value">
                            <span className="card-price-currency">Ksh</span>
                            {Number(product.product_cost).toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <button
                            className="book-btn"
                            disabled={!chosenDate}
                            onClick={() => navigate('/makepayment', {
                              state: { product, travelDate: chosenDate?.toISOString() }
                            })}
                          >
                            Book Now
                          </button>
                          {!chosenDate && (
                            <div className="book-btn-hint">Choose a date first</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

        </div>
      </section>
    </>
  )
}

export default Getproduct