import React, { useState } from 'react';
import { Car } from '../types/Car';
import { ArrowLeft, Phone, Mail, Heart, Share2, Calendar, Gauge, Fuel, Settings, MapPin } from 'lucide-react';

interface CarDetailPageProps {
  car: Car;
  onNavigate: (page: string) => void;
  onContactAboutCar: (carId: string) => void;
}

const CarDetailPage: React.FC<CarDetailPageProps> = ({ car, onNavigate, onContactAboutCar }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('inventory')}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Inventory</span>
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={car.images[currentImageIndex]}
                alt={`${car.year} ${car.make} ${car.model}`}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            {car.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {car.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-video bg-gray-200 rounded-lg overflow-hidden border-2 ${
                      currentImageIndex === index ? 'border-blue-600' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Car Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  car.condition === 'new' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-blue-500 text-white'
                }`}>
                  {car.condition.toUpperCase()}
                </span>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="w-6 h-6" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                    <Share2 className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {car.year} {car.make} {car.model}
              </h1>
              
              <div className="text-3xl font-bold text-blue-600 mb-4">
                {formatPrice(car.price)}
              </div>
              
              <p className="text-gray-600">{car.description}</p>
            </div>
            
            {/* Key Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg">
                <Gauge className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Mileage</p>
                  <p className="font-semibold">{formatMileage(car.mileage)} miles</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Year</p>
                  <p className="font-semibold">{car.year}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg">
                <Fuel className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Fuel Type</p>
                  <p className="font-semibold capitalize">{car.fuelType}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg">
                <Settings className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Transmission</p>
                  <p className="font-semibold capitalize">{car.transmission}</p>
                </div>
              </div>
            </div>
            
            {/* Specifications */}
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Engine</p>
                  <p className="font-semibold">{car.engine}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Body Type</p>
                  <p className="font-semibold capitalize">{car.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Exterior Color</p>
                  <p className="font-semibold">{car.exterior}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Interior Color</p>
                  <p className="font-semibold">{car.interior}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">VIN</p>
                  <p className="font-semibold">{car.vin}</p>
                </div>
              </div>
            </div>
            
            {/* Features */}
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {car.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => onContactAboutCar(car.id)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Mail className="w-6 h-6" />
                <span>Contact About This Car</span>
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>Call Now</span>
                </button>
                
                <button
                  onClick={() => onNavigate('credit')}
                  className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Get Financing
                </button>
              </div>
            </div>
            
            {/* Dealer Info */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Dealer Information</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-gray-600" />
                  <span>123 Auto Lane, Cartown, ST 12345</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <span>info@turnthekeyauto.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;