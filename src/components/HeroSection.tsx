
import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center no-scroll-x">
      {/* Background Image/Video Placeholder - Responsive */}
      <div className="absolute inset-0 bg-gradient-to-br from-carbon-grey via-jet-black to-carbon-grey">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGc+CjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEiIGZpbGw9IiMzMzMzMzMiIG9wYWNpdHk9IjAuMyIvPgo8L2c+Cjwvc3ZnPg==')] opacity-30"></div>
      </div>

      {/* Content - Fully Responsive with proper constraints */}
      <div className="relative z-10 text-center w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 tracking-tight">
              <span className="block text-signal-red">404</span>
              <span className="block text-gradient">FIT</span>
            </h1>
            
            <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-lg sm:text-xl md:text-2xl text-zinc-400 mb-6 sm:mb-8 tracking-wide px-2">
                NOT FOUND IN THE ORDINARY
              </p>
            </div>

            <div className={`transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <button className="btn-primary glow-on-hover">
                Shop Drop 001
              </button>
            </div>
          </div>

          {/* Scroll Indicator - Mobile Responsive */}
          <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="animate-bounce">
              <div className="w-4 h-8 sm:w-6 sm:h-10 border-2 border-zinc-300 rounded-full flex justify-center">
                <div className="w-1 h-2 sm:h-3 bg-zinc-300 rounded-full mt-1 sm:mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
