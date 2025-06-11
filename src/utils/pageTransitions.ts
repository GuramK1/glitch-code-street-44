
export const createPageTransition = (targetUrl: string, delay: number = 300) => {
  return new Promise<void>((resolve) => {
    // Add exit animation class to body
    document.body.classList.add('page-exit');
    
    // Wait for animation to complete, then navigate
    setTimeout(() => {
      window.location.href = targetUrl;
      resolve();
    }, delay);
  });
};

export const animateToTarget = (sourceEl: HTMLElement, targetSelector: string) => {
  console.log('🎯 Animation started:', { sourceEl, targetSelector });
  
  const targetEl = document.querySelector(targetSelector);
  if (!targetEl) {
    console.error('❌ Target element not found:', targetSelector);
    // Fallback animation - just scale the source element
    sourceEl.style.transform = 'scale(0.8)';
    sourceEl.style.transition = 'transform 0.2s ease-out';
    setTimeout(() => {
      sourceEl.style.transform = '';
      sourceEl.style.transition = '';
    }, 200);
    return;
  }

  console.log('✅ Target element found:', targetEl);
  
  // Get accurate positions with scroll offset
  const sourceRect = sourceEl.getBoundingClientRect();
  const targetRect = targetEl.getBoundingClientRect();
  const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollY = window.pageYOffset || document.documentElement.scrollTop;
  
  console.log('📍 Positions:', { 
    source: sourceRect, 
    target: targetRect,
    scroll: { x: scrollX, y: scrollY }
  });
  
  // Create a more visible clone
  const clone = sourceEl.cloneNode(true) as HTMLElement;
  
  // Enhanced styling for better visibility
  Object.assign(clone.style, {
    position: 'fixed',
    left: `${sourceRect.left}px`,
    top: `${sourceRect.top}px`,
    width: `${sourceRect.width}px`,
    height: `${sourceRect.height}px`,
    zIndex: '9999',
    pointerEvents: 'none',
    transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    background: '#ef4444',
    border: '2px solid #dc2626',
    borderRadius: '50%',
    transform: 'scale(1)',
    opacity: '0.9',
    boxShadow: '0 0 20px rgba(239, 68, 68, 0.6)',
  });
  
  document.body.appendChild(clone);
  console.log('🎭 Clone created and added to DOM');
  
  // Force reflow to ensure initial position is set
  clone.offsetHeight;
  
  // Start animation after a brief delay
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      console.log('🚀 Animation triggered');
      
      // Calculate target position (center of target element)
      const targetCenterX = targetRect.left + (targetRect.width / 2) - (sourceRect.width / 2);
      const targetCenterY = targetRect.top + (targetRect.height / 2) - (sourceRect.height / 2);
      
      Object.assign(clone.style, {
        left: `${targetCenterX}px`,
        top: `${targetCenterY}px`,
        transform: 'scale(0.2)',
        opacity: '0',
      });
      
      console.log('🎯 Moving to:', { x: targetCenterX, y: targetCenterY });
    });
  });
  
  // Enhanced cleanup with animation complete callback
  const cleanup = () => {
    if (clone && clone.parentNode) {
      console.log('🧹 Cleaning up clone');
      clone.remove();
    }
  };
  
  // Listen for animation end
  clone.addEventListener('transitionend', cleanup, { once: true });
  
  // Backup cleanup in case transitionend doesn't fire
  setTimeout(cleanup, 1000);
  
  console.log('⏰ Animation cleanup scheduled');
};

export const animateFromTarget = (targetSelector: string, destinationPoint?: { x: number, y: number }) => {
  console.log('🔄 Reverse animation started from:', targetSelector);
  
  const sourceEl = document.querySelector(targetSelector);
  if (!sourceEl) {
    console.error('❌ Source element not found:', targetSelector);
    return;
  }

  console.log('✅ Source element found:', sourceEl);
  
  const sourceRect = sourceEl.getBoundingClientRect();
  
  // Create a clone at the source position
  const clone = sourceEl.cloneNode(true) as HTMLElement;
  
  // Style the clone to look like a heart flying away
  Object.assign(clone.style, {
    position: 'fixed',
    left: `${sourceRect.left + sourceRect.width / 2 - 10}px`,
    top: `${sourceRect.top + sourceRect.height / 2 - 10}px`,
    width: '20px',
    height: '20px',
    zIndex: '9999',
    pointerEvents: 'none',
    transition: 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    background: '#ef4444',
    border: '2px solid #dc2626',
    borderRadius: '50%',
    transform: 'scale(1)',
    opacity: '0.9',
    boxShadow: '0 0 20px rgba(239, 68, 68, 0.6)',
  });
  
  document.body.appendChild(clone);
  console.log('🎭 Reverse clone created and added to DOM');
  
  // Force reflow
  clone.offsetHeight;
  
  // Start the reverse animation
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      console.log('🚀 Reverse animation triggered');
      
      // Calculate destination (random point away from the wishlist icon)
      const destinationX = destinationPoint?.x ?? (sourceRect.left + (Math.random() - 0.5) * 400);
      const destinationY = destinationPoint?.y ?? (sourceRect.top + 200 + Math.random() * 200);
      
      Object.assign(clone.style, {
        left: `${destinationX}px`,
        top: `${destinationY}px`,
        transform: 'scale(0.1) rotate(360deg)',
        opacity: '0',
      });
      
      console.log('🎯 Flying away to:', { x: destinationX, y: destinationY });
    });
  });
  
  // Cleanup
  const cleanup = () => {
    if (clone && clone.parentNode) {
      console.log('🧹 Cleaning up reverse clone');
      clone.remove();
    }
  };
  
  clone.addEventListener('transitionend', cleanup, { once: true });
  setTimeout(cleanup, 1500);
  
  console.log('⏰ Reverse animation cleanup scheduled');
};
