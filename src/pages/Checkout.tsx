import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navigation from '../components/Navigation';
import { Minus, Plus, Trash2, CreditCard, Truck, ShieldCheck } from 'lucide-react';
import { createPageTransition } from '../utils/pageTransitions';

const Checkout = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Page entrance animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Load cart items
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(savedCart);
  }, []);

  // Update cart item quantity
  const updateQuantity = (id: number, size: string, change: number) => {
    const updatedCart = cartItems.map((item: any) => 
      item.id === id && item.size === size
        ? { ...item, quantity: Math.max(0, item.quantity + change) }
        : item
    ).filter((item: any) => item.quantity > 0);
    
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  // Remove item from cart
  const removeItem = (id: number, size: string) => {
    const updatedCart = cartItems.filter((item: any) => !(item.id === id && item.size === size));
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item: any) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // Handle continue shopping with transition
  const handleContinueShopping = async () => {
    await createPageTransition('/shop', 300);
  };

  // Handle order placement
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Mock order processing
    setTimeout(() => {
      const orderId = Math.floor(Math.random() * 100000);
      
      // Save order to localStorage (mock backend)
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const newOrder = {
        id: orderId,
        date: new Date().toISOString().split('T')[0],
        items: cartItems,
        total: total,
        status: 'Processing',
        shippingInfo,
        paymentInfo: { ...paymentInfo, cardNumber: '**** **** **** ' + paymentInfo.cardNumber.slice(-4) }
      };
      existingOrders.push(newOrder);
      localStorage.setItem('orders', JSON.stringify(existingOrders));

      // Clear cart
      localStorage.removeItem('cart');
      setCartItems([]);
      window.dispatchEvent(new CustomEvent('cartUpdated'));

      setIsProcessing(false);
      alert(`Order placed successfully! Order ID: #${orderId}`);
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className={`min-h-screen bg-zinc-950 transition-all duration-500 ${isPageLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
        <Navigation />
        <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Your cart is empty</h1>
            <p className="text-zinc-400 mb-8">Add some items to your cart to proceed with checkout</p>
            <button 
              onClick={handleContinueShopping}
              className="bg-signal-red text-white px-8 py-3 rounded-lg font-semibold hover:bg-signal-red/90 transition-colors duration-200"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-zinc-950 transition-all duration-500 ${isPageLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
      <Navigation />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">Checkout</h1>
          
          <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Forms */}
            <div className="space-y-8">
              {/* Shipping Information */}
              <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                <div className="flex items-center gap-3 mb-6">
                  <Truck className="w-6 h-6 text-signal-red" />
                  <h2 className="text-xl font-semibold text-white">Shipping Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={shippingInfo.fullName}
                      onChange={(e) => setShippingInfo({...shippingInfo, fullName: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-signal-red focus:outline-none transition-colors duration-200"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Address</label>
                    <input
                      type="text"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-signal-red focus:outline-none transition-colors duration-200"
                      placeholder="Street address"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">City</label>
                    <input
                      type="text"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-signal-red focus:outline-none transition-colors duration-200"
                      placeholder="City"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">ZIP Code</label>
                    <input
                      type="text"
                      value={shippingInfo.zipCode}
                      onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-signal-red focus:outline-none transition-colors duration-200"
                      placeholder="ZIP code"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="w-6 h-6 text-signal-red" />
                  <h2 className="text-xl font-semibold text-white">Payment Information</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Name on Card</label>
                    <input
                      type="text"
                      value={paymentInfo.nameOnCard}
                      onChange={(e) => setPaymentInfo({...paymentInfo, nameOnCard: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-signal-red focus:outline-none transition-colors duration-200"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Card Number</label>
                    <input
                      type="text"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-signal-red focus:outline-none transition-colors duration-200"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-signal-red focus:outline-none transition-colors duration-200"
                        placeholder="MM/YY"
                        maxLength={5}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">CVV</label>
                      <input
                        type="text"
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-signal-red focus:outline-none transition-colors duration-200"
                        placeholder="123"
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:sticky lg:top-24 lg:h-fit">
              <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                <h2 className="text-xl font-semibold text-white mb-6">Order Summary</h2>
                
                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {cartItems.map((item: any) => (
                    <div key={`${item.id}-${item.size}`} className="flex items-center space-x-4 p-4 bg-zinc-800 rounded-lg">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{item.name}</p>
                        <p className="text-xs text-zinc-400">Size: {item.size}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <button 
                            type="button"
                            onClick={() => updateQuantity(item.id, item.size, -1)}
                            className="w-6 h-6 bg-zinc-700 rounded hover:bg-zinc-600 transition-colors duration-200 flex items-center justify-center text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-medium min-w-[20px] text-center text-white">{item.quantity}</span>
                          <button 
                            type="button"
                            onClick={() => updateQuantity(item.id, item.size, 1)}
                            className="w-6 h-6 bg-zinc-700 rounded hover:bg-zinc-600 transition-colors duration-200 flex items-center justify-center text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <p className="text-sm font-semibold text-white">${item.price * item.quantity}</p>
                        <button 
                          type="button"
                          onClick={() => removeItem(item.id, item.size)}
                          className="text-signal-red hover:text-red-400 transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Totals */}
                <div className="space-y-3 border-t border-zinc-700 pt-4">
                  <div className="flex justify-between text-zinc-300">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-white border-t border-zinc-700 pt-3">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-signal-red text-white py-4 rounded-lg font-semibold hover:bg-signal-red/90 transition-colors duration-200 mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5" />
                      Place Order - ${total.toFixed(2)}
                    </>
                  )}
                </button>

                <p className="text-xs text-zinc-400 text-center mt-3">
                  Your payment information is secure and encrypted
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Mobile Sticky Checkout Button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 p-4 z-50">
        <button
          type="submit"
          form="checkout-form"
          disabled={isProcessing}
          className="w-full bg-signal-red text-white py-4 rounded-lg font-semibold hover:bg-signal-red/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? 'Processing...' : `Place Order - $${total.toFixed(2)}`}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
