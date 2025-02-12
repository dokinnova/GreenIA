
import React from 'react';
import { Card } from './ui/card';
import { Trees } from 'lucide-react';
import { Progress } from './ui/progress';
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
  const images = React.useMemo(() => {
    if (image_urls && image_urls.length > 0) {
      return image_urls;
    }
    if (image_url) {
      return [image_url];
    }
    return ['/placeholder.svg'];
  }, [image_urls, image_url]);

  // Valor temporal para la valoración (1-5)
  const rating = Math.floor(Math.random() * 5) + 1;

  // Función para obtener el color basado en la valoración
  const getRatingColor = (rating: number) => {
    switch (rating) {
      case 1:
        return 'bg-[#ea384c]'; // Rojo
      case 2:
        return 'bg-[#F97316]'; // Naranja
      case 3:
        return 'bg-[#FEF7CD]'; // Amarillo
      case 4:
        return 'bg-[#4ADE80]'; // Verde muy claro
      case 5:
        return 'bg-[#166534]'; // Verde oscuro
      default:
        return 'bg-gray-500';
    }
  };

  // Calcula el porcentaje para la barra de progreso
  const ratingPercentage = (rating / 5) * 100;

  return (
    <Card className={`w-full overflow-hidden transition-all duration-300 ${
      isHighlighted ? 'ring-2 ring-primary scale-105' : ''
    }`}>
      <div className="relative w-full aspect-[4/3]">
        <Carousel className="w-full">
          <CarouselContent>
            {images.map((img, index) => (
              <CarouselItem key={index} className="relative w-full aspect-[4/3]">
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

      <div className="p-3 md:p-4">
        <h3 className="font-heading font-semibold text-base md:text-lg mb-2 line-clamp-2">{title}</h3>
        <p className="text-xl md:text-2xl font-bold text-primary mb-2">€{price.toLocaleString()}</p>
        <p className="text-gray-600 mb-2 text-sm md:text-base">{location}</p>
        <div className="flex flex-wrap gap-2 md:gap-4 text-xs md:text-sm text-gray-500 mb-3">
          <span>{bedrooms} hab.</span>
          <span>{bathrooms} baños</span>
          <span>{size} m²</span>
          {has_garden && (
            <span className="flex items-center gap-1">
              <Trees className="h-3 w-3 md:h-4 md:w-4" />
              Jardín
            </span>
          )}
        </div>

        {/* Barra de valoración con separadores */}
        <div className="mt-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Valoración</span>
            <span className="font-semibold">{rating}/5</span>
          </div>
          <div className="relative">
            {/* Separadores */}
            <div className="absolute inset-0 flex justify-between pointer-events-none px-[1px]">
              {[1, 2, 3, 4].map((level) => (
                <div 
                  key={level}
                  className="w-[2px] h-2.5 bg-white/80 z-10"
                />
              ))}
            </div>
            {/* Barra de progreso */}
            <Progress 
              value={ratingPercentage} 
              className={`h-2.5 bg-gray-100 ${getRatingColor(rating)}`}
            />
            {/* Números de nivel */}
            <div className="flex justify-between text-[10px] text-gray-500 mt-1 px-[1px]">
              {[1, 2, 3, 4, 5].map((level) => (
                <span key={level}>{level}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PropertyCard;
