
import React from 'react';
import { Card } from './ui/card';
import { Trees } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Property } from '@/data/properties/types';
import PropertyRatings from './property/PropertyRatings';
import PropertyInterestForm from './property/PropertyInterestForm';
import PropertyImageCarousel from './property/PropertyImageCarousel';

interface PropertyCardProps extends Property {
  isHighlighted?: boolean;
  showActions?: boolean;
  onClick?: () => void;
}

const PropertyCard = ({ 
  id,
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
}: PropertyCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [showInterestForm, setShowInterestForm] = React.useState(false);

  const images = React.useMemo(() => {
    if (image_urls && image_urls.length > 0) {
      return image_urls;
    }
    if (image_url) {
      return [image_url];
    }
    return ['/placeholder.svg'];
  }, [image_urls, image_url]);

  return (
    <>
      <Card 
        className={`w-full overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg ${
          isHighlighted ? 'ring-2 ring-primary scale-105' : ''
        }`}
        onClick={() => setIsDialogOpen(true)}
      >
        <div className="relative w-full aspect-[16/9]">
          <PropertyImageCarousel 
            images={images}
            title={title}
            compact
          />
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
          <PropertyRatings
            price_rating={price_rating}
            quality_rating={quality_rating}
            location_rating={location_rating}
            className="mt-3"
          />
        </div>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <PropertyImageCarousel 
              images={images}
              title={title}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Detalles</h3>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-primary">€{price.toLocaleString()}</p>
                  <p className="text-gray-600">{location}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span>{bedrooms} habitaciones</span>
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
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Valoraciones</h3>
                <PropertyRatings
                  price_rating={price_rating}
                  quality_rating={quality_rating}
                  location_rating={location_rating}
                />
              </div>
            </div>

            {!showInterestForm ? (
              <div className="flex justify-center mt-6">
                <Button onClick={() => setShowInterestForm(true)}>
                  Me interesa esta propiedad
                </Button>
              </div>
            ) : (
              <PropertyInterestForm
                propertyId={id}
                onCancel={() => setShowInterestForm(false)}
                onSuccess={() => {
                  setShowInterestForm(false);
                }}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PropertyCard;
