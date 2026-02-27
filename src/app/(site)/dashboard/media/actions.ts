'use server';

// import { getPayload } from 'payload';
// import configPromise from '@payload-config';

export async function uploadMedia(formData: FormData) {
  const file = formData.get('file') as File;

  if (!file) {
    return { error: 'No file provided' };
  }

  try {
    const alt = (formData.get('alt') as string) || file.name || 'Dashboard Upload';
    console.log('Mock upload:', { alt, size: file.size });
    return { success: true, doc: {} };
  } catch (error) {
    console.error('Upload Error:', error);
    return { error: 'Failed to upload image' };
  }
}
