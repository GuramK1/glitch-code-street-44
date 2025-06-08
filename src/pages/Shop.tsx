
import { useState } from 'react';
import { Filter, Grid, List, ChevronDown, Heart } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useWishlist } from '../contexts/WishlistContext';

const Shop = () => {
  const [sortBy, setSortBy] = useState('newest');
  const [category, setCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Mock product data with stock info and badges
  const products = [
    { id: 1, name: "404 Oversized Hoodie", price: 89, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop", category: "tops", badge: "LIMITED", isNew: true, stock: 5 },
    { id: 2, name: "Glitch Effect Tee", price: 45, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop", category: "tops", badge: null, isNew: false, stock: 15 },
    { id: 3, name: "Error Code Cargo Pants", price: 120, image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=400&fit=crop", category: "bottoms", badge: "DROP 001", isNew: true, stock: 8 },
    { id: 4, name: "404 Zip Hoodie", price: 95, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop", category: "tops", badge: null, isNew: false, stock: 12 },
    { id: 5, name: "System Error Shorts", price: 65, image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop", category: "bottoms", badge: "LIMITED", isNew: true, stock: 3 },
    { id: 6, name: "Broken Link Tank", price: 35, image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop", category: "tops", badge: null, isNew: false, stock: 20 },
  ];

  const getBadgeClass = (badge: string | null, stock: number, isNew: boolean) => {
    if (badge === 'LIMITED') return 'badge-limited';
    if (badge === 'DROP 001') return 'badge-drop-only';
    if (stock <= 5) return 'badge-low-stock';
    if (isNew) return 'badge-new';
    return '';
  };

  const getBadgeText = (badge: string | null, stock: number, isNew: boolean) => {
    if (badge === 'LIMITED') return 'LIMITED';
    if (badge === 'DROP 001') return 'DROP ONLY';
    if (stock <= 5) return 'LOW STOCK';
    if (isNew) return 'NEW';
    return '';
  };

  const filteredProducts = products.filter(product => 
    category === 'all' || product.category === category
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'limited':
        return (b.badge ? 1 : 0) - (a.badge ? 1 : 0);
      default:
        return b.isNew ? 1 : -1;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-16">
        {/* Hero Section */}
        <div className="bg-background text-foreground py-16 px-4" data-aos="fade-up">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4" data-aos="fade-up" data-aos-delay="100">
              <span className="text-signal-red">404</span> Shop
            </h1>
            <p className="text-muted-foreground text-lg" data-aos="fade-up" data-aos-delay="200">Error culture meets street fashion</p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-card border-b border-border sticky top-16 z-40" data-aos="fade-down">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              {/* Category Filters */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden flex items-center gap-2 text-card-foreground hover:text-signal-red transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
                <div className={`flex items-center gap-2 ${showFilters ? 'block' : 'hidden md:flex'}`}>
                  {['all', 'tops', 'bottoms'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        category === cat 
                          ? 'bg-signal-red text-white' 
                          : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-card-foreground'
                      }`}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort & View Options */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-input text-card-foreground px-4 py-2 rounded-lg border border-border focus:border-signal-red focus:outline-none appearance-none pr-8"
                  >
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="limited">Limited Edition</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="p-2 bg-muted text-card-foreground rounded-lg hover:bg-muted/80 transition-colors">
                    <Grid className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 hover:text-card-foreground transition-colors">
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-4 py-8" data-aos="fade-up" data-aos-delay="300">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {sortedProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="group bg-card rounded-xl overflow-hidden hover:scale-105 transition-all duration-300"
                data-aos="zoom-in"
                data-aos-delay={100 + (index * 50)}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Badge */}
                  {getBadgeText(product.badge, product.stock, product.isNew) && (
                    <div className={`absolute top-3 left-3 ${getBadgeClass(product.badge, product.stock, product.isNew)}`}>
                      {getBadgeText(product.badge, product.stock, product.isNew)}
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
                      isInWishlist(product.id)
                        ? 'bg-signal-red text-white'
                        : 'bg-black/50 text-white hover:bg-signal-red'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  </button>
                  
                  {/* Quick View Overlay */}
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="text-white border border-white px-4 py-2 rounded-full text-sm hover:bg-white hover:text-black transition-all duration-200">
                      Quick View
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-card-foreground font-medium mb-2 group-hover:text-signal-red transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-2">Premium streetwear</p>
                  <div className="flex justify-between items-center">
                    <span className="text-card-foreground font-bold">${product.price}</span>
                    <button className="bg-signal-red text-white px-3 py-1 rounded-lg text-sm hover:bg-signal-red/90 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Shop;
