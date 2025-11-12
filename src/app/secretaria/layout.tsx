'use client';

import { Sidebar } from '@/components/tecnofrio/sidebar';
import { PageLayout } from '@/components/tecnofrio/page-layout';
import { Home as HomeIcon, PlusCircle, Factory, Truck, CreditCard, Users } from 'lucide-react';

export default function SecretariaLayout({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { icon: HomeIcon, label: 'Geral', path: '/secretaria' },
    { icon: PlusCircle, label: 'Criar Serviço', path: '/secretaria/criar-servico' },
    { icon: Factory, label: 'Oficina', path: '/secretaria/oficina' },
    { icon: Truck, label: 'Entregas', path: '/secretaria/entregas' },
    { icon: CreditCard, label: 'Em Débito', path: '/secretaria/em-debito' },
    { icon: Users, label: 'Técnicos', path: '/secretaria/tecnicos' },
  ];

  return (
    <>
      <Sidebar
        items={menuItems}
        theme="light"
        title="TECNOFRIO"
        subtitle="Painel da Secretária"
      />
      <PageLayout theme="light">{children}</PageLayout>
    </>
  );
}
