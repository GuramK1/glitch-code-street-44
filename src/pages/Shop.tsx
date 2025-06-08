
import { useState } from 'react';
import { Filter, Grid, List, ChevronDown } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Shop = () => {
  const [sortBy, setSortBy] = useState('newest');
  const [category, setCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Mock product data
  const products = [
    { id: 1, name: "404 Oversized Hoodie", price: 89, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop", category: "tops", badge: "LIMITED", isNew: true },
    { id: 2, name: "Glitch Effect Tee", price: 45, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop", category: "tops", badge: null, isNew: false },
    { id: 3, name: "Error Code Cargo Pants", price: 120, image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=400&fit=crop", category: "bottoms", badge: "DROP 001", isNew: true },
    { id: 4, name: "404 Zip Hoodie", price: 95, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop", category: "tops", badge: null, isNew: false },
    { id: 5, name: "System Error Shorts", price: 65, image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop", category: "bottoms", badge: "LIMITED", isNew: true },
    { id: 6, name: "Broken Link Tank", price: 35, image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop", category: "tops", badge: null, isNew: false },
  ];

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
    <div className="min-h-screen bg-zinc-950">
      <Navigation />
      
      <div className="pt-16">
        {/* Hero Section */}
        <div className="bg-zinc-950 text-white py-16 px-4" data-aos="fade-up">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4" data-aos="fade-up" data-aos-delay="100">
              <span className="text-red-500">404</span> Shop
            </h1>
            <p className="text-zinc-400 text-lg" data-aos="fade-up" data-aos-delay="200">Error culture meets street fashion</p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-zinc-900 border-b border-zinc-800 sticky top-16 z-40" data-aos="fade-down">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              {/* Category Filters */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden flex items-center gap-2 text-white hover:text-red-500 transition-colors"
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
                          ? 'bg-red-600 text-white' 
                          : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
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
                    className="bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700 focus:border-red-500 focus:outline-none appearance-none pr-8"
                  >
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="limited">Limited Edition</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="p-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors">
                    <Grid className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-zinc-800 text-zinc-400 rounded-lg hover:bg-zinc-700 hover:text-white transition-colors">
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
                className="group bg-zinc-900 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300"
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
                  {product.badge && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {product.badge}
                    </div>
                  )}
                  
                  {/* Quick View Overlay */}
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="text-white border border-white px-4 py-2 rounded-full text-sm hover:bg-white hover:text-black transition-all duration-200">
                      Quick View
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-white font-medium mb-2 group-hover:text-red-500 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-zinc-400 text-sm mb-2">Premium streetwear</p>
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold">${product.price}</span>
                    <button className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-500 transition-colors">
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
