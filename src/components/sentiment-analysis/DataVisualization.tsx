
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ChartBar, PieChart, LineChart } from 'lucide-react';
import { ChartContainer, ChartLegend } from '@/components/ui/chart';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart as RePieChart,
  Pie,
  Line,
  LineChart as ReLineChart,
  CartesianGrid
} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { getCommentStats, getCommentTrends } from '@/data/comments/queries';

const COLORS = {
  positive: '#22c55e',
  neutral: '#94a3b8',
  negative: '#ef4444'
};

export const DataVisualization = () => {
  const { data: stats, isLoading: isStatsLoading } = useQuery({
    queryKey: ['commentStats'],
    queryFn: getCommentStats,
  });

  const { data: trends, isLoading: isTrendsLoading } = useQuery({
    queryKey: ['commentTrends'],
    queryFn: getCommentTrends,
  });

  const chartData = stats ? [
    { name: 'Positivo', value: stats.positive, color: COLORS.positive },
    { name: 'Neutro', value: stats.neutral, color: COLORS.neutral },
    { name: 'Negativo', value: stats.negative, color: COLORS.negative },
  ] : [];

  const trendData = trends || [];

  if (isStatsLoading || isTrendsLoading) {
    return (
      <Card className="mb-6">
        <CardContent className="p-8 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow-sm">
          <p className="text-sm">{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

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
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value">
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="pie" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </RePieChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="line" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ReLineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="positive"
                  stroke={COLORS.positive}
                  name="Positivos"
                />
                <Line
                  type="monotone"
                  dataKey="neutral"
                  stroke={COLORS.neutral}
                  name="Neutros"
                />
                <Line
                  type="monotone"
                  dataKey="negative"
                  stroke={COLORS.negative}
                  name="Negativos"
                />
              </ReLineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
