
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  trend: string;
  trendUp: boolean;
}

const StatCard = ({ title, value, description, trend, trendUp }: StatCardProps) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium text-gray-500">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-baseline justify-between">
        <div className="text-2xl font-semibold">{value}</div>
        <div className={`text-sm font-medium ${
          trendUp ? 'text-green-600' : 'text-red-600'
        }`}>
          {trend}
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </CardContent>
  </Card>
);

const stats = [
  {
    title: "Documentos Procesados",
    value: "124",
    description: "Último mes",
    trend: "+15%",
    trendUp: true
  },
  {
    title: "Visitas Programadas",
    value: "45",
    description: "Próximos 7 días",
    trend: "+23%",
    trendUp: true
  },
  {
    title: "Transacciones en Curso",
    value: "32",
    description: "Actualmente",
    trend: "-5%",
    trendUp: false
  },
  {
    title: "Tareas Automatizadas",
    value: "287",
    description: "Este mes",
    trend: "+34%",
    trendUp: true
  }
];

const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <Tabs defaultValue="tasks" className="w-full">
        <TabsList>
          <TabsTrigger value="tasks">Tareas Pendientes</TabsTrigger>
          <TabsTrigger value="calendar">Calendario</TabsTrigger>
          <TabsTrigger value="automation">Automatizaciones Activas</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Tareas Pendientes</CardTitle>
              <CardDescription>
                Lista de tareas que requieren atención
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Aquí irá el contenido de las tareas */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Calendario de Actividades</CardTitle>
              <CardDescription>
                Vista general de eventos programados
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Aquí irá el calendario */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation">
          <Card>
            <CardHeader>
              <CardTitle>Automatizaciones Activas</CardTitle>
              <CardDescription>
                Flujos de trabajo automatizados en ejecución
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Aquí irán las automatizaciones activas */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Dashboard;
