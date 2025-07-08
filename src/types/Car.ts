export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  condition: 'new' | 'used';
  type: 'sedan' | 'suv' | 'truck' | 'coupe' | 'convertible' | 'hatchback';
  transmission: 'automatic' | 'manual';
  fuelType: 'gasoline' | 'hybrid' | 'electric';
  exterior: string;
  interior: string;
  engine: string;
  features: string[];
  images: string[];
  description: string;
  available: boolean;
  vin: string;
}

export interface CarFilters {
  make?: string;
  model?: string;
  yearRange?: [number, number];
  priceRange?: [number, number];
  mileageRange?: [number, number];
  condition?: 'new' | 'used' | 'all';
  type?: string;
  transmission?: string;
  fuelType?: string;
}