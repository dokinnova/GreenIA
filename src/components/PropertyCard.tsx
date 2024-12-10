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

interface PropertyCardProps {
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  size: number;
  image_url: string | null;
  image_urls?: string[] | null;
  has_garden: boolean;
  isHighlighted?: boolean;
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
  isHighlighted = false 
}: PropertyCardProps) => {
  // Usar image_urls si está disponible y tiene elementos, si no usar image_url
  const allImages = React.useMemo(() => {
    if (image_urls && image_urls.length > 0) {
      return image_urls;
    }
    if (image_url) {
      return [image_url];
    }
    return ['/placeholder.svg'];
  }, [image_urls, image_url]);

  return (
    <Card className={`property-card overflow-hidden transition-all duration-300 ${
      isHighlighted ? 'ring-2 ring-primary scale-105' : ''
    }`}>
      <div className="relative aspect-video">
        <Carousel className="w-full">
          <CarouselContent>
            {allImages.map((img, index) => (
              <CarouselItem key={index}>
                <div className="relative aspect-video">
                  <img 
                    src={img} 
                    alt={`${title} - imagen ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {allImages.length > 1 && (
            <>
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
            </>
          )}
        </Carousel>
      </div>
      <div className="p-4">
        <h3 className="font-heading font-semibold text-lg mb-2">{title}</h3>
        <p className="text-2xl font-bold text-primary mb-2">€{price.toLocaleString()}</p>
        <p className="text-gray-600 mb-2">{location}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <span>{bedrooms} hab.</span>
          <span>{bathrooms} baños</span>
          <span>{size} m²</span>
          {has_garden && (
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