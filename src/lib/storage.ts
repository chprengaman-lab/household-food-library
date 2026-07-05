import { supabase } from "./supabase";

const BUCKET = "household-photos";
const HOUSEHOLD = "prengaman";

export type PhotoEntityType = "recipes" | "drinks" | "restaurants" | "pantry_items";

export function photoStoragePath(entityType: PhotoEntityType, entityId: string): string {
  return `${HOUSEHOLD}/${entityType}/${entityId}/photo.jpg`;
}

/**
 * Upload a compressed JPEG blob to Supabase Storage.
 * Returns the public URL with a cache-busting timestamp so replaced photos reload.
 */
export async function uploadPhoto(
  blob: Blob,
  entityType: PhotoEntityType,
  entityId: string,
): Promise<string> {
  if (!supabase) throw new Error("Supabase not configured — cannot upload photo.");
  const path = photoStoragePath(entityType, entityId);
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, blob, { contentType: "image/jpeg", upsert: true });
  if (error) throw new Error(`Upload failed: ${error.message}`);
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  // Cache-bust so browsers reload immediately after a replace.
  return `${data.publicUrl}?t=${Date.now()}`;
}

/**
 * Delete a photo from Supabase Storage given its public URL.
 * Silently skips base64/data: URLs — those were never stored in Storage.
 * Failures are logged but do not throw (best-effort cleanup).
 */
export async function deletePhoto(url: string): Promise<void> {
  if (!supabase || !url) return;
  if (url.startsWith("data:") || url.startsWith("blob:")) return;
  const marker = `/${BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return;
  const path = url.slice(idx + marker.length).split("?")[0];
  const { error } = await supabase.storage.from(BUCKET).remove([path]);
  if (error) console.error("[storage] deletePhoto failed:", error.message);
}
