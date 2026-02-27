/**
 * Services API Routes
 * 
 * CRUD operations for the services table.
 * GET    /           - List all services (ordered by `order` field)
 * GET    /:id        - Get a single service by ID
 * POST   /           - Create a new service
 * PUT    /:id        - Update a service
 * DELETE /:id        - Delete a service
 */

import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import { getDb, schema } from '@/db/db';
import type { Service } from '@/types/models';

const servicesApp = new Hono()

  // List all services
  .get('/', async (c) => {
    const db = getDb();
    const results = await db
      .select()
      .from(schema.services)
      .orderBy(schema.services.order);
    return c.json(results);
  })

  // Get service by ID
  .get('/:id', async (c) => {
    const db = getDb();
    const id = c.req.param('id');
    const [service] = await db
      .select()
      .from(schema.services)
      .where(eq(schema.services.id, id))
      .limit(1);
    
    if (!service) {
      return c.json({ error: 'Service not found' }, 404);
    }
    return c.json(service);
  })

  // Create a new service
  .post('/', async (c) => {
    const db = getDb();
    const body = await c.req.json<Partial<Service>>();
    const id = crypto.randomUUID();
    const slug = body.slug || (body.title || '').toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    
    await db.insert(schema.services).values({
      id,
      title: body.title || '',
      slug,
      category: body.category || 'general',
      price: body.price ?? null,
      description: body.description || '',
      features: body.features ? String(body.features) : null,
      icon: body.icon || 'building',
      highlight: body.highlight ?? false,
      order: body.order ?? 0,
    });

    const [created] = await db
      .select()
      .from(schema.services)
      .where(eq(schema.services.id, id));
    
    return c.json(created, 201);
  })

  // Update a service
  .put('/:id', async (c) => {
    const db = getDb();
    const id = c.req.param('id');
    const body = await c.req.json<Partial<Service>>();

    await db.update(schema.services)
      .set({
        ...body,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(schema.services.id, id));

    const [updated] = await db
      .select()
      .from(schema.services)
      .where(eq(schema.services.id, id));
    
    if (!updated) {
      return c.json({ error: 'Service not found' }, 404);
    }
    return c.json(updated);
  })

  // Delete a service
  .delete('/:id', async (c) => {
    const db = getDb();
    const id = c.req.param('id');
    
    await db.delete(schema.services)
      .where(eq(schema.services.id, id));
    
    return c.json({ success: true });
  });

export { servicesApp };
