
import { useState, useEffect, useRef } from 'react';
import { X, Ruler } from 'lucide-react';

interface SizingAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onSizeSelect: (size: string) => void;
}

const SizingAssistant = ({ isOpen, onClose, onSizeSelect }: SizingAssistantProps) => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [fit, setFit] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const suggestSize = () => {
    // Simple size logic based on inputs
    let recommendedSize = 'M';
    
    if (height === '150-160cm' && weight === '50-60kg') {
      recommendedSize = fit === 'oversized' ? 'L' : 'S';
    } else if (height === '160-170cm' && weight === '60-70kg') {
      recommendedSize = fit === 'oversized' ? 'XL' : 'M';
    } else if (height === '170-180cm' && weight === '70-80kg') {
      recommendedSize = fit === 'oversized' ? 'XXL' : 'L';
    } else if (height === '180cm+' && weight === '80kg+') {
      recommendedSize = fit === 'oversized' ? 'XXL' : 'XL';
    }

    setSuggestion(`We recommend: Size ${recommendedSize}`);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
      // Reset form when modal closes
      setHeight('');
      setWeight('');
      setFit('');
      setSuggestion('');
    }, 300);
  };

  const handleSelectSize = () => {
    const size = suggestion.split('Size ')[1];
    if (size) {
      onSizeSelect(size);
      handleClose();
    }
  };

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  return (
    <div className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center transition-all duration-300 ${
      isOpen && !isClosing ? 'opacity-100' : 'opacity-0'
    }`}>
      <div 
        ref={modalRef}
        className={`bg-zinc-900 border border-zinc-800 p-6 rounded-xl max-w-sm w-full mx-4 text-white shadow-2xl transition-all duration-300 ${
          isOpen && !isClosing 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-4'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-signal-red" />
            <h2 className="text-lg font-bold">Find Your Size</h2>
          </div>
          <button onClick={handleClose} className="text-zinc-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Height</label>
            <select 
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:border-signal-red focus:outline-none"
            >
              <option value="">Select height</option>
              <option value="150-160cm">150-160cm</option>
              <option value="160-170cm">160-170cm</option>
              <option value="170-180cm">170-180cm</option>
              <option value="180cm+">180cm+</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Weight</label>
            <select 
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:border-signal-red focus:outline-none"
            >
              <option value="">Select weight</option>
              <option value="50-60kg">50-60kg</option>
              <option value="60-70kg">60-70kg</option>
              <option value="70-80kg">70-80kg</option>
              <option value="80kg+">80kg+</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Preferred Fit</label>
            <select 
              value={fit}
              onChange={(e) => setFit(e.target.value)}
              className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:border-signal-red focus:outline-none"
            >
              <option value="">Select fit</option>
              <option value="slim">Slim Fit</option>
              <option value="regular">Regular Fit</option>
              <option value="oversized">Oversized</option>
            </select>
          </div>

          <button 
            onClick={suggestSize}
            disabled={!height || !weight || !fit}
            className="w-full bg-signal-red text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Get Size Recommendation
          </button>

          {suggestion && (
            <div className="bg-zinc-800 border border-zinc-700 p-4 rounded-lg text-center">
              <p className="font-bold text-signal-red text-lg">{suggestion}</p>
              <button 
                onClick={handleSelectSize}
                className="mt-3 bg-zinc-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-zinc-600 transition-colors"
              >
                Select This Size
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SizingAssistant;
