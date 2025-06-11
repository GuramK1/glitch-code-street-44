
import { useEffect } from 'react';

const GlitchCursor = () => {
  useEffect(() => {
    let isEnabled = true;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isEnabled) return;

      const glitch = document.createElement('div');
      glitch.className = 'glitch-dot';
      glitch.style.cssText = `
        position: fixed;
        left: ${e.clientX - 2.5}px;
        top: ${e.clientY - 2.5}px;
        width: 5px;
        height: 5px;
        background-color: #dc2626;
        opacity: 0.7;
        pointer-events: none;
        z-index: 9999;
        border-radius: 1px;
        animation: glitchFade 0.4s ease-out forwards;
      `;

      document.body.appendChild(glitch);

      setTimeout(() => {
        if (glitch.parentNode) {
          glitch.parentNode.removeChild(glitch);
        }
      }, 400);
    };

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes glitchFade {
        0% { 
          opacity: 0.7; 
          transform: scale(1); 
        }
        50% { 
          opacity: 0.4; 
          transform: scale(1.5); 
        }
        100% { 
          opacity: 0; 
          transform: scale(2); 
        }
      }
    `;
    document.head.appendChild(style);

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      isEnabled = false;
      document.removeEventListener('mousemove', handleMouseMove);
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  return null;
};

export default GlitchCursor;
