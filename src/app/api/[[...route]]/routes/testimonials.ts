/**
 * Testimonials API Routes
 * 
 * CRUD operations for the testimonials table.
 * GET    /           - List all testimonials
 * GET    /featured   - List featured testimonials only (public)
 * GET    /:id        - Get a single testimonial by ID
 * POST   /           - Create a new testimonial
 * PUT    /:id        - Update a testimonial
 * DELETE /:id        - Delete a testimonial
 */

import { Hono } from 'hono';
import { eq, desc } from 'drizzle-orm';
import { getD1Db, schema } from '@/db/db';
import type { Testimonial } from '@/types/models';

const testimonialsApp = new Hono()

  // List all testimonials
  .get('/', async (c) => {
    const env = c.env as any;
    if (!env || !env.DB) return c.json([]);
    const db = getD1Db(env.DB);
    const results = await db
      .select()
      .from(schema.testimonials)
      .orderBy(desc(schema.testimonials.createdAt));
    return c.json(results);
  })

  // List featured testimonials (public-facing)
  .get('/featured', async (c) => {
    const env = c.env as any;
    if (!env || !env.DB) return c.json([]);
    const db = getD1Db(env.DB);
    const results = await db
      .select()
      .from(schema.testimonials)
      .where(eq(schema.testimonials.featured, true))
      .orderBy(desc(schema.testimonials.createdAt));
    return c.json(results);
  })

  // Get testimonial by ID
  .get('/:id', async (c) => {
    const env = c.env as any;
    if (!env || !env.DB) return c.json(null);
    const db = getD1Db(env.DB);
    const id = c.req.param('id');
    const [testimonial] = await db
      .select()
      .from(schema.testimonials)
      .where(eq(schema.testimonials.id, id))
      .limit(1);
    
    if (!testimonial) {
      return c.json({ error: 'Testimonial not found' }, 404);
    }
    return c.json(testimonial);
  })

  // Create a new testimonial
  .post('/', async (c) => {
    const env = c.env as any;
    if (!env || !env.DB) return c.json(null, 500);
    const db = getD1Db(env.DB);
    const body = await c.req.json<Partial<Testimonial>>();
    const id = crypto.randomUUID();
    
    await db.insert(schema.testimonials).values({
      id,
      quote: body.quote || '',
      author: body.author || '',
      location: body.location || '',
      rating: body.rating ?? 5,
      featured: body.featured ?? false,
    });

    const [created] = await db
      .select()
      .from(schema.testimonials)
      .where(eq(schema.testimonials.id, id));
    
    return c.json(created, 201);
  })

  // Update a testimonial
  .put('/:id', async (c) => {
    const env = c.env as any;
    if (!env || !env.DB) return c.json(null, 500);
    const db = getD1Db(env.DB);
    const id = c.req.param('id');
    const body = await c.req.json<Partial<Testimonial>>();

    await db.update(schema.testimonials)
      .set({
        ...body,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(schema.testimonials.id, id));

    const [updated] = await db
      .select()
      .from(schema.testimonials)
      .where(eq(schema.testimonials.id, id));
    
    if (!updated) {
      return c.json({ error: 'Testimonial not found' }, 404);
    }
    return c.json(updated);
  })

  // Delete a testimonial
  .delete('/:id', async (c) => {
    const env = c.env as any;
    if (!env || !env.DB) return c.json(null, 500);
    const db = getD1Db(env.DB);
    const id = c.req.param('id');
    
    await db.delete(schema.testimonials)
      .where(eq(schema.testimonials.id, id));
    
    return c.json({ success: true });
  });

export { testimonialsApp };
