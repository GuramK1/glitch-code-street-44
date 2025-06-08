
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Navigation />
      
      <div className="pt-16">
        {/* Hero Section */}
        <div className="relative bg-zinc-950 text-white py-24 px-4 overflow-hidden" data-aos="fade-up">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black opacity-90" />
          <div className="relative max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6" data-aos="fade-up" data-aos-delay="100">
              About <span className="text-red-500">404</span> Fit
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="200">
              Born in the glitch. Styled by the streets. We don't follow trends — we rewrite systems.
            </p>
          </div>
          
          {/* Glitch effect decorations */}
          <div className="absolute top-20 left-10 text-red-500 opacity-30 text-6xl font-mono" data-aos="fade-right" data-aos-delay="300">404</div>
          <div className="absolute bottom-20 right-10 text-red-500 opacity-20 text-4xl font-mono" data-aos="fade-left" data-aos-delay="400">ERROR</div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-16 space-y-16">
          {/* Mission Statement */}
          <section className="text-center" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-white mb-8" data-aos="fade-up" data-aos-delay="100">Not Found in the Ordinary</h2>
            <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
              404 Fit is the uniform of the undefined. We create streetwear for those who exist 
              outside the algorithm, who find beauty in broken systems, and who wear their errors 
              as badges of honor. Every piece tells the story of digital misfits navigating an 
              analog world.
            </p>
          </section>

          {/* Timeline */}
          <section data-aos="fade-left">
            <h2 className="text-3xl font-bold text-white mb-12 text-center" data-aos="fade-up">Our Journey</h2>
            <div className="space-y-8">
              <div className="border-l-2 border-red-500 pl-8 relative" data-aos="fade-right" data-aos-delay="100">
                <div className="absolute -left-2 top-0 w-4 h-4 bg-red-500 rounded-full"></div>
                <h3 className="text-xl font-semibold text-white mb-2">2024 - Born in the Glitch</h3>
                <p className="text-zinc-400">
                  Founded by a collective of digital natives who saw beauty in error messages 
                  and found inspiration in system failures. What started as a joke about 404 
                  pages became a movement.
                </p>
              </div>

              <div className="border-l-2 border-zinc-800 pl-8 relative" data-aos="fade-right" data-aos-delay="200">
                <div className="absolute -left-2 top-0 w-4 h-4 bg-zinc-600 rounded-full"></div>
                <h3 className="text-xl font-semibold text-white mb-2">Streetwear Meets Error Culture</h3>
                <p className="text-zinc-400">
                  We discovered that the aesthetics of broken code, glitched graphics, and 
                  system errors resonated with a generation raised on screens. Our designs 
                  celebrate the beauty of digital imperfection.
                </p>
              </div>

              <div className="border-l-2 border-zinc-800 pl-8 relative" data-aos="fade-right" data-aos-delay="300">
                <div className="absolute -left-2 top-0 w-4 h-4 bg-zinc-600 rounded-full"></div>
                <h3 className="text-xl font-semibold text-white mb-2">Built by Outcasts for Misfits</h3>
                <p className="text-zinc-400">
                  Every hoodie, every tee, every drop is designed by and for people who don't 
                  fit into neat categories. We're the kids who were told we didn't belong, 
                  now creating a space where not belonging is the point.
                </p>
              </div>
            </div>
          </section>

          {/* Philosophy */}
          <section className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800" data-aos="zoom-in">
            <h2 className="text-3xl font-bold text-white mb-8 text-center" data-aos="fade-up">Our Philosophy</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center" data-aos="flip-up" data-aos-delay="100">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-lg font-semibold text-white mb-2">Embrace the Error</h3>
                <p className="text-zinc-400 text-sm">
                  Mistakes aren't failures—they're features. We celebrate the unexpected 
                  and find art in the unintended.
                </p>
              </div>
              
              <div className="text-center" data-aos="flip-up" data-aos-delay="200">
                <div className="text-4xl mb-4">🔧</div>
                <h3 className="text-lg font-semibold text-white mb-2">Hack the System</h3>
                <p className="text-zinc-400 text-sm">
                  Fashion rules are code waiting to be rewritten. We break conventions 
                  and build something better from the pieces.
                </p>
              </div>
              
              <div className="text-center" data-aos="flip-up" data-aos-delay="300">
                <div className="text-4xl mb-4">🌐</div>
                <h3 className="text-lg font-semibold text-white mb-2">Connect the Disconnected</h3>
                <p className="text-zinc-400 text-sm">
                  We link the misfits, the outcasts, the 404s of the world into 
                  something stronger than any mainstream trend.
                </p>
              </div>
            </div>
          </section>

          {/* Values */}
          <section data-aos="fade-up">
            <h2 className="text-3xl font-bold text-white mb-8 text-center" data-aos="fade-up">What We Stand For</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4" data-aos="fade-right" data-aos-delay="100">
                <span className="text-red-500 text-xl font-mono">{'>'}</span>
                <div>
                  <h3 className="text-white font-semibold mb-1">Authenticity Over Algorithm</h3>
                  <p className="text-zinc-400">Real style can't be coded. We celebrate genuine expression over viral trends.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4" data-aos="fade-right" data-aos-delay="200">
                <span className="text-red-500 text-xl font-mono">{'>'}</span>
                <div>
                  <h3 className="text-white font-semibold mb-1">Quality Over Quantity</h3>
                  <p className="text-zinc-400">Every piece is crafted to last, designed to tell a story, built to be worn with pride.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4" data-aos="fade-right" data-aos-delay="300">
                <span className="text-red-500 text-xl font-mono">{'>'}</span>
                <div>
                  <h3 className="text-white font-semibold mb-1">Community Over Commerce</h3>
                  <p className="text-zinc-400">We're building a culture, not just selling clothes. The 404 Club is family.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4" data-aos="fade-right" data-aos-delay="400">
                <span className="text-red-500 text-xl font-mono">{'>'}</span>
                <div>
                  <h3 className="text-white font-semibold mb-1">Innovation Over Imitation</h3>
                  <p className="text-zinc-400">We create the unexpected, design the undefined, and wear the impossible.</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-red-900/20 to-zinc-900/20 rounded-2xl p-12 border border-red-500/20" data-aos="zoom-in-up">
            <h2 className="text-3xl font-bold text-white mb-4" data-aos="fade-up" data-aos-delay="100">Join the Error Culture</h2>
            <p className="text-zinc-400 mb-8 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
              Ready to embrace the glitch? Join thousands of digital misfits who've made 404 their home page.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="300">
              <button className="bg-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-500 transition-colors">
                Shop the Collection
              </button>
              <button className="border border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition-colors">
                Join the Club
              </button>
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
