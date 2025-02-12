
import React from 'react';
import { Card } from '@/components/ui/card';
import { ChartLine } from 'lucide-react';
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ChartTooltip } from '@/components/ui/chart';

interface PriceChartProps {
  data: Array<{
    date: string;
    precio_medio: number;
  }>;
}

export const PriceChart = ({ data }: PriceChartProps) => {
  return (
    <Card className="p-6 lg:col-span-2">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <ChartLine className="h-5 w-5" />
        Evolución de Precios
      </h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
            <XAxis 
              dataKey="date" 
              className="text-xs"
              tick={{ fill: '#666' }}
            />
            <YAxis 
              className="text-xs"
              tick={{ fill: '#666' }}
              tickFormatter={(value) => `${value}€`}
            />
            <ChartTooltip />
            <Line
              type="monotone"
              dataKey="precio_medio"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{ fill: '#2563eb', r: 4 }}
              activeDot={{ r: 6 }}
              name="Precio medio"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
