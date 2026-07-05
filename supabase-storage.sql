-- ============================================================
-- Phase 11: Supabase Storage — household-photos bucket
-- Run this in the Supabase SQL Editor (one time).
-- ============================================================

-- 1. Create the public bucket.
--    Photos are served via public URL — no token needed to view them.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'household-photos',
  'household-photos',
  true,
  10485760,   -- 10 MB per file
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/heic', 'image/heif']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 10485760,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/heic', 'image/heif'];


-- 2. RLS policies for storage.objects
--    (Supabase Storage uses RLS on the storage.objects system table.)

-- Allow anyone to read photos (bucket is public; this policy is belt-and-suspenders).
CREATE POLICY "public can view household photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'household-photos');


-- Allow household members to upload photos.
-- Paths must start with 'prengaman/' so no other user can write here.
CREATE POLICY "household can upload photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'household-photos'
  AND name LIKE 'prengaman/%'
  AND auth.email() IN ('chprengaman@gmail.com', 'chloeprengaman@gmail.com')
);


-- Allow household members to replace (update) photos.
CREATE POLICY "household can update photos"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'household-photos'
  AND name LIKE 'prengaman/%'
  AND auth.email() IN ('chprengaman@gmail.com', 'chloeprengaman@gmail.com')
)
WITH CHECK (
  bucket_id = 'household-photos'
  AND name LIKE 'prengaman/%'
  AND auth.email() IN ('chprengaman@gmail.com', 'chloeprengaman@gmail.com')
);


-- Allow household members to delete photos.
CREATE POLICY "household can delete photos"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'household-photos'
  AND name LIKE 'prengaman/%'
  AND auth.email() IN ('chprengaman@gmail.com', 'chloeprengaman@gmail.com')
);
