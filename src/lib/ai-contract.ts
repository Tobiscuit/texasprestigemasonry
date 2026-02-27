
// Removed: import { type SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

/**
 * ------------------------------------------------------------------
 * STANDARD DATA CONTRACT: AI-Generated Blog Posts (Lexical JSON)
 * ------------------------------------------------------------------
 * 
 * This contract defines the strict JSON structure required by the
 * rich text editor. AI models must output content adhering to this 
 * schema to ensure it renders correctly in the Admin UI and Frontend.
 * 
 * @version 2.0.0 (Post Payload removal)
 */

// 1. Root Structure
export interface AIPostResponse {
  title: string;
  excerpt: string;
  category: 'repair-tips' | 'product-spotlight' | 'contractor-insights' | 'maintenance-guide' | 'industry-news';
  keywords: string[];
  content: any; // Was SerializedEditorState, now generic until new editor is integrated
}

/**
 * HELPER: Example of a valid Lexical JSON for AI to replicate.
 */
export const EXAMPLE_LEXICAL_STRUCTURE = {
  root: {
    type: "root",
    format: "",
    indent: 0,
    version: 1,
    children: [
      {
        type: "heading",
        tag: "h2",
        format: "",
        indent: 0,
        version: 1,
        children: [
          {
            type: "text",
            text: "Why Your Masonry Project Matters",
            format: 0,
            detail: 0,
            mode: "normal",
            style: "",
            version: 1
          }
        ],
        direction: "ltr"
      },
      {
        type: "paragraph",
        format: "",
        indent: 0,
        version: 1,
        children: [
          {
            type: "text",
            text: "Quality masonry work is the foundation of any great building project.",
            format: 0,
            detail: 0,
            mode: "normal",
            style: "",
            version: 1
          }
        ],
        direction: "ltr"
      },
    ],
    direction: "ltr"
  }
};
