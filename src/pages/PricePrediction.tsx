
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPriceTrends, getLocations } from '@/data/price-prediction/queries';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts';
import { format, subMonths } from 'date-fns';
import { es } from 'date-fns/locale';

const PricePrediction = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const endDate = new Date();
  const startDate = subMonths(endDate, 12); // Último año

  const { data: locations = [], isLoading: isLoadingLocations } = useQuery({
    queryKey: ['locations'],
    queryFn: getLocations
  });

  const { data: trends = [], isLoading: isLoadingTrends } = useQuery({
    queryKey: ['price-trends', selectedLocation],
    queryFn: () => getPriceTrends(selectedLocation, startDate, endDate),
    enabled: !!selectedLocation
  });

  const chartData = trends.map(trend => ({
    ...trend,
    date: format(new Date(trend.date_group), 'MMM yyyy', { locale: es }),
    precio_medio: Number(trend.average_price.toFixed(2))
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Análisis Predictivo de Precios</h1>
            <p className="text-gray-600 mt-1">
              Analiza las tendencias de precios por ubicación
            </p>
          </div>
        </div>

        <Card className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selecciona una ubicación
            </label>
            <Select
              value={selectedLocation}
              onValueChange={setSelectedLocation}
            >
              <SelectTrigger className="w-full max-w-xs">
                <SelectValue placeholder="Selecciona una ubicación" />
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

          {isLoadingTrends ? (
            <div className="text-center py-12">Cargando datos...</div>
          ) : selectedLocation && trends.length > 0 ? (
            <div className="space-y-6">
              <div className="h-[400px]">
                <ChartContainer
                  config={{
                    price: {
                      theme: {
                        light: "hsl(var(--primary))",
                        dark: "hsl(var(--primary))",
                      },
                    },
                  }}
                >
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date"
                      tick={{ fill: 'hsl(var(--foreground))' }}
                    />
                    <YAxis 
                      tick={{ fill: 'hsl(var(--foreground))' }}
                      label={{ 
                        value: 'Precio medio (€/m²)', 
                        angle: -90, 
                        position: 'insideLeft',
                        fill: 'hsl(var(--foreground))'
                      }}
                    />
                    <ChartTooltip />
                    <Line
                      type="monotone"
                      dataKey="precio_medio"
                      name="Precio medio"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ChartContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-2">Precio Medio Actual</h3>
                  <p className="text-3xl font-bold text-primary">
                    {trends[trends.length - 1]?.average_price.toFixed(2)} €/m²
                  </p>
                </Card>
                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-2">Variación Anual</h3>
                  <p className={`text-3xl font-bold ${
                    trends[0]?.price_change_percentage > 0 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {trends[0]?.price_change_percentage.toFixed(2)}%
                  </p>
                </Card>
              </div>
            </div>
          ) : selectedLocation ? (
            <div className="text-center py-12 text-gray-500">
              No hay datos suficientes para esta ubicación
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              Selecciona una ubicación para ver las tendencias de precios
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default PricePrediction;
