
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Shipping = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <section className="bg-jet-black text-white p-6 min-h-screen">
          <div className="max-w-4xl mx-auto py-16">
            <h1 className="text-4xl font-bold mb-6 text-white">Shipping Information</h1>
            <p className="text-zinc-400 mb-8 text-lg">Fast, reliable delivery worldwide.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-carbon-grey rounded-xl p-6">
                <h2 className="text-2xl font-semibold mb-4 text-white">Domestic Shipping (US)</h2>
                <ul className="space-y-3 text-zinc-400">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-signal-red rounded-full mr-3"></span>
                    Standard: 3-5 business days ($5.99)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-signal-red rounded-full mr-3"></span>
                    Express: 1-2 business days ($12.99)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-neon-blue rounded-full mr-3"></span>
                    FREE shipping on orders over $150
                  </li>
                </ul>
              </div>
              
              <div className="bg-carbon-grey rounded-xl p-6">
                <h2 className="text-2xl font-semibold mb-4 text-white">International Shipping</h2>
                <ul className="space-y-3 text-zinc-400">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-signal-red rounded-full mr-3"></span>
                    Canada: 5-7 business days ($15.99)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-signal-red rounded-full mr-3"></span>
                    Europe: 7-14 business days ($25.99)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-signal-red rounded-full mr-3"></span>
                    Rest of World: 10-21 business days ($35.99)
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-carbon-grey rounded-xl p-8">
              <h3 className="text-2xl font-semibold mb-6 text-white">Important Notes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-zinc-400">
                <div>
                  <h4 className="font-semibold text-white mb-2">Processing Time</h4>
                  <p>All orders are processed within 1-3 business days. Orders placed after 2 PM EST will be processed the next business day.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Tracking</h4>
                  <p>You'll receive a tracking number via email once your order ships. Track your package through our shipping partners.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Customs & Duties</h4>
                  <p>International customers may be responsible for customs duties and taxes imposed by their country.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Delivery Issues</h4>
                  <p>If your package is lost or damaged during shipping, contact us immediately and we'll resolve the issue.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Shipping;
