/**
 * Media Upload API Route
 *
 * Handles file uploads through the MediaStorageGateway abstraction.
 * Supports optional `category` field to organize uploads into
 * bucket subdirectories (projects, posts, services, etc.).
 *
 * POST /api/upload
 *   Body: FormData with 'file' and optional 'category' field
 *   Returns: { url, key, filename, contentType, size }
 */

import { Hono } from 'hono';
import {
    createR2Storage,
    MediaValidationError,
    type MediaCategory,
} from '@/lib/storage/media-storage';

export const uploadApp = new Hono();

const VALID_CATEGORIES: MediaCategory[] = [
    'projects',
    'posts',
    'services',
    'testimonials',
    'general',
];

// POST /api/upload — accepts FormData with 'file' and optional 'category'
uploadApp.post('/', async (c) => {
    try {
        const env = c.env as any;

        // ─── Parse multipart form ───
        const formData = await c.req.formData();
        const file = formData.get('file') as File | null;
        const categoryRaw = (formData.get('category') as string) || 'general';

        if (!file) {
            return c.json({ error: 'No file provided' }, 400);
        }

        // Validate category
        const category = VALID_CATEGORIES.includes(categoryRaw as MediaCategory)
            ? (categoryRaw as MediaCategory)
            : 'general';

        // ─── Store via gateway ───
        if (env?.MEDIA_BUCKET) {
            // Production: R2
            const storage = createR2Storage(env.MEDIA_BUCKET);
            const result = await storage.put(file, category);
            return c.json(result);
        } else {
            // Fallback (local dev without R2): base64 data URL
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const base64 = buffer.toString('base64');
            const dataUrl = `data:${file.type};base64,${base64}`;

            return c.json({
                url: dataUrl,
                key: `local/${Date.now()}-${file.name}`,
                filename: file.name,
                contentType: file.type,
                size: file.size,
            });
        }
    } catch (err: any) {
        // Known validation errors → 400
        if (err instanceof MediaValidationError) {
            return c.json({ error: err.message }, 400);
        }

        // Unknown errors → 500
        console.error('Upload error:', err);
        return c.json({ error: err.message || 'Upload failed' }, 500);
    }
});

// DELETE /api/upload/:key — remove a stored file
uploadApp.delete('/:key{.+}', async (c) => {
    try {
        const env = c.env as any;
        const key = c.req.param('key');

        if (!key) {
            return c.json({ error: 'No key provided' }, 400);
        }

        if (!env?.MEDIA_BUCKET) {
            return c.json({ error: 'Storage not configured' }, 503);
        }

        const storage = createR2Storage(env.MEDIA_BUCKET);
        await storage.remove(key);

        return c.json({ success: true, key });
    } catch (err: any) {
        console.error('Delete error:', err);
        return c.json({ error: err.message || 'Delete failed' }, 500);
    }
});
