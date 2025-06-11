
import { Link } from 'react-router-dom';
import { Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  // Handle smooth scroll to top on navigation
  const handleNavClick = () => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="bg-jet-black border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-bold mb-4 text-white">
              <span className="text-signal-red">404</span>
              <span className="text-white"> FIT</span>
            </h2>
            <p className="text-zinc-400 mb-6 max-w-md">
              Not found in the ordinary. Born in the glitch, styled by the streets. 
              Join the movement that's redefining streetwear culture.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/404fit" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="bg-white p-2 w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity duration-200 hover:scale-110 transform"
              >
                <Instagram className="w-6 h-6 text-black" />
              </a>
              <a 
                href="https://twitter.com/404fit" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow us on Twitter"
                className="bg-white p-2 w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity duration-200 hover:scale-110 transform"
              >
                <Twitter className="w-6 h-6 text-black" />
              </a>
              <a 
                href="https://tiktok.com/@404fit" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow us on TikTok"
                className="bg-white p-2 w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity duration-200 hover:scale-110 transform"
              >
                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold tracking-widest uppercase mb-4 text-white">Shop</h3>
            <ul className="space-y-3">
              <li><Link to="/drops" onClick={handleNavClick} className="text-zinc-400 hover:text-white transition-colors duration-300 cursor-pointer">New Drops</Link></li>
              <li><Link to="/shop?category=hoodies" onClick={handleNavClick} className="text-zinc-400 hover:text-white transition-colors duration-300 cursor-pointer">Hoodies</Link></li>
              <li><Link to="/shop?category=tees" onClick={handleNavClick} className="text-zinc-400 hover:text-white transition-colors duration-300 cursor-pointer">Tees</Link></li>
              <li><Link to="/shop?category=bottoms" onClick={handleNavClick} className="text-zinc-400 hover:text-white transition-colors duration-300 cursor-pointer">Bottoms</Link></li>
              <li><Link to="/shop?category=accessories" onClick={handleNavClick} className="text-zinc-400 hover:text-white transition-colors duration-300 cursor-pointer">Accessories</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold tracking-widest uppercase mb-4 text-white">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/size-guide" onClick={handleNavClick} className="text-zinc-400 hover:text-white transition-colors duration-300 cursor-pointer">Size Guide</Link></li>
              <li><Link to="/shipping" onClick={handleNavClick} className="text-zinc-400 hover:text-white transition-colors duration-300 cursor-pointer">Shipping</Link></li>
              <li><Link to="/returns" onClick={handleNavClick} className="text-zinc-400 hover:text-white transition-colors duration-300 cursor-pointer">Returns</Link></li>
              <li><Link to="/contact" onClick={handleNavClick} className="text-zinc-400 hover:text-white transition-colors duration-300 cursor-pointer">Contact</Link></li>
              <li><Link to="/faq" onClick={handleNavClick} className="text-zinc-400 hover:text-white transition-colors duration-300 cursor-pointer">FAQ</Link></li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-white">Stay in the Loop</h3>
              <p className="text-zinc-400">Get early access to drops, exclusive content, and member-only perks.</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="bg-carbon-grey border border-border px-4 py-3 text-white placeholder-zinc-400 flex-1 md:w-80 focus:outline-none focus:border-neon-blue transition-colors duration-300 rounded-l-xl"
              />
              <button className="bg-signal-red text-white px-6 py-3 font-semibold hover:bg-signal-red/90 transition-colors duration-300 rounded-r-xl hover:scale-105">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-400 text-sm">
            © 2024 404 Fit. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link to="/privacy-policy" onClick={handleNavClick} className="text-zinc-400 hover:text-white transition-colors duration-300 cursor-pointer">Privacy Policy</Link>
            <Link to="/terms-of-service" onClick={handleNavClick} className="text-zinc-400 hover:text-white transition-colors duration-300 cursor-pointer">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
