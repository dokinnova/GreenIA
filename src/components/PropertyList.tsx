
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
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {properties.map((property) => (
          <PropertyCard 
            key={property.id} 
            {...property} 
            isHighlighted={property.id === highlightedPropertyId}
          />
        ))}
      </div>

      <Pagination className="mt-6">
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
