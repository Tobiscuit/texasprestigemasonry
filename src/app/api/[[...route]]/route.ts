import { Hono } from 'hono';
import { handle } from 'hono/vercel';

// Enforce Edge Runtime for Cloudflare Workers compatibility
export const runtime = 'edge';

const app = new Hono().basePath('/api');

// ─── Health Check ────────────────────────────────────────────────────────
app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'Hono API is running on the Edge via Next.js routes.',
  });
});

// ─── Resource Routes ─────────────────────────────────────────────────────
import { usersApp } from './routes/users';
import { servicesApp } from './routes/services';
import { projectsApp } from './routes/projects';
import { postsApp } from './routes/posts';
import { testimonialsApp } from './routes/testimonials';
import { aiApp } from './routes/ai';
import { uploadApp } from './routes/upload';

app.route('/users', usersApp);
app.route('/services', servicesApp);
app.route('/projects', projectsApp);
app.route('/posts', postsApp);
app.route('/testimonials', testimonialsApp);
app.route('/ai', aiApp);
app.route('/upload', uploadApp);

// ─── Export HTTP handlers ────────────────────────────────────────────────
export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);
export const OPTIONS = handle(app);
