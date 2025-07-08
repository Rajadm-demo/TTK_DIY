import React, { useState, useEffect } from 'react';
import { Save, X, ArrowLeft } from 'lucide-react';
import { VehicleService } from '../../services/vehicleService';
import ImageUploader from './ImageUploader';
import type { Vehicle, VehicleImage } from '../../lib/supabase';

interface VehicleFormProps {
  vehicle?: Vehicle;
  onSave: () => void;
  onCancel: () => void;
}

const VehicleForm: React.FC<VehicleFormProps> = ({ vehicle, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    mileage: 0,
    condition: 'used' as 'new' | 'used',
    type: 'sedan' as Vehicle['type'],
    transmission: 'automatic' as 'automatic' | 'manual',
    fuel_type: 'gasoline' as Vehicle['fuel_type'],
    exterior_color: '',
    interior_color: '',
    engine: '',
    features: [] as string[],
    description: '',
    vin: '',
    available: true
  });

  const [images, setImages] = useState<VehicleImage[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [newFeature, setNewFeature] = useState('');

  useEffect(() => {
    if (vehicle) {
      setFormData({
        make: vehicle.make,
        model: vehicle.model,
        year: vehicle.year,
        price: vehicle.price,
        mileage: vehicle.mileage,
        condition: vehicle.condition,
        type: vehicle.type,
        transmission: vehicle.transmission,
        fuel_type: vehicle.fuel_type,
        exterior_color: vehicle.exterior_color,
        interior_color: vehicle.interior_color,
        engine: vehicle.engine,
        features: vehicle.features,
        description: vehicle.description,
        vin: vehicle.vin,
        available: vehicle.available
      });

      // Load existing images
      loadVehicleImages(vehicle.id);
    }
  }, [vehicle]);

  const loadVehicleImages = async (vehicleId: string) => {
    try {
      const vehicleImages = await VehicleService.getVehicleImages(vehicleId);
      setImages(vehicleImages);
    } catch (error) {
      console.error('Error loading vehicle images:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 :
               type === 'checkbox' ? (e.target as HTMLInputElement).checked :
               value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.make) newErrors.make = 'Make is required';
    if (!formData.model) newErrors.model = 'Model is required';
    if (!formData.year || formData.year < 1900) newErrors.year = 'Valid year is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (formData.mileage < 0) newErrors.mileage = 'Mileage cannot be negative';
    if (!formData.exterior_color) newErrors.exterior_color = 'Exterior color is required';
    if (!formData.interior_color) newErrors.interior_color = 'Interior color is required';
    if (!formData.engine) newErrors.engine = 'Engine information is required';
    if (!formData.vin) newErrors.vin = 'VIN is required';
    if (!formData.description) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setSaving(true);
    try {
      if (vehicle) {
        await VehicleService.updateVehicle(vehicle.id, formData);
      } else {
        await VehicleService.createVehicle(formData);
      }
      onSave();
    } catch (error) {
      console.error('Error saving vehicle:', error);
      alert('Error saving vehicle. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const carMakes = ['Toyota', 'Honda', 'Ford', 'BMW', 'Tesla', 'Chevrolet', 'Nissan', 'Hyundai', 'Kia', 'Mazda'];
  const carTypes = ['sedan', 'suv', 'truck', 'coupe', 'convertible', 'hatchback'];
  const transmissionTypes = ['automatic', 'manual'];
  const fuelTypes = ['gasoline', 'hybrid', 'electric'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={onCancel}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-3xl font-bold text-gray-900">
              {vehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Vehicle Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Make *
                      </label>
                      <select
                        name="make"
                        value={formData.make}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.make ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select Make</option>
                        {carMakes.map(make => (
                          <option key={make} value={make}>{make}</option>
                        ))}
                      </select>
                      {errors.make && <p className="text-red-500 text-sm mt-1">{errors.make}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Model *
                      </label>
                      <input
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.model ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Year *
                      </label>
                      <input
                        type="number"
                        name="year"
                        value={formData.year || ''}
                        onChange={handleInputChange}
                        min="1900"
                        max={new Date().getFullYear() + 1}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.year ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
                    </div>
                  </div>
                </div>
                
                {/* Pricing and Condition */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Pricing & Condition</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price ($) *
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price || ''}
                        onChange={handleInputChange}
                        min="0"
                        step="100"
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.price ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mileage
                      </label>
                      <input
                        type="number"
                        name="mileage"
                        value={formData.mileage || ''}
                        onChange={handleInputChange}
                        min="0"
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.mileage ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.mileage && <p className="text-red-500 text-sm mt-1">{errors.mileage}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Condition
                      </label>
                      <select
                        name="condition"
                        value={formData.condition}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="new">New</option>
                        <option value="used">Used</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Vehicle Details */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Vehicle Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {carTypes.map(type => (
                          <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Transmission
                      </label>
                      <select
                        name="transmission"
                        value={formData.transmission}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {transmissionTypes.map(type => (
                          <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fuel Type
                      </label>
                      <select
                        name="fuel_type"
                        value={formData.fuel_type}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {fuelTypes.map(type => (
                          <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Colors and Engine */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Colors & Engine</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Exterior Color *
                      </label>
                      <input
                        type="text"
                        name="exterior_color"
                        value={formData.exterior_color}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.exterior_color ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.exterior_color && <p className="text-red-500 text-sm mt-1">{errors.exterior_color}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Interior Color *
                      </label>
                      <input
                        type="text"
                        name="interior_color"
                        value={formData.interior_color}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.interior_color ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.interior_color && <p className="text-red-500 text-sm mt-1">{errors.interior_color}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Engine *
                      </label>
                      <input
                        type="text"
                        name="engine"
                        value={formData.engine}
                        onChange={handleInputChange}
                        placeholder="e.g., 2.5L 4-Cylinder"
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.engine ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.engine && <p className="text-red-500 text-sm mt-1">{errors.engine}</p>}
                    </div>
                  </div>
                </div>
                
                {/* VIN and Availability */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Identification & Status</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        VIN *
                      </label>
                      <input
                        type="text"
                        name="vin"
                        value={formData.vin}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.vin ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.vin && <p className="text-red-500 text-sm mt-1">{errors.vin}</p>}
                    </div>
                    
                    <div className="flex items-center">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="available"
                          checked={formData.available}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700">Available for Sale</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                {/* Features */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Features</h3>
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        placeholder="Add a feature..."
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                      />
                      <button
                        type="button"
                        onClick={addFeature}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors"
                      >
                        Add
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {formData.features.map((feature, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                        >
                          <span>{feature}</span>
                          <button
                            type="button"
                            onClick={() => removeFeature(feature)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Describe the vehicle's condition, features, and any other relevant details..."
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                  <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
                  >
                    <Save className="w-5 h-5" />
                    <span>{saving ? 'Saving...' : (vehicle ? 'Update Vehicle' : 'Add Vehicle')}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Image Management */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Vehicle Images</h3>
              {vehicle ? (
                <ImageUploader
                  vehicleId={vehicle.id}
                  images={images}
                  onImagesUpdate={setImages}
                />
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>Save the vehicle first to upload images</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleForm;