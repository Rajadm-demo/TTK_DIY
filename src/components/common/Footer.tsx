import React from 'react';
import { Car, Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Car className="w-8 h-8 text-blue-400" />
              <div>
                <h3 className="text-xl font-bold">Turn the Key</h3>
                <p className="text-gray-400">Automotive Consulting</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Your trusted partner in finding the perfect vehicle. We offer quality new and used cars 
              with financing options to fit your budget.
            </p>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>info@turnthekeyauto.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span>123 Auto Lane, Cartown, ST 12345</span>
              </div>
            </div>
          </div>
          
          {/* Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Business Hours</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-sm">Mon - Fri: 9AM - 7PM</p>
                  <p className="text-sm">Saturday: 9AM - 5PM</p>
                  <p className="text-sm">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Turn the Key Automotive Consulting. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;