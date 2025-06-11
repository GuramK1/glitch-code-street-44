
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, X } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';

const CartReminder = () => {
  const [isVisible, setIsVisible] = useState(false);
  interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    size: string;
    quantity: number;
  }
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCart = async () => {
      if (!user) return;
      const { data } = await supabase
        .from('cart')
        .select('*')
        .eq('user_id', user.email);
      setCartItems(data || []);

      if (data && data.length > 0) {
        const timer = setTimeout(() => setIsVisible(true), 10000);
        const handleScroll = () => {
          const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
          if (scrollPercentage > 50 && data.length > 0) {
            setIsVisible(true);
          }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
          clearTimeout(timer);
          window.removeEventListener('scroll', handleScroll);
        };
      }
    };
    fetchCart();
  }, [user]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible || cartItems.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-jet-black border border-zinc-800 text-white p-4 rounded-xl shadow-xl z-50 animate-slide-in-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShoppingBag className="w-5 h-5 text-signal-red" />
          <div>
            <p className="font-medium">You left something in your pack</p>
            <p className="text-sm text-zinc-400">{cartItems.length} item{cartItems.length > 1 ? 's' : ''} waiting</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            to="/shop" 
            className="bg-signal-red text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors text-sm"
            onClick={handleClose}
          >
            View Cart
          </Link>
          <button 
            onClick={handleClose}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartReminder;
