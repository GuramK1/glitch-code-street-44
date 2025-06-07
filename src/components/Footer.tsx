
const Footer = () => {
  return (
    <footer className="bg-jet-black border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-signal-red">404</span>
              <span className="text-foreground"> FIT</span>
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Not found in the ordinary. Born in the glitch, styled by the streets. 
              Join the movement that's redefining streetwear culture.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-carbon-grey hover:bg-signal-red cursor-pointer transition-colors duration-300 flex items-center justify-center">
                <span className="text-sm font-bold">IG</span>
              </div>
              <div className="w-10 h-10 bg-carbon-grey hover:bg-neon-blue hover:text-black cursor-pointer transition-colors duration-300 flex items-center justify-center">
                <span className="text-sm font-bold">TW</span>
              </div>
              <div className="w-10 h-10 bg-carbon-grey hover:bg-signal-red cursor-pointer transition-colors duration-300 flex items-center justify-center">
                <span className="text-sm font-bold">TK</span>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold tracking-widest uppercase mb-4">Shop</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">New Drops</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">Hoodies</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">Tees</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">Bottoms</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">Accessories</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold tracking-widest uppercase mb-4">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">Size Guide</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">Shipping</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">Returns</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">Contact</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">FAQ</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Stay in the Loop</h3>
              <p className="text-muted-foreground">Get early access to drops, exclusive content, and member-only perks.</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="bg-carbon-grey border border-border px-4 py-3 text-foreground placeholder-muted-foreground flex-1 md:w-80 focus:outline-none focus:border-neon-blue transition-colors duration-300"
              />
              <button className="bg-signal-red text-foreground px-6 py-3 font-semibold hover:bg-signal-red/90 transition-colors duration-300">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 404 Fit. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
