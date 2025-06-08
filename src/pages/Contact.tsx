
import { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <section className="bg-jet-black text-white p-6 min-h-screen">
          <div className="max-w-4xl mx-auto py-16">
            <h1 className="text-4xl font-bold mb-6 text-white">Contact Us</h1>
            <p className="text-zinc-400 mb-12 text-lg">Get in touch with the 404 Fit team.</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-white">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                      Name
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-carbon-grey border-zinc-600 text-white placeholder-zinc-400"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-carbon-grey border-zinc-600 text-white placeholder-zinc-400"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                      Subject
                    </label>
                    <Input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-carbon-grey border-zinc-600 text-white placeholder-zinc-400"
                      placeholder="How can we help?"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full h-32 p-3 bg-carbon-grey border border-zinc-600 text-white placeholder-zinc-400 rounded-md focus:outline-none focus:ring-2 focus:ring-neon-blue focus:border-transparent"
                      placeholder="Tell us more about your inquiry..."
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-signal-red text-white py-3 rounded-xl hover:bg-signal-red/90 transition-all duration-300 hover:scale-105 font-semibold"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white">Get in touch</h3>
                  <div className="space-y-4 text-zinc-400">
                    <div>
                      <h4 className="font-semibold text-white">Email</h4>
                      <p>support@404fit.com</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Phone</h4>
                      <p>+1 (555) 404-0404</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Address</h4>
                      <p>404 Glitch Street<br />Los Angeles, CA 90210</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white">Business Hours</h3>
                  <div className="space-y-2 text-zinc-400">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM PST</p>
                    <p>Saturday: 10:00 AM - 4:00 PM PST</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
                
                <div className="bg-carbon-grey rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-3 text-white">Quick Response</h3>
                  <p className="text-zinc-400 text-sm">
                    We typically respond to all inquiries within 24 hours during business days. 
                    For urgent matters, please call us directly.
                  </p>
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

export default Contact;
