
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="bg-black text-white p-6 md:p-12 min-h-screen pt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">Terms of Service</h1>
          <p className="text-gray-300 mb-8">Effective Date: June 2025</p>

          <div className="space-y-6 text-gray-400 text-sm leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-white mb-3">Acceptance of Terms</h2>
              <p>
                By using 404Fit, you agree to the following terms and conditions. If you do not agree 
                with these terms, please do not use our website or services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Products and Availability</h2>
              <p className="mb-4">
                All purchases are subject to availability and shipping times. We reserve the right to 
                limit quantities and discontinue products at any time.
              </p>
              <p>
                Product images are for illustration purposes only. Actual products may vary slightly 
                in color, design, or fit due to manufacturing processes and display settings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Pricing and Payment</h2>
              <p className="mb-4">
                All prices are listed in USD and are subject to change without notice. We accept major 
                credit cards and other payment methods as displayed at checkout.
              </p>
              <p>
                You are responsible for any applicable taxes, duties, or customs fees based on your 
                shipping location.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Shipping and Delivery</h2>
              <p className="mb-4">
                Shipping times and costs vary by location and shipping method selected. We are not 
                responsible for delays caused by customs, weather, or other factors beyond our control.
              </p>
              <p>
                Risk of loss and title for items pass to you upon delivery to the shipping carrier.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Returns and Refunds</h2>
              <p className="mb-4">
                Refunds and returns are processed according to our Return Policy. Items must be in 
                original condition with tags attached.
              </p>
              <p>
                Custom or personalized items may not be eligible for return. Sale items may have 
                different return policies as specified at the time of purchase.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">User Conduct</h2>
              <p className="mb-4">You agree not to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use our website for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Post harmful, offensive, or inappropriate content</li>
                <li>Interfere with the proper functioning of our website</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Intellectual Property</h2>
              <p>
                All content on this website, including designs, logos, text, and images, is the property 
                of 404Fit and is protected by copyright and trademark laws. You may not use our content 
                without explicit permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Limitation of Liability</h2>
              <p>
                404Fit shall not be liable for any indirect, incidental, special, or consequential damages 
                arising from your use of our website or products. Our total liability shall not exceed 
                the amount you paid for the product in question.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Governing Law</h2>
              <p>
                These terms are governed by the laws of the jurisdiction where 404Fit is headquartered. 
                Any disputes will be resolved in the courts of that jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective 
                immediately upon posting. Your continued use of our website constitutes acceptance 
                of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at{' '}
                <a href="mailto:legal@404fit.com" className="text-red-500 hover:underline">
                  legal@404fit.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;
