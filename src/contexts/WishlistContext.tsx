import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "./AuthContext";

interface WishlistContextType {
  wishlist: number[];
  toggleWishlist: (productId: number) => Promise<void>;
  removeFromWishlist: (productId: number) => Promise<void>;
  isInWishlist: (productId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({
  children,
}) => {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("wishlist")
        .select("product_id")
        .eq("user_id", user.id);
      if (error) {
        console.error("Supabase error:", error);
      }
      if (data) {
        const ids = data.map((item) => item.product_id as number);
        setWishlist(ids);
        localStorage.setItem("wishlist", JSON.stringify(ids));
      }
    };
    fetchWishlist();
  }, [user]);

  const toggleWishlist = async (productId: number) => {
    const wasInWishlist = wishlist.includes(productId);
    setWishlist((prev) => {
      const newWishlist = wasInWishlist
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
      return newWishlist;
    });

    if (user) {
      if (wasInWishlist) {
        const { error } = await supabase
          .from("wishlist")
          .delete()
          .match({ user_id: user.id, product_id: productId });
        if (error) console.error("Supabase error:", error);
      } else {
        const { error } = await supabase
          .from("wishlist")
          .upsert({ user_id: user.id, product_id: productId });
        if (error) console.error("Supabase error:", error);
      }
    }
  };

  const removeFromWishlist = async (productId: number) => {
    setWishlist((prev) => {
      const newWishlist = prev.filter((id) => id !== productId);
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
      return newWishlist;
    });
    if (user) {
      const { error } = await supabase
        .from("wishlist")
        .delete()
        .match({ user_id: user.id, product_id: productId });
      if (error) console.error("Supabase error:", error);
    }
  };

  const isInWishlist = (productId: number) => {
    return wishlist.includes(productId);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
