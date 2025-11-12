'use client';

import { Sidebar } from '@/components/tecnofrio/sidebar';
import { PageLayout } from '@/components/tecnofrio/page-layout';
import { LayoutDashboard, Factory, Users, FolderOpen, Bell } from 'lucide-react';

export default function DonoLayout({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dono' },
    { icon: Factory, label: 'Oficina', path: '/dono/oficina' },
    { icon: Users, label: 'Técnicos', path: '/dono/tecnicos' },
    { icon: FolderOpen, label: 'Serviços', path: '/dono/servicos' },
    { icon: Bell, label: 'Notificações', path: '/dono/notificacoes' },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar
        items={menuItems}
        theme="dark"
        title="TECNOFRIO"
        subtitle="Painel do Dono"
      />
      <PageLayout theme="dark">{children}</PageLayout>
    </div>
  );
}
