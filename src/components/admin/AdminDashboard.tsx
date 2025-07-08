import React, { useState } from 'react';
import { Car } from '../../types/Car';
import { Plus, Edit, Trash2, Eye, LogOut, BarChart3, DollarSign, Users, Car as CarIcon, RefreshCw } from 'lucide-react';
import FreedomChevroletImporter from './FreedomChevroletImporter';

interface AdminDashboardProps {
  cars: Car[];
  onAddCar: () => void;
  onEditCar: (carId: string) => void;
  onDeleteCar: (carId: string) => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  cars,
  onAddCar,
  onEditCar,
  onDeleteCar,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'freedom-import'>('overview');

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

  // Calculate statistics
  const totalCars = cars.length;
  const availableCars = cars.filter(car => car.available).length;
  const totalValue = cars.reduce((sum, car) => sum + car.price, 0);
  const averagePrice = totalCars > 0 ? totalValue / totalCars : 0;
  const newCars = cars.filter(car => car.condition === 'new').length;
  const usedCars = cars.filter(car => car.condition === 'used').length;

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CarIcon className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Turn the Key Automotive</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <nav className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'overview'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('inventory')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'inventory'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  Inventory
                </button>
                <button
                  onClick={() => setActiveTab('freedom-import')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'freedom-import'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  Freedom Import
                </button>
              </nav>
              
              <button
                onClick={refreshPage}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
                title="Refresh data"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Refresh</span>
              </button>
              
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 text-red-600 hover:text-red-800 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div>
            {/* Info Banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
              <div className="flex items-center space-x-3">
                <CarIcon className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-blue-900">Vehicle Management System</h3>
                  <p className="text-sm text-blue-700">
                    Add, edit, and manage your vehicle inventory. Changes are saved locally and will persist in your browser.
                  </p>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CarIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Vehicles</p>
                    <p className="text-2xl font-bold text-gray-900">{totalCars}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Eye className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Available</p>
                    <p className="text-2xl font-bold text-gray-900">{availableCars}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Value</p>
                    <p className="text-2xl font-bold text-gray-900">{formatPrice(totalValue)}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Avg. Price</p>
                    <p className="text-2xl font-bold text-gray-900">{formatPrice(averagePrice)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts and Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Inventory Breakdown</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>New Vehicles</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${totalCars > 0 ? (newCars / totalCars) * 100 : 0}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{newCars}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>Used Vehicles</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${totalCars > 0 ? (usedCars / totalCars) * 100 : 0}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{usedCars}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={onAddCar}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add New Vehicle</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('inventory')}
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    Manage Inventory
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div>
            {/* Inventory Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Inventory Management</h2>
                <p className="text-sm text-gray-600 mt-1">Manage your vehicle inventory</p>
              </div>
              <button
                onClick={onAddCar}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Vehicle</span>
              </button>
            </div>

            {/* Inventory Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vehicle
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Condition
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mileage
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cars.map((car) => (
                      <tr key={car.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={car.images[0] || 'https://via.placeholder.com/48x48/e5e7eb/6b7280?text=No+Image'}
                              alt={`${car.year} ${car.make} ${car.model}`}
                              className="w-12 h-12 rounded-lg object-cover mr-4"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48x48/e5e7eb/6b7280?text=No+Image';
                              }}
                            />
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {car.year} {car.make} {car.model}
                              </div>
                              <div className="text-sm text-gray-500">{car.vin}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            car.condition === 'new' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {car.condition.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatPrice(car.price)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatMileage(car.mileage)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            car.available 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {car.available ? 'AVAILABLE' : 'SOLD'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => onEditCar(car.id)}
                              className="text-blue-600 hover:text-blue-900 transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => onDeleteCar(car.id)}
                              className="text-red-600 hover:text-red-900 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'freedom-import' && (
          <div>
            <FreedomChevroletImporter 
              existingCars={cars}
              onImportComplete={() => window.location.reload()} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;