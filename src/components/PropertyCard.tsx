import React from 'react';
import { Card } from './ui/card';
import { Trees } from 'lucide-react';

interface PropertyCardProps {
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  size: number;
  imageUrl: string;
  hasGarden: boolean;
  isHighlighted?: boolean;
}

const PropertyCard = ({ 
  title, 
  price, 
  location, 
  bedrooms, 
  bathrooms, 
  size, 
  imageUrl,
  hasGarden,
  isHighlighted = false 
}: PropertyCardProps) => {
  return (
    <Card className={`property-card overflow-hidden transition-all duration-300 ${
      isHighlighted ? 'ring-2 ring-primary scale-105' : ''
    }`}>
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-heading font-semibold text-lg mb-2">{title}</h3>
        <p className="text-2xl font-bold text-primary mb-2">€{price.toLocaleString()}</p>
        <p className="text-gray-600 mb-2">{location}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <span>{bedrooms} hab.</span>
          <span>{bathrooms} baños</span>
          <span>{size} m²</span>
          {hasGarden && (
            <span className="flex items-center gap-1">
              <Trees className="h-4 w-4" />
              Jardín
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};

export default PropertyCard;