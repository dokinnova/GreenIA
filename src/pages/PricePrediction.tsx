
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
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  Home,
  Search,
  Filter,
  DollarSign,
  ChartLine,
  Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts';
import { format, subMonths } from 'date-fns';
import { es } from 'date-fns/locale';

const propertyTypes = [
  "Todos",
  "Apartamento",
  "Casa",
  "Chalet",
  "Local comercial",
  "Oficina"
];

const PricePrediction = () => {
  const navigate = useNavigate();
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
        {/* Header Section */}
        <div className="flex items-start gap-4 mb-8">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => navigate('/dashboard')}
            className="mt-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 font-heading">
              Análisis Predictivo de Precios del Mercado
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Visualiza tendencias futuras y toma decisiones informadas
            </p>
          </div>
        </div>

        {/* Filters Section */}
        <Card className="p-6 mb-8 border-none shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Search className="h-4 w-4" />
                Ubicación
              </label>
              <Select
                value={selectedLocation}
                onValueChange={setSelectedLocation}
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
                onValueChange={setSelectedPropertyType}
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

        {/* Main Content */}
        {isLoadingTrends ? (
          <Card className="p-8">