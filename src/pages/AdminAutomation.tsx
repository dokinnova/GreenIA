
import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar, { menuItems } from '@/components/admin/Sidebar';
import Dashboard from '@/components/admin/Dashboard';
import DocumentManagement from '@/components/admin/DocumentManagement';
import VisitScheduler from '@/components/admin/VisitScheduler';
import TransactionTracker from '@/components/admin/TransactionTracker';
import AutomationCenter from '@/components/admin/AutomationCenter';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const AdminAutomation = () => {
  const [activeSection, setActiveSection] = React.useState('dashboard');
  const navigate = useNavigate();

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
        return <Dashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />

        <main className="flex-1 p-6">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => navigate('/dashboard')}
                  className="hover:bg-gray-100"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {menuItems.find(item => item.value === activeSection)?.label || 'Panel de Control'}
                  </h1>
                  <p className="text-gray-600">Automatización de Procesos Administrativos</p>
                </div>
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
