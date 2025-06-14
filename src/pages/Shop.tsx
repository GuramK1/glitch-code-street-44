
import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Filter, Grid, List, ChevronDown } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import EnhancedProductCard from '../components/EnhancedProductCard';
import { createPageTransition } from '../utils/pageTransitions';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('newest');
  const [category, setCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  // Initialize category from URL params and scroll to top
  useEffect(() => {
    const urlCategory = searchParams.get('category');
    if (urlCategory && ['hoodies', 'tees', 'bottoms', 'accessories'].includes(urlCategory)) {
      setCategory(urlCategory);
    }
    window.scrollTo(0, 0);
  }, [searchParams]);

  const handleQuickView = async (slug: string) => {
    setIsTransitioning(true);
    await createPageTransition(`/product/${slug}`, 300);
  };

  // Mock product data with proper data-category attributes and slugs
  const products = [
    { id: 1, name: "404 Oversized Hoodie", price: 89, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop", category: "hoodies", badge: "LIMITED", isNew: true, stock: 5, slug: "404-oversized-hoodie" },
    { id: 2, name: "Glitch Effect Tee", price: 45, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop", category: "tees", badge: null, isNew: false, stock: 15, slug: "glitch-effect-tee" },
    { id: 3, name: "Error Code Cargo Pants", price: 120, image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=400&fit=crop", category: "bottoms", badge: "DROP 001", isNew: true, stock: 8, slug: "error-code-cargo-pants" },
    { id: 4, name: "404 Zip Hoodie", price: 95, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop", category: "hoodies", badge: null, isNew: false, stock: 12, slug: "404-zip-hoodie" },
    { id: 5, name: "System Error Shorts", price: 65, image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop", category: "bottoms", badge: "LIMITED", isNew: true, stock: 3, slug: "system-error-shorts" },
    { id: 6, name: "Broken Link Tank", price: 35, image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop", category: "tees", badge: null, isNew: false, stock: 20, slug: "broken-link-tank" },
    { id: 7, name: "404 Beanie", price: 25, image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=400&fit=crop", category: "accessories", badge: "NEW", isNew: true, stock: 30, slug: "404-beanie" },
    { id: 8, name: "Glitch Backpack", price: 75, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop", category: "accessories", badge: null, isNew: false, stock: 18, slug: "glitch-backpack" },
  ];

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    if (newCategory === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: newCategory });
    }
    window.scrollTo(0, 0);
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
    <div className="min-h-screen bg-jet-black text-white no-scroll-x">
      <Navigation />
      
      <div className={`pt-16 transition-all duration-500 ${isTransitioning ? 'opacity-0 -translate-x-8' : 'opacity-100 translate-x-0'}`}>
        {/* Hero Section - Dark theme with proper colors */}
        <div className="bg-jet-black text-white section-padding container-responsive" data-aos="fade-up">
          <div className="text-center">
            <h1 className="text-responsive-3xl font-bold element-spacing" data-aos="fade-up" data-aos-delay="100">
              <span className="text-signal-red">404</span> Shop
            </h1>
            <p className="text-zinc-400 text-responsive-base" data-aos="fade-up" data-aos-delay="200">
              Error culture meets street fashion
            </p>
          </div>
        </div>

        {/* Premium Category Navigation Bar - Dark theme */}
        <div className="bg-carbon-grey border-b border-zinc-700" data-aos="fade-down">
          <div className="container-responsive py-6 sm:py-8">
            <nav className="flex flex-wrap gap-2 sm:gap-3 justify-center">
              {[
                { key: 'all', label: 'All' },
                { key: 'hoodies', label: 'Hoodies' },
                { key: 'tees', label: 'Tees' },
                { key: 'bottoms', label: 'Bottoms' },
                { key: 'accessories', label: 'Accessories' }
              ].map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => handleCategoryChange(cat.key)}
                  className={`px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-3 rounded-full font-semibold uppercase tracking-wide text-xs sm:text-sm transition-all duration-300 hover:scale-105 transform touch-target ${
                    category === cat.key 
                      ? 'bg-white text-black border border-white shadow-lg' 
                      : 'bg-zinc-800 text-white border border-zinc-700 hover:bg-signal-red hover:text-white hover:shadow-md hover:shadow-signal-red/30'
                  }`}
                  aria-selected={category === cat.key}
                >
                  {cat.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Filter Bar - Dark theme */}
        <div className="bg-carbon-grey border-b border-zinc-700" data-aos="fade-down">
          <div className="container-responsive py-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              {/* Mobile Filter Toggle & Product Count */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="sm:hidden flex items-center gap-2 text-white hover:text-signal-red transition-colors touch-target"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
                <span className="text-responsive-xs text-zinc-400">
                  {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
                </span>
              </div>

              {/* Sort & View Options */}
              <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full sm:w-auto bg-zinc-800 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg border border-zinc-700 focus:border-signal-red focus:outline-none appearance-none pr-8 text-responsive-xs touch-target"
                  >
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="limited">Limited Edition</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                </div>
                
                <div className="flex items-center gap-1 sm:gap-2">
                  <button className="p-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors touch-target">
                    <Grid className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-zinc-800 text-zinc-400 rounded-lg hover:bg-zinc-700 hover:text-white transition-colors touch-target">
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="container-responsive section-padding" data-aos="fade-up" data-aos-delay="300">
          {sortedProducts.length === 0 ? (
            <div className="text-center py-16" data-aos="fade-up">
              <h3 className="text-responsive-lg font-semibold text-white element-spacing">No products found</h3>
              <p className="text-zinc-400 text-responsive-sm">Try selecting a different category or check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
              {sortedProducts.map((product, index) => (
                <EnhancedProductCard
                  key={product.id}
                  product={product}
                  onQuickView={handleQuickView}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Shop;
