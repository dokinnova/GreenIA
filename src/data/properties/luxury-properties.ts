import { Property } from './types';

export const luxuryProperties: Property[] = [
  {
    id: 1,
    title: "Ático de lujo con terraza",
    price: 450000,
    location: "Barcelona, Eixample",
    bedrooms: 3,
    bathrooms: 2,
    size: 120,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    keywords: ["ático", "lujo", "terraza"],
    hasGarden: false
  },
  {
    id: 5,
    title: "Villa de lujo con jardín privado",
    price: 890000,
    location: "Marbella, Golden Mile",
    bedrooms: 5,
    bathrooms: 4,
    size: 350,
    imageUrl: "https://images.unsplash.com/photo-1496307653780-42ee777d4833",
    keywords: ["villa", "lujo", "jardín"],
    hasGarden: true
  },
  {
    id: 12,
    title: "Villa moderna con infinity pool",
    price: 1200000,
    location: "Ibiza, Santa Eulalia",
    bedrooms: 4,
    bathrooms: 4,
    size: 300,
    imageUrl: "https://images.unsplash.com/photo-1496307653780-42ee777d4833",
    keywords: ["villa", "moderna", "piscina"],
    hasGarden: false
  },
  {
    id: 17,
    title: "Chalet de lujo con campo de golf",
    price: 1500000,
    location: "Marbella, Nueva Andalucía",
    bedrooms: 6,
    bathrooms: 5,
    size: 500,
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    keywords: ["chalet", "lujo", "golf"],
    hasGarden: false
  }
];