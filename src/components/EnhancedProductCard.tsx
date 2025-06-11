
import { useState } from 'react';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';
import { animateToTarget, animateFromTarget } from '../utils/pageTransitions';
import { toast } from 'sonner';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  badge?: string | null;
  isNew: boolean;
  stock: number;
  slug: string;
}

interface EnhancedProductCardProps {
  product: Product;
  onQuickView: (slug: string) => void;
}

const EnhancedProductCard = ({ product, onQuickView }: EnhancedProductCardProps) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isAnimating, setIsAnimating] = useState(false);

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

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log('🛒 Add to cart clicked!');
    setIsAnimating(true);

    // Get existing cart
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Add item with default size
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: 'M', // Default size
      quantity: 1
    };

    // Check if item already exists
    const existingItemIndex = existingCart.findIndex(
      (item: any) => item.id === product.id && item.size === 'M'
    );

    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    window.dispatchEvent(new CustomEvent('cartUpdated'));

    // Enhanced animation trigger with better error handling
    console.log('🎯 Looking for cart icon...');
    const cartIcon = document.querySelector('[data-cart-icon]');
    if (cartIcon) {
      console.log('✅ Cart icon found:', cartIcon);
      animateToTarget(e.currentTarget, '[data-cart-icon]');
    } else {
      console.error('❌ Cart icon not found! Available elements with data attributes:', 
        Array.from(document.querySelectorAll('[data-*]')).map(el => el.getAttribute('data-cart-icon') || el.outerHTML.substring(0, 100))
      );
    }

    toast.success('Added to cart!');
    
    setTimeout(() => setIsAnimating(false), 800);
  };

  const handleWishlistToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    
    const wasInWishlist = isInWishlist(product.id);
    
    // Toggle the wishlist state
    toggleWishlist(product.id);
    
    if (wasInWishlist) {
      // Item was in wishlist, now removing - play reverse animation
      console.log('🔄 Removing from wishlist - playing reverse animation');
      animateFromTarget('[data-wishlist-icon]');
      toast.success('Removed from wishlist');
    } else {
      // Item was not in wishlist, now adding - play forward animation
      console.log('➕ Adding to wishlist - playing forward animation');
      const wishlistIcon = document.querySelector('[data-wishlist-icon]');
      if (wishlistIcon) {
        animateToTarget(e.currentTarget, '[data-wishlist-icon]');
      }
      toast.success('Added to wishlist!');
    }
  };

  const handleQuickView = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onQuickView(product.slug);
  };

  return (
    <div className="product-card group bg-neutral-900 rounded-xl overflow-hidden hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl hover:bg-neutral-800 relative">
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badge */}
        {getBadgeText(product.badge, product.stock, product.isNew) && (
          <div className={`absolute top-2 sm:top-3 left-2 sm:left-3 ${getBadgeClass(product.badge, product.stock, product.isNew)} text-xs z-10`}>
            {getBadgeText(product.badge, product.stock, product.isNew)}
          </div>
        )}

        {/* Wishlist Button - Top Left */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2 sm:top-3 left-2 sm:left-3 ${getBadgeText(product.badge, product.stock, product.isNew) ? 'top-12 sm:top-14' : ''} p-2 sm:p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 transform touch-target z-20 ${
            isInWishlist(product.id)
              ? 'bg-signal-red text-white shadow-lg'
              : 'bg-white/90 text-gray-700 hover:bg-signal-red hover:text-white shadow-md'
          }`}
        >
          <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
        </button>

        {/* Add to Cart Button - Top Right */}
        <button
          onClick={handleAddToCart}
          disabled={isAnimating}
          className="absolute top-2 sm:top-3 right-2 sm:right-3 p-2 sm:p-3 rounded-full bg-white/90 text-gray-700 hover:bg-signal-red hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 transform shadow-md touch-target z-20 disabled:opacity-50"
        >
          <ShoppingCart className="w-4 h-4" />
        </button>
        
        {/* Quick View Button - Center */}
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={handleQuickView}
            className="text-white border-2 border-white px-4 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-medium hover:bg-white hover:text-black transition-all duration-200 active:scale-95 touch-target flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">Quick View</span>
          </button>
        </div>
      </div>
      
      <div className="bg-neutral-900 border-t border-neutral-800 p-4 rounded-b-xl">
        <h3 className="text-white font-semibold mb-2 group-hover:text-signal-red transition-colors text-responsive-xs sm:text-responsive-sm line-clamp-2">
          {product.name}
        </h3>
        <p className="text-gray-400 text-xs mb-3 hidden sm:block">Premium streetwear</p>
        <div className="flex justify-between items-center gap-2">
          <span className="text-white font-bold text-responsive-sm">${product.price}</span>
        </div>
      </div>
    </div>
  );
};

export default EnhancedProductCard;
