import { Clock, Users, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import cultureImage from "@/assets/experience-culture.jpg";
import safariImage from "@/assets/experience-safari.jpg";
import divingImage from "@/assets/experience-diving.jpg";
import soukImage from "@/assets/experience-souk.jpg";

const experiences = [
  {
    id: 1,
    title: "Bedouin Desert Experience",
    description: "Authentic coffee ceremony with local guides under the stars",
    image: cultureImage,
    duration: "4 hours",
    groupSize: "Up to 8",
    price: 85,
    rating: 4.9,
    category: "Cultural",
  },
  {
    id: 2,
    title: "Desert Safari Adventure",
    description: "Thrilling dune bashing and sunset views in Wahiba Sands",
    image: safariImage,
    duration: "6 hours",
    groupSize: "Up to 6",
    price: 120,
    rating: 4.8,
    category: "Adventure",
  },
  {
    id: 3,
    title: "Scuba Diving Expedition",
    description: "Explore vibrant coral reefs and marine life in crystal waters",
    image: divingImage,
    duration: "5 hours",
    groupSize: "Up to 4",
    price: 150,
    rating: 4.9,
    category: "Marine",
  },
  {
    id: 4,
    title: "Souq Walking Tour",
    description: "Navigate ancient markets with a local expert guide",
    image: soukImage,
    duration: "3 hours",
    groupSize: "Up to 10",
    price: 45,
    rating: 4.7,
    category: "Cultural",
  },
];

const Experiences = () => {
  return (
    <section id="experiences" className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <p className="text-accent font-medium tracking-wider uppercase text-sm mb-3">
              Authentic Experiences
            </p>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
              Curated by Local Experts
            </h2>
            <p className="text-lg text-muted-foreground">
              Immerse yourself in Oman's rich culture with experiences crafted and led
              by passionate local guides who know every hidden treasure.
            </p>
          </div>
          <Button variant="gold" size="lg">
            Browse All Experiences
          </Button>
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((experience, index) => (
            <article
              key={experience.id}
              className="group bg-card rounded-2xl overflow-hidden shadow-soft hover-lift animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={experience.image}
                  alt={experience.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Category Badge */}
                <span className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 bg-gold text-foreground rounded-full">
                  {experience.category}
                </span>

                {/* Favorite Button */}
                <button
                  className="absolute top-3 right-3 p-2 bg-card/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-card"
                  aria-label="Add to favorites"
                >
                  <Heart className="w-4 h-4 text-foreground" />
                </button>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 text-gold fill-gold" />
                  <span className="font-semibold text-foreground">{experience.rating}</span>
                </div>

                <h3 className="font-semibold text-foreground mb-2 line-clamp-1">
                  {experience.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {experience.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{experience.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{experience.groupSize}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <span className="text-xs text-muted-foreground">From</span>
                    <p className="text-lg font-bold text-foreground">
                      ${experience.price}
                      <span className="text-sm font-normal text-muted-foreground"> /person</span>
                    </p>
                  </div>
                  <Button variant="ocean" size="sm">
                    Book Now
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experiences;
