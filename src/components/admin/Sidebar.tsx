
import React from 'react';
import {
  FileText,
  Calendar,
  GitCommit,
  Bot,
  Bell,
  Settings,
  LayoutDashboard,
  LucideIcon
} from 'lucide-react';
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface MenuItem {
  label: string;
  icon: LucideIcon;
  value: string;
}

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems: MenuItem[] = [
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

const AdminSidebar = ({ activeSection, onSectionChange }: AdminSidebarProps) => {
  const navigate = useNavigate();

  return (
    <SidebarComponent>
      <SidebarContent>
        <SidebarGroup>
          <Button 
            variant="ghost" 
            className="w-full text-left px-4 py-2 hover:bg-gray-100 mb-2"
            onClick={() => navigate('/dashboard')}
          >
            Menú Principal
          </Button>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton asChild>
                    <button 
                      className={`w-full flex items-center gap-2 px-2 py-1 ${
                        activeSection === item.value ? 'bg-gray-100' : ''
                      }`}
                      onClick={() => onSectionChange(item.value)}
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
    </SidebarComponent>
  );
};

export { menuItems };
export default AdminSidebar;
