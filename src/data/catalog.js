// src/data/catalog.js
export const catalog = [
  // --- THE CLASSICS ---
  {
    id: 'rr-01',
    name: '7-Stem Red Roses',
    category: 'The Classics',
    tags: ['Romance', 'Just Because'],
    image: '/assets/7-stem red roses.png',
    filler: 'Baby’s Breath, Ruscus',
    variants: [
      { id: 'v-rr01-ecu', label: 'Ecuadorian (Premium)', price: 2800, isPremium: true },
      { id: 'v-rr01-loc', label: 'Local (Standard)', price: 1800, isPremium: false }
    ]
  },
  {
    id: 'rr-02',
    name: '12-Stem Red Roses',
    category: 'The Classics',
    tags: ['Anniversary', 'Romance'],
    image: '/assets/12-stem red roses.png',
    filler: 'Eucalyptus, Baby’s Breath',
    variants: [
      { id: 'v-rr02-ecu', label: 'Ecuadorian (Premium)', price: 4500, isPremium: true },
      { id: 'v-rr02-loc', label: 'Local (Standard)', price: 3000, isPremium: false }
    ]
  },
  {
    id: 'rr-03',
    name: '50-Stem Red Roses',
    category: 'The Classics',
    tags: ['Grand Gesture', 'Anniversary'],
    image: '/assets/50-stem red roses.png',
    filler: 'Lush Foliage, Seeded Eucalyptus',
    variants: [
      { id: 'v-rr03-ecu', label: 'Ecuadorian (Premium)', price: 15000, isPremium: true },
      { id: 'v-rr03-loc', label: 'Local (Standard)', price: 10000, isPremium: false }
    ]
  },
  {
    id: 'tu-01',
    name: '6-Stem Tulips',
    category: 'The Classics',
    tags: ['Just Because', 'Gratitude'],
    image: '/assets/6-stem tulips.png',
    filler: 'Statice, Thlaspi',
    variants: [
      { id: 'v-tu01-dutch', label: 'Dutch Imported', price: 2500, isPremium: true },
      { id: 'v-tu01-std', label: 'Standard', price: 1500, isPremium: false }
    ]
  },
  {
    id: 'tu-02',
    name: '10-Stem Tulips',
    category: 'The Classics',
    tags: ['Celebration', 'Romance'],
    image: '/assets/10-stem tulips.png',
    filler: 'Chamomile, Queen Anne’s Lace',
    variants: [
      { id: 'v-tu02-dutch', label: 'Dutch Imported', price: 3800, isPremium: true },
      { id: 'v-tu02-std', label: 'Standard', price: 2800, isPremium: false }
    ]
  },
  {
    id: 'tu-03',
    name: '12-Stem Tulips',
    category: 'The Classics',
    tags: ['Anniversary', 'Celebration'],
    image: '/assets/12-step tulips.png', // Preserving the requested typo
    filler: 'Dusty Miller, Baby’s Breath',
    variants: [
      { id: 'v-tu03-dutch', label: 'Dutch Imported', price: 4800, isPremium: true },
      { id: 'v-tu03-std', label: 'Standard', price: 3200, isPremium: false }
    ]
  },

  // --- THE STATEMENTS ---
  {
    id: 'hy-01',
    name: '1-Stem Hydrangea',
    category: 'The Statements',
    tags: ['Just Because', 'Apology'],
    image: '/assets/1-stem hydrangea.png',
    filler: 'Eucalyptus, White Carnations',
    variants: [
      { id: 'v-hy01-imp', label: 'Imported Jumbo', price: 1500, isPremium: true },
      { id: 'v-hy01-loc', label: 'Local Regular', price: 800, isPremium: false }
    ]
  },
  {
    id: 'hy-02',
    name: '3-Stem Hydrangea',
    category: 'The Statements',
    tags: ['Celebration', 'Gratitude'],
    image: '/assets/3-stem hydrangea.png',
    filler: 'Chamomile, Waxflower',
    variants: [
      { id: 'v-hy02-imp', label: 'Imported Jumbo', price: 4000, isPremium: true },
      { id: 'v-hy02-loc', label: 'Local Regular', price: 2200, isPremium: false }
    ]
  },
  {
    id: 'hy-03',
    name: '7-Stem Hydrangea',
    category: 'The Statements',
    tags: ['Grand Gesture', 'Sympathy'],
    image: '/assets/7-stem hydrangea.png',
    filler: 'Premium Foliage, Sea Holly',
    variants: [
      { id: 'v-hy03-imp', label: 'Imported Jumbo', price: 8500, isPremium: true },
      { id: 'v-hy03-loc', label: 'Local Regular', price: 5000, isPremium: false }
    ]
  },

  // --- THE EDITORIALS ---
  {
    id: 'ed-01',
    name: 'The Thumbelina',
    category: 'The Editorials',
    tags: ['Romance', 'Celebration'],
    image: '/assets/thumbelina-tb01.png',
    filler: 'Mixed Wildflowers, Ferns',
    variants: [
      { id: 'v-ed01-luxe', label: 'Signature Arrangement', price: 6500, isPremium: true }
    ]
  },
  {
    id: 'ed-02',
    name: 'The Thumbelina Luxe',
    category: 'The Editorials',
    tags: ['Luxury', 'Grand Gesture'],
    image: '/assets/thumbelina-tb02.png',
    filler: 'Orchids, Premium Wildflowers, Ferns',
    variants: [
      { id: 'v-ed02-luxe', label: 'Bespoke Curated Mix', price: 12000, isPremium: true }
    ]
  }
];
