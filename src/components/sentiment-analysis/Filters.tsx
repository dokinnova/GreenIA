
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Filter, Search } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import type { CommentFilters } from '@/data/comments/types';

interface FiltersProps {
  onFiltersChange: (filters: CommentFilters) => void;
}

export const Filters = ({ onFiltersChange }: FiltersProps) => {
  const [filters, setFilters] = useState<CommentFilters>({});

  const handleFilterChange = (key: keyof CommentFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    if (value === 'all') {
      delete newFilters[key];
    }
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filtros
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Buscar</label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar comentarios..." 
              className="pl-8"
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Sentimiento</label>
          <Select onValueChange={(value) => handleFilterChange('sentiment', value === 'all' ? undefined : value)}>
            <SelectTrigger>
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="positive">Positivo</SelectItem>
              <SelectItem value="neutral">Neutro</SelectItem>
              <SelectItem value="negative">Negativo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Canal</label>
          <Select onValueChange={(value) => handleFilterChange('source', value === 'all' ? undefined : value)}>
            <SelectTrigger>
              <SelectValue placeholder="Todos los canales" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los canales</SelectItem>
              <SelectItem value="google">Google</SelectItem>
              <SelectItem value="social_media">Redes Sociales</SelectItem>
              <SelectItem value="internal_form">Formulario Interno</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Ubicación</label>
          <Select onValueChange={(value) => handleFilterChange('location', value === 'all' ? undefined : value)}>
            <SelectTrigger>
              <SelectValue placeholder="Todas las ubicaciones" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las ubicaciones</SelectItem>
              <SelectItem value="madrid">Madrid</SelectItem>
              <SelectItem value="barcelona">Barcelona</SelectItem>
              <SelectItem value="valencia">Valencia</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          className="w-full" 
          variant="outline"
          onClick={() => {
            setFilters({});
            onFiltersChange({});
          }}
        >
          Limpiar Filtros
        </Button>
      </CardContent>
    </Card>
  );
};
