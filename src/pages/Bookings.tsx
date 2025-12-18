import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface Booking {
  id: string;
  booking_type: string;
  check_in_date: string;
  check_out_date: string;
  guests: number;
  total_price: number;
  status: string;
  created_at: string;
  hotels?: { name: string; location: string };
  local_guides?: { name: string };
  experiences?: { title: string; location: string };
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-600",
  confirmed: "bg-green-500/10 text-green-600",
  cancelled: "bg-red-500/10 text-red-600",
  completed: "bg-blue-500/10 text-blue-600",
};

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          hotels(name, location),
          local_guides(name),
          experiences(title, location)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setBookings(data);
      }
      setLoading(false);
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  const getBookingTitle = (booking: Booking) => {
    if (booking.booking_type === "hotel" && booking.hotels) {
      return booking.hotels.name;
    }
    if (booking.booking_type === "guide" && booking.local_guides) {
      return `Guide: ${booking.local_guides.name}`;
    }
    if (booking.booking_type === "experience" && booking.experiences) {
      return booking.experiences.title;
    }
    return "Booking";
  };

  const getBookingLocation = (booking: Booking) => {
    if (booking.booking_type === "hotel" && booking.hotels) {
      return booking.hotels.location;
    }
    if (booking.booking_type === "experience" && booking.experiences) {
      return booking.experiences.location;
    }
    return null;
  };

  if (authLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>My Bookings - GoOman</title>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h1 className="text-3xl font-serif font-bold mb-2">My Bookings</h1>
              <p className="text-muted-foreground">Manage your upcoming trips and reservations</p>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-card rounded-2xl h-32 animate-pulse" />
                ))}
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium mb-2">No bookings yet</h3>
                <p className="text-muted-foreground mb-6">Start exploring Oman and make your first booking</p>
                <Button variant="gold" onClick={() => navigate("/hotels")}>
                  Browse Hotels
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="bg-card rounded-2xl border border-border p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{getBookingTitle(booking)}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[booking.status]}`}>
                            {booking.status}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          {getBookingLocation(booking) && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {getBookingLocation(booking)}
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(booking.check_in_date).toLocaleDateString()}
                            {booking.check_out_date && ` - ${new Date(booking.check_out_date).toLocaleDateString()}`}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {booking.guests} guest(s)
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-bold text-gold">${booking.total_price}</div>
                        <div className="text-sm text-muted-foreground capitalize">{booking.booking_type}</div>
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
    </>
  );
};

export default Bookings;
