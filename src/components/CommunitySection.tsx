
import { useState, useEffect, useRef } from 'react';

const CommunitySection = () => {
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

  const communityImages = [
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1494790108755-2616c64a6e5e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1534308143481-c55c12503efc?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop"
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-carbon-grey">
      <div className="max-w-7xl mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white">
            <span className="text-signal-red">404</span> CLUB
          </h2>
          <p className="text-zinc-400 text-lg max-w-3xl mx-auto mb-8">
            Join a community of rebels, creators, and style innovators. Share your fits, get featured, and be part of the movement that's redefining streetwear culture.
          </p>
          <div className="inline-block bg-neon-blue text-black px-6 py-2 text-sm font-bold tracking-wider uppercase rounded-xl">
            #404CLUB
          </div>
        </div>

        {/* Community Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {communityImages.map((image, index) => (
            <div 
              key={index}
              className={`aspect-square overflow-hidden bg-muted rounded-xl group cursor-pointer transition-all duration-700 hover:scale-110 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <img
                src={image}
                alt={`Community member ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center">
            <div className="text-4xl font-bold text-neon-blue mb-2">12.5K</div>
            <div className="text-zinc-400 uppercase tracking-wider">Members</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-signal-red mb-2">3.2K</div>
            <div className="text-zinc-400 uppercase tracking-wider">Posts This Month</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">89</div>
            <div className="text-zinc-400 uppercase tracking-wider">Countries</div>
          </div>
        </div>

        {/* CTA */}
        <div className={`text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button className="btn-primary glow-on-hover mr-4">
            Join 404 Club
          </button>
          <button className="btn-secondary">
            Submit Your Fit
          </button>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
