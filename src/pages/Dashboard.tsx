
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LayoutDashboard, 
  Users, 
  Building, 
  LineChart,
  ArrowLeft,
  MessageSquare,
  TrendingUp,
  Router
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const dashboardItems = [
    {
      title: "Propiedades",
      description: "Gestiona todas las propiedades",
      icon: Building,
      onClick: () => navigate('/properties-management'),
      bgColor: "bg-[#D3E4FD]"
    },
    {
      title: "Automatización de Procesos Administrativos",
      description: "Gestión de documentos, visitas y seguimiento de transacciones",
      icon: Router,
      onClick: () => navigate('/admin-automation'),
      bgColor: "bg-[#F2FCE2]"
    },
    {
      title: "Análisis predictivo de precios",
      description: "Previsión de tendencias del mercado inmobiliario",
      icon: LineChart,
      onClick: () => navigate('/price-prediction'),
      bgColor: "bg-[#F2FCE2]"
    },
    {
      title: "Análisis de Mercado y Tendencias",
      description: "Analiza las tendencias y métricas clave del mercado",
      icon: TrendingUp,
      onClick: () => navigate('/market-analysis'),
      bgColor: "bg-[#D6BCFA]"
    },
    {
      title: "Análisis de Sentimiento y Opiniones",
      description: "Analiza comentarios y reseñas de clientes para mejorar el servicio",
      icon: MessageSquare,
      onClick: () => navigate('/sentiment-analysis'),
      bgColor: "bg-[#F2FCE2]"
    },
    {
      title: "Usuarios",
      description: "Administra los usuarios",
      icon: Users,
      onClick: () => navigate('/users-management'),
      bgColor: "bg-[#D3E4FD]"
    },
    {
      title: "Estadísticas",
      description: "Ver análisis y reportes",
      icon: LineChart,
      onClick: () => navigate('/statistics'),
      bgColor: "bg-[#F2FCE2]"
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
            className="bg-white hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2 text-[#1A1F2C]">
              <div className="p-2 rounded-lg bg-[#9b87f5] bg-opacity-10">
                <LayoutDashboard className="h-8 w-8 text-[#9b87f5]" />
              </div>
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
              className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden"
              onClick={item.onClick}
            >
              <CardHeader className="flex flex-row items-center gap-4 relative">
                <div className={`p-3 rounded-lg ${item.bgColor} bg-opacity-50`}>
                  <item.icon className="h-6 w-6 text-[#1A1F2C]" />
                </div>
                <div>
                  <CardTitle className="text-[#1A1F2C]">{item.title}</CardTitle>
                  <CardDescription className="text-gray-600">{item.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <Button 
                  className="w-full bg-white hover:bg-gray-50 text-[#1A1F2C] border-[#9b87f5] hover:border-[#D6BCFA] transition-colors"
                  variant="outline"
                  onClick={item.onClick}
                >
                  Ver sección
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
