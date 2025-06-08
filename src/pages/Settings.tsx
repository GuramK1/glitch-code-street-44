
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navigation from '../components/Navigation';
import { Navigate } from 'react-router-dom';
import { User, Lock, Save, Eye, EyeOff } from 'lucide-react';

const Settings = () => {
  const { user, isAuthenticated } = useAuth();
  const [username, setUsername] = useState(user?.username || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleUsernameUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // Simulate API call
    setTimeout(() => {
      setMessage('Username updated successfully!');
      setIsLoading(false);
    }, 1000);
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match');
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setMessage('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setMessage('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8" data-aos="fade-down" data-aos-duration="800">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Account Settings
            </h1>
            <p className="text-zinc-400">Manage your account preferences and security</p>
          </div>

          {/* Success/Error Message */}
          {message && (
            <div 
              className={`mb-6 p-4 rounded-lg ${
                message.includes('successfully') 
                  ? 'bg-green-600/20 border border-green-600/30 text-green-400' 
                  : 'bg-red-600/20 border border-red-600/30 text-red-400'
              }`}
              data-aos="fade-in" 
              data-aos-duration="400"
            >
              {message}
            </div>
          )}

          {/* Profile Information */}
          <div className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-signal-red" />
              <h2 className="text-xl font-semibold text-white">Profile Information</h2>
            </div>

            <form onSubmit={handleUsernameUpdate} className="space-y-4">
              <div data-aos="fade-right" data-aos-duration="600" data-aos-delay="200">
                <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-zinc-400 border border-zinc-700 cursor-not-allowed"
                />
                <p className="text-zinc-500 text-xs mt-1">Email cannot be changed</p>
              </div>

              <div data-aos="fade-right" data-aos-duration="600" data-aos-delay="300">
                <label htmlFor="username" className="block text-sm font-medium text-zinc-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white placeholder-zinc-500 border border-zinc-700 focus:border-signal-red focus:ring-2 focus:ring-signal-red focus:outline-none transition-all duration-200"
                  placeholder="Enter your username"
                  required
                />
              </div>

              <div data-aos="zoom-in" data-aos-duration="600" data-aos-delay="400">
                <button
                  type="submit"
                  disabled={isLoading || username === user?.username}
                  className="flex items-center gap-2 bg-signal-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-signal-red/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <Save className="w-4 h-4" />
                  {isLoading ? 'Updating...' : 'Update Profile'}
                </button>
              </div>
            </form>
          </div>

          {/* Password Settings */}
          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-signal-red" />
              <h2 className="text-xl font-semibold text-white">Change Password</h2>
            </div>

            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <div data-aos="fade-left" data-aos-duration="600" data-aos-delay="300">
                <label htmlFor="currentPassword" className="block text-sm font-medium text-zinc-300 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    id="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 rounded-lg bg-zinc-800 text-white placeholder-zinc-500 border border-zinc-700 focus:border-signal-red focus:ring-2 focus:ring-signal-red focus:outline-none transition-all duration-200"
                    placeholder="Enter current password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white transition-colors duration-200"
                  >
                    {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div data-aos="fade-left" data-aos-duration="600" data-aos-delay="400">
                <label htmlFor="newPassword" className="block text-sm font-medium text-zinc-300 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 rounded-lg bg-zinc-800 text-white placeholder-zinc-500 border border-zinc-700 focus:border-signal-red focus:ring-2 focus:ring-signal-red focus:outline-none transition-all duration-200"
                    placeholder="Enter new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white transition-colors duration-200"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div data-aos="fade-left" data-aos-duration="600" data-aos-delay="500">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-zinc-300 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 rounded-lg bg-zinc-800 text-white placeholder-zinc-500 border border-zinc-700 focus:border-signal-red focus:ring-2 focus:ring-signal-red focus:outline-none transition-all duration-200"
                    placeholder="Confirm new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white transition-colors duration-200"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div data-aos="zoom-in" data-aos-duration="600" data-aos-delay="600">
                <button
                  type="submit"
                  disabled={isLoading || !currentPassword || !newPassword || !confirmPassword}
                  className="flex items-center gap-2 bg-signal-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-signal-red/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <Save className="w-4 h-4" />
                  {isLoading ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
