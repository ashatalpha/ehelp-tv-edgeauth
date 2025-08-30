import { toQuerySlug } from './slug'

// Main categories with all your requested topics
export const CATEGORIES = [
  {
    name: 'Home & DIY',
    slug: 'home-diy',
    icon: '🔨',
    color: '#ef4444',
    colorSecondary: '#dc2626',
    items: [
      'fix a leaky faucet',
      'hang pictures on wall',
      'unclog a drain',
      'paint a room properly',
      'install a door lock',
      'replace broken tiles',
      'fix squeaky door hinges',
      'organize garage storage',
      'clean carpet stains',
      'patch holes in drywall'
    ]
  },
  {
    name: 'Technology & Devices',
    slug: 'technology',
    icon: '💻',
    color: '#3b82f6',
    colorSecondary: '#2563eb',
    items: [
      'set up WiFi router',
      'backup iPhone photos',
      'speed up slow computer',
      'connect TV to internet',
      'reset forgotten password',
      'install antivirus software',
      'transfer files between phones',
      'set up smart home devices',
      'troubleshoot internet connection',
      'update computer drivers'
    ]
  },
  {
    name: 'Cooking & Food',
    slug: 'cooking-food',
    icon: '👨‍🍳',
    color: '#f59e0b',
    colorSecondary: '#d97706',
    items: [
      'make perfect scrambled eggs',
      'cook rice properly',
      'sharpen kitchen knives',
      'meal prep for the week',
      'make bread from scratch',
      'grill perfect steaks',
      'preserve fresh herbs',
      'make homemade pasta',
      'bake chocolate chip cookies',
      'prepare healthy smoothies'
    ]
  },
  {
    name: 'Money & Admin',
    slug: 'money-admin',
    icon: '💰',
    color: '#10b981',
    colorSecondary: '#059669',
    items: [
      'create a budget spreadsheet',
      'file taxes online',
      'improve credit score',
      'negotiate salary raise',
      'set up automatic savings',
      'invest in index funds',
      'track monthly expenses',
      'pay off debt faster',
      'understand insurance options',
      'plan for retirement'
    ]
  },
  {
    name: 'Health & Fitness',
    slug: 'health-fitness',
    icon: '💪',
    color: '#8b5cf6',
    colorSecondary: '#7c3aed',
    items: [
      'start a running routine',
      'do proper push-ups',
      'meal prep healthy lunches',
      'stretch for desk workers',
      'track daily water intake',
      'build core strength',
      'improve sleep quality',
      'reduce stress naturally',
      'create workout schedule',
      'maintain proper posture'
    ]
  },
  {
    name: 'Creative & Learning',
    slug: 'creative-learning',
    icon: '🎨',
    color: '#ec4899',
    colorSecondary: '#db2777',
    items: [
      'learn guitar chords',
      'take better photos',
      'write a compelling resume',
      'learn a new language',
      'start digital art',
      'improve handwriting',
      'write better emails',
      'practice public speaking',
      'develop memory techniques',
      'learn speed reading'
    ]
  },
  {
    name: 'Life Admin',
    slug: 'life-admin',
    icon: '📋',
    color: '#06b6d4',
    colorSecondary: '#0891b2',
    items: [
      'organize digital files',
      'plan weekly schedule',
      'deep clean your house',
      'pack efficiently for travel',
      'create morning routine',
      'declutter living space',
      'manage email inbox',
      'organize important documents',
      'plan productive weekends',
      'maintain work-life balance'
    ]
  },
  {
    name: 'Outdoor & Gardening',
    slug: 'outdoor-gardening',
    icon: '🌱',
    color: '#65a30d',
    colorSecondary: '#4d7c0f',
    items: [
      'start herb garden indoors',
      'grow tomatoes from seed',
      'compost kitchen scraps',
      'identify common birds',
      'plan a vegetable garden',
      'care for houseplants',
      'build raised garden beds',
      'attract butterflies to garden',
      'preserve fresh flowers',
      'grow plants from cuttings'
    ]
  },
  {
    name: 'Building & Engineering',
    slug: 'building-engineering',
    icon: '🏗️',
    color: '#dc2626',
    colorSecondary: '#b91c1c',
    items: [
      'read building blueprints',
      'use power drill safely',
      'measure and cut lumber',
      'install ceiling fan',
      'build simple bookshelf',
      'wire electrical outlets',
      'install plumbing fixtures',
      'build deck or patio',
      'repair concrete cracks',
      'understand load-bearing walls'
    ]
  },
  {
    name: 'Medical',
    slug: 'medical',
    icon: '⚕️',
    color: '#059669',
    colorSecondary: '#047857',
    items: [
      'check blood pressure correctly',
      'recognize heart attack signs',
      'take accurate temperature',
      'clean minor wounds',
      'understand prescription labels',
      'recognize stroke symptoms',
      'manage diabetes daily',
      'track medication schedules',
      'understand lab results',
      'prepare for doctor visits'
    ]
  },
  {
    name: 'Emergency Response',
    slug: 'emergency-response',
    icon: '🚨',
    color: '#dc2626',
    colorSecondary: '#b91c1c',
    items: [
      'perform CPR basics',
      'stop severe bleeding',
      'prepare disaster emergency kit',
      'evacuate during fire',
      'help choking person',
      'respond to car accidents',
      'treat burn injuries',
      'recognize allergic reactions',
      'handle natural disasters',
      'create family emergency plan'
    ]
  }
]

