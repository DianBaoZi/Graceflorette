/**
 * Server-side input validation helpers.
 * Used by all server actions to sanitize and validate user input before
 * it touches the database or gets rendered.
 */

/** Trims whitespace and enforces a maximum length. Returns null for empty/missing values. */
export function sanitizeText(value: unknown, maxLength = 1000): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().slice(0, maxLength);
  return trimmed.length > 0 ? trimmed : null;
}

/** Same as sanitizeText but returns empty string instead of null (for optional fields). */
export function sanitizeOptional(value: unknown, maxLength = 1000): string {
  return sanitizeText(value, maxLength) ?? "";
}

/** Validates a URL-safe slug: lowercase alphanumeric + hyphens, no leading/trailing hyphen. */
export function isValidSlug(slug: string): boolean {
  if (slug.length < 1 || slug.length > 200) return false;
  return /^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug);
}

/** Validates a positive price below a ceiling (default $99,999). */
export function isValidPrice(value: unknown, max = 99999): boolean {
  const n = typeof value === "string" ? parseFloat(value) : (value as number);
  return typeof n === "number" && isFinite(n) && n > 0 && n <= max;
}

/** Validates a UUID v4 string (Supabase IDs are UUID v4). */
export function isValidUUID(value: unknown): boolean {
  if (typeof value !== "string") return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    value
  );
}

/** Validates a display order integer within bounds. */
export function isValidDisplayOrder(value: unknown): boolean {
  const n = typeof value === "string" ? parseInt(value, 10) : (value as number);
  return typeof n === "number" && Number.isInteger(n) && n >= 0 && n <= 9999;
}

/** Validates a Supabase storage path (no path traversal). */
export function isValidStoragePath(path: string): boolean {
  // Must not contain path traversal sequences and must match our upload filename format
  if (path.includes("..") || path.includes("//")) return false;
  // Allow only alphanumeric, hyphens, dots (for extension), underscores, and forward slashes
  return /^[a-zA-Z0-9._/-]+$/.test(path) && path.length <= 500;
}

/** Validates that a JSON string is a valid array of strings (used for tags and images). */
export function parseStringArray(value: unknown): string[] | null {
  try {
    const raw = typeof value === "string" ? JSON.parse(value) : value;
    if (!Array.isArray(raw)) return null;
    if (!raw.every((item) => typeof item === "string")) return null;
    return raw as string[];
  } catch {
    return null;
  }
}

/** Known valid tag values for homepage sections. */
const VALID_TAGS = ["featured", "valentine", "mothersday"] as const;
export type ValidTag = (typeof VALID_TAGS)[number];

export function isValidTag(tag: unknown): tag is ValidTag {
  return VALID_TAGS.includes(tag as ValidTag);
}
