
import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { PriceTrend } from '@/data/price-prediction/types';

interface TrendSummaryProps {
  trend: PriceTrend;
  isPositiveTrend: boolean;
}

export const TrendSummary = ({ trend, isPositiveTrend }: TrendSummaryProps) => {
  // Calculamos si es positivo basándonos en el porcentaje de cambio de precio
  const isMarketGrowing = trend?.price_change_percentage > 0;

  return (
    <Card className="p-6 lg:col-span-1">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <TrendingUp className="h-5 w-5" />
        Resumen de Tendencias
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm text-gray-600">Variación Anual</span>
          <span className={`font-semibold ${isMarketGrowing ? 'text-green-600' : 'text-red-600'}`}>
            {isMarketGrowing ? '+' : ''}{trend?.price_change_percentage.toFixed(2)}%
          </span>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm text-gray-600">Precio Medio Actual</span>
          <span className="font-semibold">
            {trend?.average_price.toFixed(2)}€/m²
          </span>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            {isMarketGrowing ? (
              <TrendingUp className="h-5 w-5 text-green-600" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-600" />
            )}
            <span className="font-medium">
              {isMarketGrowing ? 'Mercado en Crecimiento' : 'Mercado en Descenso'}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            {isMarketGrowing
              ? 'Los precios muestran una tendencia alcista. Considera invertir pronto.'
              : 'Los precios están bajando. Podría ser un buen momento para comprar.'}
          </p>
        </div>
      </div>
    </Card>
  );
};
