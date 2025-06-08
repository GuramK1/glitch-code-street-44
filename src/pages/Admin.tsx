import { useState } from 'react';
import { Package, Users, Settings, BarChart3, Plus, Eye, CheckCircle, Clock, Truck } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Navigation from '../components/Navigation';

const Admin = () => {
  const [activeSection, setActiveSection] = useState('addProduct');
  const [dropCountdownEnabled, setDropCountdownEnabled] = useState(false);

  // Mock data for analytics
  const analyticsData = [
    { day: 'Mon', pageViews: 120, sales: 45 },
    { day: 'Tue', pageViews: 190, sales: 67 },
    { day: 'Wed', pageViews: 300, sales: 89 },
    { day: 'Thu', pageViews: 500, sales: 123 },
    { day: 'Fri', pageViews: 200, sales: 78 },
    { day: 'Sat', pageViews: 300, sales: 134 },
    { day: 'Sun', pageViews: 450, sales: 156 }
  ];

  // Mock data
  const mockOrders = [
    { id: '0001', product: 'Hoodie (L)', status: 'Pending', customer: 'john@example.com', total: 89 },
    { id: '0002', product: 'Glitch Tee (M)', status: 'Shipped', customer: 'jane@example.com', total: 45 },
    { id: '0003', product: 'Street Jacket (XL)', status: 'Delivered', customer: 'mike@example.com', total: 129 },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending': return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'Shipped': return <Truck className="w-4 h-4 text-neon-blue" />;
      case 'Delivered': return <CheckCircle className="w-4 h-4 text-green-400" />;
      default: return <Clock className="w-4 h-4 text-zinc-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'text-yellow-400';
      case 'Shipped': return 'text-neon-blue';
      case 'Delivered': return 'text-green-400';
      default: return 'text-zinc-400';
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navigation />
      
      <div className="pt-20">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-zinc-900 text-white p-6 space-y-4 border-r border-zinc-800">
            <h1 className="text-xl font-bold mb-6 text-signal-red">404 Admin</h1>
            
            <nav className="space-y-2">
              <button 
                onClick={() => setActiveSection('addProduct')}
                className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                  activeSection === 'addProduct' ? 'bg-signal-red text-white' : 'hover:text-signal-red hover:bg-zinc-800'
                }`}
              >
                <Plus className="w-4 h-4" />
                Add Product
              </button>
              
              <button 
                onClick={() => setActiveSection('orders')}
                className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                  activeSection === 'orders' ? 'bg-signal-red text-white' : 'hover:text-signal-red hover:bg-zinc-800'
                }`}
              >
                <Package className="w-4 h-4" />
                View Orders
              </button>
              
              <button 
                onClick={() => setActiveSection('analytics')}
                className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                  activeSection === 'analytics' ? 'bg-signal-red text-white' : 'hover:text-signal-red hover:bg-zinc-800'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                Analytics
              </button>
              
              <button 
                onClick={() => setActiveSection('controls')}
                className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                  activeSection === 'controls' ? 'bg-signal-red text-white' : 'hover:text-signal-red hover:bg-zinc-800'
                }`}
              >
                <Settings className="w-4 h-4" />
                Site Controls
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 bg-zinc-950 text-white p-8">
            {/* Add Product Section */}
            {activeSection === 'addProduct' && (
              <section data-aos="fade-up" data-aos-duration="600">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold mb-2">Add New Product</h2>
                  <p className="text-zinc-400">Create a new product for the 404 Fit collection</p>
                </div>
                
                <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Product Name</label>
                        <input 
                          placeholder="e.g. Drop 003 Hoodie" 
                          className="w-full p-3 bg-zinc-800 text-white rounded-lg border border-zinc-700 focus:border-signal-red focus:ring-2 focus:ring-signal-red/20 focus:outline-none transition-all duration-200"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Price ($)</label>
                        <input 
                          placeholder="89" 
                          type="number" 
                          className="w-full p-3 bg-zinc-800 text-white rounded-lg border border-zinc-700 focus:border-signal-red focus:ring-2 focus:ring-signal-red/20 focus:outline-none transition-all duration-200"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Image URL</label>
                      <input 
                        placeholder="https://images.unsplash.com/..." 
                        className="w-full p-3 bg-zinc-800 text-white rounded-lg border border-zinc-700 focus:border-signal-red focus:ring-2 focus:ring-signal-red/20 focus:outline-none transition-all duration-200"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Category</label>
                        <select className="w-full p-3 bg-zinc-800 text-white rounded-lg border border-zinc-700 focus:border-signal-red focus:ring-2 focus:ring-signal-red/20 focus:outline-none transition-all duration-200">
                          <option>DROP</option>
                          <option>LIMITED</option>
                          <option>CLASSIC</option>
                          <option>ACCESSORIES</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Size</label>
                        <select className="w-full p-3 bg-zinc-800 text-white rounded-lg border border-zinc-700 focus:border-signal-red focus:ring-2 focus:ring-signal-red/20 focus:outline-none transition-all duration-200">
                          <option>XS</option>
                          <option>S</option>
                          <option>M</option>
                          <option>L</option>
                          <option>XL</option>
                          <option>XXL</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Description</label>
                      <textarea 
                        placeholder="Product description..." 
                        rows={4}
                        className="w-full p-3 bg-zinc-800 text-white rounded-lg border border-zinc-700 focus:border-signal-red focus:ring-2 focus:ring-signal-red/20 focus:outline-none transition-all duration-200"
                      />
                    </div>
                    
                    <button 
                      type="submit"
                      className="bg-signal-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-signal-red/90 transition-colors duration-200 flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Product
                    </button>
                  </form>
                </div>
              </section>
            )}

            {/* Orders Section */}
            {activeSection === 'orders' && (
              <section data-aos="fade-up" data-aos-duration="600">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold mb-2">Recent Orders</h2>
                  <p className="text-zinc-400">Track and manage customer orders</p>
                </div>
                
                <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
                  <div className="p-6 border-b border-zinc-800">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Order Management</h3>
                      <span className="bg-signal-red/20 text-signal-red px-3 py-1 rounded-full text-sm font-medium">
                        {mockOrders.length} orders
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-4 p-6">
                    {mockOrders.map((order) => (
                      <div 
                        key={order.id} 
                        className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg hover:bg-zinc-750 transition-colors duration-200"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-zinc-700 rounded-lg flex items-center justify-center">
                            {getStatusIcon(order.status)}
                          </div>
                          <div>
                            <p className="text-white font-medium">Order #{order.id}</p>
                            <p className="text-zinc-400 text-sm">{order.product}</p>
                            <p className="text-zinc-500 text-xs">{order.customer}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-semibold">${order.total}</p>
                          <p className={`text-sm ${getStatusColor(order.status)}`}>{order.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Analytics Section */}
            {activeSection === 'analytics' && (
              <section data-aos="fade-up" data-aos-duration="600">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold mb-2">Analytics Dashboard</h2>
                  <p className="text-zinc-400">Track your store performance</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                    <div className="flex items-center gap-3 mb-4">
                      <Users className="w-6 h-6 text-neon-blue" />
                      <h3 className="text-lg font-semibold">Total Users</h3>
                    </div>
                    <p className="text-3xl font-bold text-white">1,234</p>
                    <p className="text-zinc-400 text-sm">+12% this month</p>
                  </div>
                  
                  <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                    <div className="flex items-center gap-3 mb-4">
                      <Package className="w-6 h-6 text-green-400" />
                      <h3 className="text-lg font-semibold">Orders</h3>
                    </div>
                    <p className="text-3xl font-bold text-white">89</p>
                    <p className="text-zinc-400 text-sm">+5% this week</p>
                  </div>
                  
                  <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                    <div className="flex items-center gap-3 mb-4">
                      <BarChart3 className="w-6 h-6 text-signal-red" />
                      <h3 className="text-lg font-semibold">Revenue</h3>
                    </div>
                    <p className="text-3xl font-bold text-white">$7,890</p>
                    <p className="text-zinc-400 text-sm">+18% this month</p>
                  </div>
                </div>

                <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 mb-6">
                  <h3 className="text-xl font-semibold mb-4">Weekly Performance</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={analyticsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                        <XAxis 
                          dataKey="day" 
                          tick={{ fill: '#a1a1aa' }}
                          axisLine={{ stroke: '#52525b' }}
                        />
                        <YAxis 
                          tick={{ fill: '#a1a1aa' }}
                          axisLine={{ stroke: '#52525b' }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#18181b', 
                            border: '1px solid #3f3f46',
                            borderRadius: '8px',
                            color: '#ffffff'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="pageViews" 
                          stroke="#06b6d4" 
                          strokeWidth={3}
                          dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
                          name="Page Views"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="sales" 
                          stroke="#ef4444" 
                          strokeWidth={3}
                          dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                          name="Sales"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </section>
            )}

            {/* Site Controls Section */}
            {activeSection === 'controls' && (
              <section data-aos="fade-up" data-aos-duration="600">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold mb-2">Site Controls</h2>
                  <p className="text-zinc-400">Manage website features and settings</p>
                </div>
                
                <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 space-y-6">
                  <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg">
                    <div>
                      <h3 className="text-white font-medium">Drop Countdown Timer</h3>
                      <p className="text-zinc-400 text-sm">Show countdown for upcoming drops</p>
                    </div>
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={dropCountdownEnabled}
                        onChange={(e) => setDropCountdownEnabled(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                        dropCountdownEnabled ? 'bg-signal-red' : 'bg-zinc-600'
                      }`}>
                        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                          dropCountdownEnabled ? 'translate-x-5' : 'translate-x-0'
                        }`} />
                      </div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg">
                    <div>
                      <h3 className="text-white font-medium">Maintenance Mode</h3>
                      <p className="text-zinc-400 text-sm">Enable maintenance mode for the site</p>
                    </div>
                    <label className="flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only" />
                      <div className="relative w-11 h-6 bg-zinc-600 rounded-full">
                        <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200" />
                      </div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg">
                    <div>
                      <h3 className="text-white font-medium">New User Registrations</h3>
                      <p className="text-zinc-400 text-sm">Allow new users to register</p>
                    </div>
                    <label className="flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only" />
                      <div className="relative w-11 h-6 bg-signal-red rounded-full">
                        <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 translate-x-5" />
                      </div>
                    </label>
                  </div>
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Admin;
