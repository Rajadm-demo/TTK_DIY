import { supabase } from '../lib/supabase';
import type { Vehicle, VehicleImage } from '../lib/supabase';

export class VehicleService {
  // Vehicle CRUD operations
  static async getAllVehicles(): Promise<Vehicle[]> {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async getAvailableVehicles(): Promise<Vehicle[]> {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('available', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async getVehicleById(id: string): Promise<Vehicle | null> {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async createVehicle(vehicle: Omit<Vehicle, 'id' | 'created_at' | 'updated_at'>): Promise<Vehicle> {
    const { data, error } = await supabase
      .from('vehicles')
      .insert(vehicle)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateVehicle(id: string, updates: Partial<Vehicle>): Promise<Vehicle> {
    const { data, error } = await supabase
      .from('vehicles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteVehicle(id: string): Promise<void> {
    const { error } = await supabase
      .from('vehicles')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Vehicle Images operations
  static async getVehicleImages(vehicleId: string): Promise<VehicleImage[]> {
    const { data, error } = await supabase
      .from('vehicle_images')
      .select('*')
      .eq('vehicle_id', vehicleId)
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  static async uploadVehicleImage(
    vehicleId: string,
    file: File,
    isPrimary: boolean = false,
    sortOrder: number = 0
  ): Promise<VehicleImage> {
    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${vehicleId}/${Date.now()}.${fileExt}`;
    const filePath = `vehicle-images/${fileName}`;

    // Upload file to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('vehicle-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('vehicle-images')
      .getPublicUrl(filePath);

    // Save image record to database
    const { data, error } = await supabase
      .from('vehicle_images')
      .insert({
        vehicle_id: vehicleId,
        image_url: publicUrl,
        image_path: filePath,
        is_primary: isPrimary,
        sort_order: sortOrder
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteVehicleImage(imageId: string): Promise<void> {
    // Get image details first
    const { data: image, error: fetchError } = await supabase
      .from('vehicle_images')
      .select('image_path')
      .eq('id', imageId)
      .single();

    if (fetchError) throw fetchError;

    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('vehicle-images')
      .remove([image.image_path]);

    if (storageError) throw storageError;

    // Delete from database
    const { error: dbError } = await supabase
      .from('vehicle_images')
      .delete()
      .eq('id', imageId);

    if (dbError) throw dbError;
  }

  static async updateImageOrder(imageId: string, sortOrder: number): Promise<void> {
    const { error } = await supabase
      .from('vehicle_images')
      .update({ sort_order: sortOrder })
      .eq('id', imageId);

    if (error) throw error;
  }

  static async setPrimaryImage(imageId: string, vehicleId: string): Promise<void> {
    // First, unset all primary images for this vehicle
    await supabase
      .from('vehicle_images')
      .update({ is_primary: false })
      .eq('vehicle_id', vehicleId);

    // Then set the selected image as primary
    const { error } = await supabase
      .from('vehicle_images')
      .update({ is_primary: true })
      .eq('id', imageId);

    if (error) throw error;
  }
}