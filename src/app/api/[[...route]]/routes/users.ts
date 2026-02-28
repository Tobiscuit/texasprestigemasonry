/**
 * Users API Routes
 * 
 * CRUD operations for the users table.
 * GET    /           - List all users
 * GET    /:id        - Get a single user by ID
 * POST   /           - Create a new user
 * PUT    /:id        - Update a user
 * DELETE /:id        - Delete a user
 */

import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import { getD1Db, schema } from '@/db/db';
import type { User } from '@/types/models';

const usersApp = new Hono()

  // List all users
  .get('/', async (c) => {
    const env = c.env as any;
    if (!env || !env.DB) return c.json([]);
    const db = getD1Db(env.DB);
    const results = await db
      .select()
      .from(schema.users)
      .orderBy(schema.users.createdAt);
    return c.json(results);
  })

  // Get user by ID
  .get('/:id', async (c) => {
    const env = c.env as any;
    if (!env || !env.DB) return c.json(null);
    const db = getD1Db(env.DB);
    const id = c.req.param('id');
    const [user] = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id))
      .limit(1);
    
    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }
    return c.json(user);
  })

  // Create a new user
  .post('/', async (c) => {
    const env = c.env as any;
    if (!env || !env.DB) return c.json(null, 500);
    const db = getD1Db(env.DB);
    const body = await c.req.json<Partial<User>>();
    const id = crypto.randomUUID();
    
    await db.insert(schema.users).values({
      id,
      role: body.role || 'customer',
      customerType: body.customerType ?? 'residential',
      companyName: body.companyName ?? null,
      name: body.name ?? null,
      phone: body.phone ?? null,
      address: body.address ?? null,
      squareCustomerId: body.squareCustomerId ?? null,
    });

    const [created] = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id));
    
    return c.json(created, 201);
  })

  // Update a user
  .put('/:id', async (c) => {
    const env = c.env as any;
    if (!env || !env.DB) return c.json(null, 500);
    const db = getD1Db(env.DB);
    const id = c.req.param('id');
    const body = await c.req.json<Partial<User>>();

    await db.update(schema.users)
      .set({
        ...body,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(schema.users.id, id));

    const [updated] = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id));
    
    if (!updated) {
      return c.json({ error: 'User not found' }, 404);
    }
    return c.json(updated);
  })

  // Delete a user
  .delete('/:id', async (c) => {
    const env = c.env as any;
    if (!env || !env.DB) return c.json(null, 500);
    const db = getD1Db(env.DB);
    const id = c.req.param('id');
    
    await db.delete(schema.users)
      .where(eq(schema.users.id, id));
    
    return c.json({ success: true });
  });

export { usersApp };
