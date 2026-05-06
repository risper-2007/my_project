import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const slides = [
  {
    src: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1400&q=80',
    alt: 'Tropical beach destination',
    eyebrow: 'Discover the World',
    title: 'Breathtaking Horizons',
    subtitle: 'Where every journey begins with wonder and ends with memories that last a lifetime.',
  },
  {
    src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1400&q=80',
    alt: 'Mountain lake escape',
    eyebrow: 'Curated Escapes',
    title: 'Refined Experiences',
    subtitle: 'Handpicked destinations crafted for those who seek beauty beyond the ordinary.',
  },
  {
    src: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=1400&q=80',
    alt: 'Luxury resort pool',
    eyebrow: 'Travel in Style',
    title: 'Unforgettable Journeys',
    subtitle: "Let us guide you to the world's most extraordinary places in effortless elegance.",
  },
]

const Mycarousel = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500&display=swap');

        .hero-carousel-wrap {
          background: #0a0a0a;
          padding: 0;
          margin: 0;
        }

        .hero-carousel {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .carousel-slide-img {
          width: 100%;
          height: 620px;
          object-fit: cover;
          object-position: center;
          display: block;
          filter: brightness(0.72);
          transition: transform 8s ease, filter 0.6s ease;
        }

        .carousel-item.active .carousel-slide-img {
          transform: scale(1.04);
        }

        .slide-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(10,10,10,0.15) 0%,
            rgba(10,10,10,0.1) 40%,
            rgba(10,10,10,0.65) 80%,
            rgba(10,10,10,0.85) 100%
          );
          pointer-events: none;
        }

        .slide-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 0 8% 64px;
          text-align: left;
          z-index: 2;
        }

        .slide-eyebrow {
          display: inline-block;
          border-top: 1px solid rgba(201,168,76,0.5);
          border-bottom: 1px solid rgba(201,168,76,0.5);
          padding: 7px 20px;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #c9a84c;
          margin-bottom: 18px;
        }

        .slide-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(36px, 6vw, 68px);
          font-weight: 300;
          color: #f5f0e8;
          letter-spacing: 0.03em;
          line-height: 1.1;
          margin: 0 0 16px;
        }

        .slide-divider {
          width: 40px;
          height: 1px;
          background: linear-gradient(90deg, #c9a84c, transparent);
          margin: 16px 0;
        }

        .slide-subtitle {
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          font-weight: 300;
          color: rgba(245,240,232,0.65);
          letter-spacing: 0.04em;
          line-height: 1.7;
          max-width: 480px;
          margin: 0;
        }

        .hero-carousel .carousel-indicators {
          bottom: 28px;
          right: 8%;
          left: auto;
          margin: 0;
          gap: 8px;
          justify-content: flex-end;
        }

        .hero-carousel .carousel-indicators button {
          width: 28px;
          height: 2px;
          background: rgba(201,168,76,0.35);
          border: none;
          border-radius: 0;
          transition: background 0.3s, width 0.3s;
          opacity: 1;
        }

        .hero-carousel .carousel-indicators button.active {
          background: #c9a84c;
          width: 48px;
        }

        .hero-carousel .carousel-control-prev,
        .hero-carousel .carousel-control-next {
          width: 56px;
          height: 56px;
          top: 50%;
          transform: translateY(-50%);
          bottom: auto;
          background: rgba(201,168,76,0.08);
          border: 1px solid rgba(201,168,76,0.25);
          border-radius: 2px;
          opacity: 1;
          transition: background 0.3s, border-color 0.3s;
        }

        .hero-carousel .carousel-control-prev { left: 32px; }
        .hero-carousel .carousel-control-next { right: 32px; }

        .hero-carousel .carousel-control-prev:hover,
        .hero-carousel .carousel-control-next:hover {
          background: rgba(201,168,76,0.2);
          border-color: rgba(201,168,76,0.6);
        }

        .hero-carousel .carousel-control-prev-icon,
        .hero-carousel .carousel-control-next-icon {
          width: 18px;
          height: 18px;
          filter: brightness(0) saturate(100%) invert(73%) sepia(40%) saturate(500%) hue-rotate(5deg) brightness(95%);
        }

        .carousel-gold-rule {
          height: 2px;
          background: linear-gradient(90deg, transparent, #c9a84c, #f5d98b, #c9a84c, transparent);
        }

        @media (max-width: 768px) {
          .carousel-slide-img { height: 420px; }
          .slide-caption { padding: 0 6% 48px; }
          .hero-carousel .carousel-control-prev,
          .hero-carousel .carousel-control-next { display: none; }
        }
      `}</style>

      <div className="hero-carousel-wrap">
        <div
          id="carouselExample"
          className="carousel slide hero-carousel"
          data-bs-ride="carousel"
          data-bs-interval="5000"
        >
          {/* Indicators */}
          <div className="carousel-indicators">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide-to={i}
                className={i === 0 ? 'active' : ''}
                aria-current={i === 0 ? 'true' : undefined}
              />
            ))}
          </div>

          {/* Slides */}
          <div className="carousel-inner">
            {slides.map((slide, i) => (
              <div className={`carousel-item${i === 0 ? ' active' : ''}`} key={i}>
                <img
                  src={slide.src}
                  className="carousel-slide-img"
                  alt={slide.alt}
                />
                <div className="slide-overlay" />
                <div className="slide-caption">
                  <div className="slide-eyebrow">{slide.eyebrow}</div>
                  <h2 className="slide-title">{slide.title}</h2>
                  <div className="slide-divider" />
                  <p className="slide-subtitle">{slide.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <div className="carousel-gold-rule" />
      </div>
    </>
  )
}

export default Mycarousel