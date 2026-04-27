const Footer = () => {
  // Automatically gets the current year
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container bg-dark">
      <div className="footer-content">
        <div className="footer-section">
          <div class="col-md-12 text-light ">
            <h4 class="text-center">About Us</h4>
            <p>At Cova, men’s fashion goes beyond the ordinary. We source globally, curating timeless essentials and
               standout pieces from the world’s leading brands - all tailored for the modern man in Kenya.
            </p>
             <p> Whether you’re powering through your workday, hitting the city at night, or keeping it laid back on the
               weekend, our collection makes sure your look works as hard as you do. It’s not just about clothes; it’s
               about confidence, presence, and the details that set you apart. </p>
            <p>With Cova, you don’t have to choose between comfort and style - you get both, crafted with international
               quality and delivered right here at home.</p>
            <p>Step into Cova and experience men’s fashion the way it should be: effortless, versatile, and undeniably
               you.</p>
         </div>
        </div>
        
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/contact">Contact</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Luxe Empire. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer ;