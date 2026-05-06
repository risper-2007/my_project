import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const EyeOpen = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)

const EyeClosed = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
)

const Signup = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [focusedField, setFocusedField] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")
    try {
      const data = new FormData()
      data.append("username", username)
      data.append("email", email)
      data.append("password", password)
      data.append("phone", phone)
      const response = await axios.post("http://dumarisper.alwaysdata.net/api/signup", data)
      setLoading(false)
      setSuccess(response.data.success)
      setUsername("")
      setEmail("")
      setPassword("")
      setPhone("")
    } catch (err) {
      setLoading(false)
      setError(err.message || "Something went wrong. Please try again.")
    }
  }

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
      <div style={{ width: '100%', maxWidth: '440px' }}>

        {/* Brand header */}
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
            Wonder Luxe Tours & Travels
          </div>
          <h1 style={{
            fontSize: '40px',
            fontWeight: 300,
            color: '#1a1208',
            margin: '0 0 6px',
            letterSpacing: '0.06em',
          }}>
            Create Account
          </h1>
          <p style={{
            fontSize: '13px',
            color: '#4a4030',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 400,
            letterSpacing: '0.08em',
            margin: 0,
          }}>
            Begin your journey with us
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
          {/* Gold corner accents */}
          {[
            { top: -1, left: -1, borderTop: '2px solid #c9a84c', borderLeft: '2px solid #c9a84c' },
            { top: -1, right: -1, borderTop: '2px solid #c9a84c', borderRight: '2px solid #c9a84c' },
            { bottom: -1, left: -1, borderBottom: '2px solid #c9a84c', borderLeft: '2px solid #c9a84c' },
            { bottom: -1, right: -1, borderBottom: '2px solid #c9a84c', borderRight: '2px solid #c9a84c' },
          ].map((s, i) => (
            <div key={i} style={{ position: 'absolute', width: '18px', height: '18px', ...s }} />
          ))}

          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Success message */}
            {success && (
              <div style={{
                background: 'rgba(30,90,50,0.2)',
                border: '1px solid rgba(80,180,100,0.35)',
                borderRadius: '2px',
                padding: '12px 16px',
                color: '#7ee8a2',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '12px',
                letterSpacing: '0.04em',
              }}>
                {success}
              </div>
            )}

            {/* Error message */}
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

            {/* Username */}
            <div>
              <label style={labelStyle}>Username</label>
              <input
                type="text"
                placeholder="Your full name"
                value={username}
                onChange={e => setUsername(e.target.value)}
                onFocus={() => setFocusedField('username')}
                onBlur={() => setFocusedField(null)}
                required
                style={inputStyle('username')}
              />
            </div>

            {/* Email */}
            <div>
              <label style={labelStyle}>Email Address</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                required
                style={inputStyle('email')}
              />
            </div>

            {/* Password */}
            <div>
              <label style={labelStyle}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  required
                  style={{ ...inputStyle('password'), paddingRight: '48px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'rgba(201,168,76,0.5)',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(201,168,76,0.5)'}
                >
                  {showPassword ? <EyeClosed /> : <EyeOpen />}
                </button>
              </div>
            </div>

            {/* Phone */}
            <div>
              <label style={labelStyle}>Phone Number</label>
              <input
                type="tel"
                placeholder="+254 700 000 000"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField(null)}
                required
                style={inputStyle('phone')}
              />
            </div>

            {/* Submit */}
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
                  Creating your account...
                </>
              ) : 'Create Account'}
            </button>
          </form>
        </div>

        {/* Footer link */}
        <p style={{
          textAlign: 'center',
          marginTop: '24px',
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '12px',
          color: '#4a4030',
          letterSpacing: '0.05em',
        }}>
          Already have an account?{' '}
          <Link to="/signin" style={{
            color: '#6b521e',
            textDecoration: 'none',
            letterSpacing: '0.08em',
            borderBottom: '1px solid rgba(107,82,30,0.4)',
            paddingBottom: '1px',
            transition: 'border-color 0.2s, color 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderBottomColor = '#6b521e'; e.currentTarget.style.color = '#3d2e0a' }}
            onMouseLeave={e => { e.currentTarget.style.borderBottomColor = 'rgba(107,82,30,0.4)'; e.currentTarget.style.color = '#6b521e' }}
          >
            Sign in
          </Link>
        </p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Montserrat:wght@300;400;500&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: rgba(245,240,232,0.2); }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 100px #1a1208 inset !important;
          -webkit-text-fill-color: #f5f0e8 !important;
        }
      `}</style>
    </div>
  )
}

export default Signup