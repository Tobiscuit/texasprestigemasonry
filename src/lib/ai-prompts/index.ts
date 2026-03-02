/**
 * AI Prompt Templates for Texas Prestige Masonry
 * 
 * Brand Voice: Authoritative yet approachable. We're master craftsmen
 * who speak with confidence about stone, brick, and custom outdoor
 * living — without marketing fluff.
 */

const BRAND_CONTEXT = `
You are a content writer for Texas Prestige Masonry, a premium masonry company
in Central Texas specializing in outdoor kitchens, custom pavers, fire pits,
stone veneer, retaining walls, and commercial masonry. The brand voice is:
- Authoritative: We are master craftsmen with decades of experience
- Premium: Our work is high-end, custom, and built to last
- Texas-rooted: We know the soil, climate, and stone of Central Texas
- Genuine: No marketing fluff — speak plainly about quality craftsmanship
Avoid generic phrases like "state-of-the-art" or "cutting-edge technology."
Focus on craftsmanship, materials, and tangible results.
`.trim();

export const PROJECT_WRITEUP_PROMPT = (params: {
  title: string;
  client: string;
  location: string;
  gallery?: Array<{ image: string; caption: string }>;
  existingDescription?: string;
}) => `
${BRAND_CONTEXT}

Generate a project write-up for our portfolio. Return a JSON object with these fields:
- "description": A 2-3 paragraph narrative about the project (150-250 words)
- "challenge": One paragraph about what made this project challenging (50-100 words)  
- "solution": One paragraph about how our team solved it (50-100 words)
- "tags": An array of 4-6 relevant tags (e.g. "outdoor kitchen", "travertine", "Austin")
- "stats": An array of 3-5 objects with "label" and "value" keys (e.g. { "label": "Build Time", "value": "4 Weeks" })

Project Info:
- Title: ${params.title}
- Client: ${params.client}
- Location: ${params.location}
${params.gallery?.length ? `- Gallery Captions: ${params.gallery.map(g => g.caption).filter(Boolean).join(', ')}` : ''}
${params.existingDescription ? `- Existing Description (refine this): ${params.existingDescription}` : ''}

Write in a tone that's confident and specific. Mention real materials (travertine, limestone, 
flagstone, CMU block, thin-set mortar) where appropriate. Reference the Texas climate when relevant
(heat, freeze-thaw cycles, expansive clay soil). Do NOT invent specific measurements unless 
they are plausible.

Return ONLY valid JSON. No markdown fencing.
`.trim();

export const SERVICE_DESCRIPTION_PROMPT = (params: {
  title: string;
  category: string;
  existingDescription?: string;
}) => `
${BRAND_CONTEXT}

Enhance the service description for our services page. Return a JSON object with:
- "description": A compelling 2-3 sentence service description (60-100 words) that makes homeowners
  want to contact us. Focus on the outcome and experience, not the process.
- "features": An array of 5-7 specific features/capabilities as strings

Service Info:
- Title: ${params.title}
- Category: ${params.category}
${params.existingDescription ? `- Current Description (enhance this): ${params.existingDescription}` : ''}

Be specific to masonry. Instead of generic features like "Quality Materials", use
"Hand-selected Austin Limestone from local quarries." Instead of "Expert Installation,"
use "Precision-cut stone joints with polymer-modified mortar."

Return ONLY valid JSON. No markdown fencing.
`.trim();

export const BLOG_POST_PROMPT = (params: {
  title: string;
  category: string;
  quickNotes?: string;
}) => `
${BRAND_CONTEXT}

Write a blog post for our website. Return a JSON object with:
- "content": The full blog post in clean HTML (use <h2>, <h3>, <p>, <ul>, <li>, <strong>, <em> tags).
  The post should be 600-900 words, SEO-optimized, and genuinely useful to homeowners.
- "excerpt": A 2-sentence summary for the blog card (30-50 words)
- "keywords": A comma-separated string of 5-8 SEO keywords

Topic: ${params.title}
Category: ${params.category}
${params.quickNotes ? `Writer's Notes: ${params.quickNotes}` : ''}

Guidelines:
- Open with a relatable scenario or question a homeowner might have
- Include practical, actionable advice
- Reference specific materials and techniques (not vague generalities)
- Mention Central Texas conditions where relevant (extreme heat, clay soil, freeze-thaw)
- End with a subtle CTA encouraging readers to contact us for a consultation
- Use <h2> for main sections, <h3> for subsections
- Include at least one bulleted list of tips or considerations

Return ONLY valid JSON. No markdown fencing.
`.trim();

export const PROJECT_ESTIMATE_PROMPT = (params: {
  projectType: string;
  description: string;
  timeline?: string;
  budget?: string;
}) => `
${BRAND_CONTEXT}

A potential customer has submitted a project estimate request. Generate a preliminary
estimate and project scope analysis. Return a JSON object with these fields:

- "estimatedRange": A price range string (e.g. "$8,000 - $14,000")
- "scope": A 2-3 sentence summary of what this project entails (60-100 words)
- "materials": An array of 4-6 recommended materials with brief notes (e.g. "Travertine pavers — excellent heat resistance for Texas summers")
- "timelineEstimate": An estimated build timeline string (e.g. "2-3 Weeks")
- "considerations": An array of 3-5 important factors the homeowner should know
- "nextSteps": A brief sentence about what happens next (mention the consultation)

Customer Request:
- Project Type: ${params.projectType}
- Description: ${params.description}
${params.timeline ? `- Desired Timeline: ${params.timeline}` : ''}
${params.budget ? `- Budget Indication: ${params.budget}` : ''}
- Location: Central Texas (Austin metro area)

Pricing Guidelines (rough ranges for Central Texas market):
- Outdoor Kitchen: $15,000 - $80,000+
- Pavers / Patio: $5,000 - $25,000
- Fire Pit: $3,000 - $15,000
- Retaining Wall: $5,000 - $30,000
- Stone Veneer: $8,000 - $35,000
- Pool Deck: $10,000 - $40,000
- Driveway: $8,000 - $30,000
- Commercial: $30,000 - $200,000+

Be realistic with pricing. If the customer's budget indication doesn't match typical
costs for their project type, address this diplomatically in considerations.

Return ONLY valid JSON. No markdown fencing.
`.trim();
