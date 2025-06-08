
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Shipping = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <section className="bg-jet-black text-white p-6 min-h-screen">
          <div className="max-w-4xl mx-auto py-16">
            <h1 className="text-4xl font-bold mb-6 text-white" data-aos="fade-down">Shipping Information</h1>
            <p className="text-zinc-400 mb-8 text-lg" data-aos="fade-down" data-aos-delay="100">Fast, reliable delivery worldwide.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-carbon-grey rounded-xl p-6" data-aos="fade-up" data-aos-delay="200">
                <h2 className="text-2xl font-semibold mb-4 text-white">Domestic Shipping (US)</h2>
                <ul className="space-y-3 text-zinc-400">
                  <li className="flex items-center" data-aos="fade-up" data-aos-delay="300">
                    <span className="w-2 h-2 bg-signal-red rounded-full mr-3"></span>
                    Standard: 3-5 business days ($5.99)
                  </li>
                  <li className="flex items-center" data-aos="fade-up" data-aos-delay="350">
                    <span className="w-2 h-2 bg-signal-red rounded-full mr-3"></span>
                    Express: 1-2 business days ($12.99)
                  </li>
                  <li className="flex items-center" data-aos="fade-up" data-aos-delay="400">
                    <span className="w-2 h-2 bg-neon-blue rounded-full mr-3"></span>
                    FREE shipping on orders over $150
                  </li>
                </ul>
              </div>
              
              <div className="bg-carbon-grey rounded-xl p-6" data-aos="fade-up" data-aos-delay="250">
                <h2 className="text-2xl font-semibold mb-4 text-white">International Shipping</h2>
                <ul className="space-y-3 text-zinc-400">
                  <li className="flex items-center" data-aos="fade-up" data-aos-delay="450">
                    <span className="w-2 h-2 bg-signal-red rounded-full mr-3"></span>
                    Canada: 5-7 business days ($15.99)
                  </li>
                  <li className="flex items-center" data-aos="fade-up" data-aos-delay="500">
                    <span className="w-2 h-2 bg-signal-red rounded-full mr-3"></span>
                    Europe: 7-14 business days ($25.99)
                  </li>
                  <li className="flex items-center" data-aos="fade-up" data-aos-delay="550">
                    <span className="w-2 h-2 bg-signal-red rounded-full mr-3"></span>
                    Rest of World: 10-21 business days ($35.99)
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-carbon-grey rounded-xl p-8" data-aos="zoom-in" data-aos-delay="600">
              <h3 className="text-2xl font-semibold mb-6 text-white">Important Notes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-zinc-400">
                <div data-aos="fade-up" data-aos-delay="650">
                  <h4 className="font-semibold text-white mb-2">Processing Time</h4>
                  <p>All orders are processed within 1-3 business days. Orders placed after 2 PM EST will be processed the next business day.</p>
                </div>
                <div data-aos="fade-up" data-aos-delay="700">
                  <h4 className="font-semibold text-white mb-2">Tracking</h4>
                  <p>You'll receive a tracking number via email once your order ships. Track your package through our shipping partners.</p>
                </div>
                <div data-aos="fade-up" data-aos-delay="750">
                  <h4 className="font-semibold text-white mb-2">Customs & Duties</h4>
                  <p>International customers may be responsible for customs duties and taxes imposed by their country.</p>
                </div>
                <div data-aos="fade-up" data-aos-delay="800">
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
