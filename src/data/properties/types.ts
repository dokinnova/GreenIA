
export interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  size: number;
  image_url: string | null;
  image_urls: string[] | null;
  keywords: string[];
  has_garden: boolean;
  created_at: string;
  updated_at: string;
  rating?: number;
}

export interface PropertyFilters {
  minPrice?: number;
  maxPrice?: number;
  minSize?: number;
  maxSize?: number;
  bedrooms?: number;
  bathrooms?: number;
  keywords: string[];
}

export interface PropertyMapProps {
  properties: Property[];
  onClose: () => void;
}
