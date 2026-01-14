
import type { DestinationDetail, PackageOption, Review } from '../types/booking'
import { PackageType } from '../types/booking'

// Mock destination detail data
export const mockDestinationDetails: Record<number, DestinationDetail> = {
  1: {
    id: 1,
    name: 'Masai Mara Safari',
    location: 'Narok County',
    description: 'Witness the Great Migration and experience the Big Five in their natural habitat',
    longDescription: 'The Masai Mara National Reserve is one of Africa\'s greatest wildlife reserves. Together with the Serengeti National Park in Tanzania, it forms Africa\'s most diverse ecosystem. The reserve is home to the Big Five and is famous for the annual wildebeest migration.',
    price: 1200,
    images: [
      'https://images.unsplash.com/photo-1588588786707-8af013227e84?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxzYXZhbm5hJTIwYWNhY2lhJTIwdHJlZXMlMjBzdW5zZXQlMjB3aWxkbGlmZSUyMGdyYXNzbGFuZHxlbnwwfDB8fG9yYW5nZXwxNzYyNTQxMzYwfDA&ixlib=rb-4.1.0&q=85',
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',

    ],
    rating: 4.9,
    reviewCount: 342,
    category: 'safari',
    duration: '3 Days / 2 Nights',
    difficulty: 'Easy',
    bestTime: 'July - October',
    included: [
      'Accommodation in luxury tented camp',
      'All meals (breakfast, lunch, dinner)',
      'Game drives with professional guide',
      'Park entrance fees',
      'Airport transfers',
      'Bottled water during game drives'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival and Evening Game Drive',
        description: 'Arrive at Masai Mara, check-in to your camp, and enjoy an evening game drive'
      },
      {
        day: 2,
        title: 'Full Day Safari',
        description: 'Morning and afternoon game drives with lunch at the camp'
      },
      {
        day: 3,
        title: 'Morning Drive and Departure',
        description: 'Early morning game drive followed by breakfast and departure'
      }
    ],
    whatToBring: ['Comfortable clothing', 'Sun hat', 'Sunscreen', 'Binoculars', 'Camera', 'Insect repellent']
  }
  ,
  2: {
    id: 2,
    name: 'Mount Kenya Trek',
    location: 'Central Kenya',
    description: 'Conquer Africa\'s second-highest peak with breathtaking alpine scenery',
    longDescription: 'Mount Kenya is Africa\'s second-highest peak and offers some of the most spectacular alpine scenery in the world. The mountain features diverse ecosystems from bamboo forests to glacial peaks, making it a paradise for trekkers and nature lovers.',
    price: 850,
    images: [
      'https://images.unsplash.com/photo-1653251913819-4282630f02af?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHxtb3VudGFpbiUyMHNub3clMjBwZWFrJTIwY2xvdWRzJTIwYWxwaW5lfGVufDB8MXx8Ymx1ZXwxNzYyNTQxMzYwfDA&ixlib=rb-4.1.0&q=85',
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 198,
    category: 'mountain',
    duration: '4 Days / 3 Nights',
    difficulty: 'Challenging',
    bestTime: 'January - March, July - October',
    included: [
      'Mountain guide and porters',
      'All meals during trek',
      'Mountain huts accommodation',
      'Park entrance fees',
      'Airport transfers',
      'Emergency evacuation insurance'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival and Acclimatization',
        description: 'Arrive at Mount Kenya, meet your guide, and begin acclimatization hike'
      },
      {
        day: 2,
        title: 'Summit Attempt',
        description: 'Early morning start for the summit push through alpine terrain'
      },
      {
        day: 3,
        title: 'Descent and Exploration',
        description: 'Descend to base camp and explore the surrounding areas'
      },
      {
        day: 4,
        title: 'Departure',
        description: 'Morning breakfast and transfer back to Nairobi'
      }
    ],
    whatToBring: ['Warm clothing layers', 'Hiking boots', 'Sleeping bag', 'Water bottle', 'Sunscreen', 'Hat', 'Gloves', 'Headlamp']
  },
  3: {
    id: 3,
    name: 'Diani Beach Paradise',
    location: 'South Coast',
    description: 'Relax on pristine white sand beaches with crystal-clear turquoise waters',
    longDescription: 'Diani Beach offers pristine white sand beaches, crystal-clear turquoise waters, and a perfect blend of relaxation and adventure. Located on Kenya\'s south coast, it features luxury resorts, water sports, and proximity to coral reefs.',
    price: 650,
    images: [
      'https://images.unsplash.com/photo-1606944605622-c6df94a26e9b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHxiZWFjaCUyMG9jZWFuJTIwcGFsbSUyMHRyZWVzJTIwd2hpdGUlMjBzYW5kJTIwdHJvcGljYWx8ZW58MHwwfHxibHVlfDE3NjI1NDEzNjB8MA&ixlib=rb-4.1.0&q=85',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
      'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 276,
    category: 'beach',
    duration: '5 Days / 4 Nights',
    difficulty: 'Easy',
    bestTime: 'December - April',
    included: [
      'Beachfront resort accommodation',
      'All meals (breakfast, lunch, dinner)',
      'Airport transfers',
      'Welcome drink',
      'Daily housekeeping',
      'Access to resort facilities'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival and Beach Relaxation',
        description: 'Arrive at Diani Beach, check-in to resort, and enjoy beach time'
      },
      {
        day: 2,
        title: 'Water Sports Day',
        description: 'Try various water sports including snorkeling and kayaking'
      },
      {
        day: 3,
        title: 'Cultural Experience',
        description: 'Visit local villages and experience Swahili culture'
      },
      {
        day: 4,
        title: 'Free Day',
        description: 'Relax at the beach or explore nearby attractions'
      },
      {
        day: 5,
        title: 'Departure',
        description: 'Morning relaxation before airport transfer'
      }
    ],
    whatToBring: ['Swimwear', 'Light clothing', 'Sunscreen', 'Hat', 'Flip-flops', 'Snorkeling gear', 'Camera']
  },
  4: {
    id: 4,
    name: 'Amboseli National Park',
    location: 'Kajiado County',
    description: 'See elephants against the backdrop of Mount Kilimanjaro',
    longDescription: 'Amboseli National Park is famous for its large elephant herds and stunning views of Mount Kilimanjaro. The park offers some of the best opportunities to see African wildlife because the vegetation is sparse due to the long dry months.',
    price: 980,
    images: [
      'https://images.unsplash.com/photo-1634662052101-78f72e8307be?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw4fHxlbGVwaGFudHMlMjBtb3VudGFpbiUyMGdyYXNzbGFuZCUyMHdpbGRsaWZlfGVufDB8MHx8fDE3NjI1NDEzNjB8MA&ixlib=rb-4.1.0&q=85',
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',
      'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 412,
    category: 'safari',
    duration: '2 Days / 1 Night',
    difficulty: 'Easy',
    bestTime: 'June - October',
    included: [
      'Accommodation in luxury lodge',
      'All meals (breakfast, lunch, dinner)',
      'Game drives with professional guide',
      'Park entrance fees',
      'Airport transfers',
      'Bottled water during game drives'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival and Afternoon Game Drive',
        description: 'Arrive at Amboseli, check-in to your lodge, and enjoy an afternoon game drive'
      },
      {
        day: 2,
        title: 'Morning Drive and Departure',
        description: 'Early morning game drive followed by breakfast and departure'
      }
    ],
    whatToBring: ['Comfortable clothing', 'Sun hat', 'Sunscreen', 'Binoculars', 'Camera', 'Insect repellent']
  },
  5: {
    id: 5,
    name: 'Lamu Old Town',
    location: 'Lamu Island',
    description: 'Explore UNESCO World Heritage Swahili architecture and culture',
    longDescription: 'Lamu Old Town is a UNESCO World Heritage Site featuring stunning Swahili architecture, narrow winding streets, and a rich cultural heritage. The island offers a unique blend of history, culture, and natural beauty.',
    price: 720,
    images: [
      'https://images.unsplash.com/photo-1654257930222-2ed3cb6235af?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHxoaXN0b3JpYyUyMGFyY2hpdGVjdHVyZSUyMG5hcnJvdyUyMHN0cmVldCUyMHdvb2RlbiUyMGRvb3JzJTIwY29hc3RhbCUyMHRvd258ZW58MHwxfHx8MTc2MjU0MTM2MHww&ixlib=rb-4.1.0&q=85',
      'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80'
    ],
    rating: 4.6,
    reviewCount: 189,
    category: 'cultural',
    duration: '3 Days / 2 Nights',
    difficulty: 'Easy',
    bestTime: 'November - April',
    included: [
      'Traditional Swahili house accommodation',
      'All meals (breakfast, lunch, dinner)',
      'Guided cultural tours',
      'Boat transfers',
      'Cultural performances',
      'Traditional Swahili dinner'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival and Old Town Exploration',
        description: 'Arrive at Lamu, check-in to traditional house, and explore the old town'
      },
      {
        day: 2,
        title: 'Cultural Immersion',
        description: 'Visit historical sites, mosques, and experience local culture'
      },
      {
        day: 3,
        title: 'Island Exploration and Departure',
        description: 'Explore nearby islands and depart from Lamu'
      }
    ],
    whatToBring: ['Modest clothing', 'Comfortable walking shoes', 'Hat', 'Sunscreen', 'Camera', 'Light scarf for women']
  },
  6: {
    id: 6,
    name: 'Nairobi National Park',
    location: 'Nairobi',
    description: 'Experience wildlife safari with city skyline views',
    longDescription: 'Nairobi National Park is unique for being located within city limits, offering the rare opportunity to see wildlife against the backdrop of Nairobi\'s skyline. The park is home to the Big Five and features diverse landscapes.',
    price: 450,
    images: [
      'https://images.unsplash.com/photo-1539546280329-689d9d35edbf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHxsaW9ucyUyMGdyYXNzbGFuZCUyMGNpdHklMjBza3lsaW5lJTIwd2lsZGxpZmV8ZW58MHwwfHxncmVlbnwxNzYyNTQxMzYwfDA&ixlib=rb-4.1.0&q=85',
      'https://images.unsplash.com/photo-1588588786707-8af013227e84?w=800&q=80',
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80'
    ],
    rating: 4.5,
    reviewCount: 234,
    category: 'safari',
    duration: '1 Day',
    difficulty: 'Easy',
    bestTime: 'June - September',
    included: [
      'Guided game drive',
      'Park entrance fees',
      'Bottled water',
      'Picnic lunch'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Full Day Safari',
        description: 'Morning and afternoon game drives with wildlife viewing and picnic lunch'
      }
    ],
    whatToBring: ['Comfortable clothing', 'Sun hat', 'Sunscreen', 'Binoculars', 'Camera', 'Insect repellent']
  },
  7: {
    id: 7,
    name: 'Lake Nakuru',
    location: 'Rift Valley',
    description: 'Marvel at thousands of pink flamingos and diverse birdlife',
    longDescription: 'Lake Nakuru National Park is famous for its flamingo populations and diverse birdlife. The lake is a Ramsar site and offers excellent opportunities for birdwatching and wildlife viewing.',
    price: 580,
    images: [
      'https://images.unsplash.com/photo-1568454537842-d933259bb258?w=800&q=80',
      'https://images.unsplash.com/photo-1588588786707-8af013227e84?w=800&q=80',
      'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 156,
    category: 'safari',
    duration: '1 Day',
    difficulty: 'Easy',
    bestTime: 'October - March',
    included: [
      'Guided game drive',
      'Park entrance fees',
      'Bottled water',
      'Picnic lunch'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Flamingo and Wildlife Safari',
        description: 'Explore the lake shores, view flamingos, and spot other wildlife'
      }
    ],
    whatToBring: ['Comfortable clothing', 'Sun hat', 'Sunscreen', 'Binoculars', 'Camera', 'Insect repellent']
  },
  8: {
    id: 8,
    name: 'Tsavo National Park',
    location: 'Coast Province',
    description: 'Discover red elephants and vast wilderness in Kenya\'s largest park',
    longDescription: 'Tsavo National Park is Kenya\'s largest national park, famous for its red elephants and vast wilderness. The park offers diverse landscapes from savannas to volcanic hills.',
    price: 890,
    images: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',
      'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=800&q=80',
      'https://images.unsplash.com/photo-1588588786707-8af013227e84?w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 203,
    category: 'safari',
    duration: '2 Days / 1 Night',
    difficulty: 'Easy',
    bestTime: 'June - October',
    included: [
      'Accommodation in safari lodge',
      'All meals',
      'Game drives',
      'Park entrance fees',
      'Airport transfers'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival and Game Drive',
        description: 'Arrive at Tsavo and enjoy an afternoon game drive'
      },
      {
        day: 2,
        title: 'Morning Drive and Departure',
        description: 'Early morning game drive followed by departure'
      }
    ],
    whatToBring: ['Comfortable clothing', 'Sun hat', 'Sunscreen', 'Binoculars', 'Camera', 'Insect repellent']
  },
  9: {
    id: 9,
    name: 'Watamu Beach',
    location: 'Kilifi County',
    description: 'Snorkel in marine parks and relax on stunning coastal beaches',
    longDescription: 'Watamu Beach offers pristine beaches, coral reefs, and marine parks perfect for snorkeling. The area combines beach relaxation with marine adventures and cultural experiences.',
    price: 720,
    images: [
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
      'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80',
      'https://images.unsplash.com/photo-1606944605622-c6df94a26e9b?w=800&q=80'
    ],
    rating: 4.6,
    reviewCount: 178,
    category: 'beach',
    duration: '4 Days / 3 Nights',
    difficulty: 'Easy',
    bestTime: 'December - April',
    included: [
      'Beach resort accommodation',
      'All meals',
      'Snorkeling equipment',
      'Marine park fees',
      'Cultural tours'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival and Beach Relaxation',
        description: 'Arrive at Watamu and settle into beach resort'
      },
      {
        day: 2,
        title: 'Snorkeling Adventure',
        description: 'Explore coral reefs and marine life'
      },
      {
        day: 3,
        title: 'Cultural Exploration',
        description: 'Visit local villages and experience Swahili culture'
      },
      {
        day: 4,
        title: 'Free Time and Departure',
        description: 'Relax on the beach before departure'
      }
    ],
    whatToBring: ['Swimwear', 'Light clothing', 'Sunscreen', 'Hat', 'Flip-flops', 'Snorkeling gear', 'Camera']
  },
  10: {
    id: 10,
    name: 'Hell\'s Gate National Park',
    location: 'Nakuru County',
    description: 'Cycle through dramatic gorges and geothermal landscapes',
    longDescription: 'Hell\'s Gate National Park features dramatic gorges, geothermal activity, and is one of the few parks where cycling is allowed. The park offers unique geological formations and wildlife viewing.',
    price: 420,
    images: [
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      'https://images.unsplash.com/photo-1653251913819-4282630f02af?w=800&q=80'
    ],
    rating: 4.5,
    reviewCount: 142,
    category: 'mountain',
    duration: '1 Day',
    difficulty: 'Moderate',
    bestTime: 'June - September',
    included: [
      'Guided cycling tour',
      'Park entrance fees',
      'Bicycle rental',
      'Picnic lunch',
      'Safety equipment'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Cycling Adventure',
        description: 'Cycle through gorges, visit geothermal sites, and wildlife viewing'
      }
    ],
    whatToBring: ['Comfortable cycling clothes', 'Sports shoes', 'Sunscreen', 'Hat', 'Water bottle', 'Camera']
  },
  11: {
    id: 11,
    name: 'Samburu National Reserve',
    location: 'Samburu County',
    description: 'Encounter unique wildlife species in semi-arid landscapes',
    longDescription: 'Samburu National Reserve is known for its unique wildlife species not found elsewhere in Kenya, including the Somali ostrich, Grevy\'s zebra, and reticulated giraffe. The semi-arid landscape is stunning.',
    price: 1050,
    images: [
      'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=800&q=80',
      'https://images.unsplash.com/photo-1588588786707-8af013227e84?w=800&q=80',
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 267,
    category: 'safari',
    duration: '3 Days / 2 Nights',
    difficulty: 'Easy',
    bestTime: 'June - October',
    included: [
      'Luxury safari camp accommodation',
      'All meals',
      'Guided game drives',
      'Park entrance fees',
      'Airport transfers'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival and Game Drive',
        description: 'Arrive at Samburu and enjoy afternoon game drive'
      },
      {
        day: 2,
        title: 'Full Day Safari',
        description: 'Morning and afternoon game drives with wildlife viewing'
      },
      {
        day: 3,
        title: 'Morning Drive and Departure',
        description: 'Early morning game drive followed by departure'
      }
    ],
    whatToBring: ['Comfortable clothing', 'Sun hat', 'Sunscreen', 'Binoculars', 'Camera', 'Insect repellent']
  },
  12: {
    id: 12,
    name: 'Malindi',
    location: 'Kilifi County',
    description: 'Explore historic Swahili town and pristine marine reserves',
    longDescription: 'Malindi combines historic Swahili architecture with beautiful beaches and marine reserves. The town has a rich history dating back to the 15th century and offers excellent snorkeling opportunities.',
    price: 680,
    images: [
      'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
      'https://images.unsplash.com/photo-1606944605622-c6df94a26e9b?w=800&q=80'
    ],
    rating: 4.4,
    reviewCount: 134,
    category: 'beach',
    duration: '4 Days / 3 Nights',
    difficulty: 'Easy',
    bestTime: 'December - April',
    included: [
      'Beach hotel accommodation',
      'All meals',
      'Snorkeling trips',
      'Cultural tours',
      'Marine park fees'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival and Town Exploration',
        description: 'Arrive at Malindi and explore historic sites'
      },
      {
        day: 2,
        title: 'Marine Adventure',
        description: 'Snorkeling in marine reserves and beach time'
      },
      {
        day: 3,
        title: 'Cultural Experience',
        description: 'Visit local villages and experience Swahili culture'
      },
      {
        day: 4,
        title: 'Relaxation and Departure',
        description: 'Free time on the beach before departure'
      }
    ],
    whatToBring: ['Swimwear', 'Light clothing', 'Sunscreen', 'Hat', 'Flip-flops', 'Snorkeling gear', 'Camera']
  }
}

