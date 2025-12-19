import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "hotel" | "guide" | "experience";
  item: any;
}

const BookingModal = ({ isOpen, onClose, type, item }: BookingModalProps) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  if (!item) return null;

  const calculateTotal = () => {
    if (type === "hotel" && checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      return nights > 0 ? nights * item.price_per_night : 0;
    }
    if (type === "guide") {
      return item.price_per_day;
    }
    if (type === "experience") {
      return item.price * guests;
    }
    return 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({ title: "Sign in required", description: "Please sign in to make a booking.", variant: "destructive" });
      navigate("/auth");
      return;
    }

    if (type === "hotel" && (!checkIn || !checkOut)) {
      toast({ title: "Dates required", description: "Please select check-in and check-out dates.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    const bookingData: any = {
      user_id: user.id,
      booking_type: type,
      guests,
      total_price: calculateTotal(),
      status: "pending",
    };

    if (type === "hotel") {
      bookingData.hotel_id = item.id;
      bookingData.check_in_date = checkIn;
      bookingData.check_out_date = checkOut;
    } else if (type === "guide") {
      bookingData.guide_id = item.id;
      bookingData.check_in_date = checkIn || new Date().toISOString().split("T")[0];
    } else if (type === "experience") {
      bookingData.experience_id = item.id;
      bookingData.check_in_date = checkIn || new Date().toISOString().split("T")[0];
    }

    const { error } = await supabase.from("bookings").insert(bookingData);

    if (error) {
      toast({ title: "Booking failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Booking confirmed!", description: "Your booking has been submitted successfully." });
      onClose();
      navigate("/bookings");
    }

    setIsSubmitting(false);
  };

  const title = type === "hotel" ? item.name : type === "guide" ? `Book ${item.name}` : item.title;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif">{title}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="checkIn">{type === "hotel" ? "Check-in" : "Date"}</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="checkIn"
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="pl-10"
                  min={new Date().toISOString().split("T")[0]}
                  required={type === "hotel"}
                />
              </div>
            </div>

            {type === "hotel" && (
              <div className="space-y-2">
                <Label htmlFor="checkOut">Check-out</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="checkOut"
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="pl-10"
                    min={checkIn || new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
              </div>
            )}

            {type !== "guide" && (
              <div className="space-y-2">
                <Label htmlFor="guests">Guests</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="guests"
                    type="number"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="pl-10"
                    min={1}
                    max={10}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="bg-muted rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total</span>
              <span className="text-2xl font-bold text-gold">{calculateTotal()} OMR</span>
            </div>
          </div>

          <Button type="submit" variant="gold" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Confirm Booking"}
          </Button>

          {!user && (
            <p className="text-sm text-center text-muted-foreground">
              You'll need to <a href="/auth" className="text-gold hover:underline">sign in</a> to complete your booking
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
