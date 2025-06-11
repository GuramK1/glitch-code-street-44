
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
  const targetEl = document.querySelector(targetSelector);
  if (!targetEl) return;
  
  const clone = sourceEl.cloneNode(true) as HTMLElement;
  const rect = sourceEl.getBoundingClientRect();
  const targetRect = targetEl.getBoundingClientRect();
  
  // Style the clone for animation
  clone.style.position = "fixed";
  clone.style.left = `${rect.left}px`;
  clone.style.top = `${rect.top}px`;
  clone.style.zIndex = "1000";
  clone.style.transition = "all 0.7s ease-in-out";
  clone.style.pointerEvents = "none";
  
  document.body.appendChild(clone);
  
  // Trigger animation
  requestAnimationFrame(() => {
    clone.style.left = `${targetRect.left}px`;
    clone.style.top = `${targetRect.top}px`;
    clone.style.opacity = "0";
    clone.style.transform = "scale(0.3)";
  });
  
  // Clean up
  setTimeout(() => {
    if (clone.parentNode) {
      clone.remove();
    }
  }, 800);
};
