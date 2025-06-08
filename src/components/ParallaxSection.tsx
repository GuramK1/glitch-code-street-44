
import React, { ReactNode } from 'react';

interface ParallaxSectionProps {
  backgroundImage: string;
  height?: string;
  children: ReactNode;
  overlay?: boolean;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ 
  backgroundImage, 
  height = 'h-[400px]', 
  children, 
  overlay = true 
}) => {
  return (
    <section 
      className={`relative ${height} bg-fixed bg-center bg-cover`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {overlay && <div className="absolute inset-0 bg-black/40" />}
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </section>
  );
};

export default ParallaxSection;
