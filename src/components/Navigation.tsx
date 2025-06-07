import { useState, useEffect, useRef } from 'react';
import { Search, User, ShoppingBag, X, Trash2, Plus, Minus, UserCircle, UserPlus, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SignInModal from './SignInModal';
import RegisterModal from './RegisterModal';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchIsClosing, setSearchIsClosing] = useState(false);
  
  const profileRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const searchModalRef = useRef<HTMLDivElement>(null);

  const { isAuthenticated, user, logout } = useAuth();

  // Mock cart items for demo - now with state for quantity updates
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "404 Hoodie", price: 89, qty: 1, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100&h=100&fit=crop" },
    { id: 2, name: "Glitch Tee", price: 45, qty: 2, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop" }
  ]);

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
      if (searchModalRef.current && !searchModalRef.current.contains(event.target as Node)) {
        handleCloseSearch();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle ESC key for search modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCloseSearch();
      }
    };

    if (isSearchOpen) {
      document.addEventListener('keydown', handleKeyDown);
      searchRef.current?.focus();
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  // Enhanced search modal close with animation
  const handleCloseSearch = () => {
    setSearchIsClosing(true);
    setTimeout(() => {
      setSearchIsClosing(false);
      setIsSearchOpen(false);
    }, 300);
  };

  // Cart functions
  const updateQuantity = (id: number, change: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, qty: Math.max(0, item.qty + change) }
          : item
      ).filter(item => item.qty > 0)
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const totalCartPrice = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border transition-all duration-300 ${isScrolled ? 'bg-white/95 border-gray-200' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/">
                <h1 className="text-2xl font-bold tracking-tight">
                  <span className="text-signal-red">404</span>
                  <span className={`transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white'}`}> FIT</span>
                </h1>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link to="/drops" className={`transition-colors duration-300 text-sm font-medium tracking-wider uppercase hover:text-neon-blue ${isScrolled ? 'text-gray-700 hover:text-neon-blue' : 'text-zinc-300 hover:text-neon-blue'}`}>
                  Drops
                </Link>
                <Link to="/shop" className={`transition-colors duration-300 text-sm font-medium tracking-wider uppercase hover:text-neon-blue ${isScrolled ? 'text-gray-700 hover:text-neon-blue' : 'text-zinc-300 hover:text-neon-blue'}`}>
                  Shop
                </Link>
                <Link to="/404-club" className={`transition-colors duration-300 text-sm font-medium tracking-wider uppercase hover:text-neon-blue ${isScrolled ? 'text-gray-700 hover:text-neon-blue' : 'text-zinc-300 hover:text-neon-blue'}`}>
                  404 Club
                </Link>
                <Link to="/about" className={`transition-colors duration-300 text-sm font-medium tracking-wider uppercase hover:text-neon-blue ${isScrolled ? 'text-gray-700 hover:text-neon-blue' : 'text-zinc-300 hover:text-neon-blue'}`}>
                  About
                </Link>
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
                  <div className="absolute top-full right-0 mt-2 w-48 bg-zinc-900 shadow-xl rounded-xl backdrop-blur-md p-3 space-y-2 z-50 border border-zinc-800 animate-fade-in">
                    {!isAuthenticated ? (
                      <>
                        <button 
                          onClick={() => {
                            setIsSignInOpen(true);
                            setIsProfileOpen(false);
                          }}
                          className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800 rounded-md transition-all duration-200 ease-in-out"
                        >
                          <UserCircle className="w-4 h-4" />
                          Sign In
                        </button>
                        <hr className="border-t border-zinc-700 my-1" />
                        <button 
                          onClick={() => {
                            setIsRegisterOpen(true);
                            setIsProfileOpen(false);
                          }}
                          className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-white hover:bg-zinc-800 rounded-md transition-all duration-200 ease-in-out"
                        >
                          <UserPlus className="w-4 h-4" />
                          Register
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="px-3 py-2 border-b border-zinc-700">
                          <p className="text-sm font-medium text-white">Hello, {user?.username}!</p>
                          <p className="text-xs text-zinc-400">{user?.email}</p>
                        </div>
                        <button className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-white hover:bg-zinc-800 rounded-md transition-all duration-200 ease-in-out">
                          <UserCircle className="w-4 h-4" />
                          My Profile
                        </button>
                        <button className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-white hover:bg-zinc-800 rounded-md transition-all duration-200 ease-in-out">
                          <Settings className="w-4 h-4" />
                          Settings
                        </button>
                        <hr className="border-t border-zinc-700 my-1" />
                        <button 
                          onClick={handleLogout}
                          className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-white hover:bg-zinc-800 rounded-md transition-all duration-200 ease-in-out"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </>
                    )}
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
                  <div className="absolute top-full right-0 mt-2 bg-white shadow-xl rounded-xl p-4 z-50 w-80 border border-gray-100 animate-fade-in">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Bag</h3>
                    
                    {cartItems.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">Your bag is empty</p>
                    ) : (
                      <>
                        <div className="space-y-3 max-h-60 overflow-y-auto">
                          {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                              <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <button 
                                    onClick={() => updateQuantity(item.id, -1)}
                                    className="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="text-xs font-medium min-w-[20px] text-center">{item.qty}</span>
                                  <button 
                                    onClick={() => updateQuantity(item.id, 1)}
                                    className="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 flex-shrink-0">
                                <p className="text-sm font-semibold text-gray-900">${item.price}</p>
                                <button 
                                  onClick={() => removeItem(item.id)}
                                  className="text-red-500 hover:text-red-700 transition-colors duration-200"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
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
                <Link to="/drops" className={`block px-3 py-2 transition-colors duration-300 text-sm font-medium tracking-wider uppercase hover:text-neon-blue ${isScrolled ? 'text-gray-700' : 'text-zinc-300'}`}>
                  Drops
                </Link>
                <Link to="/shop" className={`block px-3 py-2 transition-colors duration-300 text-sm font-medium tracking-wider uppercase hover:text-neon-blue ${isScrolled ? 'text-gray-700' : 'text-zinc-300'}`}>
                  Shop
                </Link>
                <Link to="/404-club" className={`block px-3 py-2 transition-colors duration-300 text-sm font-medium tracking-wider uppercase hover:text-neon-blue ${isScrolled ? 'text-gray-700' : 'text-zinc-300'}`}>
                  404 Club
                </Link>
                <Link to="/about" className={`block px-3 py-2 transition-colors duration-300 text-sm font-medium tracking-wider uppercase hover:text-neon-blue ${isScrolled ? 'text-gray-700' : 'text-zinc-300'}`}>
                  About
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Enhanced Search Modal with Better Animations */}
      {isSearchOpen && (
        <div className={`fixed inset-0 bg-black/60 backdrop-blur-lg flex items-start justify-center z-50 p-4 pt-[20vh] ${searchIsClosing ? 'animate-fade-out' : 'animate-fade-in'}`}>
          <div 
            ref={searchModalRef}
            className={`bg-zinc-950/90 backdrop-blur-xl shadow-2xl border border-zinc-800 rounded-2xl p-6 w-[90%] max-w-lg transform transition-all duration-300 ${searchIsClosing ? 'animate-slide-out-down' : 'animate-slide-in-up'}`}
          >
            <button
              onClick={handleCloseSearch}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="mb-6">
              <h2 className="text-white text-xl font-semibold mb-2">Search 404 Fit</h2>
              <p className="text-zinc-400 text-sm">Find your perfect streetwear piece</p>
            </div>
            
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500 w-5 h-5" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search hoodies, drop 001..."
                className="w-full pl-12 pr-4 py-3 rounded-full bg-zinc-800 text-white placeholder-zinc-500 border border-zinc-700 focus:border-signal-red focus:ring-2 focus:ring-signal-red focus:outline-none transition-all duration-200"
              />
            </div>
            
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full hover:bg-zinc-700 hover:text-white transition cursor-pointer">
                "hoodies"
              </span>
              <span className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full hover:bg-zinc-700 hover:text-white transition cursor-pointer">
                "drop 001"
              </span>
              <span className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full hover:bg-zinc-700 hover:text-white transition cursor-pointer">
                "streetwear"
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Sign In Modal */}
      <SignInModal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} />

      {/* Register Modal */}
      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </>
  );
};

export default Navigation;
