
const Footer = () => {
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
              <div className="w-10 h-10 bg-carbon-grey hover:bg-signal-red cursor-pointer transition-all duration-300 flex items-center justify-center rounded-xl hover:scale-110">
                <span className="text-sm font-bold text-white">IG</span>
              </div>
              <div className="w-10 h-10 bg-carbon-grey hover:bg-neon-blue hover:text-black cursor-pointer transition-all duration-300 flex items-center justify-center rounded-xl hover:scale-110">
                <span className="text-sm font-bold text-white">TW</span>
              </div>
              <div className="w-10 h-10 bg-carbon-grey hover:bg-signal-red cursor-pointer transition-all duration-300 flex items-center justify-center rounded-xl hover:scale-110">
                <span className="text-sm font-bold text-white">TK</span>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold tracking-widest uppercase mb-4 text-white">Shop</h3>
            <ul className="space-y-3">
              <li><a href="/drops" className="text-zinc-400 hover:text-white transition-colors duration-300 cursor-pointer">New Drops</a></li>
              <li><a href="/shop" className="text-zinc-400 hover:text-white transition-colors duration-300 cursor-pointer">Hoodies</a></li>
              <li><a href="/shop" className="text-zinc-400 hover:text-white transition-colors duration-300 cursor-pointer">Tees</a></li>
              <li><a href="/shop" className="text-zinc-400 hover:text-white transition-colors duration-300 cursor-pointer">Bottoms</a></li>
              <li><a href="/shop" className="text-zinc-400 hover:text-white transition-colors duration-300 cursor-pointer">Accessories</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold tracking-widest uppercase mb-4 text-white">Support</h3>
            <ul className="space-y-3">
              <li><a href="/size-guide" className="text-zinc-400 hover:text-white transition-colors duration-300 cursor-pointer">Size Guide</a></li>
              <li><a href="/shipping" className="text-zinc-400 hover:text-white transition-colors duration-300 cursor-pointer">Shipping</a></li>
              <li><a href="/returns" className="text-zinc-400 hover:text-white transition-colors duration-300 cursor-pointer">Returns</a></li>
              <li><a href="/contact" className="text-zinc-400 hover:text-white transition-colors duration-300 cursor-pointer">Contact</a></li>
              <li><a href="/faq" className="text-zinc-400 hover:text-white transition-colors duration-300 cursor-pointer">FAQ</a></li>
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
            <a href="#" className="text-zinc-400 hover:text-white transition-colors duration-300 cursor-pointer">Privacy Policy</a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors duration-300 cursor-pointer">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
