
import { useState, useEffect, useRef } from 'react';

const EditorialSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
          <div>
            <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
              <span className="text-black">STREETWEAR</span><br />
              <span className="text-black">IS </span><span className="text-signal-red">CODE</span>
            </h2>
            <p className="text-lg text-zinc-400 leading-relaxed mb-8">
              Every piece we create is a statement, a glitch in the matrix of conventional fashion. 
              We don't follow trends—we disrupt systems, challenge norms, and empower individuals 
              to express their authentic selves through bold, innovative design.
            </p>
            <button className="btn-secondary">
              Our Manifesto
            </button>
          </div>

          {/* Quote Card */}
          <div className="bg-white p-8 border border-gray-200 relative overflow-hidden rounded-xl hover:scale-105 transition-all duration-500 shadow-lg">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-signal-red to-neon-blue"></div>
            <blockquote className="text-2xl font-medium italic text-black leading-relaxed">
              "Your style is a glitch in the system"
            </blockquote>
            <cite className="block mt-4 text-sm text-gray-600 font-semibold tracking-wider uppercase">
              — 404 Fit Manifesto
            </cite>
          </div>
        </div>

        {/* Right Visual */}
        <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
          <div className="aspect-[4/5] bg-gradient-to-br from-carbon-grey to-jet-black rounded-xl overflow-hidden hover:scale-105 transition-all duration-700">
            <img
              src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=750&fit=crop"
              alt="Editorial fashion shot"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            
            {/* Overlay Text */}
            <div className="absolute bottom-8 left-8 right-8">
              <div className="bg-signal-red text-white px-4 py-2 inline-block text-xs font-bold tracking-wider uppercase mb-4 rounded-lg">
                Born in the Glitch
              </div>
              <h3 className="text-2xl font-bold text-white">
                Styled by the Streets
              </h3>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-neon-blue/30 rotate-45 rounded-lg animate-pulse"></div>
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-signal-red/20 rotate-12 rounded-lg animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default EditorialSection;
