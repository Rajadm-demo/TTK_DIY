import React from 'react';
import { Search, CheckCircle, Star } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (page: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      
      {/* Animated Sports Car */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-car-drive">
          <svg
            width="120"
            height="60"
            viewBox="0 0 120 60"
            className="text-orange-500 drop-shadow-lg"
            style={{
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
            }}
          >
            {/* Car Body */}
            <path
              d="M15 35 L25 25 L35 20 L75 20 L85 25 L95 30 L105 35 L105 45 L95 45 L90 40 L30 40 L25 45 L15 45 Z"
              fill="currentColor"
              className="text-orange-500"
            />
            
            {/* Car Roof */}
            <path
              d="M30 25 L35 15 L70 15 L75 25 Z"
              fill="currentColor"
              className="text-orange-600"
            />
            
            {/* Windshield */}
            <path
              d="M32 23 L37 17 L67 17 L72 23 Z"
              fill="#87CEEB"
              opacity="0.8"
            />
            
            {/* Side Window */}
            <path
              d="M75 23 L80 20 L85 23 L85 30 L75 30 Z"
              fill="#87CEEB"
              opacity="0.6"
            />
            
            {/* Front Wheel */}
            <circle
              cx="30"
              cy="42"
              r="8"
              fill="#2D3748"
              stroke="#4A5568"
              strokeWidth="2"
            />
            <circle
              cx="30"
              cy="42"
              r="5"
              fill="#718096"
            />
            
            {/* Rear Wheel */}
            <circle
              cx="85"
              cy="42"
              r="8"
              fill="#2D3748"
              stroke="#4A5568"
              strokeWidth="2"
            />
            <circle
              cx="85"
              cy="42"
              r="5"
              fill="#718096"
            />
            
            {/* Headlight */}
            <circle
              cx="105"
              cy="32"
              r="3"
              fill="#FFF"
              opacity="0.9"
            />
            
            {/* Taillight */}
            <circle
              cx="17"
              cy="32"
              r="2"
              fill="#EF4444"
              opacity="0.8"
            />
            
            {/* Racing Stripes */}
            <rect
              x="35"
              y="18"
              width="2"
              height="15"
              fill="#FFF"
              opacity="0.7"
            />
            <rect
              x="40"
              y="18"
              width="2"
              height="15"
              fill="#FFF"
              opacity="0.7"
            />
            
            {/* Spoiler */}
            <rect
              x="12"
              y="28"
              width="8"
              height="2"
              fill="currentColor"
              className="text-orange-600"
            />
          </svg>
        </div>
      </div>
      
      <div className="relative container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Find Your Perfect
            <span className="block text-yellow-400">Dream Car</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Quality vehicles, competitive pricing, and financing options tailored to your needs
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => onNavigate('inventory')}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center space-x-2"
            >
              <Search className="w-6 h-6" />
              <span>Browse Inventory</span>
            </button>
            <button
              onClick={() => onNavigate('credit')}
              className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Get Pre-Approved
            </button>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center justify-center space-x-3">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <span className="text-lg">Quality Guarantee</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Star className="w-8 h-8 text-yellow-400" />
              <span className="text-lg">5-Star Service</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <span className="text-lg">Financing Available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;