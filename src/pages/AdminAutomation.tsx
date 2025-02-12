
import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar, { menuItems } from '@/components/admin/Sidebar';
import Dashboard from '@/components/admin/Dashboard';
import DocumentManagement from '@/components/admin/DocumentManagement';
import VisitScheduler from '@/components/admin/VisitScheduler';
import TransactionTracker from '@/components/admin/TransactionTracker';
import AutomationCenter from '@/components/admin/AutomationCenter';

const AdminAutomation = () => {
  const [activeSection, setActiveSection] = React.useState('dashboard');

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
