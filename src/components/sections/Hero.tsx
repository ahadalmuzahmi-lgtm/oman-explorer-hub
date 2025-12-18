import { useState } from "react";
import { Search, Calendar, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-oman.jpg";

const Hero = () => {
  const [searchType, setSearchType] = useState<"stays" | "experiences" | "tours">("stays");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Beautiful Oman desert landscape at sunset"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/20 to-foreground/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tagline */}
          <p
            className="text-gold-light font-medium tracking-wider uppercase text-sm md:text-base mb-4 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Discover the Sultanate
          </p>

          {/* Headline */}
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-cream mb-6 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            Experience the Magic of{" "}
            <span className="text-gradient-gold">Oman</span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg md:text-xl text-cream/90 max-w-2xl mx-auto mb-10 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            From ancient forts to pristine beaches, desert adventures to cultural treasures.
            Your journey through Oman's wonders begins here.
          </p>

          {/* Search Box */}
          <div
            className="bg-card/95 backdrop-blur-lg rounded-2xl shadow-elevated p-4 md:p-6 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            {/* Search Type Tabs */}
            <div className="flex gap-2 mb-4 border-b border-border pb-4">
              {[
                { id: "stays", label: "Stays" },
                { id: "experiences", label: "Experiences" },
                { id: "tours", label: "Tours" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSearchType(tab.id as typeof searchType)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    searchType === tab.id
                      ? "bg-gold text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Fields */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Location */}
              <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                <MapPin className="w-5 h-5 text-accent" />
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Where</p>
                  <input
                    type="text"
                    placeholder="Search destinations"
                    className="w-full bg-transparent text-foreground font-medium placeholder:text-muted-foreground focus:outline-none"
                  />
                </div>
              </div>

              {/* Check In */}
              <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                <Calendar className="w-5 h-5 text-accent" />
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">When</p>
                  <input
                    type="text"
                    placeholder="Add dates"
                    className="w-full bg-transparent text-foreground font-medium placeholder:text-muted-foreground focus:outline-none"
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                <Users className="w-5 h-5 text-accent" />
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Who</p>
                  <input
                    type="text"
                    placeholder="Add guests"
                    className="w-full bg-transparent text-foreground font-medium placeholder:text-muted-foreground focus:outline-none"
                  />
                </div>
              </div>

              {/* Search Button */}
              <Button variant="gold" size="lg" className="w-full">
                <Search className="w-5 h-5" />
                Search
              </Button>
            </div>
          </div>

          {/* Trust Badges */}
          <div
            className="mt-8 flex flex-wrap items-center justify-center gap-6 text-cream/80 animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gold">500+</span>
              <span className="text-sm">Destinations</span>
            </div>
            <div className="w-px h-6 bg-cream/30" />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gold">10K+</span>
              <span className="text-sm">Happy Travelers</span>
            </div>
            <div className="w-px h-6 bg-cream/30" />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gold">200+</span>
              <span className="text-sm">Local Guides</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-cream/50 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-cream/80 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
