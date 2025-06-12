import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "./AuthContext";

interface CartItem {
  id: number;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
  slug: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => Promise<void>;
  updateQuantity: (id: number, size: string, change: number) => Promise<void>;
  removeFromCart: (id: number, size: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const PRODUCT_MAP: Record<number, { name: string; price: number; image: string; slug: string }> = {
  1: {
    name: "404 Oversized Hoodie",
    price: 89,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
    slug: "404-oversized-hoodie",
  },
  2: {
    name: "Glitch Effect Tee",
    price: 45,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    slug: "glitch-effect-tee",
  },
  3: {
    name: "Error Code Cargo Pants",
    price: 120,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=400&fit=crop",
    slug: "error-code-cargo-pants",
  },
  4: {
    name: "404 Zip Hoodie",
    price: 95,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    slug: "404-zip-hoodie",
  },
  5: {
    name: "System Error Shorts",
    price: 65,
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop",
    slug: "system-error-shorts",
  },
  6: {
    name: "Broken Link Tank",
    price: 35,
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop",
    slug: "broken-link-tank",
  },
  7: {
    name: "404 Beanie",
    price: 25,
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=400&fit=crop",
    slug: "404-beanie",
  },
  8: {
    name: "Glitch Backpack",
    price: 75,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    slug: "glitch-backpack",
  },
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      setCartItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("cart")
          .select("product_id,size,quantity")
          .eq("user_id", user.id);
        if (error) {
          console.error("Supabase error:", error);
          return;
        }
        if (data) {
          const mapped = data.map((row) => {
            const info = PRODUCT_MAP[row.product_id as number] || {
              name: "",
              price: 0,
              image: "",
              slug: "",
            };
            return {
              id: row.product_id as number,
              size: row.size as string,
              quantity: row.quantity as number,
              ...info,
            } as CartItem;
          });
          setCartItems(mapped);
          localStorage.setItem("cart", JSON.stringify(mapped));
          window.dispatchEvent(new CustomEvent("cartUpdated"));
        }
      } else {
        setCartItems([]);
      }
    };
    fetchCart();
  }, [user]);

  const addToCart = async (item: CartItem) => {
    setCartItems((prev) => {
      const index = prev.findIndex((i) => i.id === item.id && i.size === item.size);
      let newItems = [] as CartItem[];
      if (index > -1) {
        newItems = prev.map((i, idx) =>
          idx === index ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        newItems = [...prev, item];
      }
      localStorage.setItem("cart", JSON.stringify(newItems));
      window.dispatchEvent(new CustomEvent("cartUpdated"));
      return newItems;
    });

    if (user) {
      const existing = cartItems.find((i) => i.id === item.id && i.size === item.size);
      const quantity = existing ? existing.quantity + item.quantity : item.quantity;
      const { error } = await supabase.from("cart").upsert({
        user_id: user.id,
        product_id: item.id,
        size: item.size,
        quantity,
      });
      if (error) console.error("Supabase error:", error);
    }
  };

  const updateQuantity = async (id: number, size: string, change: number) => {
    setCartItems((prev) => {
      const updated = prev
        .map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0);
      localStorage.setItem("cart", JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent("cartUpdated"));
      return updated;
    });
    if (user) {
      const item = cartItems.find((i) => i.id === id && i.size === size);
      if (item) {
        const { error } = await supabase
          .from("cart")
          .update({ quantity: Math.max(0, item.quantity + change) })
          .match({ user_id: user.id, product_id: id, size });
        if (error) console.error("Supabase error:", error);
      }
    }
  };

  const removeFromCart = async (id: number, size: string) => {
    setCartItems((prev) => {
      const updated = prev.filter((item) => !(item.id === id && item.size === size));
      localStorage.setItem("cart", JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent("cartUpdated"));
      return updated;
    });
    if (user) {
      const { error } = await supabase
        .from("cart")
        .delete()
        .match({ user_id: user.id, product_id: id, size });
      if (error) console.error("Supabase error:", error);
    }
  };

  const clearCart = async () => {
    setCartItems([]);
    localStorage.removeItem("cart");
    window.dispatchEvent(new CustomEvent("cartUpdated"));
    if (user) {
      const { error } = await supabase.from("cart").delete().eq("user_id", user.id);
      if (error) console.error("Supabase error:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

