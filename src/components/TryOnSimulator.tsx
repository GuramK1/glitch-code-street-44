
import { useState, useEffect } from 'react';
import { X, RotateCcw } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

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
  const [selectedVariant, setSelectedVariant] = useState('default');

  // Only show for supported categories
  const supportedCategories = ['hoodies', 'tees'];
  const isSupported = supportedCategories.includes(product.category);

  // Fix the dark screen issue by setting isVisible when modal opens
  useEffect(() => {
    if (isOpen && isSupported) {
      const timer = setTimeout(() => setIsVisible(true), 50);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOpen, isSupported]);

  // Mock color variants for the product
  const productVariants = {
    default: { name: 'Original', image: product.image },
    black: { name: 'Black', image: product.image },
    white: { name: 'White', image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop" },
    red: { name: 'Red', image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop" }
  };

  if (!isOpen || !isSupported) return null;

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  };

  const currentVariant = productVariants[selectedVariant as keyof typeof productVariants] || productVariants.default;

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
          {/* Enhanced Model Silhouette */}
          <svg 
            className="absolute inset-0 w-full h-full z-10" 
            viewBox="0 0 280 400"
            fill="none"
          >
            {/* More realistic human silhouette */}
            <path 
              d="M140 40 C155 40 170 50 170 70 C170 75 168 80 165 82 L165 95 L180 105 L185 120 L185 180 L180 240 L175 280 L172 320 L170 360 L165 380 L160 390 L155 395 L125 395 L120 390 L115 380 L110 360 L108 320 L105 280 L100 240 L95 180 L95 120 L100 105 L115 95 L115 82 C112 80 110 75 110 70 C110 50 125 40 140 40 Z"
              stroke="#525252"
              strokeWidth="2"
              fill="rgba(82, 82, 82, 0.1)"
              opacity="0.8"
            />
            
            {/* Arms */}
            <path 
              d="M95 120 L75 130 L70 140 L75 200 L85 210 L95 200 L95 180"
              stroke="#525252"
              strokeWidth="2"
              fill="none"
              opacity="0.6"
            />
            <path 
              d="M185 120 L205 130 L210 140 L205 200 L195 210 L185 200 L185 180"
              stroke="#525252"
              strokeWidth="2"
              fill="none"
              opacity="0.6"
            />
            
            {/* Legs */}
            <path 
              d="M125 395 L125 450 L120 470 L115 480 L110 485"
              stroke="#525252"
              strokeWidth="2"
              fill="none"
              opacity="0.6"
            />
            <path 
              d="M155 395 L155 450 L160 470 L165 480 L170 485"
              stroke="#525252"
              strokeWidth="2"
              fill="none"
              opacity="0.6"
            />
          </svg>

          {/* Product Overlay */}
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <img 
              src={currentVariant.image}
              alt={`${product.name} overlay`}
              className="w-28 h-36 object-contain opacity-90 transition-all duration-300"
              style={{
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                transform: view === 'back' ? 'scaleX(-1)' : 'scaleX(1)',
                marginTop: '-20px'
              }}
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
          <p className="text-zinc-400 text-sm">Preview on model silhouette</p>
          <p className="text-zinc-300 text-xs mt-1">Variant: {currentVariant.name}</p>
        </div>

        {/* Variant Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Color Variant
          </label>
          <Select value={selectedVariant} onValueChange={setSelectedVariant}>
            <SelectTrigger className="w-full bg-zinc-800 border-zinc-700 text-white">
              <SelectValue placeholder="Select variant" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-700">
              {Object.entries(productVariants).map(([key, variant]) => (
                <SelectItem key={key} value={key} className="text-white hover:bg-zinc-700">
                  {variant.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
