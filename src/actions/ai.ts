'use server';

// Polyfilling Gemini typical types since we uninstalled the 11MB SDK wrapper
export enum Type {
  STRING = "STRING",
  NUMBER = "NUMBER",
  INTEGER = "INTEGER",
  BOOLEAN = "BOOLEAN",
  ARRAY = "ARRAY",
  OBJECT = "OBJECT",
}

export interface Schema {
  type: Type;
  format?: string;
  description?: string;
  nullable?: boolean;
  enum?: string[];
  maxItems?: string;
  minItems?: string;
  properties?: { [k: string]: Schema };
  required?: string[];
  items?: Schema;
}

const apiKey = process.env.GEMINI_API_KEY;

// --- Helper: Generic Generator ---
async function generateContent(systemPrompt: string, userPrompt: string, schema?: Schema, responseMimeType: string = 'application/json') {
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set');

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const payload = {
      contents: [
        {
          role: 'user',
          parts: [{ text: `${systemPrompt}\n\nTasks:\n${userPrompt}` }]
        }
      ],
      generationConfig: {
        responseMimeType,
        ...(schema ? { responseSchema: schema as object } : {}),
      },
    };

    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    
    if (!res.ok) {
        const errObj = await res.json().catch(() => ({}));
        throw new Error(`Gemini API Error: ${res.status} ${res.statusText} - ${JSON.stringify(errObj)}`);
    }

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) throw new Error('No content generated');
    
    return JSON.parse(text);
  } catch (error) {
    console.error('AI Generation Error:', error);
    throw error;
  }
}

// --- Feature: Blog Post Generator ---
export async function generatePostContent(prompt: string): Promise<any> {
    const schema: Schema = {
        type: Type.OBJECT,
        properties: {
        title: { type: Type.STRING },
        excerpt: { type: Type.STRING },
        category: { 
            type: Type.STRING, 
            enum: ['repair-tips', 'product-spotlight', 'contractor-insights', 'maintenance-guide', 'industry-news'] 
        },
        keywords: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
        },
        content: { type: Type.STRING, description: 'Main article body in semantic HTML (<p>, <h2>, <ul>, etc)' },
        imagePrompt: { type: Type.STRING, description: 'A highly detailed prompt for generating a photorealistic featured image for this article.' }
        },
        required: ['title', 'excerpt', 'category', 'keywords', 'content', 'imagePrompt'],
    };

    const systemPrompt = `
        You are an expert blog post writer for a Garage Door Service company.
        Generate a detailed, SEO-friendly blog post based on the user's prompt.
        
        INSTRUCTIONS:
        1. Return valid HTML for the 'content' field.
        2. Use semantic tags: <h2> for section headers, <p> for paragraphs, <ul>/<li> for lists.
        3. Do NOT include <html>, <head>, or <body> tags.
        4. Keep the tone professional but accessible.
        5. Provide a highly detailed 'imagePrompt' that will be used to generate the featured image.
    `;

    if (!apiKey) throw new Error('GEMINI_API_KEY is not set');

    let resultJson: any = {};
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-pro-exp-02-05:generateContent?key=${apiKey}`;
        const payload = {
            contents: [
                {
                    role: 'user',
                    parts: [{ text: `${systemPrompt}\n\nTasks:\n${prompt}` }]
                }
            ],
            generationConfig: {
                responseMimeType: 'application/json',
                responseSchema: schema as object,
            },
        };

        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        if (!res.ok) throw new Error(`Gemini Text Gen Error: ${res.statusText}`);
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (!text) throw new Error('No content generated');
        resultJson = JSON.parse(text);
    } catch (error) {
        console.error('AI Text Generation Error:', error);
        throw error;
    }

    let featuredImageId = null;
    try {
        if (resultJson.imagePrompt) {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${apiKey}`;
            const payload = {
                instances: [{ prompt: resultJson.imagePrompt }],
                parameters: { sampleCount: 1, aspectRatio: '16:9' }
            };
            
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            
            if (res.ok) {
                const data = await res.json();
                let base64Image = data?.predictions?.[0]?.bytesBase64Encoded;
                if (base64Image) {
                    featuredImageId = "mock-image-id";
                }
            }
        }
    } catch (error) {
        console.error('AI Image Generation Error:', error);
    }

    return {
        ...resultJson,
        featuredImageId
    };
}

// --- Feature: Smart Email Drafts (Service Hero) ---
export interface EmailDraftOption {
    tone: 'Professional' | 'Empathetic' | 'Urgent';
    preview: string;
    content: string; // HTML ready for TipTap
}

