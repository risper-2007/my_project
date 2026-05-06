import React, { useState } from 'react'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  const socials = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com',
      src: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg',
    },
    {
      name: 'X (Twitter)',
      href: 'https://www.x.com',
      src: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/X_icon_2.svg',
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com',
      src: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png',
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com',
      src: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png',
    },
  ]

  return (
    <footer style={{
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1208 50%, #0a0a0a 100%)',
      color: '#f5f0e8',
      padding: '60px 0 0',
      marginTop: '0',
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative top border */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, transparent, #c9a84c, #f5d98b, #c9a84c, transparent)',
      }} />

      {/* Decorative background pattern */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(201,168,76,0.04) 0%, transparent 50%),
                          radial-gradient(circle at 80% 20%, rgba(201,168,76,0.03) 0%, transparent 40%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px', position: 'relative' }}>

        {/* Brand mark */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div style={{
            display: 'inline-block',
            borderTop: '1px solid rgba(201,168,76,0.4)',
            borderBottom: '1px solid rgba(201,168,76,0.4)',
            padding: '12px 40px',
            letterSpacing: '0.35em',
            fontSize: '11px',
            textTransform: 'uppercase',
            color: '#c9a84c',
            fontFamily: "'Montserrat', 'Trebuchet MS', sans-serif",
            fontWeight: 300,
          }}>
            Wonder Luxe Tours & Travels
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr 1fr',
          gap: '60px',
          marginBottom: '60px',
        }}>

          {/* About Column */}
          <div>
            <h5 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '22px', fontWeight: 400,
              color: '#f5d98b', marginBottom: '20px', letterSpacing: '0.05em',
            }}>
              Our Philosophy
            </h5>
            <div style={{ width: '36px', height: '1px', background: 'linear-gradient(90deg, #c9a84c, transparent)', marginBottom: '20px' }} />
            <p style={{
              fontSize: '14px', lineHeight: '1.9',
              color: 'rgba(245,240,232,0.65)',
              fontFamily: "'Montserrat', 'Trebuchet MS', sans-serif",
              fontWeight: 300, letterSpacing: '0.02em', margin: 0,
            }}>
              Wonder Luxe positions itself as a brand that blends elegance with exploration — helping
              travelers discover beautiful destinations, enjoy refined experiences, and create
              unforgettable memories without the burden of planning.
            </p>
          </div>

          {/* Subscribe Column */}
          <div>
            <h5 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '22px', fontWeight: 400,
              color: '#f5d98b', marginBottom: '20px', letterSpacing: '0.05em',
            }}>
              Stay Inspired
            </h5>
            <div style={{ width: '36px', height: '1px', background: 'linear-gradient(90deg, #c9a84c, transparent)', marginBottom: '20px' }} />
            <p style={{
              fontSize: '13px', color: 'rgba(245,240,232,0.5)',
              fontFamily: "'Montserrat', 'Trebuchet MS', sans-serif",
              fontWeight: 300, marginBottom: '20px', lineHeight: '1.6',
            }}>
              Curated journeys and exclusive offers, delivered to your inbox.
            </p>
            {!subscribed ? (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(201,168,76,0.3)',
                    borderRadius: '2px', padding: '12px 16px',
                    color: '#f5f0e8',
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '13px', letterSpacing: '0.03em',
                    outline: 'none', transition: 'border-color 0.3s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.7)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.3)'}
                />
                <button
                  type="submit"
                  style={{
                    background: 'transparent',
                    border: '1px solid #c9a84c',
                    borderRadius: '2px', padding: '12px 16px',
                    color: '#c9a84c',
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '11px', fontWeight: 500,
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    cursor: 'pointer', transition: 'all 0.3s',
                  }}
                  onMouseEnter={e => { e.target.style.background = '#c9a84c'; e.target.style.color = '#0a0a0a' }}
                  onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#c9a84c' }}
                >
                  Subscribe
                </button>
              </form>
            ) : (
              <p style={{
                fontSize: '13px', color: '#c9a84c',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 300, letterSpacing: '0.05em', fontStyle: 'italic',
              }}>
                Thank you — welcome to the journey.
              </p>
            )}
          </div>

          {/* Social Column */}
          <div>
            <h5 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '22px', fontWeight: 400,
              color: '#f5d98b', marginBottom: '20px', letterSpacing: '0.05em',
            }}>
              Connect
            </h5>
            <div style={{ width: '36px', height: '1px', background: 'linear-gradient(90deg, #c9a84c, transparent)', marginBottom: '20px' }} />
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {socials.map(({ src, name, href }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '14px',
                      color: 'rgba(245,240,232,0.6)',
                      textDecoration: 'none',
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: '12px', fontWeight: 400,
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      transition: 'color 0.3s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,240,232,0.6)'}
                  >
                    <span style={{
                      width: '36px', height: '36px',
                      border: '1px solid rgba(201,168,76,0.2)',
                      borderRadius: '6px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                      background: 'rgba(255,255,255,0.04)',
                      overflow: 'hidden',
                      transition: 'border-color 0.3s, background 0.3s',
                    }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'
                        e.currentTarget.style.background = 'rgba(201,168,76,0.08)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'
                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                      }}
                    >
                      <img
                        src={src}
                        alt={name}
                        width="22"
                        height="22"
                        style={{ objectFit: 'contain' }}
                      />
                    </span>
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(201,168,76,0.15)',
          padding: '24px 0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '12px',
        }}>
          <small style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '11px', color: 'rgba(245,240,232,0.3)', letterSpacing: '0.08em',
          }}>
            © {new Date().getFullYear()} Wonder Luxe Tours and Travels. All rights reserved.
          </small>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Privacy Policy', 'Terms', 'Contact'].map(item => (
              <a key={item} href="#" style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '11px', color: 'rgba(245,240,232,0.3)',
                letterSpacing: '0.08em', textDecoration: 'none', transition: 'color 0.3s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,240,232,0.3)'}
              >
                {item}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer