
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, PlayCircle, PauseCircle } from 'lucide-react';

const AutomationCenter = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Centro de Automatización</h2>
          <p className="text-gray-600">Configura y gestiona automatizaciones</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Automatización
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Asignación Automática</CardTitle>
                <CardDescription>Asigna leads a agentes</CardDescription>
              </div>
              <Button variant="ghost" size="icon">
                <PlayCircle className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600">
              Asigna automáticamente nuevos leads a los agentes disponibles
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Recordatorios de Visitas</CardTitle>
                <CardDescription>Envía recordatorios automáticos</CardDescription>
              </div>
              <Button variant="ghost" size="icon">
                <PauseCircle className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600">
              Envía recordatorios por email 24h antes de cada visita
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AutomationCenter;
