import type { Product } from '@/components/product-card';

export const allProducts: Product[] = [
  {
    id: '1',
    name: 'Pro Grade Cricket Bat',
    category: 'Cricket',
    type: 'preowned',
    price: 12000,
    originalPrice: 20000,
    grade: 'A',
    image: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?q=80&w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1540228232483-1b64a7024923?q=80&w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1595039925238-27b6863398a6?q=80&w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1629294897156-737d686a7657?q=80&w=800&h=800&fit=crop'
    ],
    dataAiHint: 'cricket bat',
    badge: 'Inspected',
    description: 'English Willow bat in excellent, like-new condition. Barely used, with a clean face and no damage. Perfect for professional and aspiring cricketers.',
    specs: {
      "Brand": "SG",
      "Material": "English Willow",
      "Weight": "1180g",
      "Size": "Full Size (SH)"
    }
  },
  {
    id: '2',
    name: 'Championship Football',
    category: 'Football',
    type: 'new',
    price: 3600,
    image: 'https://images.unsplash.com/photo-1486286701208-1d58e9338013?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHwlMjBGT09UQkFMTHxlbnwwfHx8fDE3NTUxNjc1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    dataAiHint: 'football ball',
    badge: 'Bestseller',
    description: 'Brand new, FIFA-approved match ball. Thermally bonded seamless surface for a more predictable trajectory, better touch and lower water uptake.',
     specs: {
      "Brand": "Nivia",
      "Material": "Polyurethane",
      "Size": "5",
      "Use": "Match Play"
    }
  },
  {
    id: '3',
    name: 'Featherlight Badminton Racket',
    category: 'Badminton',
    type: 'preowned',
    price: 6000,
    originalPrice: 11000,
    grade: 'B',
    image: 'https://images.unsplash.com/photo-1587280501635-33535b3f631c?q=80&w=800&h=800&fit=crop',
    dataAiHint: 'badminton racket',
    description: 'High-modulus graphite racket, very light and powerful. In good condition with some minor paint chips on the frame. Recently re-strung.',
     specs: {
      "Brand": "Yonex",
      "Material": "Graphite",
      "Weight": "83g (4U)",
      "Grip Size": "G5"
    }
  },
  {
    id: '4',
    name: 'Grand Slam Tennis Racket',
    category: 'Tennis',
    type: 'new',
    price: 9600,
    image: 'https://images.unsplash.com/photo-1557493680-99ae26025be8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHx0ZW5uaXMlMjByYWNrZXR8ZW58MHx8fHwxNzU1MTY3NzE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    dataAiHint: 'tennis racket',
    badge: 'Bestseller',
    description: 'A brand new racket designed for power and spin. Ideal for intermediate to advanced players looking to dominate the court.',
    specs: {
      "Brand": "Head",
      "Head Size": "100 sq. in.",
      "String Pattern": "16x19",
      "Balance": "4 pts HL"
    }
  },
  {
    id: '5',
    name: 'Starter Cricket Kit',
    category: 'Cricket',
    type: 'new',
    price: 7920,
    image: 'https://images.unsplash.com/photo-1578654979075-dde337ab7560?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyMHx8Y3JpY2tldCUyMGtpdHxlbnwwfHx8fDE3NTUxNjc2NTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    dataAiHint: 'cricket equipment',
    badge: 'Sale',
    description: 'Complete cricket kit for beginners. Includes a Kashmir Willow bat, pads, gloves, helmet, and a kit bag. Everything you need to start playing.',
    specs: {
      "Brand": "Local Makers",
      "Includes": "Bat, Pads, Gloves, Helmet, Bag",
      "Bat Material": "Kashmir Willow",
      "Size": "Full Size"
    }
  },
  {
    id: '6',
    name: 'Classic Leather Football',
    category: 'Football',
    type: 'preowned',
    price: 2000,
    originalPrice: 4500,
    grade: 'C',
    image: 'https://images.unsplash.com/photo-1575361204480-aadea2503aa4?q=80&w=800&h=800&fit=crop',
    dataAiHint: 'vintage football',
    badge: 'Refurbished',
    description: 'A classic, hand-stitched leather football. Shows some scuffs and wear but has been professionally cleaned and refurbished. Great for collectors or casual play.',
    specs: {
      "Brand": "Puma",
      "Material": "Genuine Leather",
      "Size": "5",
      "Stitching": "Hand-stitched"
    }
  },
  {
    id: '7',
    name: 'Running Shoes',
    category: 'Running',
    type: 'preowned',
    price: 4500,
    originalPrice: 9000,
    grade: 'B',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&h=800&fit=crop',
    dataAiHint: 'running shoes',
    description: 'Lightly used running shoes with excellent cushioning. Less than 50km on them. Sole is in great shape with minimal wear.',
     specs: {
      "Brand": "Nike",
      "Model": "Pegasus 39",
      "Size": "UK 9",
      "Use": "Road Running"
    }
  },
   {
    id: '8',
    name: 'Pro Hockey Stick',
    category: 'Hockey',
    type: 'preowned',
    price: 7000,
    originalPrice: 15000,
    grade: 'B',
    image: 'https://images.unsplash.com/photo-1541252260730-0472e8e01a7e?q=80&w=800&h=800&fit=crop',
    dataAiHint: 'hockey stick',
    description: 'Composite hockey stick with a mid-kick point. Used for one season, some scratches on the blade but structurally sound.',
     specs: {
      "Brand": "Bauer",
      "Material": "Composite",
      "Flex": "85",
      "Curve": "P92"
    }
  },
  {
    id: '9',
    name: 'Basketball',
    category: 'Basketball',
    type: 'preowned',
    price: 1200,
    originalPrice: 2500,
    grade: 'C',
    image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=800&h=800&fit=crop',
    dataAiHint: 'basketball',
    badge: 'Inspected',
    description: 'Official size and weight basketball. Good grip, holds air perfectly. Some logos have faded from outdoor use.',
     specs: {
      "Brand": "Spalding",
      "Material": "Composite Leather",
      "Size": "7",
      "Use": "Indoor/Outdoor"
    }
  },
  {
    id: '10',
    name: 'Artisan-Made Yoga Mat',
    category: 'Yoga',
    type: 'new',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1591291621223-376f0371a233?q=80&w=800&h=800&fit=crop',
    dataAiHint: 'yoga mat',
    badge: 'Sale',
    description: 'Eco-friendly yoga mat crafted by local artisans. Made from natural tree rubber and jute fiber, offering superior grip and cushioning.',
    specs: {
      "Brand": "Local Makers",
      "Material": "Natural Rubber & Jute",
      "Thickness": "5mm",
      "Dimensions": "72 x 24 inches"
    }
  },
  {
    id: '11',
    name: 'Supreme Boxing Gloves',
    category: 'Boxing',
    type: 'new',
    price: 8000,
    image: 'https://images.unsplash.com/photo-1669500635486-53b02ec7919b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxib3hpbmclMjBnbG92ZXN8ZW58MHx8fHwxNzU1MTY3ODQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    dataAiHint: 'boxing gloves',
    badge: 'Bestseller',
    description: 'Premium leather boxing gloves designed for professional training and sparring. Multi-layered foam padding for maximum shock absorption.',
    specs: {
      "Brand": "Everlast",
      "Material": "Genuine Leather",
      "Weight": "16 oz",
      "Closure": "Lace-up"
    }
  }
];
