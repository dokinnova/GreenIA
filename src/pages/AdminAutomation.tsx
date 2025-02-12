import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Calendar,
  GitCommit,
  Bot,
  Bell,
  Settings,
  LayoutDashboard
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import DocumentManagement from '@/components/admin/DocumentManagement';
import VisitScheduler from '@/components/admin/VisitScheduler';
import TransactionTracker from '@/components/admin/TransactionTracker';
import AutomationCenter from '@/components/admin/AutomationCenter';

const AdminAutomation = () => {
  const [activeSection, setActiveSection] = React.useState('dashboard');

  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      value: "dashboard"
    },
    {
      label: "Gestión de Documentos",
      icon: FileText,
      value: "documents"
    },
    {
      label: "Programación de Visitas",
      icon: Calendar,
      value: "visits"
    },
    {
      label: "Seguimiento de Transacciones",
      icon: GitCommit,
      value: "transactions"
    },
    {
      label: "Automatización de Tareas",
      icon: Bot,
      value: "automation"
    },
    {
      label: "Notificaciones",
      icon: Bell,
      value: "notifications"
    },
    {
      label: "Configuración",
      icon: Settings,
      value: "settings"
    }
  ];

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

  const renderContent = () => {
    switch (activeSection) {
      case 'documents':
        return <DocumentManagement />;
      case 'visits':
        return <VisitScheduler />;
      case 'transactions':
        return <TransactionTracker />;
      case 'automation':
        return <AutomationCenter />;
      default:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat) => (
                <Card key={stat.title}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      {stat.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline justify-between">
                      <div className="text-2xl font-semibold">{stat.value}</div>
                      <div className={`text-sm font-medium ${
                        stat.trendUp ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.trend}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                  </CardContent>
                </Card>
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
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menú Principal</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.value}>
                      <SidebarMenuButton asChild>
                        <button 
                          className={`w-full flex items-center gap-2 px-2 py-1 ${
                            activeSection === item.value ? 'bg-gray-100' : ''
                          }`}
                          onClick={() => setActiveSection(item.value)}
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 p-6">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {menuItems.find(item => item.value === activeSection)?.label || 'Panel de Control'}
                </h1>
                <p className="text-gray-600">Automatización de Procesos Administrativos</p>
              </div>
              <SidebarTrigger />
            </div>

            {renderContent()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminAutomation;
