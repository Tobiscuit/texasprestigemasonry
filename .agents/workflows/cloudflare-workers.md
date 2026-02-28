---
description: Deploy the site to Cloudflare Workers
---
# Cloudflare Workers Deployment

This workflow compiles the Next.js application using the OpenNext adapter and deploys it directly to Cloudflare's global edge network via Wrangler.

1. Build the Next.js application for Cloudflare using OpenNext:
// turbo
```bash
npx @opennextjs/cloudflare build
```

2. Deploy the compiled worker to Cloudflare:
// turbo
```bash
npx @opennextjs/cloudflare deploy
```
