
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
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
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
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page);
                }}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
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
