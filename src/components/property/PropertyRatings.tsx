
import React from 'react';

interface PropertyRatingsProps {
  price_rating?: number;
  quality_rating?: number;
  location_rating?: number;
  className?: string;
}

const PropertyRatings = ({ 
  price_rating = 3, 
  quality_rating = 3, 
  location_rating = 3,
  className = ""
}: PropertyRatingsProps) => {
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

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
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

export default PropertyRatings;
