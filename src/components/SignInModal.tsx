
import { useState, useEffect, useRef } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignInModal = ({ isOpen, onClose }: SignInModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign in with:', { email, password });
    // Handle sign in logic here
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-50 ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}>
      <div 
        ref={modalRef}
        className={`bg-zinc-900 p-6 rounded-xl shadow-xl w-[90%] max-w-md text-white ${isClosing ? 'animate-slide-out-down' : 'animate-slide-in-up'}`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Sign In</h2>
          <button 
            onClick={handleClose}
            className="text-zinc-400 hover:text-white transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white placeholder-zinc-500 border border-zinc-700 focus:border-signal-red focus:ring-2 focus:ring-signal-red focus:outline-none transition-all duration-200"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-zinc-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-lg bg-zinc-800 text-white placeholder-zinc-500 border border-zinc-700 focus:border-signal-red focus:ring-2 focus:ring-signal-red focus:outline-none transition-all duration-200"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white transition-colors duration-200"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-signal-red text-white py-3 rounded-lg font-semibold hover:bg-signal-red/90 transition-colors duration-200 mt-6"
          >
            Sign In
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-zinc-400 text-sm">
            Don't have an account?{' '}
            <button className="text-signal-red hover:underline">
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
