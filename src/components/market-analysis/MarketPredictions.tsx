
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2 } from 'lucide-react';

interface MarketPredictionsProps {
  predictions: any[];
  isLoading: boolean;
}

const MarketPredictions = ({ predictions, isLoading }: MarketPredictionsProps) => {
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

  if (!predictions?.length) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Predicciones de Mercado</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={predictions}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="prediction_date" 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => new Date(value).toLocaleDateString('es-ES', { month: 'short' })}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k€`}
              />
              <Tooltip 
                formatter={(value: number) => [`${value.toLocaleString()}€`, 'Precio Predicho']}
                labelFormatter={(label) => new Date(label).toLocaleDateString('es-ES', { 
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              />
              <Line 
                type="monotone" 
                dataKey="predicted_price" 
                stroke="#22c55e"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketPredictions;
