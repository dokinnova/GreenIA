
import React from 'react';
import PropertyCard from './PropertyCard';
import type { Property } from '@/data/properties/types';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface PropertyListProps {
  properties: Property[];
  currentPage: number;
  totalPages: number;
  highlightedPropertyId: number | null;
  onPageChange: (page: number) => void;
}

const PropertyList = ({
  properties,
  currentPage,
  totalPages,
  highlightedPropertyId,
  onPageChange
}: PropertyListProps) => {
  // Función para generar el rango de páginas a mostrar
  const getPageRange = () => {
    const range: (number | string)[] = [];
    
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Siempre mostrar la primera página
    range.push(1);

    if (currentPage <= 3) {
      range.push(2, 3, 4, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      range.push('...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      range.push('...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }

    return range;
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((property) => (
          <PropertyCard 
            key={property.id} 
            {...property} 
            isHighlighted={property.id === highlightedPropertyId}
          />
        ))}
      </div>

      <Pagination className="mt-8">
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(currentPage - 1);
                }} 
              />
            </PaginationItem>
          )}
          
          {getPageRange().map((page, index) => (
            <PaginationItem key={index}>
              {page === '...' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(page as number);
                  }}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(currentPage + 1);
                }} 
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PropertyList;
