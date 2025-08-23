// lib/slug.js
export function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function fromSlug(slug) {
  // Not strictly needed; we’ll look up by slug map instead.
  return slug.replace(/-/g, ' ');
}
// turn a query string into a URL-safe slug
export function toQuerySlug(query) {
  return query
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// turn a slug back into a readable query
export function fromQuerySlug(slug) {
  return slug.replace(/-/g, ' ');
}
