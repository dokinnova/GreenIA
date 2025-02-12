
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { fetchProperties } from '@/data/properties/queries';
import { AddPropertyForm } from '@/components/AddPropertyForm';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus, ArrowLeft } from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import { useNavigate } from 'react-router-dom';

const PropertiesManagement = () => {
  const navigate = useNavigate();
  const [isAddingProperty, setIsAddingProperty] = useState(false);

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: fetchProperties
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Gestión de Propiedades</h1>
              <p className="text-gray-600 mt-1">
                Administra el catálogo de propiedades
              </p>
            </div>
          </div>
          
          <Sheet open={isAddingProperty} onOpenChange={setIsAddingProperty}>
            <SheetTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Añadir Propiedad
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Nueva Propiedad</SheetTitle>
              </SheetHeader>
              <div className="mt-4">
                <AddPropertyForm onSuccess={() => setIsAddingProperty(false)} />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {isLoading ? (
          <div className="text-center py-8">Cargando propiedades...</div>
        ) : properties.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-600 mb-4">No hay propiedades disponibles</p>
            <Button onClick={() => setIsAddingProperty(true)}>
              Añadir primera propiedad
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard 
                key={property.id} 
                {...property}
                showActions={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesManagement;
