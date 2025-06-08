
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Returns = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <section className="bg-jet-black text-white p-6 min-h-screen">
          <div className="max-w-4xl mx-auto py-16">
            <h1 className="text-4xl font-bold mb-6 text-white" data-aos="fade-down">Returns & Exchanges</h1>
            <p className="text-zinc-400 mb-8 text-lg" data-aos="fade-down" data-aos-delay="100">Not satisfied? We've got you covered.</p>
            
            <div className="bg-carbon-grey rounded-xl p-8 mb-8" data-aos="fade-left" data-aos-delay="200">
              <h2 className="text-2xl font-semibold mb-4 text-white">Return Policy</h2>
              <div className="space-y-4 text-zinc-400">
                <p data-aos="fade-up" data-aos-delay="300">You may return items within <span className="text-white font-semibold">30 days</span> of delivery for a full refund or exchange.</p>
                <p data-aos="fade-up" data-aos-delay="350">Items must be in original condition with tags attached and in original packaging.</p>
                <p data-aos="fade-up" data-aos-delay="400">Final sale items, customized products, and underwear cannot be returned for hygiene reasons.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-carbon-grey rounded-xl p-6" data-aos="fade-right" data-aos-delay="250">
                <h3 className="text-xl font-semibold mb-4 text-white">Return Process</h3>
                <ol className="space-y-3 text-zinc-400">
                  <li className="flex items-start" data-aos="fade-up" data-aos-delay="450">
                    <span className="bg-signal-red text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">1</span>
                    Contact us to initiate your return
                  </li>
                  <li className="flex items-start" data-aos="fade-up" data-aos-delay="500">
                    <span className="bg-signal-red text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">2</span>
                    Print the prepaid return label we send you
                  </li>
                  <li className="flex items-start" data-aos="fade-up" data-aos-delay="550">
                    <span className="bg-signal-red text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">3</span>
                    Package items securely and attach label
                  </li>
                  <li className="flex items-start" data-aos="fade-up" data-aos-delay="600">
                    <span className="bg-signal-red text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">4</span>
                    Drop off at any authorized shipping location
                  </li>
                </ol>
              </div>
              
              <div className="bg-carbon-grey rounded-xl p-6" data-aos="fade-left" data-aos-delay="300">
                <h3 className="text-xl font-semibold mb-4 text-white">Refund Timeline</h3>
                <ul className="space-y-3 text-zinc-400">
                  <li className="flex items-center" data-aos="fade-up" data-aos-delay="650">
                    <span className="w-2 h-2 bg-neon-blue rounded-full mr-3"></span>
                    Processing: 2-3 business days after we receive your return
                  </li>
                  <li className="flex items-center" data-aos="fade-up" data-aos-delay="700">
                    <span className="w-2 h-2 bg-neon-blue rounded-full mr-3"></span>
                    Refund to original payment method: 5-10 business days
                  </li>
                  <li className="flex items-center" data-aos="fade-up" data-aos-delay="750">
                    <span className="w-2 h-2 bg-neon-blue rounded-full mr-3"></span>
                    Exchange shipping: 3-5 business days
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="text-center" data-aos="zoom-in" data-aos-delay="350">
              <button className="bg-signal-red text-white px-8 py-4 rounded-xl hover:bg-signal-red/90 transition-all duration-300 hover:scale-105 font-semibold text-lg">
                Request a Return
              </button>
              <p className="text-zinc-400 mt-4">Need help? Contact our support team at returns@404fit.com</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Returns;
