
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import ProductHighlights from '../components/ProductHighlights';
import CommunitySection from '../components/CommunitySection';
import EditorialSection from '../components/EditorialSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <ProductHighlights />
      <EditorialSection />
      <CommunitySection />
      <Footer />
    </div>
  );
};

export default Index;
