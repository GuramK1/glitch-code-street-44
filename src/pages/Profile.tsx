
import { useAuth } from '../contexts/AuthContext';
import { useWishlist } from '../contexts/WishlistContext';
import Navigation from '../components/Navigation';
import { Navigate } from 'react-router-dom';
import { Heart, Package, Clock, User } from 'lucide-react';

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const { wishlist } = useWishlist();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Mock order history data
  const mockOrders = [
    { id: 1, date: '2024-01-15', status: 'Delivered', total: 89, items: 2 },
    { id: 2, date: '2024-01-10', status: 'Shipped', total: 134, items: 1 },
    { id: 3, date: '2024-01-05', status: 'Processing', total: 67, items: 3 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'text-green-400';
      case 'Shipped': return 'text-neon-blue';
      case 'Processing': return 'text-yellow-400';
      default: return 'text-zinc-400';
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Welcome back, {user?.username}!
            </h1>
            <p className="text-zinc-400">Manage your account and track your 404 Fit journey</p>
          </div>

          {/* Account Info Card */}
          <div className="bg-zinc-900 rounded-xl p-6 mb-8 border border-zinc-800">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-signal-red rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">{user?.username}</h2>
                <p className="text-zinc-400">{user?.email}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-zinc-800 rounded-lg p-4 text-center">
                <Heart className="w-6 h-6 text-signal-red mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{wishlist.length}</p>
                <p className="text-zinc-400 text-sm">Wishlist Items</p>
              </div>
              <div className="bg-zinc-800 rounded-lg p-4 text-center">
                <Package className="w-6 h-6 text-neon-blue mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{mockOrders.length}</p>
                <p className="text-zinc-400 text-sm">Total Orders</p>
              </div>
              <div className="bg-zinc-800 rounded-lg p-4 text-center">
                <Clock className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">3</p>
                <p className="text-zinc-400 text-sm">Months Active</p>
              </div>
            </div>
          </div>

          {/* Order History */}
          <div className="bg-zinc-900 rounded-xl p-6 mb-8 border border-zinc-800">
            <h3 className="text-xl font-semibold text-white mb-6">Recent Orders</h3>
            
            {mockOrders.length === 0 ? (
              <div className="text-center py-8">
                <Package className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                <p className="text-zinc-400">No orders yet</p>
                <p className="text-zinc-500 text-sm">Start shopping to see your orders here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-zinc-700 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-zinc-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Order #{order.id}</p>
                        <p className="text-zinc-400 text-sm">{order.date} • {order.items} items</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">${order.total}</p>
                      <p className={`text-sm ${getStatusColor(order.status)}`}>{order.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Wishlist Preview */}
          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Your Wishlist</h3>
              <span className="bg-signal-red text-white px-3 py-1 rounded-full text-sm font-medium">
                {wishlist.length} items
              </span>
            </div>
            
            {wishlist.length === 0 ? (
              <div className="text-center py-8">
                <Heart className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                <p className="text-zinc-400">Your wishlist is empty</p>
                <p className="text-zinc-500 text-sm">Add items you love to keep track of them</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {wishlist.slice(0, 6).map((itemId) => (
                  <div key={itemId} className="bg-zinc-800 rounded-lg p-4">
                    <div className="w-full h-32 bg-zinc-700 rounded-lg mb-3 flex items-center justify-center">
                      <Package className="w-8 h-8 text-zinc-500" />
                    </div>
                    <p className="text-white font-medium">Wishlist Item {itemId}</p>
                    <p className="text-zinc-400 text-sm">Added to wishlist</p>
                  </div>
                ))}
              </div>
            )}
            
            {wishlist.length > 6 && (
              <div className="text-center mt-6">
                <button className="text-signal-red hover:underline">
                  View all {wishlist.length} items
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
