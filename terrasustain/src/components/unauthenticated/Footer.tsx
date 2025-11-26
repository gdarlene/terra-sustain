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
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-20">
        {/* Brand + Mission */}
        <div className="text-center sm:text-left">
          <h2 className="font-logo text-logo font-bold mb-2 sm:mb-3">TerraSustain</h2>
          <p className="text-gray-200 text-sm sm:text-base">
            Making the First Step to protecting Environmental Sustainability.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Quick Links</h3>
          <ul className="space-y-1 sm:space-y-2 text-gray-200 text-sm sm:text-base">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/about" className="hover:text-white transition">Community</a></li>
            <li><a href="/services" className="hover:text-white transition">Report Issue</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Our Services */}
        <div className="text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Our Services</h3>
          <ul className="space-y-1 sm:space-y-2 text-gray-200 text-sm sm:text-base">
            <li className="hover:text-white transition cursor-default">Community Engagement</li>
            <li className="hover:text-white transition cursor-default">Satellite image analysis</li>
            <li className="hover:text-white transition cursor-default">User Engagement</li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div className="text-center sm:text-left" id="contacts">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Contact Us</h3>
          <p className="text-gray-200 text-sm sm:text-base mb-1 sm:mb-2">Western Province, Kigali, Rwanda</p>
          <p className="text-gray-200 text-sm sm:text-base mb-1 sm:mb-2">infoterrasustain@inganji.com</p>
          <p className="text-gray-200 text-sm sm:text-base">+250 780 318 907</p>
          <div className="flex justify-center sm:justify-start flex-wrap gap-3 mt-3 sm:mt-4">
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
      <div className="relative z-10 border-t border-white/20 mt-8 sm:mt-10 pt-4 sm:pt-6 text-center text-xs sm:text-sm text-gray-300">
        <p>© {new Date().getFullYear()} TerraSustain. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;