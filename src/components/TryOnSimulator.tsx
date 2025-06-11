
import { useState } from 'react';
import { X, RotateCcw } from 'lucide-react';

interface TryOnSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number;
    name: string;
    image: string;
    category: string;
  };
}

const TryOnSimulator = ({ isOpen, onClose, product }: TryOnSimulatorProps) => {
  const [view, setView] = useState<'front' | 'back'>('front');
  const [isVisible, setIsVisible] = useState(false);

  // Only show for supported categories
  const supportedCategories = ['hoodies', 'tees'];
  const isSupported = supportedCategories.includes(product.category);

  if (!isOpen || !isSupported) return null;

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className={`bg-zinc-900 rounded-2xl p-6 max-w-md w-full transition-all duration-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Try On Simulator</h2>
          <button
            onClick={handleClose}
            className="text-zinc-400 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Model + Product Overlay */}
        <div className="relative w-[280px] h-[400px] mx-auto mb-6 bg-neutral-900 rounded-xl overflow-hidden">
          {/* Base Model Silhouette */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-80 bg-zinc-700 rounded-full opacity-30" style={{
              clipPath: 'ellipse(50px 200px at 50% 50%)'
            }}>
            </div>
          </div>
          
          {/* Model Outline (Simple SVG) */}
          <svg 
            className="absolute inset-0 w-full h-full z-10" 
            viewBox="0 0 280 400"
            fill="none"
          >
            <path 
              d="M140 50 C155 50 165 60 165 75 L165 100 L180 110 L180 200 L175 280 L175 350 L165 380 L155 390 L125 390 L115 380 L105 350 L105 280 L100 200 L100 110 L115 100 L115 75 C115 60 125 50 140 50 Z"
              stroke="#525252"
              strokeWidth="2"
              fill="none"
              opacity="0.6"
            />
          </svg>

          {/* Product Overlay */}
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <img 
              src={product.image}
              alt={`${product.name} overlay`}
              className="w-24 h-32 object-contain opacity-90 transition-all duration-300"
              style={{
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                transform: view === 'back' ? 'scaleX(-1)' : 'scaleX(1)'
              }}
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
          <p className="text-zinc-400 text-sm">Preview on model silhouette</p>
        </div>

        {/* Controls */}
        <div className="flex gap-3">
          <button
            onClick={() => setView(view === 'front' ? 'back' : 'front')}
            className="flex-1 bg-zinc-800 text-white py-3 px-4 rounded-xl font-medium hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            {view === 'front' ? 'Back View' : 'Front View'}
          </button>
          
          <button
            onClick={handleClose}
            className="bg-signal-red text-white py-3 px-6 rounded-xl font-medium hover:bg-red-600 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default TryOnSimulator;
