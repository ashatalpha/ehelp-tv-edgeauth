// Utility functions for handling URL slugs

/**
 * Convert a query text to a URL-friendly slug
 * Example: "fix a leaky faucet" -> "fix-a-leaky-faucet"
 */
export function toQuerySlug(queryText) {
  if (!queryText) return ''
  
  return queryText
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

/**
 * Convert a slug back to readable query text
 * Example: "fix-a-leaky-faucet" -> "Fix A Leaky Faucet"
 */
export function fromQuerySlug(slug) {
  if (!slug) return ''
  
  return slug
    .replace(/-/g, ' ') // Replace hyphens with spaces
    .replace(/\b\w/g, letter => letter.toUpperCase()) // Capitalize first letter of each word
}

/**
 * Convert category name to URL-friendly slug
 * Example: "Home & DIY" -> "home-diy"
 */
export function toCategorySlug(categoryName) {
  if (!categoryName) return ''
  
  return categoryName
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and') // Replace & with 'and'
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

/**
 * Convert category slug back to display name
 * Example: "home-diy" -> "Home DIY"
 */
export function fromCategorySlug(slug) {
  if (!slug) return ''
  
  return slug
    .replace(/-/g, ' ') // Replace hyphens with spaces
    .replace(/\band\b/g, '&') // Replace 'and' with '&'
    .replace(/\b\w/g, letter => letter.toUpperCase()) // Capitalize first letter of each word
}

/**
 * Create a safe URL slug from any string
 * Generic function for any text that needs to become a URL
 */
export function createSlug(text) {
  if (!text) return ''
  
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars except hyphens
    .replace(/\-\-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+/, '') // Trim hyphens from start of text
    .replace(/-+$/, '') // Trim hyphens from end of text
}

/**
 * Validate if a slug is properly formatted
 */
export function isValidSlug(slug) {
  if (!slug || typeof slug !== 'string') return false
  
  // Check if slug contains only lowercase letters, numbers, and hyphens
  // Must start and end with alphanumeric character
  const slugPattern = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/
  return slugPattern.test(slug)
}

/**
 * Generate URL for query page
 */
export function getQueryUrl(queryText) {
  return `/q/${toQuerySlug(queryText)}`
}

/**
 * Generate URL for category page
 */
export function getCategoryUrl(categorySlug) {
  return `/category/${categorySlug}`
}
