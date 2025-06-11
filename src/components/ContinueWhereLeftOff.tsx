
import { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';

interface LastViewedProduct {
  id: number;
  name: string;
  image: string;
  slug: string;
  timestamp: number;
}

const ContinueWhereLeftOff = () => {
  const [lastViewed, setLastViewed] = useState<LastViewedProduct | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchLastViewed = async () => {
      if (!user) return;
      const { data } = await supabase
        .from('recent_views')
        .select('*')
        .eq('user_id', user.email)
        .order('timestamp', { ascending: false })
        .limit(1);
      if (data && data[0]) {
        const product = data[0];
        const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
        if (product.timestamp > weekAgo) {
          setLastViewed(product);
          setTimeout(() => setIsVisible(true), 1000);
          setTimeout(() => handleClose(), 16000);
        }
      }
    };
    fetchLastViewed();
  }, [user]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setLastViewed(null);
    }, 300);
  };

  const handleRemindLater = async () => {
    if (lastViewed && user) {
      await supabase
        .from('recent_views')
        .upsert({
          ...lastViewed,
          user_id: user.email,
          timestamp: Date.now() + 24 * 60 * 60 * 1000,
        });
    }
    handleClose();
  };

  if (!lastViewed || !isVisible) return null;

  return (
    <div className={`fixed top-6 right-6 z-50 max-w-sm transition-all duration-300 ${
      isClosing ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'
    }`}>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <p className="text-sm text-zinc-400 mb-1">Still thinking about</p>
            <h3 className="text-white font-semibold text-sm">{lastViewed.name}?</h3>
          </div>
          <button
            onClick={handleClose}
            className="text-zinc-400 hover:text-white transition-colors p-1 -m-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Product Preview */}
        <div className="flex items-center gap-3 mb-4">
          <img 
            src={lastViewed.image}
            alt={lastViewed.name}
            className="w-12 h-12 object-cover rounded-lg bg-zinc-800"
          />
          <div className="flex-1">
            <Link
              to={`/product/${lastViewed.slug}`}
              className="inline-flex items-center gap-2 text-signal-red hover:text-red-400 transition-colors text-sm font-medium"
              onClick={handleClose}
            >
              View Again
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 text-xs">
          <button
            onClick={handleRemindLater}
            className="text-zinc-400 hover:text-zinc-300 transition-colors"
          >
            Remind me later
          </button>
          <button
            onClick={handleClose}
            className="text-zinc-400 hover:text-zinc-300 transition-colors ml-auto"
          >
            Not interested
          </button>
        </div>
      </div>
    </div>
  );
};

// Utility function to track product views
export const trackProductView = (product: {
  id: number;
  name: string;
  image: string;
  slug: string;
}) => {
  const data: LastViewedProduct = {
    ...product,
    timestamp: Date.now()
  };
  supabase.from('recent_views').upsert({
    ...data,
    user_id: supabase.auth.getUser().data.user?.email ?? 'anonymous'
  });
};

export default ContinueWhereLeftOff;
