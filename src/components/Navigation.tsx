
import { useState, useEffect, useRef } from 'react';
import { Search, User, ShoppingBag, X } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const profileRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Mock cart items for demo
  const cartItems = [
    { id: 1, name: "404 Hoodie", price: 89, qty: 1, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100&h=100&fit=crop" },
    { id: 2, name: "Glitch Tee", price: 45, qty: 2, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop" }
  ];

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle ESC key for search modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener('keydown', handleKeyDown);
      searchRef.current?.focus();
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const totalCartPrice = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border transition-all duration-300 ${isScrolled ? 'bg-white/95 border-gray-200' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold tracking-tight">
                <span className="text-signal-red">404</span>
                <span className={`transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white'}`}> FIT</span>
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#" className={`transition-colors duration-300 text-sm font-medium tracking-wider uppercase hover:text-neon-blue ${isScrolled ? 'text-gray-700 hover:text-neon-blue' : 'text-zinc-300 hover:text-neon-blue'}`}>
                  Drops
                </a>
                <a href="#" className={`transition-colors duration-300 text-sm font-medium tracking-wider uppercase hover:text-neon-blue ${isScrolled ? 'text-gray-700 hover:text-neon-blue' : 'text-zinc-300 hover:text-neon-blue'}`}>
                  Shop
                </a>
                <a href="#" className={`transition-colors duration-300 text-sm font-medium tracking-wider uppercase hover:text-neon-blue ${isScrolled ? 'text-gray-700 hover:text-neon-blue' : 'text-zinc-300 hover:text-neon-blue'}`}>
                  404 Club
                </a>
                <a href="#" className={`transition-colors duration-300 text-sm font-medium tracking-wider uppercase hover:text-neon-blue ${isScrolled ? 'text-gray-700 hover:text-neon-blue' : 'text-zinc-300 hover:text-neon-blue'}`}>
                  About
                </a>
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <button 
                onClick={() => setIsSearchOpen(true)}
                className={`w-5 h-5 transition-all duration-300 hover:scale-110 ${isScrolled ? 'text-gray-700 hover:text-neon-blue' : 'text-zinc-300 hover:text-neon-blue'}`}
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Profile Dropdown */}
              <div ref={profileRef} className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`w-5 h-5 transition-all duration-300 hover:scale-110 ${isScrolled ? 'text-gray-700 hover:text-neon-blue' : 'text-zinc-300 hover:text-neon-blue'}`}
                >
                  <User className="w-5 h-5" />
                </button>
                
                {isProfileOpen && (
                  <div className="absolute top-full right-0 mt-2 bg-white shadow-xl rounded-xl p-4 space-y-2 z-50 min-w-[150px] border border-gray-100">
                    <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-sm font-medium">
                      Sign In
                    </button>
                    <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-sm font-medium">
                      Register
                    </button>
                  </div>
                )}
              </div>

              {/* Cart Dropdown */}
              <div ref={cartRef} className="relative">
                <button 
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className={`w-5 h-5 transition-all duration-300 hover:scale-110 relative ${isScrolled ? 'text-gray-700 hover:text-neon-blue' : 'text-zinc-300 hover:text-neon-blue'}`}
                >
                  <ShoppingBag className="w-5 h-5" />
                  {totalCartItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-signal-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {totalCartItems}
                    </span>
                  )}
                </button>

                {isCartOpen && (
                  <div className="absolute top-full right-0 mt-2 bg-white shadow-xl rounded-xl p-4 z-50 w-80 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Bag</h3>
                    
                    {cartItems.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">Your bag is empty</p>
                    ) : (
                      <>
                        <div className="space-y-3 max-h-60 overflow-y-auto">
                          {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                              <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                              </div>
                              <p className="text-sm font-semibold text-gray-900">${item.price}</p>
                            </div>
                          ))}
                        </div>
                        
                        <div className="border-t border-gray-200 pt-4 mt-4">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-medium text-gray-900">Total:</span>
                            <span className="text-lg font-bold text-gray-900">${totalCartPrice}</span>
                          </div>
                          <button className="w-full bg-signal-red text-white py-3 rounded-xl font-semibold hover:bg-signal-red/90 transition-colors duration-200">
                            Checkout
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
              
              {/* Mobile menu button */}
              <button 
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
                  <span className={`block w-5 h-0.5 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''} ${isScrolled ? 'bg-gray-700' : 'bg-zinc-300'}`}></span>
                  <span className={`block w-5 h-0.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''} ${isScrolled ? 'bg-gray-700' : 'bg-zinc-300'}`}></span>
                  <span className={`block w-5 h-0.5 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''} ${isScrolled ? 'bg-gray-700' : 'bg-zinc-300'}`}></span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border bg-background/95 backdrop-blur-sm">
                <a href="#" className={`block px-3 py-2 transition-colors duration-300 text-sm font-medium tracking-wider uppercase hover:text-neon-blue ${isScrolled ? 'text-gray-700' : 'text-zinc-300'}`}>
                  Drops
                </a>
                <a href="#" className={`block px-3 py-2 transition-colors duration-300 text-sm font-medium tracking-wider uppercase hover:text-neon-blue ${isScrolled ? 'text-gray-700' : 'text-zinc-300'}`}>
                  Shop
                </a>
                <a href="#" className={`block px-3 py-2 transition-colors duration-300 text-sm font-medium tracking-wider uppercase hover:text-neon-blue ${isScrolled ? 'text-gray-700' : 'text-zinc-300'}`}>
                  404 Club
                </a>
                <a href="#" className={`block px-3 py-2 transition-colors duration-300 text-sm font-medium tracking-wider uppercase hover:text-neon-blue ${isScrolled ? 'text-gray-700' : 'text-zinc-300'}`}>
                  About
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative">
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Search 404 Fit</h2>
              <p className="text-gray-500">Find your perfect streetwear piece</p>
            </div>
            
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search products, collections..."
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neon-blue focus:border-transparent"
              />
            </div>
            
            <div className="mt-6 text-sm text-gray-500">
              <p>Try: "hoodies", "drop 001", "streetwear"</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