export async function generateEmailDrafts(threadContext: { id: string, from: string, body: string, date: string }[]): Promise<EmailDraftOption[]> {
    const transcript = threadContext.map(msg => `[${msg.date}] ${msg.from}: ${msg.body}`).join('\n');

    const schema: Schema = {
        type: Type.OBJECT,
        properties: {
            options: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        tone: { type: Type.STRING, enum: ['Professional', 'Empathetic', 'Urgent'] },
                        preview: { type: Type.STRING },
                        content: { type: Type.STRING },
                    },
                    required: ['tone', 'preview', 'content']
                }
            }
        },
        required: ['options']
    };

    const systemPrompt = `
        You are "Service Hero", a 20-year veteran Garage Door Technician and Support Specialist.
        Your goal is to draft replies to customer emails that are helpful, professional, and drive bookings.
        
        CONTEXT:
        ${transcript}
        
        INSTRUCTIONS:
        1. Analyze the conversation history strictly to understand the customer's issue and previous interactions.
        2. Generate 3 distinct draft replies in HTML format (suitable for a rich text editor):
           - Option 1 (Professional): Standard, courteous, scheduling-focused.
           - Option 2 (Empathetic): Apologetic (if needed), reassuring, comprehensive.
           - Option 3 (Urgent/Short): Quick acknowledgement, "we are on our way" or asking for critical info.
        
        FORMATTING:
        - Use <p> for paragraphs.
        - Use <ul>/<li> for lists.
        - Do NOT include <html> or <body> tags.
        - Sign off as "The Mobile Garage Door Team".
    `;

    const result = await generateContent(systemPrompt, "Draft 3 options based on the transcript.", schema);
    return result.options;
}

