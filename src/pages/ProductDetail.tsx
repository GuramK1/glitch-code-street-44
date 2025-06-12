import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ArrowLeft, Plus, Minus, Ruler } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useWishlist } from '../contexts/WishlistContext';
import SizingAssistant from '../components/SizingAssistant';
import { trackProductView } from '../components/ContinueWhereLeftOff';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const ProductDetail = () => {
  const { slug } = useParams();
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [backButtonVisible, setBackButtonVisible] = useState(false);
  const [sizingAssistantOpen, setSizingAssistantOpen] = useState(false);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { user, isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { toast } = useToast();

  // Scroll to top and trigger fade-in animation when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Trigger fade-in animation after a brief delay
    const timer = setTimeout(() => setIsVisible(true), 100);
    const backButtonTimer = setTimeout(() => setBackButtonVisible(true), 300);
    return () => {
      clearTimeout(timer);
      clearTimeout(backButtonTimer);
    };
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
        originalPrice: 120,
        isOnSale: true,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop",
        hoverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop",
        badge: "404 Exclusive",
        description: "Embrace the error with our signature 404 Oversized Hoodie. Crafted from premium cotton blend, this piece features our iconic glitch aesthetic with subtle digital distortion patterns.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        stock: 3,
        rating: 4.8,
        reviewCount: 234,
        modelInfo: "Model is 6'1\" (185cm) wearing size L",
        category: "hoodies"
      },
      'glitch-cargo-pants': {
        id: 2,
        name: "Glitch Cargo Pants",
        price: 120,
        originalPrice: null,
        isOnSale: false,
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=600&fit=crop",
        hoverImage: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=600&fit=crop",
        badge: "Drop Only",
        description: "Technical cargo pants with a futuristic edge. Multiple pockets and adjustable straps meet street-ready comfort in this standout piece.",
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
        originalPrice: null,
        isOnSale: false,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
        badge: "Low Stock",
        description: "A minimalist approach to error culture. This premium tee features subtle system error messaging with a clean, contemporary design.",
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
        originalPrice: null,
        isOnSale: false,
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=600&fit=crop",
        badge: "New Drop",
        description: "The future of outerwear. Water-resistant technical fabric meets contemporary design in this statement jacket that bridges function and style.",
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

  // Track product view for "Continue Where You Left Off" feature
  useEffect(() => {
    if (product) {
      trackProductView({
        id: product.id,
        name: product.name,
        image: product.image,
        slug: slug || ''
      });
    }
  }, [product, slug]);

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

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast({
        title: "⚠️ Size Required",
        description: "Please select a size before adding to your pack.",
        variant: "destructive",
        className: "bg-red-600 text-white border-red-700 shadow-lg font-medium",
      });
      return;
    }
    
    const cartItem = {
      id: product?.id,
      name: product?.name,
      price: product?.price,
      size: selectedSize,
      quantity: quantity,
      image: product?.image,
      slug: slug
    };
    
    await addToCart(cartItem);
    
    // Add to purchased items for rating badge functionality
    const purchasedItems = JSON.parse(localStorage.getItem('purchasedItems') || '[]');
    if (!purchasedItems.includes(product?.id)) {
      purchasedItems.push(product?.id);
      localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems));
    }
    
    // Show success toast
    toast({
      title: "Added to Cart! ✅",
      description: `${product?.name} (${selectedSize}) has been added to your cart.`,
      className: "bg-green-600 text-white border-green-500 font-medium shadow-lg",
    });

    // Dispatch custom event to update cart in Navigation
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  const handleBackToShop = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      window.location.href = '/shop';
    }, 300);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-jet-black flex items-center justify-center container-responsive">
        <div className="text-center text-white">
          <h1 className="text-responsive-xl font-bold element-spacing">Product Not Found</h1>
          <Link to="/shop" className="btn-primary">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts();

  return (
    <div className="min-h-screen bg-jet-black no-scroll-x">
      <Navigation />
      
      <div className={`pt-16 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${isTransitioning ? 'opacity-0 -translate-x-8' : ''}`}>
        {/* Back Button - Mobile Responsive */}
        <div className="container-responsive py-4 sm:py-6">
          <button 
            onClick={handleBackToShop}
            className={`inline-flex items-center gap-2 sm:gap-3 text-zinc-400 font-medium hover:text-signal-red transition-all duration-300 group back-button touch-target ${backButtonVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="relative after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-[2px] after:bg-signal-red group-hover:after:w-full after:transition-all after:duration-300 text-responsive-sm">
              Back to Shop
            </span>
          </button>
        </div>

        {/* Product Hero Section - Fully Responsive */}
        <div className="container-responsive section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Product Image - Mobile Optimized */}
            <div className="relative" data-aos="fade-right" data-aos-delay="200">
              <div className="aspect-square bg-zinc-900 rounded-2xl overflow-hidden group shadow-2xl">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Badges - Responsive positioning */}
                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 flex flex-col gap-2">
                  {product.badge && (
                    <span className="bg-signal-red text-white px-2 py-1 sm:px-3 sm:py-1 text-xs font-bold tracking-wider uppercase rounded-lg shadow-lg">
                      {product.badge}
                    </span>
                  )}
                  
                  {product.isOnSale && (
                    <span className="bg-accent text-accent-foreground px-2 py-1 sm:px-3 sm:py-1 text-xs font-bold tracking-wider uppercase rounded-lg shadow-lg">
                      Sale
                    </span>
                  )}
                </div>

                {/* Limited Stock Badge - Mobile Responsive */}
                {product.stock <= 5 && (
                  <div className="absolute top-4 sm:top-6 right-4 sm:right-6">
                    <span className={`bg-red-600 text-white px-2 py-1 sm:px-3 sm:py-1 text-xs font-semibold rounded-full shadow-lg ${product.stock <= 3 ? 'animate-pulse' : ''}`}>
                      Only {product.stock} left 🔥
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Product Info - Mobile Optimized with black background and white text */}
            <div className="space-y-6 lg:space-y-8" data-aos="fade-left" data-aos-delay="300">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold element-spacing text-white">
                  {product.name}
                </h1>
                
                {/* Price Section - Mobile Responsive */}
                <div className="flex items-center gap-3 sm:gap-4 element-spacing">
                  <span className="text-2xl sm:text-3xl font-bold text-white">
                    ${product.price}
                  </span>
                  {product.isOnSale && product.originalPrice && (
                    <span className="text-lg sm:text-xl text-zinc-400 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                
                {/* Rating Badge - Only show if purchased */}
                {hasPurchased(product.id) && (
                  <div className="flex items-center gap-2 element-spacing">
                    <span className="text-yellow-400 text-responsive-sm font-semibold">
                      ★ {product.rating} from {product.reviewCount}+ reviews
                    </span>
                  </div>
                )}
              </div>

              {/* Description - Mobile Responsive */}
              <p className="text-zinc-300 text-responsive-base leading-relaxed">
                {product.description}
              </p>

              {/* Model Info - Mobile Responsive */}
              <p className="text-responsive-xs italic text-zinc-400 font-light tracking-wide">
                👕 {product.modelInfo}
              </p>

              {/* Sectional Divider */}
              <div className="border-t border-zinc-700"></div>

              {/* Size Selector - Mobile Responsive */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 element-spacing">
                  <h3 className="text-white font-semibold text-responsive-base">Select Size</h3>
                  <button
                    onClick={() => setSizingAssistantOpen(true)}
                    className="flex items-center gap-2 text-responsive-xs text-zinc-400 hover:text-signal-red transition-colors duration-200 touch-target self-start sm:self-auto"
                  >
                    <Ruler className="w-4 h-4" />
                    <span>Sizing Assistant</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 sm:px-5 sm:py-3 rounded-xl font-medium transition-all duration-200 active:scale-95 shadow-lg touch-target ${
                        selectedSize === size
                          ? 'bg-signal-red text-white shadow-red-500/25 shadow-lg'
                          : 'bg-zinc-800 text-white hover:bg-zinc-700 hover:shadow-xl border border-zinc-600'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sectional Divider */}
              <div className="border-t border-zinc-700"></div>

              {/* Quantity Selector - Mobile Responsive */}
              <div>
                <h3 className="text-white font-semibold element-spacing text-responsive-base">Quantity</h3>
                <div className="flex items-center gap-3 sm:gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-zinc-800 text-white p-2 sm:p-3 rounded-xl border border-zinc-600 hover:bg-zinc-700 transition-all duration-200 active:scale-95 shadow-lg touch-target"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-white font-semibold text-lg sm:text-xl px-4 sm:px-6 py-2 bg-zinc-800 rounded-xl border border-zinc-600 min-w-[60px] text-center shadow-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-zinc-800 text-white p-2 sm:p-3 rounded-xl border border-zinc-600 hover:bg-zinc-700 transition-all duration-200 active:scale-95 shadow-lg touch-target"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Sectional Divider */}
              <div className="border-t border-zinc-700"></div>

              {/* Action Buttons - Mobile Responsive */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-signal-red text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl font-semibold text-responsive-base hover:bg-red-600 hover:shadow-red-500/25 hover:shadow-xl transition-all duration-200 active:scale-97 shadow-lg touch-target"
                >
                  Add to Bag
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 sm:p-4 rounded-xl transition-all duration-200 active:scale-95 shadow-lg touch-target ${
                    isInWishlist(product.id)
                      ? 'bg-signal-red text-white shadow-red-500/25'
                      : 'bg-zinc-800 text-white border border-zinc-600 hover:bg-zinc-700 hover:shadow-xl'
                  }`}
                >
                  <Heart className={`w-5 h-5 sm:w-6 sm:h-6 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Stock Info */}
              {product.stock <= 5 && (
                <p className="text-yellow-400 text-responsive-sm font-medium flex items-center gap-2">
                  ⚡ Only {product.stock} left in stock!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Related Products Section - Mobile Responsive */}
        {relatedProducts.length > 0 && (
          <section className="container-responsive section-padding" data-aos="fade-up" data-aos-delay="400">
            <div className="border-t border-zinc-700 mb-8 sm:mb-12"></div>
            <h2 className="text-responsive-xl font-bold text-white element-spacing">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {relatedProducts.map((relatedProduct, index) => (
                <Link 
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.slug}`}
                  className="bg-zinc-900 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-zinc-700"
                  data-aos="fade-up"
                  data-aos-delay={500 + (index * 100)}
                >
                  <div className="aspect-square">
                    <img 
                      src={relatedProduct.image} 
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="text-white font-medium mb-2 group-hover:text-signal-red transition-colors text-responsive-sm line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-zinc-300 font-semibold text-responsive-sm">${relatedProduct.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
      
      {/* Sizing Assistant Modal */}
      <SizingAssistant 
        isOpen={sizingAssistantOpen}
        onClose={() => setSizingAssistantOpen(false)}
        onSizeSelect={(size) => setSelectedSize(size)}
      />
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
