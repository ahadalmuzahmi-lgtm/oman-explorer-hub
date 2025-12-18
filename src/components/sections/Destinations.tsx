import { MapPin, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import muscatImage from "@/assets/destination-muscat.jpg";
import wadiImage from "@/assets/destination-wadi.jpg";
import coastImage from "@/assets/destination-coast.jpg";

const destinations = [
  {
    id: 1,
    name: "Muscat",
    description: "The capital city blending ancient heritage with modern elegance",
    image: muscatImage,
    rating: 4.9,
    reviews: 2847,
    highlights: ["Grand Mosque", "Royal Opera House", "Muttrah Souq"],
  },
  {
    id: 2,
    name: "Wadi Shab",
    description: "Turquoise pools hidden within dramatic canyon landscapes",
    image: wadiImage,
    rating: 4.8,
    reviews: 1923,
    highlights: ["Swimming Pools", "Cave Exploration", "Hiking Trails"],
  },
  {
    id: 3,
    name: "Musandam Coast",
    description: "The 'Norway of Arabia' with stunning fjords and crystal waters",
    image: coastImage,
    rating: 4.9,
    reviews: 1456,
    highlights: ["Dhow Cruises", "Dolphin Watching", "Snorkeling"],
  },
];

const Destinations = () => {
  return (
    <section id="destinations" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 md:mb-16">
          <p className="text-accent font-medium tracking-wider uppercase text-sm mb-3">
            Popular Destinations
          </p>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Discover Oman's Hidden Gems
          </h2>
          <p className="text-lg text-muted-foreground">
            From majestic mountains to pristine coastlines, explore the diverse landscapes
            that make Oman a traveler's paradise.
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {destinations.map((destination, index) => (
            <article
              key={destination.id}
              className="group bg-card rounded-2xl overflow-hidden shadow-soft hover-lift animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Star className="w-4 h-4 text-gold fill-gold" />
                  <span className="font-semibold text-foreground">{destination.rating}</span>
                </div>

                {/* Location */}
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center gap-2 text-cream">
                    <MapPin className="w-4 h-4" />
                    <span className="font-medium">{destination.name}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-foreground mb-2">
                  {destination.name}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {destination.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {destination.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="text-xs font-medium px-3 py-1 bg-secondary rounded-full text-secondary-foreground"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-sm text-muted-foreground">
                    {destination.reviews.toLocaleString()} reviews
                  </span>
                  <Button variant="ghost" size="sm" className="group/btn">
                    Explore
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Destinations
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Destinations;
