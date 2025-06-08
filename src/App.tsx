
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Index from "./pages/Index";
import Drops from "./pages/Drops";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import ClubPage from "./pages/ClubPage";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Admin from "./pages/Admin";
import SizeGuide from "./pages/SizeGuide";
import Shipping from "./pages/Shipping";
import Returns from "./pages/Returns";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import BackToTopButton from "./components/BackToTopButton";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <AuthProvider>
            <WishlistProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/drops" element={<Drops />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:slug" element={<ProductDetail />} />
                  <Route path="/404-club" element={<ClubPage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/size-guide" element={<SizeGuide />} />
                  <Route path="/shipping" element={<Shipping />} />
                  <Route path="/returns" element={<Returns />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/faq" element={<FAQ />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <BackToTopButton />
              </BrowserRouter>
            </WishlistProvider>
          </AuthProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
