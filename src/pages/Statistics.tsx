
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, LineChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer, LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Statistics = () => {
  const navigate = useNavigate();

  const data = [
    { month: 'Ene', properties: 12 },
    { month: 'Feb', properties: 15 },
    { month: 'Mar', properties: 18 },
    { month: 'Abr', properties: 22 },
    { month: 'May', properties: 25 },
    { month: 'Jun', properties: 28 },
  ];

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
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <LineChart className="h-8 w-8" />
              Estadísticas
            </h1>
            <p className="text-gray-600 mt-1">
              Análisis y reportes de la plataforma
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Propiedades Listadas por Mes</h2>
            <div style={{ width: '100%', height: 400 }}>
              <ResponsiveContainer>
                <RechartsLineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="month"
                    tick={{ fill: 'currentColor' }}
                  />
                  <YAxis 
                    tick={{ fill: 'currentColor' }}
                    label={{ 
                      value: 'Número de propiedades', 
                      angle: -90, 
                      position: 'insideLeft',
                      fill: 'currentColor'
                    }}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="properties"
                    name="Propiedades"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-2">Total de Propiedades</h3>
              <p className="text-3xl font-bold text-primary">120</p>
            </Card>
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-2">Precio Medio</h3>
              <p className="text-3xl font-bold text-primary">250.000 €</p>
            </Card>
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-2">Propiedades Nuevas (Este Mes)</h3>
              <p className="text-3xl font-bold text-primary">28</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
