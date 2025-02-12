
import React from 'react';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Star } from 'lucide-react';

interface PropertyFiltersProps {
  onFilter: (filters: any) => void;
  onSort: (sort: string) => void;
}

const PropertyFilters = ({ onFilter, onSort }: PropertyFiltersProps) => {
  const [priceRange, setPriceRange] = React.useState([0, 1000000]);
  const [sizeRange, setSizeRange] = React.useState([0, 500]);
  const [bedrooms, setBedrooms] = React.useState<string>("");
  const [bathrooms, setBathrooms] = React.useState<string>("");
  const [hasGarden, setHasGarden] = React.useState(false);
  const [minRating, setMinRating] = React.useState<number>(0);

  const handleFilter = () => {
    onFilter({
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      minSize: sizeRange[0],
      maxSize: sizeRange[1],
      bedrooms: bedrooms ? parseInt(bedrooms) : undefined,
      bathrooms: bathrooms ? parseInt(bathrooms) : undefined,
      hasGarden,
      minRating,
    });
  };

  const handleReset = () => {
    setPriceRange([0, 1000000]);
    setSizeRange([0, 500]);
    setBedrooms("");
    setBathrooms("");
    setHasGarden(false);
    setMinRating(0);
    onFilter({});
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-heading text-lg font-semibold">Filtros</h3>
        <Select onValueChange={onSort} defaultValue="newest">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Más recientes</SelectItem>
            <SelectItem value="rating-desc">Mejor valorados</SelectItem>
            <SelectItem value="rating-asc">Peor valorados</SelectItem>
            <SelectItem value="price-asc">Precio: menor a mayor</SelectItem>
            <SelectItem value="price-desc">Precio: mayor a menor</SelectItem>
            <SelectItem value="size-asc">Tamaño: menor a mayor</SelectItem>
            <SelectItem value="size-desc">Tamaño: mayor a menor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Rango de precio (€)</Label>
          <div className="pt-2">
            <Slider
              defaultValue={[0, 1000000]}
              max={1000000}
              step={1000}
              value={priceRange}
              onValueChange={setPriceRange}
              className="my-4"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{priceRange[0].toLocaleString()}€</span>
              <span>{priceRange[1].toLocaleString()}€</span>
            </div>
          </div>
        </div>

        <div>
          <Label>Tamaño (m²)</Label>
          <div className="pt-2">
            <Slider
              defaultValue={[0, 500]}
              max={500}
              step={10}
              value={sizeRange}
              onValueChange={setSizeRange}
              className="my-4"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{sizeRange[0]} m²</span>
              <span>{sizeRange[1]} m²</span>
            </div>
          </div>
        </div>

        <div>
          <Label>Valoración mínima</Label>
          <div className="pt-2">
            <Slider
              defaultValue={[0]}
              max={5}
              step={0.5}
              value={[minRating]}
              onValueChange={(value) => setMinRating(value[0])}
              className="my-4"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                {minRating}
              </span>
              <span>5.0</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Habitaciones</Label>
            <Select value={bedrooms} onValueChange={setBedrooms}>
              <SelectTrigger>
                <SelectValue placeholder="Cualquiera" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Cualquiera</SelectItem>
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}+ habitaciones
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Baños</Label>
            <Select value={bathrooms} onValueChange={setBathrooms}>
              <SelectTrigger>
                <SelectValue placeholder="Cualquiera" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Cualquiera</SelectItem>
                {[1, 2, 3, 4].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}+ baños
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="garden"
            checked={hasGarden}
            onCheckedChange={setHasGarden}
          />
          <Label htmlFor="garden">Con jardín</Label>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleFilter} className="flex-1">
            Aplicar filtros
          </Button>
          <Button variant="outline" onClick={handleReset}>
            Limpiar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilters;
