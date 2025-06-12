import { useAuth } from '../contexts/AuthContext';
import { useWishlist } from '../contexts/WishlistContext';
import Navigation from '../components/Navigation';
import { Navigate } from 'react-router-dom';
import { Heart, Package, Clock, User, Eye, Edit, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const { wishlist } = useWishlist();
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [orders, setOrders] = useState([]);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState({
    username: user?.username || '',
    email: user?.email || ''
  });

  // Load liked posts and orders from localStorage
  useEffect(() => {
    const savedLikedPosts = localStorage.getItem('likedPosts');
    if (savedLikedPosts) {
      setLikedPosts(JSON.parse(savedLikedPosts));
    }

    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id);
        if (error) {
          console.error('Supabase error:', error);
        }
        if (data) {
          setOrders(data);
          localStorage.setItem('orders', JSON.stringify(data));
        }
      }
    };
    fetchOrders();
  }, [user]);

  // Update edit form when user changes
  useEffect(() => {
    if (user) {
      setEditForm({
        username: user.username,
        email: user.email
      });
    }
  }, [user]);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Calculate member since date (mock - 3 months ago)
  const memberSince = new Date();
  memberSince.setMonth(memberSince.getMonth() - 3);
  const memberSinceFormatted = memberSince.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long' 
  });

  // Mock order history data
  const mockOrders = [
    { id: 1, date: '2024-01-15', status: 'Delivered', total: 89, items: 2 },
    { id: 2, date: '2024-01-10', status: 'Shipped', total: 134, items: 1 },
    { id: 3, date: '2024-01-05', status: 'Processing', total: 67, items: 3 }
  ];

  // Mock liked posts data
  const mockLikedPostsData = [
    { id: 'post123', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=400&fit=crop', title: 'Drop 002 Fit', author: '@Neo', likes: 45 },
    { id: 'post456', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop', title: 'Street Style Look', author: '@Trinity', likes: 32 },
    { id: 'post789', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=400&fit=crop', title: 'Urban Aesthetic', author: '@Morpheus', likes: 58 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'text-green-400';
      case 'Shipped': return 'text-neon-blue';
      case 'Processing': return 'text-yellow-400';
      default: return 'text-zinc-400';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-400/20';
      case 'Shipped': return 'bg-blue-400/20';
      case 'Processing': return 'bg-yellow-400/20';
      default: return 'bg-zinc-600/20';
    }
  };

  const handleSaveProfile = () => {
    // Update user in localStorage (mock save)
    const updatedUser = { ...user, ...editForm };
    localStorage.setItem('authUser', JSON.stringify(updatedUser));
    setIsEditingProfile(false);
    // In a real app, you'd update the auth context here
    alert('Profile updated successfully!');
  };

  const handleViewWishlist = () => {
    const wishlistSection = document.getElementById('wishlist-section');
    if (wishlistSection) {
      wishlistSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-8" data-aos="fade-down" data-aos-duration="800">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Welcome back, {user?.username}!
            </h1>
            <p className="text-zinc-400 flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" />
              Member since {memberSinceFormatted}
            </p>
          </div>

          {/* Account Info Card */}
          <div className="bg-zinc-900 rounded-xl p-6 mb-8 border border-zinc-800" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-signal-red rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  {isEditingProfile ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editForm.username}
                        onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                        className="bg-zinc-800 text-white px-3 py-1 rounded border border-zinc-700 focus:border-signal-red focus:outline-none"
                        placeholder="Username"
                      />
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                        className="bg-zinc-800 text-white px-3 py-1 rounded border border-zinc-700 focus:border-signal-red focus:outline-none w-full"
                        placeholder="Email"
                      />
                    </div>
                  ) : (
                    <>
                      <h2 className="text-xl font-semibold text-white">{user?.username}</h2>
                      <p className="text-zinc-400">{user?.email}</p>
                    </>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                {isEditingProfile ? (
                  <>
                    <button
                      onClick={handleSaveProfile}
                      className="px-4 py-2 bg-signal-red text-white rounded-lg text-sm hover:bg-signal-red/90 transition-colors duration-200"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditingProfile(false)}
                      className="px-4 py-2 bg-zinc-700 text-white rounded-lg text-sm hover:bg-zinc-600 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="px-4 py-2 bg-zinc-800 text-white rounded-lg text-sm hover:bg-zinc-700 transition-colors duration-200 flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-zinc-800 rounded-lg p-4 text-center" data-aos="zoom-in" data-aos-duration="600" data-aos-delay="200">
                <Heart className="w-6 h-6 text-signal-red mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{wishlist.length}</p>
                <p className="text-zinc-400 text-sm">Wishlist Items</p>
                <button 
                  onClick={handleViewWishlist}
                  className="mt-2 text-signal-red text-xs hover:underline"
                >
                  View All
                </button>
              </div>
              <div className="bg-zinc-800 rounded-lg p-4 text-center" data-aos="zoom-in" data-aos-duration="600" data-aos-delay="300">
                <Package className="w-6 h-6 text-neon-blue mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{orders.length}</p>
                <p className="text-zinc-400 text-sm">Total Orders</p>
              </div>
              <div className="bg-zinc-800 rounded-lg p-4 text-center" data-aos="zoom-in" data-aos-duration="600" data-aos-delay="400">
                <Clock className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">3</p>
                <p className="text-zinc-400 text-sm">Months Active</p>
              </div>
            </div>
          </div>

          {/* Recent Orders Section */}
          <div className="bg-zinc-900 rounded-xl p-6 mb-8 border border-zinc-800" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
            <div className="flex items-center gap-3 mb-6">
              <Package className="w-6 h-6 text-signal-red" />
              <h3 className="text-xl font-semibold text-white">Recent Orders</h3>
              {orders.length > 0 && (
                <span className="bg-signal-red/20 text-signal-red px-2 py-1 rounded-full text-xs font-medium">
                  {orders.length}
                </span>
              )}
            </div>
            
            {orders.length === 0 ? (
              <div className="text-center py-8">
                <Package className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                <p className="text-zinc-400">No orders yet</p>
                <p className="text-zinc-500 text-sm">Start shopping to see your orders here</p>
                <button 
                  onClick={() => window.location.href = '/shop'}
                  className="mt-4 bg-signal-red text-white px-6 py-2 rounded-lg hover:bg-signal-red/90 transition-colors duration-200"
                >
                  Shop Now
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.slice(0, 5).map((order: any, index) => (
                  <div 
                    key={order.id} 
                    className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg hover:bg-zinc-750 transition-colors duration-200"
                    data-aos="fade-left" 
                    data-aos-duration="600" 
                    data-aos-delay={300 + (index * 100)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-zinc-700 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-zinc-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Order #{order.id}</p>
                        <p className="text-zinc-400 text-sm">{order.date} • {order.items?.length || 1} items</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-white font-semibold">${order.total?.toFixed(2) || '0.00'}</p>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBgColor(order.status)} ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {orders.length > 5 && (
                  <div className="text-center pt-4">
                    <button className="text-signal-red hover:underline">
                      View all {orders.length} orders
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Liked Posts Section */}
          <div className="bg-zinc-900 rounded-xl p-6 mb-8 border border-zinc-800" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="w-6 h-6 text-signal-red" />
              <h3 className="text-xl font-semibold text-white">Posts You've Liked</h3>
              <span className="bg-signal-red/20 text-signal-red px-2 py-1 rounded-full text-xs font-medium">
                {mockLikedPostsData.length}
              </span>
            </div>
            
            {mockLikedPostsData.length === 0 ? (
              <div className="text-center py-8">
                <Eye className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                <p className="text-zinc-400">No liked posts yet</p>
                <p className="text-zinc-500 text-sm">Start exploring 404 Club to like posts</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {mockLikedPostsData.map((post, index) => (
                  <div 
                    key={post.id} 
                    className="bg-zinc-800 rounded-lg overflow-hidden hover:bg-zinc-750 transition-colors duration-200 cursor-pointer"
                    data-aos="fade-up" 
                    data-aos-duration="600" 
                    data-aos-delay={300 + (index * 100)}
                  >
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-3">
                      <p className="text-white font-medium text-sm mb-1">{post.title}</p>
                      <p className="text-zinc-400 text-xs mb-2">{post.author}</p>
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3 text-signal-red fill-current" />
                        <span className="text-zinc-400 text-xs">{post.likes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Wishlist Preview */}
          <div 
            id="wishlist-section"
            className="bg-zinc-900 rounded-xl p-6 border border-zinc-800" 
            data-aos="fade-up" 
            data-aos-duration="800" 
            data-aos-delay="400"
          >
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
                {wishlist.slice(0, 6).map((itemId, index) => (
                  <div 
                    key={itemId} 
                    className="bg-zinc-800 rounded-lg p-4"
                    data-aos="fade-up" 
                    data-aos-duration="600" 
                    data-aos-delay={500 + (index * 100)}
                  >
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
