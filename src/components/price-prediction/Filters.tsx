
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Home, Calendar, Filter } from 'lucide-react';

interface FiltersProps {
  selectedLocation: string;
  selectedPropertyType: string;
  locations: string[];
  propertyTypes: string[];
  onLocationChange: (value: string) => void;
  onPropertyTypeChange: (value: string) => void;
  isLoadingLocations?: boolean;
}

export const Filters = ({
  selectedLocation,
  selectedPropertyType,
  locations,
  propertyTypes,
  onLocationChange,
  onPropertyTypeChange,
  isLoadingLocations = false,
}: FiltersProps) => {
  return (
    <Card className="p-6 mb-8 border-none shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Search className="h-4 w-4" />
            Ubicación
          </label>
          <Select
            value={selectedLocation}
            onValueChange={onLocationChange}
            disabled={isLoadingLocations}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona ubicación" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Home className="h-4 w-4" />
            Tipo de Propiedad
          </label>
          <Select
            value={selectedPropertyType}
            onValueChange={onPropertyTypeChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona tipo" />
            </SelectTrigger>
            <SelectContent>
              {propertyTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Período
          </label>
          <Select value="12" disabled>
            <SelectTrigger className="w-full">
              <SelectValue>Últimos 12 meses</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12">Últimos 12 meses</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button className="w-full" disabled={!selectedLocation}>
            <Filter className="h-4 w-4 mr-2" />
            Actualizar Análisis
          </Button>
        </div>
      </div>
    </Card>
  );
};
