import { useState, useEffect, useRef } from 'react';
import { Clock, Star, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Drops = () => {
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

  // Mock data for products with working slugs
  const limitedEdition = [
    {
      id: 1,
      name: "404 Phantom Hoodie",
      price: 149,
      originalPrice: 179,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
      stock: 3,
      slug: "404-oversized-hoodie"
    },
    {
      id: 2,
      name: "Glitch Bomber Jacket",
      price: 199,
      originalPrice: 249,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=500&fit=crop",
      stock: 7,
      slug: "404-tech-jacket"
    },
    {
      id: 3,
      name: "Error Code Cargo",
      price: 129,
      originalPrice: 159,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop",
      stock: 2,
      slug: "glitch-cargo-pants"
    }
  ];

  const onSale = [
    {
      id: 4,
      name: "Debug Tee",
      price: 29,
      originalPrice: 45,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
      discount: 35,
      slug: "system-error-tee"
    },
    {
      id: 5,
      name: "Binary Sweatshirt",
      price: 59,
      originalPrice: 89,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
      discount: 33,
      slug: "404-oversized-hoodie"
    },
    {
      id: 6,
      name: "Stack Overflow Joggers",
      price: 49,
      originalPrice: 79,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop",
      discount: 38,
      slug: "glitch-cargo-pants"
    }
  ];

  const upcomingDrops = [
    {
      id: 7,
      name: "404 x AI Collection",
      releaseDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=500&fit=crop",
      description: "Collaborative piece with AI artists"
    },
    {
      id: 8,
      name: "Quantum Error Series",
      releaseDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
      description: "Limited quantum-inspired designs"
    }
  ];

  // Countdown timer logic
  const calculateTimeLeft = (targetDate: Date) => {
    const difference = +targetDate - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navigation />
      
      {/* Hero Banner */}
      <section className="relative pt-20 pb-16 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black opacity-90"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight text-white">
              DROPS
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
              Exclusive releases, limited editions, and special deals. 
              Get them before they're gone forever.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Flame className="w-6 h-6 text-red-500" />
              <span className="text-red-400 font-semibold">Live Now</span>
            </div>
          </div>
        </div>
      </section>

      <main ref={sectionRef} className="max-w-7xl mx-auto px-4 space-y-20">
        {/* Limited Edition Section */}
        <section>
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-3 mb-8">
              <Star className="w-6 h-6 text-yellow-500" />
              <h2 className="text-4xl font-bold text-white">LIMITED EDITION</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {limitedEdition.map((product, index) => (
                <div 
                  key={product.id}
                  className={`bg-zinc-900 rounded-xl overflow-hidden card-hover transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="relative rounded-xl overflow-hidden group">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-red-600 text-white px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-lg">
                        LIMITED
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 z-20">
                      <span className="bg-zinc-900/80 text-white px-2 py-1 text-xs rounded-lg">
                        Only {product.stock} left
                      </span>
                    </div>

                    {/* Quick View Overlay - Fixed with proper routing */}
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <Link 
                        to={`/product/${product.slug}`}
                        className="text-white border border-white px-6 py-3 rounded-full text-sm font-medium hover:bg-white hover:text-black transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                      >
                        Quick View
                      </Link>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-white">${product.price}</span>
                      <span className="text-lg text-zinc-500 line-through">${product.originalPrice}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* On Sale Section */}
        <section>
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl font-bold text-white mb-8">ON SALE</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {onSale.map((product, index) => (
                <div 
                  key={product.id}
                  className={`bg-zinc-900 rounded-xl overflow-hidden card-hover transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${(index + 3) * 150}ms` }}
                >
                  <div className="relative rounded-xl overflow-hidden group">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-red-100/10 text-red-500 px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-lg border border-red-500/30">
                        {product.discount}% OFF
                      </span>
                    </div>

                    {/* Quick View Overlay - Fixed with proper routing */}
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <Link 
                        to={`/product/${product.slug}`}
                        className="text-white border border-white px-6 py-3 rounded-full text-sm font-medium hover:bg-white hover:text-black transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                      >
                        Quick View
                      </Link>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-red-500">${product.price}</span>
                      <span className="text-lg text-zinc-500 line-through">${product.originalPrice}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Drops Section */}
        <section className="pb-20">
          <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-3 mb-8">
              <Clock className="w-6 h-6 text-blue-500" />
              <h2 className="text-4xl font-bold text-white">UPCOMING DROPS</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {upcomingDrops.map((drop, index) => {
                const timeLeft = calculateTimeLeft(drop.releaseDate);
                
                return (
                  <div 
                    key={drop.id}
                    className={`bg-zinc-900 rounded-xl overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    style={{ transitionDelay: `${(index + 6) * 150}ms` }}
                  >
                    <div className="md:flex">
                      <div className="md:w-1/2">
                        <img
                          src={drop.image}
                          alt={drop.name}
                          className="w-full h-64 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-1/2 p-6 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold text-white mb-3">{drop.name}</h3>
                        <p className="text-zinc-400 mb-6">{drop.description}</p>
                        
                        <div className="grid grid-cols-4 gap-2 mb-6">
                          <div className="text-center">
                            <div className="bg-zinc-800 rounded-lg p-3">
                              <div className="text-2xl font-bold text-white">{timeLeft.days}</div>
                              <div className="text-xs text-zinc-400">DAYS</div>
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="bg-zinc-800 rounded-lg p-3">
                              <div className="text-2xl font-bold text-white">{timeLeft.hours}</div>
                              <div className="text-xs text-zinc-400">HRS</div>
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="bg-zinc-800 rounded-lg p-3">
                              <div className="text-2xl font-bold text-white">{timeLeft.minutes}</div>
                              <div className="text-xs text-zinc-400">MIN</div>
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="bg-zinc-800 rounded-lg p-3">
                              <div className="text-2xl font-bold text-white">{timeLeft.seconds}</div>
                              <div className="text-xs text-zinc-400">SEC</div>
                            </div>
                          </div>
                        </div>
                        
                        <button className="bg-white text-black py-3 px-6 rounded-xl font-semibold hover:bg-zinc-200 transition-colors duration-200">
                          Notify Me
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Drops;
