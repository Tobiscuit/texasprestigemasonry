import { Hono } from 'hono';

export const uploadApp = new Hono();

/**
 * Image Upload API
 * 
 * Architecture: This endpoint proxies uploads. When R2 is enabled,
 * switch the storage backend from local to R2. The API contract
 * stays the same — returns { url: string }.
 * 
 * Future R2 migration:
 *   1. Enable R2 on Cloudflare Dashboard
 *   2. Create bucket: npx wrangler r2 bucket create texas-prestige-masonry-media
 *   3. Uncomment R2 binding in wrangler.toml
 *   4. Replace putLocal() with putR2() below
 */

// POST /api/upload — accepts FormData with a 'file' field
uploadApp.post('/', async (c) => {
    try {
        const formData = await c.req.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return c.json({ error: 'No file provided' }, 400);
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            return c.json({ error: 'Invalid file type. Allowed: JPEG, PNG, WebP, AVIF, GIF' }, 400);
        }

        // Validate size (10MB max)
        if (file.size > 10 * 1024 * 1024) {
            return c.json({ error: 'File too large. Maximum 10MB' }, 400);
        }

        // Generate unique filename
        const ext = file.name.split('.').pop() || 'jpg';
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 8);
        const filename = `${timestamp}-${random}.${ext}`;

        // Convert to buffer for storage
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // ─── STORAGE BACKEND ─── 
        // Currently: base64 data URL (works without filesystem access on Edge)
        // Future: R2 presigned URL upload
        const base64 = buffer.toString('base64');
        const dataUrl = `data:${file.type};base64,${base64}`;

        // For production with R2, this would be:
        // const r2Url = await putR2(filename, buffer, file.type);
        // return c.json({ url: r2Url, filename });

        return c.json({
            url: dataUrl,
            filename,
            size: file.size,
            type: file.type,
        });
    } catch (err: any) {
        console.error('Upload error:', err);
        return c.json({ error: err.message || 'Upload failed' }, 500);
    }
});

// For future R2 integration:
// async function putR2(filename: string, buffer: Buffer, contentType: string): Promise<string> {
//   const R2_ACCOUNT_ID = process.env.CF_ACCOUNT_ID;
//   const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
//   const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
//   const R2_BUCKET = 'texas-prestige-masonry-media';
//   
//   // Use S3-compatible API
//   const url = `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${R2_BUCKET}/${filename}`;
//   await fetch(url, { method: 'PUT', body: buffer, headers: { 'Content-Type': contentType } });
//   
//   // Return the public URL (requires R2 public access or custom domain)
//   return `https://media.texasprestigemasonry.com/${filename}`;
// }
