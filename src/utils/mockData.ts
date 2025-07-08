import { Car } from '../types/Car';

export const mockCars: Car[] = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Camry',
    year: 2023,
    price: 28500,
    mileage: 15000,
    condition: 'used',
    type: 'sedan',
    transmission: 'automatic',
    fuelType: 'gasoline',
    exterior: 'Silver',
    interior: 'Black',
    engine: '2.5L 4-Cylinder',
    features: ['Backup Camera', 'Bluetooth', 'Apple CarPlay', 'Lane Assist', 'Automatic Emergency Braking'],
    images: [
      'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Well-maintained Toyota Camry with low mileage. Perfect for daily commuting with excellent fuel economy.',
    available: true,
    vin: 'JTDKAMFU5O3123456'
  },
  {
    id: '2',
    make: 'Honda',
    model: 'CR-V',
    year: 2024,
    price: 35900,
    mileage: 0,
    condition: 'new',
    type: 'suv',
    transmission: 'automatic',
    fuelType: 'gasoline',
    exterior: 'Blue',
    interior: 'Gray',
    engine: '1.5L Turbo',
    features: ['AWD', 'Sunroof', 'Heated Seats', 'Honda Sensing', 'Wireless Charging'],
    images: [
      'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Brand new Honda CR-V with all the latest safety features and technology.',
    available: true,
    vin: 'JHLRWH25XPC123456'
  },
  {
    id: '3',
    make: 'Ford',
    model: 'F-150',
    year: 2023,
    price: 42000,
    mileage: 8500,
    condition: 'used',
    type: 'truck',
    transmission: 'automatic',
    fuelType: 'gasoline',
    exterior: 'Black',
    interior: 'Black',
    engine: '3.5L V6 EcoBoost',
    features: ['4WD', 'Tow Package', 'Crew Cab', 'Bed Liner', 'Navigation'],
    images: [
      'https://images.pexels.com/photos/1051924/pexels-photo-1051924.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Powerful Ford F-150 with excellent towing capacity. Perfect for work and recreation.',
    available: true,
    vin: 'JF1GKASP6PH123456'
  },
  {
    id: '4',
    make: 'BMW',
    model: '3 Series',
    year: 2022,
    price: 38900,
    mileage: 12000,
    condition: 'used',
    type: 'sedan',
    transmission: 'automatic',
    fuelType: 'gasoline',
    exterior: 'White',
    interior: 'Brown',
    engine: '2.0L Turbo',
    features: ['Leather Seats', 'Premium Audio', 'Navigation', 'Adaptive Cruise Control', 'Parking Assist'],
    images: [
      'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Luxury BMW 3 Series with premium features and sporty performance.',
    available: true,
    vin: 'WBA5A7C51JD123456'
  },
  {
    id: '5',
    make: 'Tesla',
    model: 'Model Y',
    year: 2024,
    price: 52000,
    mileage: 0,
    condition: 'new',
    type: 'suv',
    transmission: 'automatic',
    fuelType: 'electric',
    exterior: 'Red',
    interior: 'White',
    engine: 'Dual Motor AWD',
    features: ['Autopilot', 'Supercharging', '15" Touchscreen', 'Premium Audio', 'Glass Roof'],
    images: [
      'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Cutting-edge electric SUV with autonomous driving capabilities and zero emissions.',
    available: true,
    vin: '5YJYGDEE5PF123456'
  },
  {
    id: '6',
    make: 'Chevrolet',
    model: 'Tahoe',
    year: 2023,
    price: 58900,
    mileage: 5200,
    condition: 'used',
    type: 'suv',
    transmission: 'automatic',
    fuelType: 'gasoline',
    exterior: 'Gray',
    interior: 'Black',
    engine: '5.3L V8',
    features: ['Third Row Seating', 'Tow Package', 'Premium Audio', 'Navigation', 'Rear Entertainment'],
    images: [
      'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Spacious family SUV with seating for up to 8 passengers and plenty of cargo space.',
    available: true,
    vin: '1GNSKGKC5PR123456'
  }
];

export const carMakes = ['Toyota', 'Honda', 'Ford', 'BMW', 'Tesla', 'Chevrolet', 'Nissan', 'Hyundai', 'Kia', 'Mazda'];
export const carTypes = ['sedan', 'suv', 'truck', 'coupe', 'convertible', 'hatchback'];
export const transmissionTypes = ['automatic', 'manual'];
export const fuelTypes = ['gasoline', 'hybrid', 'electric'];