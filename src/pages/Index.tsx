
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import ProductHighlights from '../components/ProductHighlights';
import EditorialSection from '../components/EditorialSection';
import ParallaxSection from '../components/ParallaxSection';
import Footer from '../components/Footer';
import ContinueWhereLeftOff from '../components/ContinueWhereLeftOff';
import CartReminder from '../components/CartReminder';

const Index = () => {
  return (
    <div className="min-h-screen bg-background no-scroll-x">
      <Navigation />
      <HeroSection />
      <ProductHighlights />
      
      {/* Enhanced Parallax Section with speed control */}
      <ParallaxSection 
        backgroundImage="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop"
        height="h-[300px]"
        speed={0.3}
      >
        <div className="text-center text-white px-4">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">Drop 002</h2>
          <p className="text-base sm:text-lg mb-6">Limited Edition Collection</p>
          <button className="btn-primary">Shop Now</button>
        </div>
      </ParallaxSection>
      
      <EditorialSection />
      
      {/* Enhanced Parallax Section - Newsletter signup */}
      <ParallaxSection 
        backgroundImage="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200&h=400&fit=crop"
        height="h-[250px]"
        speed={0.4}
      >
        <div className="absolute inset-0 bg-zinc-800/90"></div>
        <div className="relative text-center text-white px-4">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-2">Stay Updated</h2>
          <p className="text-base sm:text-lg">Get exclusive access to new drops and events</p>
        </div>
      </ParallaxSection>
      
      <Footer />
      
      {/* Interactive Features */}
      <ContinueWhereLeftOff />
      <CartReminder />
    </div>
  );
};

export default Index;
