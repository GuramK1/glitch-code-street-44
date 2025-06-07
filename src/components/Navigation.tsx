
import { useState } from 'react';
import { Search, User, ShoppingBag } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="text-signal-red">404</span>
              <span className="text-white"> FIT</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#" className="text-zinc-300 hover:text-neon-blue transition-colors duration-300 text-sm font-medium tracking-wider uppercase">
                Drops
              </a>
              <a href="#" className="text-zinc-300 hover:text-neon-blue transition-colors duration-300 text-sm font-medium tracking-wider uppercase">
                Shop
              </a>
              <a href="#" className="text-zinc-300 hover:text-neon-blue transition-colors duration-300 text-sm font-medium tracking-wider uppercase">
                404 Club
              </a>
              <a href="#" className="text-zinc-300 hover:text-neon-blue transition-colors duration-300 text-sm font-medium tracking-wider uppercase">
                About
              </a>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Search className="w-5 h-5 text-zinc-300 hover:text-neon-blue cursor-pointer transition-all duration-300 hover:scale-110" />
            <User className="w-5 h-5 text-zinc-300 hover:text-neon-blue cursor-pointer transition-all duration-300 hover:scale-110" />
            <ShoppingBag className="w-5 h-5 text-zinc-300 hover:text-neon-blue cursor-pointer transition-all duration-300 hover:scale-110" />
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
                <span className={`block w-5 h-0.5 bg-zinc-300 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-zinc-300 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-zinc-300 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border">
              <a href="#" className="block px-3 py-2 text-zinc-300 hover:text-neon-blue transition-colors duration-300 text-sm font-medium tracking-wider uppercase">
                Drops
              </a>
              <a href="#" className="block px-3 py-2 text-zinc-300 hover:text-neon-blue transition-colors duration-300 text-sm font-medium tracking-wider uppercase">
                Shop
              </a>
              <a href="#" className="block px-3 py-2 text-zinc-300 hover:text-neon-blue transition-colors duration-300 text-sm font-medium tracking-wider uppercase">
                404 Club
              </a>
              <a href="#" className="block px-3 py-2 text-zinc-300 hover:text-neon-blue transition-colors duration-300 text-sm font-medium tracking-wider uppercase">
                About
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
