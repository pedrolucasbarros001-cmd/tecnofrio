'use client';

import { Sidebar } from '@/components/tecnofrio/sidebar';
import { PageLayout } from '@/components/tecnofrio/page-layout';
import { ClipboardList, Factory, Bell } from 'lucide-react';

export default function TecnicoLayout({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { icon: ClipboardList, label: 'Serviços', path: '/tecnico' },
    { icon: Factory, label: 'Oficina', path: '/tecnico/oficina' },
    { icon: Bell, label: 'Notificações', path: '/tecnico/notificacoes' },
  ];

  return (
    <>
      <Sidebar
        items={menuItems}
        theme="dark"
        title="TECNOFRIO"
        subtitle="Painel do Técnico"
      />
      <PageLayout theme="dark">{children}</PageLayout>
    </>
  );
}
