import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Star, Globe, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BookingModal from "@/components/booking/BookingModal";
import { supabase } from "@/integrations/supabase/client";

interface Guide {
  id: string;
  name: string;
  bio: string;
  languages: string[];
  specialties: string[];
  price_per_day: number;
  rating: number;
  avatar_url: string;
  is_verified: boolean;
}

const Guides = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const fetchGuides = async () => {
      const { data, error } = await supabase.from("local_guides").select("*");
      if (!error && data) {
        setGuides(data);
      }
      setLoading(false);
    };
    fetchGuides();
  }, []);

  const handleBook = (guide: Guide) => {
    setSelectedGuide(guide);
    setIsBookingOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Local Guides - GoOman</title>
        <meta name="description" content="Connect with certified local guides in Oman for authentic cultural experiences and adventures." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-gold font-medium tracking-wider uppercase text-sm">Expert Guides</span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mt-2 mb-4">
                Local <span className="text-gradient-gold">Guides</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore Oman with passionate local experts who bring culture and history to life
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-card rounded-2xl h-80 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guides.map((guide) => (
                  <div key={guide.id} className="bg-card rounded-2xl border border-border p-6 hover:shadow-elegant transition-all duration-300">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-terracotta flex items-center justify-center text-2xl font-serif font-bold text-background">
                        {guide.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">{guide.name}</h3>
                          {guide.is_verified && (
                            <Award className="w-4 h-4 text-gold" />
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Star className="w-4 h-4 fill-gold text-gold" />
                          <span>{guide.rating}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {guide.bio}
                    </p>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="w-4 h-4 text-gold" />
                        <span>{guide.languages?.join(", ")}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {guide.specialties?.map((specialty) => (
                          <span key={specialty} className="text-xs bg-gold/10 text-gold px-2 py-1 rounded-full">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div>
                        <span className="text-2xl font-bold text-gold">{guide.price_per_day} OMR</span>
                        <span className="text-muted-foreground text-sm"> / day</span>
                      </div>
                      <Button variant="gold" size="sm" onClick={() => handleBook(guide)}>
                        Book Guide
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        type="guide"
        item={selectedGuide}
      />
    </>
  );
};

export default Guides;
