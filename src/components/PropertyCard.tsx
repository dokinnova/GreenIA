
import React from 'react';
import { Card } from './ui/card';
import { Trees, Star } from 'lucide-react';
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
  rating = 0,
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

  const renderRating = () => {
    const ratingValue = rating || 0;
    return (
      <div className="flex flex-col gap-1 mt-2">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-4 w-4 ${
                star <= ratingValue
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'fill-gray-200 text-gray-200'
              }`}
            />
          ))}
          <span className="text-sm text-gray-600 ml-1">{ratingValue.toFixed(1)}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div 
            className="bg-yellow-400 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${(ratingValue / 5) * 100}%` }}
          />
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
        {renderRating()}
      </div>
    </Card>
  );
};

export default PropertyCard;
