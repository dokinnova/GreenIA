import { Property } from './types';

export const ruralProperties: Property[] = [
  {
    id: 7,
    title: "Casa rural con huerto",
    price: 245000,
    location: "Granada, Alpujarra",
    bedrooms: 4,
    bathrooms: 2,
    size: 180,
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    keywords: ["casa", "rural", "huerto"],
    hasGarden: true
  },
  {
    id: 21,
    title: "Casa de pueblo restaurada",
    price: 180000,
    location: "Asturias, Covadonga",
    bedrooms: 4,
    bathrooms: 2,
    size: 200,
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    keywords: ["casa", "pueblo", "restaurada"],
    hasGarden: true
  },
  {
    id: 24,
    title: "Chalet con vistas al mar",
    price: 850000,
    location: "Sitges, Centro",
    bedrooms: 5,
    bathrooms: 4,
    size: 320,
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    keywords: ["chalet", "vistas", "mar"],
    hasGarden: true
  }
];
