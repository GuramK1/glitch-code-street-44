
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from './AuthContext';

interface WishlistContextType {
  wishlist: number[];
  toggleWishlist: (productId: number) => Promise<void>;
  removeFromWishlist: (productId: number) => Promise<void>;
  isInWishlist: (productId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) return;
      type Row = { product_id: number };
      const { data } = await supabase
        .from<Row>('wishlist')
        .select('product_id')
        .eq('user_id', user.email);
      setWishlist(data?.map(row => row.product_id) ?? []);
    };
    fetchWishlist();
  }, [user]);

  const toggleWishlist = async (productId: number) => {
    if (!user) return;
    if (wishlist.includes(productId)) {
      await supabase
        .from('wishlist')
        .delete()
        .eq('user_id', user.email)
        .eq('product_id', productId);
    } else {
      await supabase
        .from('wishlist')
        .insert({ user_id: user.email, product_id: productId });
    }
    const { data } = await supabase
      .from<{ product_id: number }>('wishlist')
      .select('product_id')
      .eq('user_id', user.email);
    setWishlist(data?.map(row => row.product_id) ?? []);
  };

  const removeFromWishlist = async (productId: number) => {
    if (!user) return;
    await supabase
      .from('wishlist')
      .delete()
      .eq('user_id', user.email)
      .eq('product_id', productId);
    setWishlist(prev => prev.filter(id => id !== productId));
  };

  const isInWishlist = (productId: number) => {
    return wishlist.includes(productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
