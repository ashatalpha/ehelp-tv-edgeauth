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
