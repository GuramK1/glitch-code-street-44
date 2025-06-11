
import { useEffect } from 'react';

export const useParallax = (selector: string, speed: number = 0.5) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const elements = document.querySelectorAll(selector);
      
      elements.forEach((element) => {
        const htmlElement = element as HTMLElement;
        htmlElement.style.transform = `translateY(${scrollTop * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selector, speed]);
};
