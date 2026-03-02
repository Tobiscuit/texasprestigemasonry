import { Hono } from 'hono';
import { PROJECT_WRITEUP_PROMPT, SERVICE_DESCRIPTION_PROMPT, BLOG_POST_PROMPT } from '@/lib/ai-prompts';

export const aiApp = new Hono();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-2.0-flash';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

async function callGemini(prompt: string): Promise<any> {
    if (!GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY not configured');
    }

    const res = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.7,
                topP: 0.9,
                maxOutputTokens: 4096,
                responseMimeType: 'application/json',
            },
        }),
    });

    if (!res.ok) {
        const errorBody = await res.text();
        console.error('Gemini API error:', res.status, errorBody);
        throw new Error(`Gemini API returned ${res.status}`);
    }

    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
        throw new Error('No text returned from Gemini');
    }

    // Parse the JSON response (strip any markdown fencing if present)
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleaned);
}

// ─── Generate Project Write-Up ───────────────────────────────────────────
aiApp.post('/generate-project', async (c) => {
    try {
        const body = await c.req.json();
        const { title, client, location, gallery, existingDescription } = body;

        if (!title && !client && !location) {
            return c.json({ error: 'Provide at least a title, client, or location' }, 400);
        }

        const prompt = PROJECT_WRITEUP_PROMPT({ title, client, location, gallery, existingDescription });
        const result = await callGemini(prompt);

        return c.json(result);
    } catch (err: any) {
        console.error('AI project generation error:', err);
        return c.json({ error: err.message || 'AI generation failed' }, 500);
    }
});

// ─── Generate/Enhance Service Description ────────────────────────────────
aiApp.post('/generate-service', async (c) => {
    try {
        const body = await c.req.json();
        const { title, category, existingDescription } = body;

        if (!title) {
            return c.json({ error: 'Service title is required' }, 400);
        }

        const prompt = SERVICE_DESCRIPTION_PROMPT({ title, category, existingDescription });
        const result = await callGemini(prompt);

        return c.json(result);
    } catch (err: any) {
        console.error('AI service generation error:', err);
        return c.json({ error: err.message || 'AI generation failed' }, 500);
    }
});

// ─── Generate Blog Post Draft ────────────────────────────────────────────
aiApp.post('/generate-post', async (c) => {
    try {
        const body = await c.req.json();
        const { title, category, quickNotes } = body;

        if (!title) {
            return c.json({ error: 'Post title/topic is required' }, 400);
        }

        const prompt = BLOG_POST_PROMPT({ title, category, quickNotes });
        const result = await callGemini(prompt);

        return c.json(result);
    } catch (err: any) {
        console.error('AI post generation error:', err);
        return c.json({ error: err.message || 'AI generation failed' }, 500);
    }
});
