
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitCommit } from 'lucide-react';

const TransactionTracker = () => {
  const stages = ['Interés', 'Oferta', 'Negociación', 'Contrato', 'Cierre'];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Seguimiento de Transacciones</h2>
        <p className="text-gray-600">Monitorea el progreso de todas las transacciones</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pipeline de Transacciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              {stages.map((stage, index) => (
                <div key={stage} className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <GitCommit className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-sm mt-2">{stage}</div>
                  {index < stages.length - 1 && (
                    <div className="h-0.5 w-20 bg-gray-200 absolute" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transacciones Activas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">No hay transacciones activas</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TransactionTracker;
