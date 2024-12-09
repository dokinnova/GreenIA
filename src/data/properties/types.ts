export interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  size: number;
  imageUrl: string;
  keywords: string[];
  hasGarden: boolean;
}