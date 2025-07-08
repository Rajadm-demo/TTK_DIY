/*
  # Create storage bucket for vehicle images

  1. Storage
    - Create 'vehicle-images' bucket for storing vehicle photos
    - Set up proper policies for public access to images
    - Allow authenticated users to upload/manage images

  2. Security
    - Public read access for vehicle images
    - Authenticated write access for admin users
*/

-- Create storage bucket for vehicle images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('vehicle-images', 'vehicle-images', true)
ON CONFLICT (id) DO NOTHING;

-- Policy to allow public read access to vehicle images
CREATE POLICY "Public can view vehicle images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'vehicle-images');

-- Policy to allow authenticated users to upload vehicle images
CREATE POLICY "Authenticated users can upload vehicle images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'vehicle-images');

-- Policy to allow authenticated users to update vehicle images
CREATE POLICY "Authenticated users can update vehicle images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'vehicle-images');

-- Policy to allow authenticated users to delete vehicle images
CREATE POLICY "Authenticated users can delete vehicle images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'vehicle-images');