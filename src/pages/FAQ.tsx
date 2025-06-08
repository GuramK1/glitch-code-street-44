
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqData = [
    {
      question: "How do I track my order?",
      answer: "You will receive an email with tracking information once your order ships. You can also log into your account to view order status and tracking details."
    },
    {
      question: "What's your return policy?",
      answer: "We offer a 30-day return policy for all items in original condition with tags attached. Returns are free for US customers, and we provide prepaid return labels."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes! We ship worldwide. International shipping costs vary by location and are calculated at checkout. Delivery times range from 7-21 business days depending on your location."
    },
    {
      question: "How do I know what size to order?",
      answer: "Check out our detailed size guide which includes measurements for all our items. If you're between sizes, we generally recommend sizing up for a more relaxed fit."
    },
    {
      question: "When will my order ship?",
      answer: "Orders typically ship within 1-3 business days. During peak seasons or new drops, processing may take 3-5 business days. You'll receive a shipping confirmation email with tracking info."
    },
    {
      question: "Do you restock sold-out items?",
      answer: "Some items may be restocked, but many of our drops are limited edition. Sign up for restock notifications on product pages or follow our social media for updates on new drops."
    },
    {
      question: "How can I join the 404 Club?",
      answer: "The 404 Club is our exclusive membership program. You can apply through our website or get automatic access with purchases over $500. Members get early access to drops and exclusive perks."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and Shop Pay. All payments are processed securely."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <section className="bg-jet-black text-white p-6 min-h-screen">
          <div className="max-w-4xl mx-auto py-16">
            <h1 className="text-4xl font-bold mb-6 text-white" data-aos="fade-down">Frequently Asked Questions</h1>
            <p className="text-zinc-400 mb-12 text-lg" data-aos="fade-down" data-aos-delay="100">Quick answers to common questions about 404 Fit.</p>
            
            <div className="space-y-4">
              {faqData.map((item, index) => (
                <div key={index} className="bg-carbon-grey rounded-xl overflow-hidden" data-aos="fade-up" data-aos-delay={200 + (index * 50)}>
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-zinc-800 transition-colors duration-300"
                  >
                    <h3 className="text-lg font-semibold text-white pr-4">{item.question}</h3>
                    {openItems.includes(index) ? (
                      <ChevronUp className="w-5 h-5 text-neon-blue flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-neon-blue flex-shrink-0" />
                    )}
                  </button>
                  {openItems.includes(index) && (
                    <div className="px-6 pb-6">
                      <p className="text-zinc-400 leading-relaxed">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-16 bg-carbon-grey rounded-xl p-8 text-center" data-aos="zoom-in" data-aos-delay="600">
              <h2 className="text-2xl font-semibold mb-4 text-white">Still have questions?</h2>
              <p className="text-zinc-400 mb-6">Can't find the answer you're looking for? Our support team is here to help.</p>
              <a 
                href="/contact"
                className="inline-block bg-signal-red text-white px-8 py-4 rounded-xl hover:bg-signal-red/90 transition-all duration-300 hover:scale-105 font-semibold"
              >
                Contact Support
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
