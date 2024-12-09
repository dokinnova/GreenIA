import React, { useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import Chatbot from '../components/Chatbot';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Search } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { properties, Property } from '../data/properties';

const Index = () => {
  const [highlightedPropertyId, setHighlightedPropertyId] = useState<number | null>(null);
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 12;

  // Calcular propiedades para la página actual
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Encuentra tu hogar ideal
          </h1>
          <p className="text-xl mb-8">
            Miles de propiedades te están esperando
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto flex gap-2">
            <Input 
              placeholder="Buscar por ubicación..." 
              className="bg-white text-gray-900"
            />
            <Button className="bg-white text-primary hover:bg-gray-100">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="container mx-auto py-12">
        <h2 className="font-heading text-2xl font-semibold mb-6">
          Propiedades destacadas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentProperties.map((property) => (
            <PropertyCard 
              key={property.id} 
              {...property} 
              isHighlighted={property.id === highlightedPropertyId}
            />
          ))}
        </div>

        {/* Pagination */}
        <Pagination className="mt-8">
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(prev => prev - 1);
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
                    setCurrentPage(page);
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
                    setCurrentPage(prev => prev + 1);
                  }} 
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>

      {/* Chatbot with filtering capabilities */}
      <Chatbot 
        onFilter={(keywords: string[]) => {
          const filtered = properties.filter(property => 
            keywords.some(keyword => 
              property.keywords.includes(keyword.toLowerCase()) ||
              property.title.toLowerCase().includes(keyword.toLowerCase()) ||
              property.location.toLowerCase().includes(keyword.toLowerCase()) ||
              (keyword === 'jardín' && property.hasGarden)
            )
          );
          setFilteredProperties(filtered);
          setCurrentPage(1); // Resetear a la primera página cuando se filtra
          if (filtered.length === 1) {
            setHighlightedPropertyId(filtered[0].id);
          } else {
            setHighlightedPropertyId(null);
          }
        }}
        onResetFilter={() => {
          setFilteredProperties(properties);
          setHighlightedPropertyId(null);
          setCurrentPage(1); // Resetear a la primera página cuando se limpia el filtro
        }}
      />
    </div>
  );
};

export default Index;