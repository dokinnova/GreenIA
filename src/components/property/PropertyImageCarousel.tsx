
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface PropertyImageCarouselProps {
  images: string[];
  title: string;
  compact?: boolean;
}

const PropertyImageCarousel = ({ images, title, compact = false }: PropertyImageCarouselProps) => {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {images.map((img, index) => (
          <CarouselItem key={index}>
            <div className={`${compact ? 'aspect-[16/9]' : 'aspect-[16/9]'} relative`}>
              <img 
                src={img} 
                alt={`${title} - imagen ${index + 1}`} 
                className={`absolute inset-0 w-full h-full object-cover ${!compact && 'rounded-lg'}`}
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {images.length > 1 && (
        <>
          <CarouselPrevious className={compact ? "absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-0 hidden md:flex" : ""} />
          <CarouselNext className={compact ? "absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-0 hidden md:flex" : ""} />
        </>
      )}
    </Carousel>
  );
};

export default PropertyImageCarousel;
