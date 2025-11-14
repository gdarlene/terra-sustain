import React from "react";
const Footer: React.FC = () => {
  return (
    <footer className="relative py-12 text-white overflow-hidden" id="footer">
      {/* Background Image with Blur Overlay */}
      <div 
        className="absolute inset-0 bg-footer-bg bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/images/sustain-earth.png")' }}
      />
      <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 md:gap-20">
        {/* Brand + Mission */}
        <div>
          <h2 className="font-logo text-logo font-bold mb-3">TerraSustain</h2>
          <p className="text-gray-200">
            Making the First Step to protecting Environmental Sustainability.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-200">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/about" className="hover:text-white transition">Community</a></li>
            <li><a href="/services" className="hover:text-white transition">Report Issue</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Our Services */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Our Services</h3>
          <ul className="space-y-2 text-gray-200">
            <li className="hover:text-white transition cursor-default">Community Engagement</li>
            <li className="hover:text-white transition cursor-default">Satellite image analysis</li>
            <li className="hover:text-white transition cursor-default">User Engagement</li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div id="contacts">
          <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
          <p className="text-gray-200 mb-2">Western Province, Kigali, Rwanda</p>
          <p className="text-gray-200 mb-2">infoterrasustain@inganji.com</p>
          <p className="text-gray-200">+250 780 318 907</p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="text-white hover:scale-110 transition">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-white hover:scale-110 transition">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-white hover:scale-110 transition">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-white/20 mt-10 pt-6 text-center text-sm text-gray-300">
        <p>© {new Date().getFullYear()} TerraSustain. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;