// Generate popular today items with proper slugs
export const POPULAR_TODAY = [
  {
    query: 'fix a leaky faucet',
    category: 'Home & DIY',
    views: 12300,
    slug: toQuerySlug('fix a leaky faucet')
  },
  {
    query: 'set up WiFi router',
    category: 'Technology & Devices',
    views: 8700,
    slug: toQuerySlug('set up WiFi router')
  },
  {
    query: 'make perfect scrambled eggs',
    category: 'Cooking & Food',
    views: 6200,
    slug: toQuerySlug('make perfect scrambled eggs')
  },
  {
    query: 'perform CPR basics',
    category: 'Emergency Response',
    views: 5100,
    slug: toQuerySlug('perform CPR basics')
  },
  {
    query: 'start herb garden indoors',
    category: 'Outdoor & Gardening',
    views: 4800,
    slug: toQuerySlug('start herb garden indoors')
  },
  {
    query: 'create a budget spreadsheet',
    category: 'Money & Admin',
    views: 4200,
    slug: toQuerySlug('create a budget spreadsheet')
  },
  {
    query: 'do proper push-ups',
    category: 'Health & Fitness',
    views: 3900,
    slug: toQuerySlug('do proper push-ups')
  },
  {
    query: 'learn guitar chords',
    category: 'Creative & Learning',
    views: 3600,
    slug: toQuerySlug('learn guitar chords')
  },
  {
    query: 'organize digital files',
    category: 'Life Admin',
    views: 3300,
    slug: toQuerySlug('organize digital files')
  },
  {
    query: 'use power drill safely',
    category: 'Building & Engineering',
    views: 2800,
    slug: toQuerySlug('use power drill safely')
  },
  {
    query: 'check blood pressure correctly',
    category: 'Medical',
    views: 2500,
    slug: toQuerySlug('check blood pressure correctly')
  },
  {
    query: 'stop severe bleeding',
    category: 'Emergency Response',
    views: 2200,
    slug: toQuerySlug('stop severe bleeding')
  }
]

// Helper function to get category by slug
export function getCategoryBySlug(slug) {
  return CATEGORIES.find(cat => cat.slug === slug)
}

// Helper function to get all items for a category
export function getCategoryItems(categorySlug) {
  const category = getCategoryBySlug(categorySlug)
  return category ? category.items : []
}

// Helper function to search across all content
export function searchContent(query) {
  const results = []
  const searchTerm = query.toLowerCase()
  
  CATEGORIES.forEach(category => {
    category.items.forEach(item => {
      if (item.toLowerCase().includes(searchTerm)) {
        results.push({
          query: item,
          category: category.name,
          categorySlug: category.slug,
          slug: toQuerySlug(item)
        })
      }
    })
  })
  
  return results
}
