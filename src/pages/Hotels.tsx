import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Star, MapPin, Wifi, Car, Coffee, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BookingModal from "@/components/booking/BookingModal";
import { supabase } from "@/integrations/supabase/client";

interface Hotel {
  id: string;
  name: string;
  description: string;
  location: string;
  address: string;
  price_per_night: number;
  rating: number;
  amenities: string[];
  images: string[];
}

const amenityIcons: Record<string, React.ReactNode> = {
  WiFi: <Wifi className="w-4 h-4" />,
  Pool: <Waves className="w-4 h-4" />,
  Restaurant: <Coffee className="w-4 h-4" />,
  Parking: <Car className="w-4 h-4" />,
};

const Hotels = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const fetchHotels = async () => {
      const { data, error } = await supabase.from("hotels").select("*");
      if (!error && data) {
        setHotels(data);
      }
      setLoading(false);
    };
    fetchHotels();
  }, []);

  const handleBook = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setIsBookingOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Hotels in Oman - GoOman</title>
        <meta name="description" content="Discover luxury hotels and resorts in Oman. Book your perfect stay in Muscat, Salalah, and beyond." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-gold font-medium tracking-wider uppercase text-sm">Accommodations</span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mt-2 mb-4">
                Hotels & <span className="text-gradient-gold">Resorts</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Experience Omani hospitality at its finest in our curated selection of hotels
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-card rounded-2xl h-96 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hotels.map((hotel) => (
                  <div key={hotel.id} className="bg-card rounded-2xl border border-border overflow-hidden group hover:shadow-elegant transition-all duration-300">
                    <div className="aspect-video bg-gradient-to-br from-sand to-sand-dark relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full">
                        <Star className="w-4 h-4 fill-gold text-gold" />
                        <span className="text-sm font-medium">{hotel.rating}</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-serif font-semibold mb-2">{hotel.name}</h3>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
                        <MapPin className="w-4 h-4" />
                        <span>{hotel.location}</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {hotel.description}
                      </p>

                      <div className="flex gap-2 mb-4">
                        {hotel.amenities?.slice(0, 4).map((amenity) => (
                          <span key={amenity} className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded-full">
                            {amenityIcons[amenity] || null}
                            {amenity}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div>
                          <span className="text-2xl font-bold text-gold">{hotel.price_per_night} OMR</span>
                          <span className="text-muted-foreground text-sm"> / night</span>
                        </div>
                        <Button variant="gold" size="sm" onClick={() => handleBook(hotel)}>
                          Book Now
                        </Button>
                      </div>
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
        type="hotel"
        item={selectedHotel}
      />
    </>
  );
};

export default Hotels;
