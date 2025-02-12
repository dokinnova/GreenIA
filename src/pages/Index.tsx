import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import PropertyFilters from '@/components/PropertyFilters';
import Chatbot, { PropertyFilters as ChatbotFilters } from '@/components/Chatbot';
import { fetchProperties, addInitialProperties } from '@/data/properties/queries';
import type { Property } from '@/data/properties/types';
import { filterProperties } from '@/utils/propertyFilters';
import Footer from '@/components/Footer';
import Testimonials from '@/components/Testimonials';
import PropertyMap from '@/components/PropertyMap';
import { useIsMobile } from '@/hooks/use-mobile';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PropertiesSection from '@/components/PropertiesSection';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';

const Index = () => {
  const [highlightedPropertyId, setHighlightedPropertyId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [sortOrder, setSortOrder] = useState<string>('newest');
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();
  const propertiesPerPage = 12;

  const { data: properties = [], isLoading, error } = useQuery({
    queryKey: ['properties'],
    queryFn: fetchProperties,
  });

  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);

  React.useEffect(() => {
    if (properties) {
      setFilteredProperties(properties);
    }
  }, [properties]);

  const handleSort = (sort: string) => {
    setSortOrder(sort);
    const sorted = [...filteredProperties].sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'size-asc':
          return a.size - b.size;
        case 'size-desc':
          return b.size - a.size;
        case 'newest':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });
    setFilteredProperties(sorted);
    setCurrentPage(1);
  };

  const handleFilter = (filters: any) => {
    const filtered = properties.filter((property: Property) => {
      if (filters.minPrice && property.price < filters.minPrice) return false;
      if (filters.maxPrice && property.price > filters.maxPrice) return false;
      if (filters.minSize && property.size < filters.minSize) return false;
      if (filters.maxSize && property.size > filters.maxSize) return false;
      if (filters.bedrooms && property.bedrooms < filters.bedrooms) return false;
      if (filters.bathrooms && property.bathrooms < filters.bathrooms) return false;
      if (filters.hasGarden && !property.has_garden) return false;
      return true;
    });

    setFilteredProperties(filtered);
    setCurrentPage(1);

    if (filtered.length === 0) {
      toast({
        title: "Sin resultados",
        description: "No se encontraron propiedades que coincidan con tus criterios de búsqueda.",
        variant: "destructive"
      });
    }
  };

  const handleChatbotFilter = (filters: ChatbotFilters) => {
    const filtered = filterProperties(properties, filters);
    setFilteredProperties(filtered);
    setCurrentPage(1);
    
    if (filtered.length === 1) {
      setHighlightedPropertyId(filtered[0].id);
    } else {
      setHighlightedPropertyId(null);
    }

    if (filtered.length === 0) {
      toast({
        title: "Sin resultados",
        description: "No se encontraron propiedades que coincidan con tus criterios de búsqueda.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    const initializeProperties = async () => {
      try {
        await addInitialProperties();
        queryClient.invalidateQueries({ queryKey: ['properties'] });
      } catch (error) {
        console.error('Error initializing properties:', error);
      }
    };

    initializeProperties();
  }, [queryClient]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Cargando propiedades...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen">Error al cargar las propiedades</div>;
  }

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <Hero />

      <div className="container mx-auto py-6 md:py-12 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {isMobile ? (
            <Sheet open={showFilters} onOpenChange={setShowFilters}>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full mb-4">
                  Filtros
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filtros</SheetTitle>
                </SheetHeader>
                <PropertyFilters onFilter={handleFilter} onSort={handleSort} />
              </SheetContent>
            </Sheet>
          ) : (
            <div className="md:w-80 shrink-0">
              <div className="sticky top-4">
                <PropertyFilters onFilter={handleFilter} onSort={handleSort} />
              </div>
            </div>
          )}

          <PropertiesSection
            properties={currentProperties}
            currentPage={currentPage}
            totalPages={totalPages}
            highlightedPropertyId={highlightedPropertyId}
            onPageChange={setCurrentPage}
            onShowMap={() => setShowMap(true)}
            dialogOpen={dialogOpen}
            onDialogChange={setDialogOpen}
          />
        </div>
      </div>

      {showMap && (
        <PropertyMap
          properties={filteredProperties}
          onClose={() => setShowMap(false)}
        />
      )}

      <Testimonials />
      <Chatbot 
        onFilter={handleChatbotFilter}
        onResetFilter={() => {
          setFilteredProperties(properties);
          setHighlightedPropertyId(null);
          setCurrentPage(1);
        }}
      />
      <Footer />
    </div>
  );
};

export default Index;
