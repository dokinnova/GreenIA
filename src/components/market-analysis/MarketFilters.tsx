
import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { DateRange } from 'react-day-picker';

interface MarketFiltersProps {
  selectedLocation: string;
  selectedPropertyType: string;
  dateRange: { from: Date; to: Date };
  onLocationChange: (location: string) => void;
  onPropertyTypeChange: (type: string) => void;
  onDateRangeChange: (range: { from: Date; to: Date }) => void;
}

const MarketFilters = ({
  selectedLocation,
  selectedPropertyType,
  dateRange,
  onLocationChange,
  onPropertyTypeChange,
  onDateRangeChange,
}: MarketFiltersProps) => {
  return (
    <Card className="p-4 space-y-6">
      <div className="space-y-2">
        <Label>Ubicación</Label>
        <Select value={selectedLocation} onValueChange={onLocationChange}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona ubicación" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Madrid">Madrid</SelectItem>
            <SelectItem value="Barcelona">Barcelona</SelectItem>
            <SelectItem value="Valencia">Valencia</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Tipo de Propiedad</Label>
        <Select value={selectedPropertyType} onValueChange={onPropertyTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Residencial">Residencial</SelectItem>
            <SelectItem value="Comercial">Comercial</SelectItem>
            <SelectItem value="Industrial">Industrial</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Rango de Fechas</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(dateRange.from, "PP", { locale: es })} -{" "}
              {format(dateRange.to, "PP", { locale: es })}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange.from}
              selected={{
                from: dateRange.from,
                to: dateRange.to,
              }}
              onSelect={(selectedRange: DateRange | undefined) => {
                if (selectedRange?.from && selectedRange?.to) {
                  onDateRangeChange({
                    from: selectedRange.from,
                    to: selectedRange.to
                  });
                }
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    </Card>
  );
};

export default MarketFilters;
