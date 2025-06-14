
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const ProductHighlights = () => {
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

  const products = [
    {
      id: 1,
      name: "404 Oversized Hoodie",
      price: 89,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
      badge: "404 Exclusive",
      slug: "404-oversized-hoodie"
    },
    {
      id: 2,
      name: "Glitch Cargo Pants",
      price: 120,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop",
      badge: "Drop Only",
      slug: "glitch-cargo-pants"
    },
    {
      id: 3,
      name: "System Error Tee",
      price: 45,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
      badge: "Low Stock",
      slug: "system-error-tee"
    },
    {
      id: 4,
      name: "404 Tech Jacket",
      price: 180,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=500&fit=crop",
      badge: "New Drop",
      slug: "404-tech-jacket"
    }
  ];

  return (
    <section ref={sectionRef} className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-black">
              FEATURED
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Handpicked pieces from our latest drop. Each item tells a story of rebellion, 
              innovation, and unapologetic self-expression.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div 
              key={product.id}
              className={`transition-all duration-1000 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="rounded-xl overflow-hidden bg-carbon-grey">
                <div className="relative group overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transform-gpu transition-all duration-700"
                  />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-30">
                    <span className="bg-signal-red text-white px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-lg">
                      {product.badge}
                    </span>
                  </div>

                  {/* Quick View Overlay - Fixed to cover entire image */}
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-20">
                    <Link 
                      to={`/product/${product.slug}`}
                      className="text-white border border-white px-6 py-3 rounded-full text-sm font-medium hover:bg-white hover:text-black transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 hover:shadow-lg"
                    >
                      Quick View
                    </Link>
                  </div>
                </div>

                {/* Product info - outside hover group */}
                <div className="p-4 bg-carbon-grey">
                  <h3 className="text-lg font-semibold text-white">
                    {product.name}
                  </h3>
                  <p className="text-gray-300 font-medium">
                    ${product.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className={`transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Link to="/shop" className="btn-primary">
              View All Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHighlights;