// --- Feature: Project Case Study Generator ---
export async function generateProjectCaseStudy(prompt: string) {
    const schema: Schema = {
        type: Type.OBJECT,
        properties: {
            title: { type: Type.STRING, description: 'Catchy, professional title for the case study' },
            client: { type: Type.STRING, description: 'Type of client (e.g., "Luxury Residence", "Commercial Warehouse")' },
            location: { type: Type.STRING, description: 'City/Area (inferred or generic)' },
            description: { type: Type.STRING, description: 'Main narrative HTML' },
            challenge: { type: Type.STRING, description: 'Problem statement HTML' },
            solution: { type: Type.STRING, description: 'Solution details HTML' },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ['title', 'client', 'location', 'description', 'challenge', 'solution', 'tags'],
    };

    const systemPrompt = `
        You are a Senior Project Manager for a high-end Garage Door Installation company.
        Create a detailed Case Study based on the user's rough notes.
        
        INSTRUCTIONS:
        1.  **Title:** compelling and descriptive.
        2.  **Client/Location:** Infer from context or use realistic placeholders (e.g. "Private Residence").
        3.  **Content (HTML):**
            -   **Description:** The main story. Use <p>, <b>, <ul>. Professional tone.
            -   **Challenge:** What was broken, difficult, or unique?
            -   **Solution:** What products/methods did we use? (e.g. "High-cycle springs", "Insulated steel panels").
        
        Ensure the HTML is clean (no <html>/<body> tags), just semantic block elements.
    `;

    return generateContent(systemPrompt, prompt, schema);
}

// --- Feature: Multimodal Project Case Study Generator ---
export async function generateMultimodalProjectCaseStudy(
    imagesContext: { url: string, mimeType: string, caption: string }[],
    prompt: string,
    targetField?: 'description' | 'challenge' | 'solution' | 'title',
    existingContext?: { description?: string, challenge?: string, solution?: string, title?: string }
) {
    const fullSchema: Schema = {
        type: Type.OBJECT,
        properties: {
            title: { type: Type.STRING, description: 'Catchy, professional title for the case study' },
            client: { type: Type.STRING, description: 'Type of client (e.g., "Luxury Residence", "Commercial Warehouse")' },
            location: { type: Type.STRING, description: 'City/Area (inferred or generic)' },
            description: { type: Type.STRING, description: 'Main narrative HTML' },
            challenge: { type: Type.STRING, description: 'Problem statement HTML' },
            solution: { type: Type.STRING, description: 'Solution details HTML' },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ['title', 'client', 'location', 'description', 'challenge', 'solution', 'tags'],
    };

    const targetSchema: Schema = targetField ? {
        type: Type.OBJECT,
        properties: {
            [targetField]: fullSchema.properties![targetField]
        },
        required: [targetField]
    } : fullSchema;

    const basePrompt = `
        You are a Senior Project Manager and Master Garage Door Technician.
        Write a highly technical, SEO-optimized Project Case Study in semantic HTML based on the provided before/after photos and context notes.
        
        INSTRUCTIONS:
        1. Analyze the provided photos to identify hardware, damage, and solutions.
        2. Read the attached captions for context.
        3.  **Title:** compelling and descriptive.
        4.  **Client/Location:** Infer from context or use realistic placeholders (e.g. "Private Residence").
        5.  **Content (HTML):**
            -   **Description:** The main story. Use <p>, <b>, <ul>. Professional tone.
            -   **Challenge:** What was broken, difficult, or unique?
            -   **Solution:** What hardware/methods did we use? Be technical (e.g. "High-cycle springs", "16-gauge hinges").
        
        Ensure the HTML is clean (no <html>/<body> tags), just semantic block elements.
    `;

    let systemPrompt = basePrompt;
    if (targetField) {
        systemPrompt += `\n\n=== GRANULAR REWRITE MODE ===
IMPORTANT: The user has requested to rewrite ONLY the '${targetField}' section based on their new instructions below. 
You must ONLY output the '${targetField}' field in your JSON response. DO NOT output the other fields.

Here is the EXISTING REST OF THE DRAFT for your context (do not regenerate these, just read them so your new '${targetField}' matches the tone and doesn't repeat information):
- CURRENT TITLE: ${existingContext?.title || '(Empty)'}
- CURRENT DESCRIPTION: ${existingContext?.description || '(Empty)'}
- CURRENT CHALLENGE: ${existingContext?.challenge || '(Empty)'}
- CURRENT SOLUTION: ${existingContext?.solution || '(Empty)'}
`;
    }

    if (!apiKey) throw new Error('GEMINI_API_KEY is not set');

    try {
        const parts: any[] = [];
        parts.push({ text: `${systemPrompt}\n\nTasks:\n${prompt}\n\nImage Context:` });

        // Download and append each image
        for (const img of imagesContext) {
            if (!img.url) continue;
            
            // Handle relative URLs if running locally
            const fullUrl = img.url.startsWith('http') ? img.url : `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}${img.url}`;
            
            try {
                const response = await fetch(fullUrl);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const arrayBuffer = await response.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                
                parts.push({
                    inlineData: {
                        data: buffer.toString('base64'),
                        mimeType: img.mimeType || 'image/jpeg'
                    }
                });
                
                if (img.caption) {
                    parts.push({ text: `Caption for the above image: ${img.caption}` });
                }
            } catch (err) {
                console.error("Failed to fetch image for AI:", fullUrl, err);
            }
        }

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        const payload = {
            contents: [{ role: 'user', parts: parts }],
            generationConfig: {
                responseMimeType: 'application/json',
                responseSchema: targetSchema as object,
            }
        };

        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error(`Gemini Multimodal Error: ${res.statusText}`);
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) throw new Error('No content generated');
        
        return JSON.parse(text);
    } catch (error) {
        console.error('AI Multimodal Generation Error:', error);
        throw error;
    }
}

// --- Feature: Smart Context Extraction (Client / Location) ---
export async function extractProjectContext(contextString: string) {
    const schema: Schema = {
        type: Type.OBJECT,
        properties: {
            client: { type: Type.STRING, description: 'The name of the client, homeowner, or business extracted from the prompt. Leave empty if no specific client is mentioned.' },
            location: { type: Type.STRING, description: 'The city, neighborhood, or general location extracted from the prompt. Leave empty if no location is mentioned.' },
        },
    };

    const systemPrompt = `
        You are a structured data extractor. Your job is to extract the client name and the location from the user's conversational input.
        If a piece of information is missing, leave the string empty. Do not guess.
        
        Examples:
        - "This was for the Smith job up in Austin" -> client: "The Smith Residence", location: "Austin, TX"
        - "Commercial warehouse door in South Dallas" -> client: "Commercial Warehouse", location: "South Dallas, TX"
    `;

    if (!apiKey) throw new Error('GEMINI_API_KEY is not set');

    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        const payload = {
            contents: [{ role: 'user', parts: [{ text: `${systemPrompt}\n\nUser Input:\n"${contextString}"` }] }],
            generationConfig: {
                responseMimeType: 'application/json',
                responseSchema: schema as object,
            }
        };

        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        if (!res.ok) throw new Error(`Gemini Context Error: ${res.statusText}`);
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) return { client: '', location: '' };
        
        return JSON.parse(text);
    } catch (error) {
        console.error('AI Smart Context Extraction Error:', error);
        throw error;
    }
}
