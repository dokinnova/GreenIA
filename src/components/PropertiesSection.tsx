
import React from 'react';
import { Button } from '@/components/ui/button';
import { Map, Plus } from 'lucide-react';
import PropertyList from '@/components/PropertyList';
import type { Property } from '@/data/properties/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddPropertyForm } from '@/components/AddPropertyForm';

interface PropertiesSectionProps {
  properties: Property[];
  currentPage: number;
  totalPages: number;
  highlightedPropertyId: number | null;
  onPageChange: (page: number) => void;
  onShowMap: () => void;
  dialogOpen: boolean;
  onDialogChange: (open: boolean) => void;
}

const PropertiesSection = ({
  properties,
  currentPage,
  totalPages,
  highlightedPropertyId,
  onPageChange,
  onShowMap,
  dialogOpen,
  onDialogChange,
}: PropertiesSectionProps) => {
  return (
    <div className="flex-1">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="font-heading text-xl md:text-2xl font-semibold">
          Propiedades destacadas
        </h2>
        
        <div className="flex gap-2 w-full md:w-auto">
          <Button
            variant="outline"
            onClick={onShowMap}
            className="flex-1 md:flex-none items-center gap-2"
          >
            <Map className="h-4 w-4" />
            Ver en Mapa
          </Button>
          
          <Dialog open={dialogOpen} onOpenChange={onDialogChange}>
            <DialogTrigger asChild>
              <Button className="flex-1 md:flex-none">
                <Plus className="h-4 w-4 mr-2" />
                Añadir Propiedad
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Añadir nueva propiedad</DialogTitle>
              </DialogHeader>
              <AddPropertyForm onSuccess={() => onDialogChange(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <PropertyList
        properties={properties}
        currentPage={currentPage}
        totalPages={totalPages}
        highlightedPropertyId={highlightedPropertyId}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default PropertiesSection;
