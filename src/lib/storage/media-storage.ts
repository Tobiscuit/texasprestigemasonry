/**
 * Media Storage Gateway
 *
 * Clean Architecture: This module is the single gateway for all media
 * storage operations. It abstracts the storage backend (currently R2)
 * so that route handlers never couple to storage implementation details.
 *
 * Naming Conventions (Robert C. Martin):
 *   - Module name describes WHAT, not HOW (MediaStorage, not R2Uploader)
 *   - Public functions are verbs: put, get, remove, list
 *   - Private helpers are prefixed with underscore
 *   - Constants are SCREAMING_SNAKE_CASE
 *   - Bucket paths follow: {category}/{timestamp}-{hash}.{ext}
 *
 * Bucket Structure:
 *   tpm-media-assets/
 *   ├── projects/        ← Project gallery images
 *   ├── posts/           ← Blog post featured images
 *   ├── services/        ← Service category images
 *   ├── testimonials/    ← Client photos
 *   └── general/         ← Everything else (media library uploads)
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export type MediaCategory =
    | 'projects'
    | 'posts'
    | 'services'
    | 'testimonials'
    | 'general';

export interface StoredMedia {
    /** Full public URL to the asset */
    url: string;
    /** Storage key (bucket path) */
    key: string;
    /** Original filename */
    filename: string;
    /** MIME type */
    contentType: string;
    /** File size in bytes */
    size: number;
}

export interface MediaStorageGateway {
    put(file: File, category?: MediaCategory): Promise<StoredMedia>;
    remove(key: string): Promise<void>;
    getPublicUrl(key: string): string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const ALLOWED_CONTENT_TYPES = new Set([
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/avif',
    'image/gif',
    'image/svg+xml',
]);

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

const PUBLIC_BUCKET_DOMAIN = 'https://media.texasprestigemasonry.com';

// ─── R2 Implementation ──────────────────────────────────────────────────────

/**
 * Creates a MediaStorageGateway backed by Cloudflare R2.
 *
 * @param bucket - The R2Bucket binding from `c.env.MEDIA_BUCKET`
 * @throws If bucket is not provided (binding not configured)
 *
 * Usage in Hono route:
 *   const storage = createR2Storage(env.MEDIA_BUCKET);
 *   const result = await storage.put(file, 'projects');
 */
export function createR2Storage(bucket: any): MediaStorageGateway {
    if (!bucket) {
        throw new Error(
            'MEDIA_BUCKET binding not available. ' +
            'Ensure [[r2_buckets]] is configured in wrangler.toml.'
        );
    }

    return {
        async put(file: File, category: MediaCategory = 'general'): Promise<StoredMedia> {
            _validateFile(file);

            const key = _buildKey(file.name, category);
            const arrayBuffer = await file.arrayBuffer();

            await bucket.put(key, arrayBuffer, {
                httpMetadata: {
                    contentType: file.type,
                    cacheControl: 'public, max-age=31536000, immutable',
                },
                customMetadata: {
                    originalName: file.name,
                    uploadedAt: new Date().toISOString(),
                },
            });

            return {
                url: `${PUBLIC_BUCKET_DOMAIN}/${key}`,
                key,
                filename: file.name,
                contentType: file.type,
                size: file.size,
            };
        },

        async remove(key: string): Promise<void> {
            await bucket.delete(key);
        },

        getPublicUrl(key: string): string {
            return `${PUBLIC_BUCKET_DOMAIN}/${key}`;
        },
    };
}

// ─── Private Helpers ─────────────────────────────────────────────────────────

function _validateFile(file: File): void {
    if (!ALLOWED_CONTENT_TYPES.has(file.type)) {
        throw new MediaValidationError(
            `Invalid file type: ${file.type}. ` +
            `Allowed: ${[...ALLOWED_CONTENT_TYPES].join(', ')}`
        );
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
        throw new MediaValidationError(
            `File too large: ${(file.size / 1024 / 1024).toFixed(1)} MB. ` +
            `Maximum: ${MAX_FILE_SIZE_BYTES / 1024 / 1024} MB`
        );
    }
}

/**
 * Builds a storage key with structure: {category}/{timestamp}-{hash}.{ext}
 *
 * Example: projects/1709334000000-a3f8b2.webp
 *
 * The timestamp prefix enables chronological listing.
 * The hash suffix prevents collisions.
 */
function _buildKey(originalName: string, category: MediaCategory): string {
    const ext = _extractExtension(originalName);
    const timestamp = Date.now();
    const hash = Math.random().toString(36).substring(2, 8);
    return `${category}/${timestamp}-${hash}.${ext}`;
}

function _extractExtension(filename: string): string {
    const parts = filename.split('.');
    if (parts.length < 2) return 'bin';
    return parts[parts.length - 1].toLowerCase();
}

// ─── Custom Errors ───────────────────────────────────────────────────────────

export class MediaValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'MediaValidationError';
    }
}
