
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="bg-black text-white min-h-screen pt-24">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-300 mb-8">Effective Date: June 2025</p>

          <div className="space-y-8 text-gray-400 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3 border-b border-gray-700 pb-2">Information We Collect</h2>
              <p className="mb-4">
                404Fit respects your privacy. We collect limited personal information for order processing, 
                including your name, email address, shipping address, and payment information when you make a purchase.
              </p>
              <p>
                We also collect information about your browsing behavior on our website to improve your shopping 
                experience and provide personalized recommendations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3 border-b border-gray-700 pb-2">How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Process and fulfill your orders</li>
                <li>Send order confirmations and shipping updates</li>
                <li>Provide customer support</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Prevent fraud and ensure security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3 border-b border-gray-700 pb-2">Cookies and Tracking</h2>
              <p className="mb-4">
                We use cookies to improve your shopping experience, remember your preferences, and analyze 
                website traffic. You can control cookie settings through your browser.
              </p>
              <p>
                We may use third-party analytics services like Google Analytics to understand how visitors 
                interact with our website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3 border-b border-gray-700 pb-2">Data Sharing</h2>
              <p className="mb-4">
                We do not sell your personal data to third parties. We may share your information with:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Payment processors to handle transactions</li>
                <li>Shipping partners to deliver your orders</li>
                <li>Service providers who help us operate our business</li>
                <li>Law enforcement when required by law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3 border-b border-gray-700 pb-2">Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. However, no method of transmission 
                over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3 border-b border-gray-700 pb-2">Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Access the personal information we have about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt out of marketing communications</li>
                <li>Data portability where applicable</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3 border-b border-gray-700 pb-2">Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material 
                changes by posting the new policy on this page and updating the effective date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3 border-b border-gray-700 pb-2">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at{' '}
                <a href="mailto:privacy@404fit.com" className="text-red-500 hover:underline">
                  privacy@404fit.com
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

export default PrivacyPolicy;
