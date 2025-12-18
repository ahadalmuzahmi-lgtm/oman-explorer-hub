import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-ocean-gradient" />
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="pattern" patternUnits="userSpaceOnUse" width="10" height="10">
              <path d="M 0 5 L 5 0 L 10 5 L 5 10 Z" fill="currentColor" fillOpacity="0.3" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#pattern)" />
        </svg>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-cream mb-6">
            Ready to Explore Oman?
          </h2>
          <p className="text-lg md:text-xl text-cream/80 mb-8">
            Join thousands of travelers who have discovered the magic of Oman.
            Create your free account and start planning your dream adventure today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl">
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="heroOutline" size="xl">
              Browse Destinations
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-cream/20">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-gold mb-2">98%</p>
              <p className="text-sm text-cream/70">Satisfaction Rate</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-gold mb-2">24/7</p>
              <p className="text-sm text-cream/70">Customer Support</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-gold mb-2">Free</p>
              <p className="text-sm text-cream/70">Cancellation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
