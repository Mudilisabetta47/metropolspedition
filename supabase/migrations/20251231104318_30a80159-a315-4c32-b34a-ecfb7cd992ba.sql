
-- Create enum for tracking status
CREATE TYPE public.tracking_status AS ENUM (
  'order_received',
  'pickup_scheduled',
  'picked_up',
  'in_depot',
  'out_for_delivery',
  'delivered'
);

-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Quote Requests table
CREATE TABLE public.quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  pickup_address TEXT NOT NULL,
  pickup_zip TEXT NOT NULL,
  delivery_address TEXT NOT NULL,
  delivery_zip TEXT NOT NULL,
  shipping_date DATE NOT NULL,
  time_window TEXT,
  load_type TEXT NOT NULL DEFAULT 'palette',
  pallet_count INTEGER NOT NULL DEFAULT 1,
  pallet_dimensions TEXT NOT NULL DEFAULT '120x80',
  custom_length NUMERIC,
  custom_width NUMERIC,
  height_cm NUMERIC NOT NULL,
  weight_per_pallet_kg NUMERIC NOT NULL,
  total_weight_kg NUMERIC,
  needs_liftgate BOOLEAN DEFAULT false,
  needs_avis BOOLEAN DEFAULT false,
  is_express BOOLEAN DEFAULT false,
  temperature_controlled BOOLEAN DEFAULT false,
  needs_insurance BOOLEAN DEFAULT false,
  remarks TEXT,
  document_url TEXT,
  privacy_accepted BOOLEAN NOT NULL DEFAULT false,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Partner Offers table
CREATE TABLE public.partner_offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  region TEXT NOT NULL,
  pricing_details TEXT NOT NULL,
  validity_date DATE,
  document_url TEXT,
  privacy_accepted BOOLEAN NOT NULL DEFAULT false,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tracking Shipments table
CREATE TABLE public.tracking_shipments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_id TEXT UNIQUE NOT NULL,
  sender_name TEXT NOT NULL,
  recipient_name TEXT NOT NULL,
  current_status tracking_status NOT NULL DEFAULT 'order_received',
  origin_city TEXT NOT NULL,
  destination_city TEXT NOT NULL,
  estimated_delivery DATE,
  events JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- User Roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Profiles table for admin users
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Contact Messages table
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  privacy_accepted BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracking_shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Function to check if user has a specific role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  RETURN new;
END;
$$;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS Policies

-- Quote requests: Anyone can insert, only admins can view all
CREATE POLICY "Anyone can submit quote requests"
  ON public.quote_requests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all quote requests"
  ON public.quote_requests FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update quote requests"
  ON public.quote_requests FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Partner offers: Anyone can insert, only admins can view
CREATE POLICY "Anyone can submit partner offers"
  ON public.partner_offers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all partner offers"
  ON public.partner_offers FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Tracking shipments: Anyone can view by tracking_id, admins can manage
CREATE POLICY "Anyone can view tracking by ID"
  ON public.tracking_shipments FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert tracking shipments"
  ON public.tracking_shipments FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update tracking shipments"
  ON public.tracking_shipments FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete tracking shipments"
  ON public.tracking_shipments FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- User roles: Only admins can view/modify
CREATE POLICY "Admins can view all user roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR user_id = auth.uid());

CREATE POLICY "Admins can manage user roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Profiles: Users can view their own, admins can view all
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid());

-- Contact messages: Anyone can insert, admins can view
CREATE POLICY "Anyone can submit contact messages"
  ON public.contact_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view contact messages"
  ON public.contact_messages FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Insert demo tracking data
