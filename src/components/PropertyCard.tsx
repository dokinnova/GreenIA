
import React from 'react';
import { Card } from './ui/card';
import { Trees } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Property } from '@/data/properties/types';

interface PropertyCardProps extends Property {
  isHighlighted?: boolean;
  showActions?: boolean;
  onClick?: () => void;
}

const PropertyCard = ({ 
  title, 
  price, 
  location, 
  bedrooms, 
  bathrooms, 
  size, 
  image_url,
  image_urls = [],
  has_garden,
  price_rating = 3,
  quality_rating = 3,
  location_rating = 3,
  isHighlighted = false,
  onClick 
}: PropertyCardProps) => {
  const images = React.useMemo(() => {
    if (image_urls && image_urls.length > 0) {
      return image_urls;
    }
    if (image_url) {
      return [image_url];
    }
    return ['/placeholder.svg'];
  }, [image_urls, image_url]);

  const getRatingColor = (rating: number) => {
    switch(rating) {
      case 1: return 'bg-red-500';
      case 2: return 'bg-orange-500';
      case 3: return 'bg-yellow-500';
      case 4: return 'bg-lime-500';
      case 5: return 'bg-green-500';
      default: return 'bg-gray-300';
    }
  };

  const renderRatings = () => {
    return (
      <div className="flex flex-col gap-2 mt-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 w-16">Precio</span>
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-300 ${getRatingColor(price_rating)}`}
              style={{ width: `${(price_rating / 5) * 100}%` }}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 w-16">Calidad</span>
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-300 ${getRatingColor(quality_rating)}`}
              style={{ width: `${(quality_rating / 5) * 100}%` }}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 w-16">Ubicación</span>
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-300 ${getRatingColor(location_rating)}`}
              style={{ width: `${(location_rating / 5) * 100}%` }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card 
      className={`w-full overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg ${
        isHighlighted ? 'ring-2 ring-primary scale-105' : ''
      }`}
      onClick={onClick}
    >
      <div className="relative w-full aspect-[16/9]">
        <Carousel className="w-full">
          <CarouselContent>
            {images.map((img, index) => (
              <CarouselItem key={index} className="relative w-full aspect-[16/9]">
                <img 
                  src={img} 
                  alt={`${title} - imagen ${index + 1}`} 
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Error loading image:', img);
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {images.length > 1 && (
            <>
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-0 hidden md:flex" />
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-0 hidden md:flex" />
            </>
          )}
        </Carousel>
      </div>

      <div className="p-2 md:p-3">
        <h3 className="font-heading font-semibold text-sm md:text-base mb-1 line-clamp-1">{title}</h3>
        <p className="text-lg md:text-xl font-bold text-primary mb-1">€{price.toLocaleString()}</p>
        <p className="text-gray-600 mb-1 text-xs md:text-sm line-clamp-1">{location}</p>
        <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
          <span>{bedrooms} hab.</span>
          <span>{bathrooms} baños</span>
          <span>{size} m²</span>
          {has_garden && (
            <span className="flex items-center gap-1">
              <Trees className="h-3 w-3" />
              Jardín
            </span>
          )}
        </div>
        {renderRatings()}
      </div>
    </Card>
  );
};

export default PropertyCard;
