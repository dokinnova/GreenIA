
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Plus } from 'lucide-react';

const VisitScheduler = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Programación de Visitas</h2>
          <p className="text-gray-600">Gestiona y programa visitas a propiedades</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Visita
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Calendario</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] flex items-center justify-center">
                <CalendarIcon className="h-12 w-12 text-gray-400" />
                <p className="ml-4 text-gray-600">Calendario en desarrollo</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Próximas Visitas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">No hay visitas programadas</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VisitScheduler;
