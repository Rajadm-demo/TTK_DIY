import React, { useState, useRef } from 'react';
import { Upload, X, Star, Image as ImageIcon, Loader2 } from 'lucide-react';
import { VehicleService } from '../../services/vehicleService';
import type { VehicleImage } from '../../lib/supabase';

interface ImageUploaderProps {
  vehicleId: string;
  images: VehicleImage[];
  onImagesUpdate: (images: VehicleImage[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  vehicleId,
  images,
  onImagesUpdate
}) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const uploadPromises = Array.from(files).map((file, index) => 
        VehicleService.uploadVehicleImage(
          vehicleId,
          file,
          images.length === 0 && index === 0, // First image is primary if no images exist
          images.length + index
        )
      );

      const newImages = await Promise.all(uploadPromises);
      const updatedImages = [...images, ...newImages];
      onImagesUpdate(updatedImages);
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Error uploading images. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      await VehicleService.deleteVehicleImage(imageId);
      const updatedImages = images.filter(img => img.id !== imageId);
      onImagesUpdate(updatedImages);
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Error deleting image. Please try again.');
    }
  };

  const handleSetPrimary = async (imageId: string) => {
    try {
      await VehicleService.setPrimaryImage(imageId, vehicleId);
      const updatedImages = images.map(img => ({
        ...img,
        is_primary: img.id === imageId
      }));
      onImagesUpdate(updatedImages);
    } catch (error) {
      console.error('Error setting primary image:', error);
      alert('Error setting primary image. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragOver
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
        
        {uploading ? (
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            <p className="text-lg font-medium text-gray-700">Uploading images...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <Upload className="w-12 h-12 text-gray-400" />
            <div>
              <p className="text-lg font-medium text-gray-700 mb-2">
                Drop images here or click to upload
              </p>
              <p className="text-sm text-gray-500">
                Supports JPG, PNG, WebP files up to 10MB each
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Image Grid */}
      {images.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Vehicle Images ({images.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div
                key={image.id}
                className="relative group bg-gray-100 rounded-lg overflow-hidden aspect-square"
              >
                <img
                  src={image.image_url}
                  alt="Vehicle"
                  className="w-full h-full object-cover"
                />
                
                {/* Primary Badge */}
                {image.is_primary && (
                  <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold flex items-center space-x-1">
                    <Star className="w-3 h-3" />
                    <span>Primary</span>
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                  {!image.is_primary && (
                    <button
                      onClick={() => handleSetPrimary(image.id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full transition-colors"
                      title="Set as primary image"
                    >
                      <Star className="w-4 h-4" />
                    </button>
                  )}
                  
                  <button
                    onClick={() => handleDeleteImage(image.id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                    title="Delete image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Guidelines */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2 flex items-center space-x-2">
          <ImageIcon className="w-5 h-5" />
          <span>Image Guidelines</span>
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Upload high-quality images (minimum 800x600 pixels)</li>
          <li>• Include exterior shots from multiple angles</li>
          <li>• Add interior photos showing dashboard, seats, and features</li>
          <li>• The first uploaded image will be set as the primary image</li>
          <li>• You can change the primary image by clicking the star icon</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageUploader;