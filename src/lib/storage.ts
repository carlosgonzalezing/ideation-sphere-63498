import { supabase } from '@/integrations/supabase/client';

export async function uploadPostMedia(file: File, userId: string): Promise<string | null> {
  try {
    // Validate file size
    const maxSize = file.type.startsWith('video/') ? 20 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error(`El archivo es demasiado grande. Máximo ${maxSize / 1024 / 1024}MB`);
    }

    // Determine bucket
    const bucket = file.type.startsWith('video/') ? 'post-videos' : 'post-media';
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage.from(bucket).upload(fileName, file);

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(data.path);

    return publicUrl;
  } catch (error: any) {
    console.error('Error uploading media:', error);
    throw error;
  }
}

export async function uploadAvatar(file: File, userId: string): Promise<string | null> {
  try {
    // Validate file size (max 2MB for avatars)
    if (file.size > 2 * 1024 * 1024) {
      throw new Error('El avatar debe ser menor a 2MB');
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/avatar.${fileExt}`;

    const { data, error } = await supabase.storage.from('avatars').upload(fileName, file, {
      upsert: true,
    });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(data.path);

    return publicUrl;
  } catch (error: any) {
    console.error('Error uploading avatar:', error);
    throw error;
  }
}

export async function deleteMedia(url: string): Promise<void> {
  try {
    // Extract bucket and path from URL
    const urlParts = url.split('/storage/v1/object/public/');
    if (urlParts.length !== 2) return;

    const [bucket, ...pathParts] = urlParts[1].split('/');
    const path = pathParts.join('/');

    await supabase.storage.from(bucket).remove([path]);
  } catch (error) {
    console.error('Error deleting media:', error);
  }
}
