import React from 'react';
import { Car } from '../../types/Car';
import { Eye, Gauge, Calendar, Fuel } from 'lucide-react';

interface CarCardProps {
  car: Car;
  onViewDetails: (carId: string) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onViewDetails }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('en-US').format(mileage);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={car.images[0]}
          alt={`${car.year} ${car.make} ${car.model}`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            car.condition === 'new' 
              ? 'bg-green-500 text-white' 
              : 'bg-blue-500 text-white'
          }`}>
            {car.condition.toUpperCase()}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
            {formatPrice(car.price)}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {car.year} {car.make} {car.model}
        </h3>
        
        {/* Details */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <Gauge className="w-4 h-4" />
            <span>{formatMileage(car.mileage)} miles</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>{car.year}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Fuel className="w-4 h-4" />
            <span className="capitalize">{car.fuelType}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-4 h-4 bg-gray-400 rounded-full"></span>
            <span className="capitalize">{car.transmission}</span>
          </div>
        </div>
        
        {/* Features */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {car.features.slice(0, 3).map((feature, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                {feature}
              </span>
            ))}
            {car.features.length > 3 && (
              <span className="text-gray-500 text-xs">
                +{car.features.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        {/* Actions */}
        <button
          onClick={() => onViewDetails(car.id)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
        >
          <Eye className="w-5 h-5" />
          <span>View Details</span>
        </button>
      </div>
    </div>
  );
};

export default CarCard;