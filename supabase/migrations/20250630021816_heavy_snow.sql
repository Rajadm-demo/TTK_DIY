/*
  # Create inventory management tables

  1. New Tables
    - `vehicles`
      - `id` (uuid, primary key)
      - `make` (text)
      - `model` (text)
      - `year` (integer)
      - `price` (decimal)
      - `mileage` (integer)
      - `condition` (text)
      - `type` (text)
      - `transmission` (text)
      - `fuel_type` (text)
      - `exterior_color` (text)
      - `interior_color` (text)
      - `engine` (text)
      - `features` (text array)
      - `description` (text)
      - `vin` (text, unique)
      - `available` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `vehicle_images`
      - `id` (uuid, primary key)
      - `vehicle_id` (uuid, foreign key)
      - `image_url` (text)
      - `image_path` (text)
      - `is_primary` (boolean)
      - `sort_order` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users (admin) to manage data
    - Add policies for public users to read available vehicles
*/

-- Create vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  make text NOT NULL,
  model text NOT NULL,
  year integer NOT NULL,
  price decimal(10,2) NOT NULL,
  mileage integer DEFAULT 0,
  condition text NOT NULL CHECK (condition IN ('new', 'used')),
  type text NOT NULL CHECK (type IN ('sedan', 'suv', 'truck', 'coupe', 'convertible', 'hatchback')),
  transmission text NOT NULL CHECK (transmission IN ('automatic', 'manual')),
  fuel_type text NOT NULL CHECK (fuel_type IN ('gasoline', 'hybrid', 'electric')),
  exterior_color text NOT NULL,
  interior_color text NOT NULL,
  engine text NOT NULL,
  features text[] DEFAULT '{}',
  description text NOT NULL,
  vin text UNIQUE NOT NULL,
  available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create vehicle_images table
CREATE TABLE IF NOT EXISTS vehicle_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id uuid REFERENCES vehicles(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  image_path text NOT NULL,
  is_primary boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_images ENABLE ROW LEVEL SECURITY;

-- Policies for vehicles table
CREATE POLICY "Public can read available vehicles"
  ON vehicles
  FOR SELECT
  TO public
  USING (available = true);

CREATE POLICY "Authenticated users can manage vehicles"
  ON vehicles
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for vehicle_images table
CREATE POLICY "Public can read vehicle images"
  ON vehicle_images
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM vehicles 
      WHERE vehicles.id = vehicle_images.vehicle_id 
      AND vehicles.available = true
    )
  );

CREATE POLICY "Authenticated users can manage vehicle images"
  ON vehicle_images
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_vehicles_make ON vehicles(make);
CREATE INDEX IF NOT EXISTS idx_vehicles_model ON vehicles(model);
CREATE INDEX IF NOT EXISTS idx_vehicles_year ON vehicles(year);
CREATE INDEX IF NOT EXISTS idx_vehicles_price ON vehicles(price);
CREATE INDEX IF NOT EXISTS idx_vehicles_available ON vehicles(available);
CREATE INDEX IF NOT EXISTS idx_vehicle_images_vehicle_id ON vehicle_images(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_vehicle_images_sort_order ON vehicle_images(sort_order);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_vehicles_updated_at
  BEFORE UPDATE ON vehicles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();