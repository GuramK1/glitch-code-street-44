
import { useState } from 'react';

const ProductHighlights = () => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const products = [
    {
      id: 1,
      name: "GLITCH HOODIE",
      price: "$120",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop",
      badge: "404 EXCLUSIVE",
      badgeColor: "bg-signal-red"
    },
    {
      id: 2,
      name: "SYSTEM TEE",
      price: "$65",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop",
      badge: "DROP ONLY",
      badgeColor: "bg-neon-blue"
    },
    {
      id: 3,
      name: "CODE CARGO",
      price: "$145",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop",
      badge: "LOW STOCK",
      badgeColor: "bg-orange-500"
    },
    {
      id: 4,
      name: "ERROR JACKET",
      price: "$220",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=600&fit=crop",
      badge: "404 EXCLUSIVE",
      badgeColor: "bg-signal-red"
    },
    {
      id: 5,
      name: "BINARY SHORTS",
      price: "$85",
      image: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=500&h=600&fit=crop",
      badge: "NEW DROP",
      badgeColor: "bg-green-500"
    },
    {
      id: 6,
      name: "PIXEL BACKPACK",
      price: "$95",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop",
      badge: "LIMITED",
      badgeColor: "bg-purple-500"
    }
  ];

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          FEATURED <span className="text-signal-red">DROPS</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Curated pieces that redefine streetwear. Each item is crafted for those who dare to be different.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="group cursor-pointer"
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <div className="relative overflow-hidden bg-card rounded-lg">
              {/* Badge */}
              <div className={`absolute top-4 left-4 z-10 ${product.badgeColor} text-black px-3 py-1 text-xs font-bold tracking-wider`}>
                {product.badge}
              </div>

              {/* Product Image */}
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    hoveredProduct === product.id ? 'scale-110' : 'scale-100'
                  }`}
                />
              </div>

              {/* Product Info Overlay */}
              <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 transition-all duration-500 ${
                hoveredProduct === product.id ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
              }`}>
                <h3 className="text-lg font-semibold tracking-wider text-foreground mb-2">
                  {product.name}
                </h3>
                <p className="text-signal-red font-bold text-xl">
                  {product.price}
                </p>
                <button className="mt-4 w-full bg-foreground text-background py-2 px-4 text-sm font-semibold tracking-widest uppercase hover:bg-foreground/90 transition-colors duration-300">
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Static Product Info (Mobile) */}
            <div className="md:hidden mt-4">
              <h3 className="text-lg font-semibold tracking-wider text-foreground">
                {product.name}
              </h3>
              <p className="text-signal-red font-bold text-xl">
                {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <button className="border border-foreground text-foreground px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-foreground hover:text-background transition-all duration-300">
          View All Products
        </button>
      </div>
    </section>
  );
};

export default ProductHighlights;
