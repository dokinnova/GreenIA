
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileUp, Search, Tag } from 'lucide-react';

const DocumentManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gestión de Documentos</h2>
          <p className="text-gray-600">Administra y organiza todos los documentos</p>
        </div>
        <Button>
          <FileUp className="mr-2 h-4 w-4" />
          Subir Documento
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Buscar documentos..." className="pl-8" />
          </div>
        </div>
        <Button variant="outline">
          <Tag className="mr-2 h-4 w-4" />
          Filtros
        </Button>
      </div>

      <div className="grid gap-4">
        {/* Aquí irá la lista de documentos */}
        <Card>
          <CardHeader>
            <CardTitle>Documentos Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">No hay documentos para mostrar</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentManagement;
