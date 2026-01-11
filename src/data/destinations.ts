export interface Destination {
  id: number
  name: string
  location: string
  description: string
  price: string
  image: string
  imageAlt: string
  rating: number
  reviews: number
  category: 'safari' | 'beach' | 'mountain' | 'cultural'
  featured?: boolean
}

export const destinations: Destination[] = [
  {
    id: 1,
    name: 'Masai Mara Safari',
    location: 'Narok County',
    description: 'Witness the Great Migration and experience the Big Five in their natural habitat',
    price: '$1,200',
    image: 'https://images.unsplash.com/photo-1588588786707-8af013227e84?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxzYXZhbm5hJTIwYWNhY2lhJTIwdHJlZXMlMjBzdW5zZXQlMjB3aWxkbGlmZSUyMGdyYXNzbGFuZHxlbnwwfDB8fG9yYW5nZXwxNzYyNTQxMzYwfDA&ixlib=rb-4.1.0&q=85',
    imageAlt: 'Peter Mitchell on Unsplash',
    rating: 4.9,
    reviews: 342,
    category: 'safari',
    featured: true
  },
  {
    id: 2,
    name: 'Mount Kenya Trek',
    location: 'Central Kenya',
    description: 'Conquer Africa\'s second-highest peak with breathtaking alpine scenery',
    price: '$850',
    image: 'https://images.unsplash.com/photo-1653251913819-4282630f02af?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHxtb3VudGFpbiUyMHNub3clMjBwZWFrJTIwY2xvdWRzJTIwYWxwaW5lfGVufDB8MXx8Ymx1ZXwxNzYyNTQxMzYwfDA&ixlib=rb-4.1.0&q=85',
    imageAlt: 'Kendal on Unsplash',
    rating: 4.8,
    reviews: 198,
    category: 'mountain',
    featured: true
  },
  {
    id: 3,
    name: 'Diani Beach Paradise',
    location: 'South Coast',
    description: 'Relax on pristine white sand beaches with crystal-clear turquoise waters',
    price: '$650',
    image: 'https://images.unsplash.com/photo-1606944605622-c6df94a26e9b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHxiZWFjaCUyMG9jZWFuJTIwcGFsbSUyMHRyZWVzJTIwd2hpdGUlMjBzYW5kJTIwdHJvcGljYWx8ZW58MHwwfHxibHVlfDE3NjI1NDEzNjB8MA&ixlib=rb-4.1.0&q=85',
    imageAlt: 'Clayton de Paiva on Unsplash',
    rating: 4.7,
    reviews: 276,
    category: 'beach',
    featured: true
  },
  {
    id: 4,
    name: 'Amboseli National Park',
    location: 'Kajiado County',
    description: 'See elephants against the backdrop of Mount Kilimanjaro',
    price: '$980',
    image: 'https://images.unsplash.com/photo-1634662052101-78f72e8307be?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw4fHxlbGVwaGFudHMlMjBtb3VudGFpbiUyMGdyYXNzbGFuZCUyMHdpbGRsaWZlfGVufDB8MHx8fDE3NjI1NDEzNjB8MA&ixlib=rb-4.1.0&q=85',
    imageAlt: 'mtsjrdl on Unsplash',
    rating: 4.9,
    reviews: 412,
    category: 'safari'
  },
  {
    id: 5,
    name: 'Lamu Old Town',
    location: 'Lamu Island',
    description: 'Explore UNESCO World Heritage Swahili architecture and culture',
    price: '$720',
    image: 'https://images.unsplash.com/photo-1654257930222-2ed3cb6235af?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHxoaXN0b3JpYyUyMGFyY2hpdGVjdHVyZSUyMG5hcnJvdyUyMHN0cmVldCUyMHdvb2RlbiUyMGRvb3JzJTIwY29hc3RhbCUyMHRvd258ZW58MHwxfHx8MTc2MjU0MTM2MHww&ixlib=rb-4.1.0&q=85',
    imageAlt: 'Damla Altunel on Unsplash',
    rating: 4.6,
    reviews: 189,
    category: 'cultural',
    featured: true
  },
  {
    id: 6,
    name: 'Nairobi National Park',
    location: 'Nairobi',
    description: 'Experience wildlife safari with city skyline views',
    price: '$450',
    image: 'https://images.unsplash.com/photo-1539546280329-689d9d35edbf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHxsaW9ucyUyMGdyYXNzbGFuZCUyMGNpdHklMjBza3lsaW5lJTIwd2lsZGxpZmV8ZW58MHwwfHxncmVlbnwxNzYyNTQxMzYwfDA&ixlib=rb-4.1.0&q=85',
    imageAlt: 'Wayne Godfrey on Unsplash',
    rating: 4.5,
    reviews: 234,
    category: 'safari'
  },
  {
    id: 7,
    name: 'Lake Nakuru',
    location: 'Rift Valley',
    description: 'Marvel at thousands of pink flamingos and diverse birdlife',
    price: '$580',
    image: 'https://images.unsplash.com/photo-1568454537842-d933259bb258?w=800&q=80',
    imageAlt: 'Lake Nakuru flamingos',
    rating: 4.7,
    reviews: 156,
    category: 'safari',
    featured: true
  },
  {
    id: 8,
    name: 'Tsavo National Park',
    location: 'Coast Province',
    description: 'Discover red elephants and vast wilderness in Kenya\'s largest park',
    price: '$890',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',
    imageAlt: 'Tsavo elephants',
    rating: 4.8,
    reviews: 203,
    category: 'safari'
  },
  {
    id: 9,
    name: 'Watamu Beach',
    location: 'Kilifi County',
    description: 'Snorkel in marine parks and relax on stunning coastal beaches',
    price: '$720',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
    imageAlt: 'Watamu beach',
    rating: 4.6,
    reviews: 178,
    category: 'beach'
  },
  {
    id: 10,
    name: 'Hell\'s Gate National Park',
    location: 'Nakuru County',
    description: 'Cycle through dramatic gorges and geothermal landscapes',
    price: '$420',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80',
    imageAlt: 'Hell\'s Gate landscape',
    rating: 4.5,
    reviews: 142,
    category: 'mountain'
  },
  {
    id: 11,
    name: 'Samburu National Reserve',
    location: 'Samburu County',
    description: 'Encounter unique wildlife species in semi-arid landscapes',
    price: '$1,050',
    image: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=800&q=80',
    imageAlt: 'Samburu wildlife',
    rating: 4.9,
    reviews: 267,
    category: 'safari'
  },
  {
    id: 12,
    name: 'Malindi',
    location: 'Kilifi County',
    description: 'Explore historic Swahili town and pristine marine reserves',
    price: '$680',
    image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80',
    imageAlt: 'Malindi coast',
    rating: 4.4,
    reviews: 134,
    category: 'beach'
  }
]