// Mock package options
export const mockPackages: PackageOption[] = [
  {
    type: PackageType.STANDARD,
    name: 'Standard Package',
    price: 1200,
    features: ['Standard accommodation', 'Shared game drives', 'Basic meals']
  },
  {
    type: PackageType.DELUXE,
    name: 'Deluxe Package',
    price: 1800,
    features: ['Luxury tented camp', 'Private game drives', 'Gourmet meals', 'Sundowner drinks']
  },
  {
    type: PackageType.PREMIUM,
    name: 'Premium Package',
    price: 2500,
    features: ['5-star lodge', 'Private guide & vehicle', 'All-inclusive meals & drinks', 'Hot air balloon safari', 'Spa treatments']
  }
]

// Mock reviews
export const mockReviews: Review[] = [
  {
    id: 1,
    userName: 'Sarah Johnson',
    userAvatar: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    date: new Date('2024-01-15'),
    comment: 'Absolutely incredible experience! The guides were knowledgeable and we saw all of the Big Five. Highly recommended!'
  },
  {
    id: 2,
    userName: 'Michael Chen',
    userAvatar: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    date: new Date('2024-02-20'),
    comment: 'Best safari ever! The accommodation was luxurious and the food was amazing. Will definitely come back.'
  },
  {
    id: 3,
    userName: 'Emma Williams',
    userAvatar: 'https://i.pravatar.cc/150?img=5',
    rating: 4,
    date: new Date('2024-03-10'),
    comment: 'Great experience overall. The wildlife viewing was spectacular. Only minor issue was the long drive from Nairobi.'
  }
]