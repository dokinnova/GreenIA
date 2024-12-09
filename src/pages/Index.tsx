import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import PropertyList from '@/components/PropertyList';
import Chatbot, { PropertyFilters } from '@/components/Chatbot';
import { fetchProperties } from '@/data/properties/queries';
import type { Property } from '@/data/properties/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddPropertyForm } from '@/components/AddPropertyForm';

const Index = () => {
  const [highlightedPropertyId, setHighlightedPropertyId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
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

  const handleFilter = (filters: PropertyFilters) => {
    console.log('Aplicando filtros:', filters); // Para debugging
    const filtered = properties.filter(property => {
      // Filtrar por número de baños
      if (filters.bathrooms !== undefined && property.bathrooms !== filters.bathrooms) {
        console.log('Propiedad descartada por baños:', property.title, property.bathrooms, filters.bathrooms);
        return false;
      }

      // Filtrar por número de habitaciones
      if (filters.bedrooms !== undefined && property.bedrooms !== filters.bedrooms) {
        return false;
      }

      // Filtrar por precio
      if (filters.minPrice && property.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice && property.price > filters.maxPrice) {
        return false;
      }

      // Filtrar por tamaño
      if (filters.minSize && property.size < filters.minSize) {
        return false;
      }
      if (filters.maxSize && property.size > filters.maxSize) {
        return false;
      }

      // Filtrar por palabras clave
      if (filters.keywords.length > 0) {
        return filters.keywords.some(keyword => 
          property.keywords?.includes(keyword.toLowerCase()) ||
          property.title.toLowerCase().includes(keyword.toLowerCase()) ||
          property.location.toLowerCase().includes(keyword.toLowerCase()) ||
          (keyword === 'jardín' && property.has_garden)
        );
      }

      return true;
    });

    console.log('Propiedades filtradas:', filtered.length); // Para debugging
    setFilteredProperties(filtered);
    setCurrentPage(1);
    
    if (filtered.length === 1) {
      setHighlightedPropertyId(filtered[0].id);
    } else {
      setHighlightedPropertyId(null);
    }

    // Mostrar mensaje si no hay resultados
    if (filtered.length === 0) {
      toast({
        title: "Sin resultados",
        description: "No se encontraron propiedades que coincidan con tus criterios de búsqueda.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Encuentra tu hogar ideal
          </h1>
          <p className="text-xl mb-8">
            Miles de propiedades te están esperando
          </p>
          
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

      <div className="container mx-auto py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-heading text-2xl font-semibold">
            Propiedades destacadas
          </h2>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Añadir Propiedad
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Añadir nueva propiedad</DialogTitle>
              </DialogHeader>
              <AddPropertyForm onSuccess={() => setDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
        
        <PropertyList
          properties={currentProperties}
          currentPage={currentPage}
          totalPages={totalPages}
          highlightedPropertyId={highlightedPropertyId}
          onPageChange={setCurrentPage}
        />
      </div>

      <Chatbot 
        onFilter={handleFilter}
        onResetFilter={() => {
          setFilteredProperties(properties);
          setHighlightedPropertyId(null);
          setCurrentPage(1);
        }}
      />
    </div>
  );
};

export default Index;