import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Addproduct = () => {
  const [productname, setProductname] = useState("")
  const [description, setDescription] = useState("")
  const [cost, setCost] = useState("")
  const [productphoto, setProductphoto] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [photoName, setPhotoName] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user")
      if (!storedUser) { navigate("/"); return }
      const user = JSON.parse(storedUser)
      const admin = user?.is_admin == 1 || user?.is_admin === true || user?.is_admin === "true"
      if (!admin) { navigate("/") } else { setIsAdmin(true) }
    } catch {
      navigate("/")
    }
  }, [navigate])

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")
    try {
      const user = JSON.parse(localStorage.getItem("user"))
      const formData = new FormData()
      formData.append("product_name", productname)
      formData.append("product_description", description)
      formData.append("product_cost", cost)
      formData.append("product_photo", productphoto)
      formData.append("email", user?.email)
      const response = await axios.post("http://dumarisper.alwaysdata.net/api/add_product", formData)
      setSuccess(response.data.message)
      setProductname("")
      setDescription("")
      setCost("")
      setProductphoto(null)
      setPhotoName("")
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  if (!isAdmin) return null

  const inputStyle = (field) => ({
    width: '100%',
    background: focusedField === field ? 'rgba(201,168,76,0.04)' : 'rgba(255,255,255,0.03)',
    border: `1px solid ${focusedField === field ? 'rgba(201,168,76,0.7)' : 'rgba(201,168,76,0.2)'}`,
    borderRadius: '2px',
    padding: '14px 18px',
    color: '#f5f0e8',
    fontFamily: "'Montserrat', 'Trebuchet MS', sans-serif",
    fontSize: '13px',
    letterSpacing: '0.03em',
    outline: 'none',
    transition: 'border-color 0.3s, background 0.3s',
    boxSizing: 'border-box',
  })

  const labelStyle = {
    display: 'block',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '10px',
    fontWeight: 500,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: '#c9a84c',
    marginBottom: '8px',
  }

  const corners = [
    { top: -1, left: -1, borderTop: '2px solid #c9a84c', borderLeft: '2px solid #c9a84c' },
    { top: -1, right: -1, borderTop: '2px solid #c9a84c', borderRight: '2px solid #c9a84c' },
    { bottom: -1, left: -1, borderBottom: '2px solid #c9a84c', borderLeft: '2px solid #c9a84c' },
    { bottom: -1, right: -1, borderBottom: '2px solid #c9a84c', borderRight: '2px solid #c9a84c' },
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      padding: '40px 20px',
    }}>
      <div style={{ width: '100%', maxWidth: '500px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            display: 'inline-block',
            borderTop: '1px solid rgba(201,168,76,0.5)',
            borderBottom: '1px solid rgba(201,168,76,0.5)',
            padding: '10px 32px',
            letterSpacing: '0.35em',
            fontSize: '10px',
            textTransform: 'uppercase',
            color: '#6b521e',
            fontFamily: "'Montserrat', 'Trebuchet MS', sans-serif",
            fontWeight: 500,
            marginBottom: '22px',
          }}>
            Admin Panel
          </div>
          <h1 style={{
            fontSize: '40px',
            fontWeight: 300,
            color: '#1a1208',
            margin: '0 0 6px',
            letterSpacing: '0.06em',
          }}>
            Add Destination
          </h1>
          <p style={{
            fontSize: '13px',
            color: '#4a4030',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 400,
            letterSpacing: '0.08em',
            margin: 0,
          }}>
            Curate a new luxury experience
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'linear-gradient(160deg, #1a1208 0%, #0d0d0d 100%)',
          border: '1px solid rgba(201,168,76,0.2)',
          borderRadius: '4px',
          padding: '40px',
          position: 'relative',
          boxShadow: '0 24px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(201,168,76,0.06)',
        }}>

          {/* Corner accents */}
          {corners.map((s, i) => (
            <div key={i} style={{ position: 'absolute', width: '18px', height: '18px', ...s }} />
          ))}

          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Success */}
            {success && (
              <div style={{
                background: 'rgba(76,168,100,0.1)',
                border: '1px solid rgba(76,168,100,0.3)',
                borderRadius: '2px',
                padding: '12px 16px',
                color: '#80e8a0',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '12px',
                letterSpacing: '0.04em',
              }}>
                ✓ {success}
              </div>
            )}

            {/* Error */}
            {error && (
              <div style={{
                background: 'rgba(183,55,55,0.1)',
                border: '1px solid rgba(183,55,55,0.3)',
                borderRadius: '2px',
                padding: '12px 16px',
                color: '#e88080',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '12px',
                letterSpacing: '0.04em',
              }}>
                {error}
              </div>
            )}

            {/* Destination Name */}
            <div>
              <label style={labelStyle}>Destination Name</label>
              <input
                type="text"
                placeholder="e.g. Santorini, Greece"
                value={productname}
                onChange={e => setProductname(e.target.value)}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                required
                style={inputStyle('name')}
              />
            </div>

            {/* Description */}
            <div>
              <label style={labelStyle}>Description</label>
              <textarea
                placeholder="Describe this luxury destination..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                onFocus={() => setFocusedField('description')}
                onBlur={() => setFocusedField(null)}
                required
                rows={4}
                style={{
                  ...inputStyle('description'),
                  resize: 'vertical',
                  minHeight: '110px',
                  lineHeight: '1.6',
                }}
              />
            </div>

            {/* Cost */}
            <div>
              <label style={labelStyle}>Cost (KES)</label>
              <input
                type="number"
                placeholder="e.g. 250000"
                value={cost}
                onChange={e => setCost(e.target.value)}
                onFocus={() => setFocusedField('cost')}
                onBlur={() => setFocusedField(null)}
                required
                style={inputStyle('cost')}
              />
            </div>

            {/* Photo Upload */}
            <div>
              <label style={labelStyle}>Destination Photo</label>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                border: `1px solid ${focusedField === 'photo' ? 'rgba(201,168,76,0.7)' : 'rgba(201,168,76,0.2)'}`,
                borderRadius: '2px',
                padding: '14px 18px',
                cursor: 'pointer',
                background: 'rgba(255,255,255,0.03)',
                transition: 'border-color 0.3s',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'}
              >
                {/* Upload icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 16 12 12 8 16"/>
                  <line x1="12" y1="12" x2="12" y2="21"/>
                  <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
                </svg>
                <span style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '12px',
                  color: photoName ? '#f5f0e8' : 'rgba(245,240,232,0.3)',
                  letterSpacing: '0.04em',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {photoName || "Choose a photo..."}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={e => {
                    setProductphoto(e.target.files[0])
                    setPhotoName(e.target.files[0]?.name || "")
                  }}
                  style={{ display: 'none' }}
                />
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: '8px',
                background: loading ? 'rgba(201,168,76,0.15)' : 'transparent',
                border: '1px solid #c9a84c',
                borderRadius: '2px',
                padding: '15px',
                color: loading ? 'rgba(201,168,76,0.5)' : '#c9a84c',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                width: '100%',
              }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = '#c9a84c'; e.currentTarget.style.color = '#0a0a0a' }}}
              onMouseLeave={e => { if (!loading) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#c9a84c' }}}
            >
              {loading ? (
                <>
                  <span style={{
                    width: '14px', height: '14px',
                    border: '1px solid rgba(201,168,76,0.3)',
                    borderTopColor: '#c9a84c',
                    borderRadius: '50%',
                    display: 'inline-block',
                    animation: 'spin 0.8s linear infinite',
                  }} />
                  Uploading...
                </>
              ) : 'Add Destination'}
            </button>

          </form>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Montserrat:wght@300;400;500&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input::placeholder, textarea::placeholder { color: rgba(245,240,232,0.2); }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 100px #1a1208 inset !important;
          -webkit-text-fill-color: #f5f0e8 !important;
        }
        textarea { font-family: 'Montserrat', 'Trebuchet MS', sans-serif; }
      `}</style>
    </div>
  )
}

export default Addproduct