
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp, 
  Timer, 
  BarChart2, 
  Search,
  Loader2
} from 'lucide-react';

interface MarketOverviewProps {
  metrics: any;
  isLoading: boolean;
}

const MarketOverview = ({ metrics, isLoading }: MarketOverviewProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!metrics) return null;

  const stats = [
    {
      title: "Precio Medio",
      value: `${metrics.average_price.toLocaleString()}€`,
      icon: TrendingUp,
      description: "Precio medio actual",
    },
    {
      title: "Días en Mercado",
      value: metrics.days_on_market,
      icon: Timer,
      description: "Promedio de días hasta venta",
    },
    {
      title: "Índice de Demanda",
      value: metrics.demand_index.toFixed(1),
      icon: BarChart2,
      description: "Sobre 10",
    },
    {
      title: "Volumen de Búsquedas",
      value: metrics.search_volume.toLocaleString(),
      icon: Search,
      description: "Últimos 30 días",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MarketOverview;
