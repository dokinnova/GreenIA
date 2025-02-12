
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Bell, Lightbulb } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const AlertsWidget = () => {
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
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
              <Badge variant="destructive">Crítico</Badge>
              <div className="text-sm">
                Incremento de comentarios negativos en la zona de Madrid
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
              <Badge variant="outline">Atención</Badge>
              <div className="text-sm">
                3 comentarios sin responder en las últimas 24h
              </div>
            </div>
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
            <div className="p-3 border rounded-lg">
              <h4 className="font-medium mb-1">Mejora en la comunicación</h4>
              <p className="text-sm text-muted-foreground">
                Considera implementar un sistema de respuesta automática para los comentarios iniciales.
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-medium mb-1">Análisis de tendencias</h4>
              <p className="text-sm text-muted-foreground">
                Los comentarios positivos han aumentado un 15% este mes. Mantén las mejoras implementadas.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
