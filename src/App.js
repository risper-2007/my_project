import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Mycarousel from './components/Mycarousel';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Addproduct from './components/Addproduct';
import Getproduct from './components/Getproduct';
import Makepayment from './components/Makepayment';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';

const AdminRoute = ({ element }) => {
  const user = JSON.parse(localStorage.getItem("user"))
  const isAdmin = user?.is_admin == 1 || user?.is_admin === true || user?.is_admin === "true"  // ✅ fixed
  return isAdmin ? element : <Navigate to="/" replace />
}

const AppContent = () => {
  const location = useLocation()

  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")))
  const isAdmin = user?.is_admin == 1 || user?.is_admin === true || user?.is_admin === "true"  // ✅ fixed

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")))
  }, [location.pathname])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
  }

  const navLinks = [
    ...(!user ? [{ to: '/signup', label: 'Sign Up' }] : []),
    ...(!user ? [{ to: '/signin', label: 'Sign In' }] : []),
    ...(isAdmin ? [{ to: '/addproduct', label: 'Add Destination' }] : []),
    { to: '/', label: 'Destinations' },
  ]

  return (
    <div className="App">
      <header style={{
        background: 'linear-gradient(160deg, #1a1208 0%, #0d0d0d 100%)',
        padding: '28px 40px',
        textAlign: 'center',
        borderBottom: '1px solid rgba(201,168,76,0.2)',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #c9a84c, #f5d98b, #c9a84c, transparent)',
        }} />
        <div style={{
          display: 'inline-block',
          borderTop: '1px solid rgba(201,168,76,0.4)',
          borderBottom: '1px solid rgba(201,168,76,0.4)',
          padding: '6px 28px',
          letterSpacing: '0.35em',
          fontSize: '10px',
          textTransform: 'uppercase',
          color: '#c9a84c',
          fontFamily: "'Montserrat', 'Trebuchet MS', sans-serif",
          fontWeight: 400,
          marginBottom: '14px',
        }}>
          Est. in excellence
        </div>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(26px, 5vw, 52px)',
          fontWeight: 300,
          color: '#f5f0e8',
          margin: '0 0 4px',
          letterSpacing: '0.12em',
        }}>
          Wonder Luxe
        </h1>
        <p style={{
          fontFamily: "'Montserrat', 'Trebuchet MS', sans-serif",
          fontSize: '11px',
          fontWeight: 400,
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: '#c9a84c',
          margin: 0,
        }}>
          Tours &amp; Travels
        </p>
      </header>

      <nav style={{
        background: '#0d0d0d',
        borderBottom: '1px solid rgba(201,168,76,0.15)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
        padding: '0 20px',
      }}>
        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '11px',
              fontWeight: 400,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: location.pathname === to ? '#c9a84c' : 'rgba(245,240,232,0.55)',
              textDecoration: 'none',
              padding: '16px 20px',
              display: 'inline-block',
              borderBottom: location.pathname === to
                ? '2px solid #c9a84c'
                : '2px solid transparent',
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => {
              if (location.pathname !== to) {
                e.currentTarget.style.color = '#f5f0e8'
                e.currentTarget.style.borderBottomColor = 'rgba(201,168,76,0.3)'
              }
            }}
            onMouseLeave={e => {
              if (location.pathname !== to) {
                e.currentTarget.style.color = 'rgba(245,240,232,0.55)'
                e.currentTarget.style.borderBottomColor = 'transparent'
              }
            }}
          >
            {label}
          </Link>
        ))}

        {user && (
          <>
            <span style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '11px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#c9a84c',
              padding: '16px 20px',
            }}>
              {user.username}
            </span>
            <button
              onClick={handleLogout}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '11px',
                fontWeight: 400,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(245,240,232,0.55)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '16px 20px',
                borderBottom: '2px solid transparent',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#f5f0e8'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,240,232,0.55)'}
            >
              Logout
            </button>
          </>
        )}
      </nav>

      {location.pathname === '/' && <Mycarousel />}

      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin onLogin={setUser} />} />
        <Route path='/addproduct' element={<AdminRoute element={<Addproduct />} />} />
        <Route path='/' element={<Getproduct />} />
        <Route path='/makepayment' element={<Makepayment />} />
      </Routes>

      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Montserrat:wght@300;400;500&display=swap');
      `}</style>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App;