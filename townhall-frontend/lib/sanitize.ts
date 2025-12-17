/**
 * HTML Sanitization Utility
 * Prevents XSS attacks by sanitizing HTML content before rendering
 */

import DOMPurify from 'dompurify';

/**
 * Sanitize HTML content to prevent XSS attacks
 * Safe for use with dangerouslySetInnerHTML
 */
export function sanitizeHtml(dirty: string | undefined | null): string {
  if (!dirty) return '';
  
  // In SSR context, DOMPurify needs a window object
  // For server-side rendering, we'll return the content as-is
  // The client-side will sanitize on hydration
  if (typeof window === 'undefined') {
    // Basic server-side sanitization - strip script tags
    return dirty
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+="[^"]*"/gi, '')
      .replace(/on\w+='[^']*'/gi, '');
  }
  
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'b', 'i', 'u', 's',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li',
      'a', 'blockquote', 'code', 'pre',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'img', 'figure', 'figcaption',
      'div', 'span',
    ],
    ALLOWED_ATTR: [
      'href', 'target', 'rel', 'src', 'alt', 'title',
      'class', 'id', 'width', 'height',
    ],
    ALLOW_DATA_ATTR: false,
    ADD_ATTR: ['target'],
    FORBID_TAGS: ['script', 'style', 'iframe', 'form', 'input'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
  });
}

/**
 * Create a safe HTML object for dangerouslySetInnerHTML
 */
export function createSafeHtml(content: string | undefined | null): { __html: string } {
  return { __html: sanitizeHtml(content) };
}
