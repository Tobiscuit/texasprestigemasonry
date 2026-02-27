/**
 * Posts API Routes
 * 
 * CRUD operations for the posts table.
 * GET    /           - List all posts (admin — all statuses)
 * GET    /published  - List published posts only (public)
 * GET    /:id        - Get a single post by ID
 * POST   /           - Create a new post
 * PUT    /:id        - Update a post
 * DELETE /:id        - Delete a post
 */

import { Hono } from 'hono';
import { eq, desc } from 'drizzle-orm';
import { getDb, schema } from '@/db/db';
import type { Post } from '@/types/models';

const postsApp = new Hono()

  // List all posts (admin)
  .get('/', async (c) => {
    const db = getDb();
    const results = await db
      .select()
      .from(schema.posts)
      .orderBy(desc(schema.posts.createdAt));
    return c.json(results);
  })

  // List published posts only (public-facing)
  .get('/published', async (c) => {
    const db = getDb();
    const results = await db
      .select()
      .from(schema.posts)
      .where(eq(schema.posts.status, 'published'))
      .orderBy(desc(schema.posts.publishedAt));
    return c.json(results);
  })

  // Get post by ID
  .get('/:id', async (c) => {
    const db = getDb();
    const id = c.req.param('id');
    const [post] = await db
      .select()
      .from(schema.posts)
      .where(eq(schema.posts.id, id))
      .limit(1);
    
    if (!post) {
      return c.json({ error: 'Post not found' }, 404);
    }
    return c.json(post);
  })

  // Create a new post
  .post('/', async (c) => {
    const db = getDb();
    const body = await c.req.json<Partial<Post>>();
    const id = crypto.randomUUID();
    const slug = body.slug || (body.title || '').toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    
    await db.insert(schema.posts).values({
      id,
      title: body.title || '',
      slug,
      excerpt: body.excerpt ?? null,
      content: body.content ?? null,
      htmlContent: body.htmlContent ?? null,
      featuredImageId: body.featuredImageId ?? null,
      category: body.category || 'general',
      keywords: body.keywords ?? null,
      publishedAt: body.publishedAt ?? null,
      status: body.status || 'draft',
      quickNotes: body.quickNotes ?? null,
    });

    const [created] = await db
      .select()
      .from(schema.posts)
      .where(eq(schema.posts.id, id));
    
    return c.json(created, 201);
  })

  // Update a post
  .put('/:id', async (c) => {
    const db = getDb();
    const id = c.req.param('id');
    const body = await c.req.json<Partial<Post>>();

    await db.update(schema.posts)
      .set({
        ...body,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(schema.posts.id, id));

    const [updated] = await db
      .select()
      .from(schema.posts)
      .where(eq(schema.posts.id, id));
    
    if (!updated) {
      return c.json({ error: 'Post not found' }, 404);
    }
    return c.json(updated);
  })

  // Delete a post
  .delete('/:id', async (c) => {
    const db = getDb();
    const id = c.req.param('id');
    
    await db.delete(schema.posts)
      .where(eq(schema.posts.id, id));
    
    return c.json({ success: true });
  });

export { postsApp };
