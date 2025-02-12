
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MarketFilters from '@/components/market-analysis/MarketFilters';
import MarketOverview from '@/components/market-analysis/MarketOverview';
import MarketTrends from '@/components/market-analysis/MarketTrends';
import MarketPredictions from '@/components/market-analysis/MarketPredictions';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const MarketAnalysis = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = React.useState<string>('Madrid');
  const [selectedPropertyType, setSelectedPropertyType] = React.useState<string>('Residencial');
  const [dateRange, setDateRange] = React.useState<{from: Date; to: Date}>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 12)),
    to: new Date()
  });

  const { data: metrics, isLoading: isLoadingMetrics } = useQuery({
    queryKey: ['marketMetrics', selectedLocation, selectedPropertyType],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('market_metrics')
        .select('*')
        .eq('location', selectedLocation)
        .eq('property_type', selectedPropertyType);
      
      if (error) throw error;
      return data;
    }
  });

  const { data: predictions, isLoading: isLoadingPredictions } = useQuery({
    queryKey: ['marketPredictions', selectedLocation, selectedPropertyType],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('market_predictions')
        .select('*')
        .eq('location', selectedLocation)
        .eq('property_type', selectedPropertyType);
      
      if (error) throw error;
      return data;
    }
  });

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
            <h1 className="text-3xl font-bold">
              Análisis de Mercado y Tendencias
            </h1>
            <p className="text-gray-600 mt-1">
              Analiza las tendencias del mercado inmobiliario y toma decisiones estratégicas
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <MarketFilters
              selectedLocation={selectedLocation}
              selectedPropertyType={selectedPropertyType}
              dateRange={dateRange}
              onLocationChange={setSelectedLocation}
              onPropertyTypeChange={setSelectedPropertyType}
              onDateRangeChange={setDateRange}
            />
          </div>

          <div className="lg:col-span-3 space-y-6">
            <MarketOverview 
              metrics={metrics?.[0]} 
              isLoading={isLoadingMetrics}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MarketTrends 
                metrics={metrics} 
                isLoading={isLoadingMetrics}
              />
              <MarketPredictions 
                predictions={predictions}
                isLoading={isLoadingPredictions}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysis;
