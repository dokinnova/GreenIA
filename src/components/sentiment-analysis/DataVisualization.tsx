
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ChartBar, PieChart, LineChart } from 'lucide-react';
import { ChartContainer, ChartLegend } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const mockData = [
  { name: 'Positivo', value: 65, color: '#22c55e' },
  { name: 'Neutro', value: 25, color: '#94a3b8' },
  { name: 'Negativo', value: 10, color: '#ef4444' },
];

export const DataVisualization = () => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Análisis de Sentimiento</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bar">
          <TabsList className="mb-4">
            <TabsTrigger value="bar" className="flex items-center gap-2">
              <ChartBar className="h-4 w-4" />
              Barras
            </TabsTrigger>
            <TabsTrigger value="pie" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              Circular
            </TabsTrigger>
            <TabsTrigger value="line" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              Tendencia
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bar" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value">
                  {mockData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          {/* Otros tipos de gráficos se implementarán aquí */}
          <TabsContent value="pie">
            <div className="h-[300px] flex items-center justify-center">
              Gráfico circular (próximamente)
            </div>
          </TabsContent>

          <TabsContent value="line">
            <div className="h-[300px] flex items-center justify-center">
              Gráfico de tendencia (próximamente)
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
