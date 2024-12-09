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
import { filterProperties } from '@/utils/propertyFilters';
import Footer from '@/components/Footer';
import Testimonials from '@/components/Testimonials';
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

  const handleFilter = (filters: PropertyFilters) => {
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

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div 
        className="relative py-20 text-white"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=2000")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        <div className="container mx-auto text-center relative z-10">
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

      <div className="container mx-auto py-12 flex-grow">
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

      <Testimonials />

      <Chatbot 
        onFilter={handleFilter}
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