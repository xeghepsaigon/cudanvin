/**
 * Convert text to URL-friendly slug
 * E.g: "Toyota Vios 2022" -> "toyota-vios-2022"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9 ]/g, '') // Keep only alphanumeric and spaces
    .trim()
    .replace(/\s+/g, '-'); // Replace spaces with hyphens
}

/**
 * Generate short random ID
 * E.g: shortId(4) -> "a7x2"
 */
export function shortId(length: number = 4): string {
  return Math.random().toString(36).substring(2, 2 + length);
}

/**
 * Create full slug with short ID for uniqueness
 * E.g: "toyota-vios-2022--a7x2"
 */
export function createSlug(name: string): string {
  const cleanSlug = slugify(name);
  const id = shortId(4);
  return `${cleanSlug}--${id}`;
}

/**
 * Extract short ID from slug
 * E.g: "toyota-vios-2022--a7x2" -> "a7x2"
 */
export function extractIdFromSlug(slug: string): string {
  const parts = slug.split('--');
  return parts[parts.length - 1];
}
