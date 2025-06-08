
import { useState } from 'react';
import { Upload, Heart, MessageCircle, Share2, Camera } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const ClubPage = () => {
  const [selectedHashtag, setSelectedHashtag] = useState('all');

  // Mock user-submitted fits data
  const userFits = [
    { id: 1, username: "streetfits404", image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&h=600&fit=crop", likes: 234, comments: 12, hashtags: ["404fitclub", "drop001"] },
    { id: 2, username: "errorstyle", image: "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=400&h=600&fit=crop", likes: 189, comments: 8, hashtags: ["404fitclub", "glitch"] },
    { id: 3, username: "glitchkid", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop", likes: 312, comments: 18, hashtags: ["404fitclub", "drop001", "hoodie"] },
    { id: 4, username: "404misfit", image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&h=600&fit=crop", likes: 156, comments: 5, hashtags: ["404fitclub", "streetwear"] },
    { id: 5, username: "systemerror", image: "https://images.unsplash.com/photo-1506629905607-45c72e8d7e26?w=400&h=600&fit=crop", likes: 267, comments: 14, hashtags: ["404fitclub", "glitch", "tee"] },
    { id: 6, username: "brokenlink", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop", likes: 198, comments: 9, hashtags: ["404fitclub", "drop001"] },
  ];

  const hashtags = [
    { name: 'all', label: 'All Fits', count: userFits.length },
    { name: '404fitclub', label: '#404fitclub', count: userFits.filter(fit => fit.hashtags.includes('404fitclub')).length },
    { name: 'drop001', label: '#drop001', count: userFits.filter(fit => fit.hashtags.includes('drop001')).length },
    { name: 'glitch', label: '#glitch', count: userFits.filter(fit => fit.hashtags.includes('glitch')).length },
    { name: 'streetwear', label: '#streetwear', count: userFits.filter(fit => fit.hashtags.includes('streetwear')).length },
  ];

  const filteredFits = selectedHashtag === 'all' 
    ? userFits 
    : userFits.filter(fit => fit.hashtags.includes(selectedHashtag));

  const topFits = [...userFits].sort((a, b) => b.likes - a.likes).slice(0, 3);

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navigation />
      
      <div className="pt-16">
        {/* Hero Section */}
        <div className="bg-zinc-950 text-white py-16 px-4" data-aos="fade-up">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4" data-aos="fade-up" data-aos-delay="100">
              <span className="text-red-500">404</span> Club
            </h1>
            <p className="text-zinc-400 text-lg mb-8" data-aos="fade-up" data-aos-delay="200">Show your style. Join the misfit community.</p>
            
            {/* Submit Your Fit CTA */}
            <div className="bg-zinc-900 rounded-2xl p-8 max-w-lg mx-auto border border-zinc-800" data-aos="zoom-in" data-aos-delay="300">
              <div className="text-center">
                <Camera className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">🔥 Submit Your Fit</h2>
                <p className="text-zinc-400 mb-6">Join the #404Club and get featured</p>
                <button className="bg-red-600 px-6 py-3 rounded-xl hover:bg-red-500 text-white font-semibold transition-colors duration-200 flex items-center gap-2 mx-auto">
                  <Upload className="w-4 h-4" />
                  Upload Look
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Top Fits This Week */}
        <div className="bg-zinc-900 py-12 px-4" data-aos="fade-right">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8 text-center" data-aos="fade-up" data-aos-delay="100">🏆 Top Fits This Week</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topFits.map((fit, index) => (
                <div key={fit.id} className="relative group" data-aos="zoom-in-up" data-aos-delay={200 + (index * 100)}>
                  <div className="aspect-[3/4] rounded-xl overflow-hidden">
                    <img 
                      src={fit.image} 
                      alt={`Fit by ${fit.username}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                      #{index + 1}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white font-medium">@{fit.username}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-zinc-300">
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {fit.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {fit.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hashtag Filter */}
        <div className="bg-zinc-950 py-8 px-4 border-b border-zinc-800" data-aos="fade-left">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-3 justify-center">
              {hashtags.map((hashtag) => (
                <button
                  key={hashtag.name}
                  onClick={() => setSelectedHashtag(hashtag.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedHashtag === hashtag.name
                      ? 'bg-red-600 text-white'
                      : 'bg-zinc-800 text-red-400 hover:bg-zinc-700 hover:text-red-300'
                  }`}
                >
                  {hashtag.label} ({hashtag.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Community Gallery */}
        <div className="max-w-7xl mx-auto px-4 py-12" data-aos="fade-up" data-aos-delay="200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredFits.map((fit, index) => (
              <div 
                key={fit.id} 
                className="group bg-zinc-900 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300"
                data-aos="flip-up"
                data-aos-delay={100 + (index * 50)}
              >
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img 
                    src={fit.image} 
                    alt={`Fit by ${fit.username}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Interaction overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-4 text-white">
                      <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                        <Heart className="w-5 h-5" />
                      </button>
                      <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                      </button>
                      <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-white font-medium mb-2">@{fit.username}</p>
                  <div className="flex justify-between items-center text-sm text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {fit.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {fit.comments}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {fit.hashtags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs text-red-400">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ClubPage;
