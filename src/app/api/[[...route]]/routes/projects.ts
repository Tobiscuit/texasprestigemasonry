/**
 * Projects API Routes
 * 
 * CRUD operations for the projects table.
 * GET    /           - List all projects
 * GET    /:id        - Get a single project by ID
 * POST   /           - Create a new project
 * PUT    /:id        - Update a project
 * DELETE //:id        - Delete a project
 */

import { Hono } from 'hono';
import { eq, desc } from 'drizzle-orm';
import { getD1Db, schema } from '@/db/db';
import type { Project } from '@/types/models';

const projectsApp = new Hono()

  // List all projects
  .get('/', async (c) => {
    const env = c.env as any;
    if (!env || !env.DB) return c.json([]);
    const db = getD1Db(env.DB);
    const results = await db
      .select()
      .from(schema.projects)
      .orderBy(schema.projects.createdAt);
    return c.json(results);
  })

  // Get project by ID
  .get('/:id', async (c) => {
    const env = c.env as any;
    if (!env || !env.DB) return c.json(null);
    const db = getD1Db(env.DB);
    const id = c.req.param('id');
    const [project] = await db
      .select()
      .from(schema.projects)
      .where(eq(schema.projects.id, id))
      .limit(1);
    
    if (!project) {
      return c.json({ error: 'Project not found' }, 404);
    }
    return c.json(project);
  })

  // Create a new project
  .post('/', async (c) => {
    const env = c.env as any;
    if (!env || !env.DB) return c.json(null, 500);
    const db = getD1Db(env.DB);
    const body = await c.req.json<Partial<Project>>();
    const id = crypto.randomUUID();
    const slug = body.slug || (body.title || '').toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    
    await db.insert(schema.projects).values({
      id,
      title: body.title || '',
      slug,
      client: body.client || '',
      location: body.location || '',
      completionDate: body.completionDate ?? null,
      installDate: body.installDate ?? null,
      warrantyExpiration: body.warrantyExpiration ?? null,
      description: body.description || '',
      challenge: body.challenge || '',
      solution: body.solution || '',
      imageStyle: body.imageStyle || 'grid',
      gallery: body.gallery ?? null,
      tags: body.tags ?? null,
      stats: body.stats ?? null,
    });

    const [created] = await db
      .select()
      .from(schema.projects)
      .where(eq(schema.projects.id, id));
    
    return c.json(created, 201);
  })

  // Update a project
  .put('/:id', async (c) => {
    const env = c.env as any;
    if (!env || !env.DB) return c.json(null, 500);
    const db = getD1Db(env.DB);
    const id = c.req.param('id');
    const body = await c.req.json<Partial<Project>>();

    await db.update(schema.projects)
      .set({
        ...body,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(schema.projects.id, id));

    const [updated] = await db
      .select()
      .from(schema.projects)
      .where(eq(schema.projects.id, id));
    
    if (!updated) {
      return c.json({ error: 'Project not found' }, 404);
    }
    return c.json(updated);
  })

  // Delete a project
  .delete('/:id', async (c) => {
    const env = c.env as any;
    if (!env || !env.DB) return c.json(null, 500);
    const db = getD1Db(env.DB);
    const id = c.req.param('id');
    
    await db.delete(schema.projects)
      .where(eq(schema.projects.id, id));
    
    return c.json({ success: true });
  });

export { projectsApp };
