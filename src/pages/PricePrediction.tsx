
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPriceTrends, getLocations } from '@/data/price-prediction/queries';
import { Card } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { format, subMonths } from 'date-fns';
import { es } from 'date-fns/locale';
import { Header } from '@/components/price-prediction/Header';
import { Filters } from '@/components/price-prediction/Filters';
import { TrendSummary } from '@/components/price-prediction/TrendSummary';
import { PriceChart } from '@/components/price-prediction/PriceChart';

const propertyTypes = [
  "Todos",
  "Apartamento",
  "Casa",
  "Chalet",
  "Local comercial",
  "Oficina"
];

const PricePrediction = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>('Todos');
  const endDate = new Date();
  const startDate = subMonths(endDate, 12);

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

  const isPositiveTrend = trends[0]?.price_change_percentage > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto py-8 px-4">
        <Header />

        <Filters 
          selectedLocation={selectedLocation}
          selectedPropertyType={selectedPropertyType}
          locations={locations}
          propertyTypes={propertyTypes}
          onLocationChange={setSelectedLocation}
          onPropertyTypeChange={setSelectedPropertyType}
        />

        {/* Main Content */}
        {isLoadingTrends ? (
          <Card className="p-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          </Card>
        ) : !selectedLocation ? (
          <Card className="p-8">
            <div className="text-center text-gray-500">
              <Search className="h-12 w-12 mx-auto mb-4" />
              <p>Selecciona una ubicación para ver el análisis de precios</p>
            </div>
          </Card>
        ) : (
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
            <TrendSummary trend={trends[0]} isPositiveTrend={isPositiveTrend} />
            <PriceChart data={chartData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PricePrediction;
