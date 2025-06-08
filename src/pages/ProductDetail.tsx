
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ArrowLeft, Plus, Minus } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useWishlist } from '../contexts/WishlistContext';

const ProductDetail = () => {
  const { slug } = useParams();
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Scroll to top and trigger fade-in animation when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    // Trigger fade-in animation after a brief delay
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Check if user has purchased this product
  const hasPurchased = (productId: number) => {
    const purchasedItems = JSON.parse(localStorage.getItem('purchasedItems') || '[]');
    return purchasedItems.includes(productId);
  };

  // Mock product data - in a real app, this would come from an API
  const getProductBySlug = (slug: string) => {
    const products = {
      '404-oversized-hoodie': {
        id: 1,
        name: "404 Oversized Hoodie",
        price: 89,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop",
        badge: "404 Exclusive",
        description: "Embrace the error with our signature 404 Oversized Hoodie. Crafted from premium cotton blend, this piece features our iconic glitch aesthetic with subtle digital distortion patterns.",
        tags: ["Oversized Fit", "Premium Cotton", "Limited Edition", "Unisex"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        stock: 5,
        rating: 4.8,
        reviewCount: 234,
        modelInfo: "Model is 6'1\" (185cm) wearing size L",
        category: "hoodies"
      },
      'glitch-cargo-pants': {
        id: 2,
        name: "Glitch Cargo Pants",
        price: 120,
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=600&fit=crop",
        badge: "Drop Only",
        description: "Technical cargo pants with a futuristic edge. Multiple pockets and adjustable straps meet street-ready comfort in this standout piece.",
        tags: ["Cargo Style", "Technical Fabric", "Adjustable Fit", "Street Ready"],
        sizes: ["S", "M", "L", "XL"],
        stock: 8,
        rating: 4.9,
        reviewCount: 156,
        modelInfo: "Model is 5'10\" (178cm) wearing size M",
        category: "bottoms"
      },
      'system-error-tee': {
        id: 3,
        name: "System Error Tee",
        price: 45,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
        badge: "Low Stock",
        description: "A minimalist approach to error culture. This premium tee features subtle system error messaging with a clean, contemporary design.",
        tags: ["Regular Fit", "100% Cotton", "Minimalist Design", "Everyday Wear"],
        sizes: ["XS", "S", "M", "L", "XL"],
        stock: 3,
        rating: 4.7,
        reviewCount: 89,
        modelInfo: "Model is 6'2\" (188cm) wearing size L",
        category: "tees"
      },
      '404-tech-jacket': {
        id: 4,
        name: "404 Tech Jacket",
        price: 180,
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=600&fit=crop",
        badge: "New Drop",
        description: "The future of outerwear. Water-resistant technical fabric meets contemporary design in this statement jacket that bridges function and style.",
        tags: ["Water Resistant", "Technical Fabric", "Contemporary Cut", "Statement Piece"],
        sizes: ["S", "M", "L", "XL"],
        stock: 12,
        rating: 4.9,
        reviewCount: 67,
        modelInfo: "Model is 5'11\" (180cm) wearing size M",
        category: "hoodies"
      }
    };
    return products[slug as keyof typeof products] || null;
  };

  const product = getProductBySlug(slug || '');

  // Get related products by category
  const getRelatedProducts = () => {
    if (!product) return [];
    
    const allProducts = [
      { id: 5, name: "Glitch Effect Tee", price: 45, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop", category: "tees", slug: "glitch-effect-tee" },
      { id: 6, name: "Error Code Cargo Pants", price: 120, image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=400&fit=crop", category: "bottoms", slug: "error-code-cargo-pants" },
      { id: 7, name: "404 Zip Hoodie", price: 95, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop", category: "hoodies", slug: "404-zip-hoodie" },
      { id: 8, name: "System Error Shorts", price: 65, image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop", category: "bottoms", slug: "system-error-shorts" }
    ];
    
    return allProducts
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 3);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    const cartItem = {
      id: product?.id,
      name: product?.name,
      price: product?.price,
      size: selectedSize,
      quantity: quantity,
      image: product?.image
    };
    
    // Add to localStorage cart
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = existingCart.findIndex(
      (item: any) => item.id === cartItem.id && item.size === selectedSize
    );
    
    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Add to purchased items for rating badge functionality
    const purchasedItems = JSON.parse(localStorage.getItem('purchasedItems') || '[]');
    if (!purchasedItems.includes(product?.id)) {
      purchasedItems.push(product?.id);
      localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems));
    }
    
    alert('Added to cart!');
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link to="/shop" className="btn-primary">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts();

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navigation />
      
      <div className={`pt-16 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link 
            to="/shop"
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>
        </div>

        {/* Product Hero Section */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square bg-zinc-900 rounded-xl overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-signal-red text-white px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-lg">
                      {product.badge}
                    </span>
                  </div>
                )}
                
                {/* Limited Stock Badge */}
                {product.stock <= 5 && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-red-600 text-white px-2 py-1 text-xs font-semibold rounded-full">
                      Only {product.stock} left
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {product.name}
                </h1>
                <p className="text-2xl font-bold text-white mb-2">
                  ${product.price}
                </p>
                
                {/* Rating Badge - Only show if purchased */}
                {hasPurchased(product.id) && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-yellow-400 text-sm font-semibold">
                      ★ {product.rating} from {product.reviewCount}+ reviews
                    </span>
                  </div>
                )}
              </div>

              <p className="text-zinc-400 text-lg leading-relaxed">
                {product.description}
              </p>

              {/* Model Info */}
              <p className="text-zinc-400 text-sm">
                {product.modelInfo}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Size Selector */}
              <div>
                <h3 className="text-white font-semibold mb-3">Select Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        selectedSize === size
                          ? 'bg-signal-red text-white border-signal-red'
                          : 'bg-zinc-800 text-white border-zinc-700 hover:border-signal-red'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <h3 className="text-white font-semibold mb-3">Quantity</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-zinc-800 text-white p-2 rounded-lg hover:bg-zinc-700 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-white font-semibold px-4">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-zinc-800 text-white p-2 rounded-lg hover:bg-zinc-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-signal-red text-white py-4 px-6 rounded-xl font-semibold hover:bg-red-500 transition-colors"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-4 rounded-xl transition-colors ${
                    isInWishlist(product.id)
                      ? 'bg-signal-red text-white'
                      : 'bg-zinc-800 text-white hover:bg-signal-red'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Stock Info */}
              {product.stock <= 5 && (
                <p className="text-yellow-500 text-sm">
                  Only {product.stock} left in stock!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold text-white mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link 
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.slug}`}
                  className="bg-zinc-900 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300"
                >
                  <div className="aspect-square">
                    <img 
                      src={relatedProduct.image} 
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-medium mb-1">{relatedProduct.name}</h3>
                    <p className="text-zinc-400">${relatedProduct.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
