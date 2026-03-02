/**
 * Site Settings API Routes
 *
 * Single-row key-value store for global site configuration.
 * GET  /           — read current settings
 * PUT  /           — update settings (upserts the singleton row)
 */

import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import { getD1Db, schema } from '@/db/db';

export const settingsApp = new Hono();

// GET /api/settings — read current site settings
settingsApp.get('/', async (c) => {
    try {
        const env = c.env as any;
        if (!env?.DB) {
            return c.json(_defaults());
        }

        const db = getD1Db(env.DB);
        const row = await db
            .select()
            .from(schema.siteSettings)
            .where(eq(schema.siteSettings.id, 'singleton'))
            .get();

        return c.json(row || _defaults());
    } catch (err: any) {
        console.error('Settings GET error:', err);
        return c.json(_defaults());
    }
});

// PUT /api/settings — upsert site settings
settingsApp.put('/', async (c) => {
    try {
        const env = c.env as any;
        if (!env?.DB) {
            return c.json({ error: 'Database not configured' }, 503);
        }

        const body = await c.req.json();
        const db = getD1Db(env.DB);

        // Upsert: insert with ON CONFLICT UPDATE
        await db
            .insert(schema.siteSettings)
            .values({
                id: 'singleton',
                companyName: body.companyName || 'Texas Prestige Masonry',
                phone: body.phone || '',
                email: body.email || '',
                licenseNumber: body.licenseNumber || '',
                insuranceAmount: body.insuranceAmount || '',
                bbbRating: body.bbbRating || '',
                missionStatement: body.missionStatement || '',
                brandVoice: body.brandVoice || '',
                brandTone: body.brandTone || '',
                brandAvoid: body.brandAvoid || '',
                themePreference: body.themePreference || 'candlelight',
                updatedAt: new Date().toISOString(),
            })
            .onConflictDoUpdate({
                target: schema.siteSettings.id,
                set: {
                    companyName: body.companyName || 'Texas Prestige Masonry',
                    phone: body.phone || '',
                    email: body.email || '',
                    licenseNumber: body.licenseNumber || '',
                    insuranceAmount: body.insuranceAmount || '',
                    bbbRating: body.bbbRating || '',
                    missionStatement: body.missionStatement || '',
                    brandVoice: body.brandVoice || '',
                    brandTone: body.brandTone || '',
                    brandAvoid: body.brandAvoid || '',
                    themePreference: body.themePreference || 'candlelight',
                    updatedAt: new Date().toISOString(),
                },
            })
            .run();

        return c.json({ success: true });
    } catch (err: any) {
        console.error('Settings PUT error:', err);
        return c.json({ error: err.message || 'Failed to save settings' }, 500);
    }
});

/**
 * Default settings — returned when DB isn't available
 * or the singleton row doesn't exist yet.
 */
function _defaults() {
    return {
        id: 'singleton',
        companyName: 'Texas Prestige Masonry',
        phone: '',
        email: '',
        licenseNumber: '',
        insuranceAmount: '',
        bbbRating: '',
        missionStatement: '',
        brandVoice: '',
        brandTone: '',
        brandAvoid: '',
        themePreference: 'candlelight',
        updatedAt: null,
    };
}