INSERT INTO public.tracking_shipments (tracking_id, sender_name, recipient_name, current_status, origin_city, destination_city, estimated_delivery, events) VALUES
('MP-2024-001234', 'ABC GmbH', 'XYZ Handel', 'delivered', 'München', 'Stuttgart', '2024-12-28', '[{"status": "order_received", "timestamp": "2024-12-26T08:00:00Z", "location": "München", "description": "Auftrag erfasst"}, {"status": "pickup_scheduled", "timestamp": "2024-12-26T10:30:00Z", "location": "München", "description": "Abholung für 14:00 Uhr geplant"}, {"status": "picked_up", "timestamp": "2024-12-26T14:15:00Z", "location": "München", "description": "Sendung abgeholt"}, {"status": "in_depot", "timestamp": "2024-12-26T18:00:00Z", "location": "Augsburg", "description": "Im Umschlagdepot eingetroffen"}, {"status": "out_for_delivery", "timestamp": "2024-12-27T07:00:00Z", "location": "Stuttgart", "description": "In Zustellung"}, {"status": "delivered", "timestamp": "2024-12-27T11:30:00Z", "location": "Stuttgart", "description": "Erfolgreich zugestellt"}]'),
('MP-2024-001235', 'Müller Industrie', 'Schmidt Technik', 'out_for_delivery', 'Frankfurt', 'Mannheim', '2024-12-30', '[{"status": "order_received", "timestamp": "2024-12-29T09:00:00Z", "location": "Frankfurt", "description": "Auftrag erfasst"}, {"status": "pickup_scheduled", "timestamp": "2024-12-29T09:30:00Z", "location": "Frankfurt", "description": "Abholung geplant"}, {"status": "picked_up", "timestamp": "2024-12-29T14:00:00Z", "location": "Frankfurt", "description": "Sendung abgeholt"}, {"status": "in_depot", "timestamp": "2024-12-29T19:00:00Z", "location": "Darmstadt", "description": "Im Depot"}, {"status": "out_for_delivery", "timestamp": "2024-12-30T06:30:00Z", "location": "Mannheim", "description": "Auf dem Weg zum Empfänger"}]'),
('MP-2024-001236', 'Weber Logistik', 'Huber Handel', 'in_depot', 'Köln', 'Düsseldorf', '2024-12-31', '[{"status": "order_received", "timestamp": "2024-12-30T08:00:00Z", "location": "Köln", "description": "Auftrag erfasst"}, {"status": "pickup_scheduled", "timestamp": "2024-12-30T08:30:00Z", "location": "Köln", "description": "Abholung für 13:00 Uhr bestätigt"}, {"status": "picked_up", "timestamp": "2024-12-30T13:20:00Z", "location": "Köln", "description": "Sendung abgeholt"}, {"status": "in_depot", "timestamp": "2024-12-30T16:00:00Z", "location": "Leverkusen", "description": "Im Umschlagdepot"}]'),
('MP-2024-001237', 'Fischer & Söhne', 'Bauer GmbH', 'picked_up', 'Hamburg', 'Bremen', '2025-01-02', '[{"status": "order_received", "timestamp": "2024-12-31T07:00:00Z", "location": "Hamburg", "description": "Auftrag erfasst"}, {"status": "pickup_scheduled", "timestamp": "2024-12-31T07:30:00Z", "location": "Hamburg", "description": "Abholung geplant"}, {"status": "picked_up", "timestamp": "2024-12-31T12:00:00Z", "location": "Hamburg", "description": "Sendung beim Versender abgeholt"}]'),
('MP-2024-001238', 'Schneider AG', 'Klein Electronics', 'pickup_scheduled', 'Berlin', 'Potsdam', '2025-01-03', '[{"status": "order_received", "timestamp": "2024-12-31T10:00:00Z", "location": "Berlin", "description": "Auftrag erfasst"}, {"status": "pickup_scheduled", "timestamp": "2024-12-31T10:30:00Z", "location": "Berlin", "description": "Abholung für 02.01. geplant"}]'),
('MP-2024-001239', 'Hoffmann Distribution', 'Richter Retail', 'order_received', 'Nürnberg', 'Regensburg', '2025-01-04', '[{"status": "order_received", "timestamp": "2024-12-31T11:00:00Z", "location": "Nürnberg", "description": "Auftrag erfasst - wird bearbeitet"}]'),
('MP-2024-001240', 'Beck Spedition', 'Krause Werke', 'delivered', 'Leipzig', 'Dresden', '2024-12-29', '[{"status": "order_received", "timestamp": "2024-12-27T08:00:00Z", "location": "Leipzig", "description": "Auftrag erfasst"}, {"status": "pickup_scheduled", "timestamp": "2024-12-27T08:30:00Z", "location": "Leipzig", "description": "Abholung bestätigt"}, {"status": "picked_up", "timestamp": "2024-12-27T11:00:00Z", "location": "Leipzig", "description": "Sendung abgeholt"}, {"status": "in_depot", "timestamp": "2024-12-27T15:00:00Z", "location": "Leipzig", "description": "Im Depot sortiert"}, {"status": "out_for_delivery", "timestamp": "2024-12-28T06:00:00Z", "location": "Dresden", "description": "In Zustellung"}, {"status": "delivered", "timestamp": "2024-12-28T10:45:00Z", "location": "Dresden", "description": "Zugestellt - Unterschrift erhalten"}]'),
('MP-2024-001241', 'Wolf Transport', 'Braun Maschinenbau', 'in_depot', 'Hannover', 'Braunschweig', '2025-01-02', '[{"status": "order_received", "timestamp": "2024-12-30T14:00:00Z", "location": "Hannover", "description": "Eilauftrag erfasst"}, {"status": "pickup_scheduled", "timestamp": "2024-12-30T14:15:00Z", "location": "Hannover", "description": "Express-Abholung bestätigt"}, {"status": "picked_up", "timestamp": "2024-12-30T16:30:00Z", "location": "Hannover", "description": "Sendung abgeholt"}, {"status": "in_depot", "timestamp": "2024-12-30T20:00:00Z", "location": "Hildesheim", "description": "Im Zwischenlager"}]'),
('MP-2024-001242', 'Meyer Versand', 'Schuster Online', 'out_for_delivery', 'Dortmund', 'Essen', '2024-12-31', '[{"status": "order_received", "timestamp": "2024-12-30T07:00:00Z", "location": "Dortmund", "description": "Auftrag eingegangen"}, {"status": "pickup_scheduled", "timestamp": "2024-12-30T07:30:00Z", "location": "Dortmund", "description": "Abholung für 11:00 Uhr"}, {"status": "picked_up", "timestamp": "2024-12-30T11:15:00Z", "location": "Dortmund", "description": "Abholung erfolgt"}, {"status": "in_depot", "timestamp": "2024-12-30T14:00:00Z", "location": "Bochum", "description": "Umschlag im Depot"}, {"status": "out_for_delivery", "timestamp": "2024-12-31T07:30:00Z", "location": "Essen", "description": "Zustellung heute"}]'),
('MP-2024-001243', 'Lang Logistik', 'Groß Pharma', 'pickup_scheduled', 'Karlsruhe', 'Heidelberg', '2025-01-03', '[{"status": "order_received", "timestamp": "2024-12-31T09:00:00Z", "location": "Karlsruhe", "description": "Temperaturgeführte Sendung erfasst"}, {"status": "pickup_scheduled", "timestamp": "2024-12-31T09:30:00Z", "location": "Karlsruhe", "description": "Spezialfahrzeug für 02.01. disponiert"}]');
