
import { useState, useEffect, useRef } from 'react';
import { Instagram, Camera, Heart, MessageCircle } from 'lucide-react';

const CommunitySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const communityPosts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=300&h=300&fit=crop",
      username: "@alex_404",
      likes: 234,
      comments: 12
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=300&fit=crop",
      username: "@streetcode_sam",
      likes: 189,
      comments: 8
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&h=300&fit=crop",
      username: "@glitch_girl",
      likes: 456,
      comments: 23
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1506629905228-b50909165d25?w=300&h=300&fit=crop",
      username: "@code_drip",
      likes: 312,
      comments: 15
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=300&h=300&fit=crop",
      username: "@404_style",
      likes: 278,
      comments: 19
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=300&h=300&fit=crop",
      username: "@error_fashion",
      likes: 167,
      comments: 7
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-black">
              404 <span className="text-signal-red">CLUB</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Join the community of rebels, creators, and style innovators. 
              Share your fit, inspire others, and be part of the glitch.
            </p>
            <button className="bg-white text-black border-2 border-black px-8 py-4 text-sm font-semibold tracking-widest uppercase rounded-xl hover:bg-black hover:text-white transition-all duration-300 ease-out">
              Submit Your Fit
            </button>
          </div>
        </div>

        {/* Community Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {communityPosts.map((post, index) => (
            <div 
              key={post.id}
              className={`group relative overflow-hidden rounded-xl bg-carbon-grey aspect-square transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <img
                src={post.image}
                alt={`Community post by ${post.username}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                <div className="flex justify-between items-start">
                  <Instagram className="w-5 h-5 text-white" />
                  <Camera className="w-5 h-5 text-white" />
                </div>
                
                <div>
                  <p className="text-white font-semibold text-sm mb-2">{post.username}</p>
                  <div className="flex items-center space-x-4 text-white text-xs">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tag overlay */}
              <div className="absolute top-3 left-3">
                <span className="bg-signal-red text-white px-2 py-1 text-xs font-bold rounded">
                  #404Club
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-lg text-gray-600 mb-6">
              Ready to be part of the movement?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Join 404 Club
              </button>
              <button className="btn-secondary">
                Follow @404fit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
