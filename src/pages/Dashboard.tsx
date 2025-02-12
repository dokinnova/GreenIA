
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LayoutDashboard, 
  Users, 
  Building, 
  LineChart,
  ArrowLeft,
  MessageSquare
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const dashboardItems = [
    {
      title: "Propiedades",
      description: "Gestiona todas las propiedades",
      icon: Building,
      onClick: () => {
        window.open('/properties-management', '_blank');
      }
    },
    {
      title: "Análisis predictivo de precios",
      description: "Previsión de tendencias del mercado inmobiliario",
      icon: LineChart,
      onClick: () => {
        window.open('/price-prediction', '_blank');
      }
    },
    {
      title: "Análisis de Sentimiento y Opiniones",
      description: "Analiza comentarios y reseñas de clientes para mejorar el servicio",
      icon: MessageSquare,
      onClick: () => {
        window.open('/sentiment-analysis', '_blank');
      }
    },
    {
      title: "Usuarios",
      description: "Administra los usuarios",
      icon: Users,
      onClick: () => {
        window.open('/users-management', '_blank');
      }
    },
    {
      title: "Estadísticas",
      description: "Ver análisis y reportes",
      icon: LineChart,
      onClick: () => {
        window.open('/statistics', '_blank');
      }
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <LayoutDashboard className="h-8 w-8" />
              Panel de Control
            </h1>
            <p className="text-gray-600 mt-1">
              Gestiona todos los aspectos de la plataforma
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardItems.map((item) => (
            <Card 
              key={item.title}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={item.onClick}
            >
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={item.onClick}
                >
                  Abrir en nueva ventana
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
