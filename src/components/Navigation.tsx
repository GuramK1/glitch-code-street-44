import { useState, useEffect, useRef } from 'react';
import { Search, User, ShoppingBag, X, Trash2, Plus, Minus, UserCircle, UserPlus, Settings, LogOut, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useWishlist } from '../contexts/WishlistContext';
import SignInModal from './SignInModal';
import RegisterModal from './RegisterModal';
import GlitchText from './GlitchText';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchIsClosing, setSearchIsClosing] = useState(false);
  
  const profileRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const wishlistRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const searchModalRef = useRef<HTMLDivElement>(null);

  const { isAuthenticated, user, logout } = useAuth();
  const { wishlist } = useWishlist();

  // Mock cart items for demo - now with state for quantity updates
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "404 Hoodie", price: 89, qty: 1, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100&h=100&fit=crop" },
    { id: 2, name: "Glitch Tee", price: 45, qty: 2, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop" }
  ]);

  // Mock wishlist items for display
  const mockWishlistItems = [
    { id: 1, name: "404 Hoodie", price: 89, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100&h=100&fit=crop" },
    { id: 2, name: "Glitch Tee", price: 45, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop" },
    { id: 3, name: "Street Jacket", price: 129, image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=100&h=100&fit=crop" }
  ];

  // Enhanced scroll effect for premium feel
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 80;
      setIsScrolled(scrolled);
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
      if (wishlistRef.current && !wishlistRef.current.contains(event.target as Node)) {
        setIsWishlistOpen(false);
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

  const handleWishlistClick = () => {
    setIsWishlistOpen(!isWishlistOpen);
    setIsProfileOpen(false);
    setIsCartOpen(false);
  };

  const handleWishlistFromProfile = () => {
    if (window.location.pathname === '/profile') {
      const wishlistSection = document.getElementById('wishlist-section');
      if (wishlistSection) {
        wishlistSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = '/profile#wishlist-section';
    }
    setIsProfileOpen(false);
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const totalCartPrice = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled 
          ? 'bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/60 py-2 shadow-2xl' 
          : 'bg-zinc-950/95 backdrop-blur-sm border-b border-zinc-800 py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between h-12 transition-all duration-500 ${isScrolled ? 'transform scale-95' : ''}`}>
            <div className="flex-shrink-0">
              <Link to="/">
                <h1 className="text-2xl font-bold tracking-tight">
                  <GlitchText text="404" className="text-signal-red" />
                  <span className="text-white"> FIT</span>
                </h1>
              </Link>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link 
                  to="/drops" 
                  className="premium-nav-link group relative text-white transition-all duration-300 text-sm font-medium tracking-wider uppercase cursor-pointer hover:scale-105"
                >
                  <span className="relative z-10 transition-all duration-300 group-hover:translate-x-[1px] group-hover:skew-x-1 group-hover:text-white">
                    Drops
                  </span>
                  {/* Slide-in border hover */}
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-signal-red transition-all duration-300 group-hover:w-full"></span>
                  {/* Masked fill reveal */}
                  <span className="absolute inset-0 bg-signal-red transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 -z-10"></span>
                  {/* Slide-out duplicate text */}
                  <span className="absolute inset-0 text-signal-red opacity-0 transition-all duration-300 group-hover:opacity-30 group-hover:-translate-y-1">
                    Drops
                  </span>
                </Link>
                <Link 
                  to="/shop" 
                  className="premium-nav-link group relative text-white transition-all duration-300 text-sm font-medium tracking-wider uppercase cursor-pointer hover:scale-105"
                >
                  <span className="relative z-10 transition-all duration-300 group-hover:translate-x-[1px] group-hover:skew-x-1 group-hover:text-white">
                    Shop
                  </span>
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-signal-red transition-all duration-300 group-hover:w-full"></span>
                  <span className="absolute inset-0 bg-signal-red transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 -z-10"></span>
                  <span className="absolute inset-0 text-signal-red opacity-0 transition-all duration-300 group-hover:opacity-30 group-hover:-translate-y-1">
                    Shop
                  </span>
                </Link>
                <Link 
                  to="/404-club" 
                  className="premium-nav-link group relative text-white transition-all duration-300 text-sm font-medium tracking-wider uppercase cursor-pointer hover:scale-105"
                >
                  <span className="relative z-10 transition-all duration-300 group-hover:translate-x-[1px] group-hover:skew-x-1 group-hover:text-white">
                    404 Club
                  </span>
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-signal-red transition-all duration-300 group-hover:w-full"></span>
                  <span className="absolute inset-0 bg-signal-red transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 -z-10"></span>
                  <span className="absolute inset-0 text-signal-red opacity-0 transition-all duration-300 group-hover:opacity-30 group-hover:-translate-y-1">
                    404 Club
                  </span>
                </Link>
                <Link 
                  to="/about" 
                  className="premium-nav-link group relative text-white transition-all duration-300 text-sm font-medium tracking-wider uppercase cursor-pointer hover:scale-105"
                >
                  <span className="relative z-10 transition-all duration-300 group-hover:translate-x-[1px] group-hover:skew-x-1 group-hover:text-white">
                    About
                  </span>
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-signal-red transition-all duration-300 group-hover:w-full"></span>
                  <span className="absolute inset-0 bg-signal-red transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 -z-10"></span>
                  <span className="absolute inset-0 text-signal-red opacity-0 transition-all duration-300 group-hover:opacity-30 group-hover:-translate-y-1">
                    About
                  </span>
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div ref={wishlistRef} className="relative">
                <button 
                  onClick={handleWishlistClick}
                  className="w-6 h-6 flex items-center justify-center text-white hover:text-signal-red transition-all duration-300 hover:scale-110 active:scale-95 relative"
                >
                  <Heart className="w-5 h-5" />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-signal-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {wishlist.length}
                    </span>
                  )}
                </button>

                {isWishlistOpen && (
                  <div className="absolute top-full right-0 mt-2 bg-zinc-900 shadow-xl rounded-xl p-4 z-50 w-80 border border-zinc-700 animate-fade-in">
                    <h3 className="text-lg font-semibold text-white mb-4">Your Wishlist</h3>
                    
                    {wishlist.length === 0 ? (
                      <p className="text-zinc-400 text-center py-4">No items in your wishlist yet</p>
                    ) : (
                      <>
                        <div className="space-y-3 max-h-60 overflow-y-auto">
                          {mockWishlistItems.slice(0, wishlist.length).map((item) => (
                            <div key={item.id} className="flex items-center space-x-3 p-2 hover:bg-zinc-800 rounded-lg">
                              <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">{item.name}</p>
                                <p className="text-xs text-zinc-400">${item.price}</p>
                              </div>
                              <button 
                                onClick={() => {/* Remove from wishlist logic */}}
                                className="text-signal-red hover:text-red-400 transition-colors duration-200"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                        
                        <div className="border-t border-zinc-700 pt-4 mt-4">
                          <Link 
                            to="/profile#wishlist-section"
                            onClick={() => setIsWishlistOpen(false)}
                            className="w-full bg-signal-red text-white py-3 rounded-xl font-semibold hover:bg-signal-red/90 transition-colors duration-200 text-center block"
                          >
                            View All Items
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              <button 
                onClick={() => setIsSearchOpen(true)}
                className="w-6 h-6 flex items-center justify-center text-white hover:text-signal-red transition-all duration-300 hover:scale-110 active:scale-95"
              >
                <Search className="w-5 h-5" />
              </button>

              <div ref={profileRef} className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-6 h-6 flex items-center justify-center text-white hover:text-signal-red transition-all duration-300 hover:scale-110 active:scale-95"
                >
                  <User className="w-5 h-5" />
                </button>
                
                {isProfileOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-zinc-900 shadow-xl rounded-xl backdrop-blur-md p-3 space-y-2 z-50 border border-zinc-700 animate-fade-in">
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
                        <Link 
                          to="/profile"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-white hover:bg-zinc-800 rounded-md transition-all duration-200 ease-in-out"
                        >
                          <UserCircle className="w-4 h-4" />
                          My Profile
                        </Link>
                        <Link 
                          to="/profile#wishlist-section"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-white hover:bg-zinc-800 rounded-md transition-all duration-200 ease-in-out"
                        >
                          <Heart className="w-4 h-4" />
                          Wishlist ({wishlist.length})
                        </Link>
                        <Link 
                          to="/settings"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-white hover:bg-zinc-800 rounded-md transition-all duration-200 ease-in-out"
                        >
                          <Settings className="w-4 h-4" />
                          Settings
                        </Link>
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

              <div ref={cartRef} className="relative">
                <button 
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="w-6 h-6 flex items-center justify-center text-white hover:text-signal-red transition-all duration-300 hover:scale-110 active:scale-95 relative"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {totalCartItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-signal-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {totalCartItems}
                    </span>
                  )}
                </button>

                {isCartOpen && (
                  <div className="absolute top-full right-0 mt-2 bg-zinc-900 shadow-xl rounded-xl p-4 z-50 w-80 border border-zinc-700 animate-fade-in">
                    <h3 className="text-lg font-semibold text-white mb-4">Your Bag</h3>
                    
                    {cartItems.length === 0 ? (
                      <p className="text-zinc-400 text-center py-4">Your bag is empty</p>
                    ) : (
                      <>
                        <div className="space-y-3 max-h-60 overflow-y-auto">
                          {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center space-x-3 p-2 hover:bg-zinc-800 rounded-lg">
                              <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">{item.name}</p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <button 
                                    onClick={() => updateQuantity(item.id, -1)}
                                    className="w-6 h-6 bg-zinc-700 rounded hover:bg-zinc-600 transition-colors duration-200 flex items-center justify-center text-white"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="text-xs font-medium min-w-[20px] text-center text-white">{item.qty}</span>
                                  <button 
                                    onClick={() => updateQuantity(item.id, 1)}
                                    className="w-6 h-6 bg-zinc-700 rounded hover:bg-zinc-600 transition-colors duration-200 flex items-center justify-center text-white"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 flex-shrink-0">
                                <p className="text-sm font-semibold text-white">${item.price}</p>
                                <button 
                                  onClick={() => removeItem(item.id)}
                                  className="text-signal-red hover:text-red-400 transition-colors duration-200"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="border-t border-zinc-700 pt-4 mt-4">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-medium text-white">Total:</span>
                            <span className="text-lg font-bold text-white">${totalCartPrice}</span>
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
              
              <button 
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
                  <span className={`block w-5 h-0.5 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''} bg-white`}></span>
                  <span className={`block w-5 h-0.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''} bg-white`}></span>
                  <span className={`block w-5 h-0.5 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''} bg-white`}></span>
                </div>
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-sm">
                <Link 
                  to="/drops" 
                  className="premium-nav-link group relative block px-3 py-2 text-white transition-all duration-300 text-sm font-medium tracking-wider uppercase hover:scale-105 cursor-pointer"
                >
                  <span className="relative z-10 transition-all duration-300 group-hover:translate-x-[1px] group-hover:skew-x-1 group-hover:text-white">
                    Drops
                  </span>
                  <span className="absolute bottom-0 left-3 w-0 h-0.5 bg-signal-red transition-all duration-300 group-hover:w-12"></span>
                  <span className="absolute inset-0 bg-signal-red transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 -z-10 mx-3 rounded"></span>
                </Link>
                <Link 
                  to="/shop" 
                  className="premium-nav-link group relative block px-3 py-2 text-white transition-all duration-300 text-sm font-medium tracking-wider uppercase hover:scale-105 cursor-pointer"
                >
                  <span className="relative z-10 transition-all duration-300 group-hover:translate-x-[1px] group-hover:skew-x-1 group-hover:text-white">
                    Shop
                  </span>
                  <span className="absolute bottom-0 left-3 w-0 h-0.5 bg-signal-red transition-all duration-300 group-hover:w-12"></span>
                  <span className="absolute inset-0 bg-signal-red transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 -z-10 mx-3 rounded"></span>
                </Link>
                <Link 
                  to="/404-club" 
                  className="premium-nav-link group relative block px-3 py-2 text-white transition-all duration-300 text-sm font-medium tracking-wider uppercase hover:scale-105 cursor-pointer"
                >
                  <span className="relative z-10 transition-all duration-300 group-hover:translate-x-[1px] group-hover:skew-x-1 group-hover:text-white">
                    404 Club
                  </span>
                  <span className="absolute bottom-0 left-3 w-0 h-0.5 bg-signal-red transition-all duration-300 group-hover:w-12"></span>
                  <span className="absolute inset-0 bg-signal-red transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 -z-10 mx-3 rounded"></span>
                </Link>
                <Link 
                  to="/about" 
                  className="premium-nav-link group relative block px-3 py-2 text-white transition-all duration-300 text-sm font-medium tracking-wider uppercase hover:scale-105 cursor-pointer"
                >
                  <span className="relative z-10 transition-all duration-300 group-hover:translate-x-[1px] group-hover:skew-x-1 group-hover:text-white">
                    About
                  </span>
                  <span className="absolute bottom-0 left-3 w-0 h-0.5 bg-signal-red transition-all duration-300 group-hover:w-12"></span>
                  <span className="absolute inset-0 bg-signal-red transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 -z-10 mx-3 rounded"></span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {isSearchOpen && (
        <div className={`fixed inset-0 bg-black/60 backdrop-blur-lg flex items-start justify-center z-50 p-4 pt-[20vh] ${searchIsClosing ? 'animate-fade-out' : 'animate-fade-in'}`}>
          <div 
            ref={searchModalRef}
            className={`bg-zinc-900/90 backdrop-blur-xl shadow-2xl border border-zinc-700 rounded-2xl p-6 w-[90%] max-w-lg transform transition-all duration-300 ${searchIsClosing ? 'animate-slide-out-down' : 'animate-slide-in-up'}`}
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
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search hoodies, drop 001..."
                className="w-full pl-12 pr-4 py-3 rounded-full bg-zinc-800 text-white placeholder-zinc-400 border border-zinc-700 focus:border-signal-red focus:ring-2 focus:ring-signal-red focus:outline-none transition-all duration-200"
              />
            </div>
            
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="px-3 py-1 bg-zinc-800 text-white rounded-full hover:bg-zinc-700 transition cursor-pointer">
                "hoodies"
              </span>
              <span className="px-3 py-1 bg-zinc-800 text-white rounded-full hover:bg-zinc-700 transition cursor-pointer">
                "drop 001"
              </span>
              <span className="px-3 py-1 bg-zinc-800 text-white rounded-full hover:bg-zinc-700 transition cursor-pointer">
                "streetwear"
              </span>
            </div>
          </div>
        </div>
      )}

      <SignInModal 
        isOpen={isSignInOpen} 
        onClose={() => setIsSignInOpen(false)}
        onSwitchToRegister={() => {
          setIsSignInOpen(false);
          setIsRegisterOpen(true);
        }}
      />

      <RegisterModal 
        isOpen={isRegisterOpen} 
        onClose={() => setIsRegisterOpen(false)}
        onSwitchToSignIn={() => {
          setIsRegisterOpen(false);
          setIsSignInOpen(true);
        }}
      />
    </>
  );
};

export default Navigation;
