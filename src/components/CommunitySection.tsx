
const CommunitySection = () => {
  const communityImages = [
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1494790108755-2616c64a6e5e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1534308143481-c55c12503efc?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop"
  ];

  return (
    <section className="py-20 bg-carbon-grey">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            <span className="text-signal-red">404</span> CLUB
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
            Join a community of rebels, creators, and style innovators. Share your fits, get featured, and be part of the movement that's redefining streetwear culture.
          </p>
          <div className="inline-block bg-neon-blue text-black px-6 py-2 text-sm font-bold tracking-wider uppercase">
            #404CLUB
          </div>
        </div>

        {/* Community Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {communityImages.map((image, index) => (
            <div 
              key={index}
              className="aspect-square overflow-hidden bg-muted rounded-lg group cursor-pointer"
            >
              <img
                src={image}
                alt={`Community member ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="text-4xl font-bold text-neon-blue mb-2">12.5K</div>
            <div className="text-muted-foreground uppercase tracking-wider">Members</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-signal-red mb-2">3.2K</div>
            <div className="text-muted-foreground uppercase tracking-wider">Posts This Month</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-foreground mb-2">89</div>
            <div className="text-muted-foreground uppercase tracking-wider">Countries</div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="bg-signal-red text-foreground px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-signal-red/90 transition-all duration-300 glow-on-hover mr-4">
            Join 404 Club
          </button>
          <button className="border border-foreground text-foreground px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-foreground hover:text-background transition-all duration-300">
            Submit Your Fit
          </button>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
