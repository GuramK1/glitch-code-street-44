
import React, { ReactNode, useRef, useEffect } from 'react';

interface ParallaxSectionProps {
  backgroundImage: string;
  height?: string;
  children: ReactNode;
  overlay?: boolean;
  speed?: number;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ 
  backgroundImage, 
  height = 'h-[300px] sm:h-[400px]', 
  children, 
  overlay = true,
  speed = 0.5
}) => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current && window.innerWidth > 768) { // Only apply parallax on desktop
        const scrollTop = window.scrollY;
        const rect = bgRef.current.getBoundingClientRect();
        const elementTop = rect.top + scrollTop;
        const elementHeight = rect.height;
        
        if (scrollTop + window.innerHeight > elementTop && scrollTop < elementTop + elementHeight) {
          const yPos = -(scrollTop - elementTop) * speed;
          bgRef.current.style.backgroundPosition = `center ${yPos}px`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <section 
      ref={bgRef}
      className={`relative ${height} bg-center bg-cover overflow-hidden no-scroll-x`}
      style={{ 
        backgroundImage: `url(${backgroundImage})`,
        backgroundAttachment: window.innerWidth > 768 ? 'fixed' : 'scroll' // Disable fixed on mobile
      }}
    >
      {overlay && <div className="absolute inset-0 bg-black/40" />}
      <div className="absolute inset-0 flex items-center justify-center container-responsive">
        <div className="text-center">
          {children}
        </div>
      </div>
    </section>
  );
};

export default ParallaxSection;
