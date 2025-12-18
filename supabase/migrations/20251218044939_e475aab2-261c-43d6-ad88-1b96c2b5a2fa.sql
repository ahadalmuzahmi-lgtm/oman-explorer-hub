-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  preferred_language TEXT DEFAULT 'en',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create hotels table
CREATE TABLE public.hotels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  address TEXT,
  price_per_night DECIMAL(10,2) NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0,
  images TEXT[],
  amenities TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create local guides table
CREATE TABLE public.local_guides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  bio TEXT,
  languages TEXT[],
  specialties TEXT[],
  price_per_day DECIMAL(10,2),
  rating DECIMAL(2,1) DEFAULT 0,
  avatar_url TEXT,
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create experiences table
CREATE TABLE public.experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guide_id UUID REFERENCES public.local_guides(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,
  duration_hours INTEGER,
  price DECIMAL(10,2) NOT NULL,
  max_group_size INTEGER DEFAULT 10,
  images TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  booking_type TEXT NOT NULL CHECK (booking_type IN ('hotel', 'experience', 'guide')),
  hotel_id UUID REFERENCES public.hotels(id) ON DELETE SET NULL,
  experience_id UUID REFERENCES public.experiences(id) ON DELETE SET NULL,
  guide_id UUID REFERENCES public.local_guides(id) ON DELETE SET NULL,
  check_in_date DATE,
  check_out_date DATE,
  guests INTEGER DEFAULT 1,
  total_price DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  hotel_id UUID REFERENCES public.hotels(id) ON DELETE CASCADE,
  guide_id UUID REFERENCES public.local_guides(id) ON DELETE CASCADE,
  experience_id UUID REFERENCES public.experiences(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  images TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.local_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Hotels policies (public read, no write for regular users)
CREATE POLICY "Anyone can view active hotels" ON public.hotels FOR SELECT USING (is_active = true);

-- Local guides policies (public read)
CREATE POLICY "Anyone can view active guides" ON public.local_guides FOR SELECT USING (is_active = true);
CREATE POLICY "Guides can update their own profile" ON public.local_guides FOR UPDATE USING (auth.uid() = user_id);

-- Experiences policies (public read)
CREATE POLICY "Anyone can view active experiences" ON public.experiences FOR SELECT USING (is_active = true);

-- Bookings policies
CREATE POLICY "Users can view their own bookings" ON public.bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create bookings" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own bookings" ON public.bookings FOR UPDATE USING (auth.uid() = user_id);

-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Users can create reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own reviews" ON public.reviews FOR UPDATE USING (auth.uid() = user_id);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (new.id, new.raw_user_meta_data ->> 'full_name', new.email);
  RETURN new;
END;
$$;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_hotels_updated_at BEFORE UPDATE ON public.hotels FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_local_guides_updated_at BEFORE UPDATE ON public.local_guides FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_experiences_updated_at BEFORE UPDATE ON public.experiences FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample hotels
INSERT INTO public.hotels (name, description, location, address, price_per_night, rating, amenities) VALUES
('Al Bustan Palace', 'Luxury 5-star resort nestled between the Al Hajar Mountains and the Sea of Oman', 'Muscat', 'Al Bustan Street, Muscat', 350.00, 4.9, ARRAY['Pool', 'Spa', 'Restaurant', 'Beach Access', 'WiFi']),
('Anantara Al Jabal Al Akhdar', 'Dramatic cliff-top resort with stunning canyon views', 'Jebel Akhdar', 'Al Jabal Al Akhdar, Nizwa', 420.00, 4.8, ARRAY['Pool', 'Spa', 'Restaurant', 'Mountain Views', 'WiFi']),
('Shangri-La Barr Al Jissah', 'Beachfront resort with private cove and turtle sanctuary', 'Muscat', 'Barr Al Jissah, Muscat', 280.00, 4.7, ARRAY['Pool', 'Spa', 'Restaurant', 'Beach Access', 'Diving Center']);

-- Insert sample local guides
INSERT INTO public.local_guides (name, bio, languages, specialties, price_per_day, rating) VALUES
('Ahmed Al-Balushi', 'Expert in Omani history and culture with 15 years of guiding experience', ARRAY['Arabic', 'English', 'French'], ARRAY['Cultural Tours', 'Historical Sites', 'City Tours'], 150.00, 4.9),
('Fatima Al-Harthi', 'Passionate about nature and wildlife, specializing in desert expeditions', ARRAY['Arabic', 'English'], ARRAY['Desert Safari', 'Wildlife', 'Camping'], 180.00, 4.8),
('Said Al-Rashdi', 'Mountain trekking expert and certified diving instructor', ARRAY['Arabic', 'English', 'German'], ARRAY['Trekking', 'Diving', 'Adventure Sports'], 200.00, 4.7);