import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  condition: 'new' | 'used';
  type: 'sedan' | 'suv' | 'truck' | 'coupe' | 'convertible' | 'hatchback';
  transmission: 'automatic' | 'manual';
  fuel_type: 'gasoline' | 'hybrid' | 'electric';
  exterior_color: string;
  interior_color: string;
  engine: string;
  features: string[];
  description: string;
  vin: string;
  available: boolean;
  created_at: string;
  updated_at: string;
}

export interface VehicleImage {
  id: string;
  vehicle_id: string;
  image_url: string;
  image_path: string;
  is_primary: boolean;
  sort_order: number;
  created_at: string;
}