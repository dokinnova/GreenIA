
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Bell, Lightbulb, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { getCommentStats } from '@/data/comments/queries';

export const AlertsWidget = () => {
  const { data: stats } = useQuery({
    queryKey: ['commentStats'],
    queryFn: getCommentStats,
  });

  const negativePercentage = stats ? 
    (stats.negative / (stats.positive + stats.neutral + stats.negative)) * 100 : 0;

  const hasHighNegativeRate = negativePercentage > 30;
  const hasRecentActivity = stats && (stats.positive + stats.neutral + stats.negative) > 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Alertas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {hasHighNegativeRate && (
              <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                <Badge variant="destructive">Crítico</Badge>
                <div className="text-sm">
                  Alta tasa de comentarios negativos ({negativePercentage.toFixed(1)}%)
                </div>
              </div>
            )}
            
            {hasRecentActivity && (
              <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                <Badge variant="outline">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Atención
                </Badge>
                <div className="text-sm">
                  {stats?.negative || 0} comentarios negativos necesitan revisión
                </div>
              </div>
            )}

            {!hasRecentActivity && (
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <Badge variant="default">Info</Badge>
                <div className="text-sm">
                  No hay actividad reciente que requiera atención
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Recomendaciones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {hasHighNegativeRate && (
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium mb-1">Plan de acción sugerido</h4>
                <p className="text-sm text-muted-foreground">
                  Considera realizar una revisión detallada de los comentarios negativos
                  para identificar patrones y áreas de mejora.
                </p>
              </div>
            )}

            <div className="p-3 border rounded-lg">
              <h4 className="font-medium mb-1">Mejores prácticas</h4>
              <p className="text-sm text-muted-foreground">
                Responde a los comentarios dentro de las primeras 24 horas para
                mantener un alto nivel de satisfacción del cliente.
              </p>
            </div>

            <div className="p-3 border rounded-lg">
              <h4 className="font-medium mb-1">Análisis de tendencias</h4>
              <p className="text-sm text-muted-foreground">
                {stats && stats.positive > stats.negative
                  ? "La tendencia positiva se mantiene. Continúa con las buenas prácticas."
                  : "Se recomienda implementar mejoras en la atención al cliente."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
