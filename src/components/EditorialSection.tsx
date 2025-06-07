
const EditorialSection = () => {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <div>
            <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
              STREETWEAR<br />
              IS <span className="text-signal-red">CODE</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Every piece we create is a statement, a glitch in the matrix of conventional fashion. 
              We don't follow trends—we disrupt systems, challenge norms, and empower individuals 
              to express their authentic selves through bold, innovative design.
            </p>
            <button className="border border-foreground text-foreground px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-foreground hover:text-background transition-all duration-300">
              Our Manifesto
            </button>
          </div>

          {/* Quote Card */}
          <div className="bg-card p-8 border border-border relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-signal-red to-neon-blue"></div>
            <blockquote className="text-2xl font-medium italic text-foreground leading-relaxed">
              "Your style is a glitch in the system"
            </blockquote>
            <cite className="block mt-4 text-sm text-muted-foreground font-semibold tracking-wider uppercase">
              — 404 Fit Manifesto
            </cite>
          </div>
        </div>

        {/* Right Visual */}
        <div className="relative">
          <div className="aspect-[4/5] bg-gradient-to-br from-carbon-grey to-jet-black rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=750&fit=crop"
              alt="Editorial fashion shot"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            
            {/* Overlay Text */}
            <div className="absolute bottom-8 left-8 right-8">
              <div className="bg-signal-red text-black px-4 py-2 inline-block text-xs font-bold tracking-wider uppercase mb-4">
                Born in the Glitch
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                Styled by the Streets
              </h3>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 border border-neon-blue/30 rotate-45"></div>
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-signal-red/20 rotate-12"></div>
        </div>
      </div>
    </section>
  );
};

export default EditorialSection;
