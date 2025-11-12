'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { isAuthenticated, getSelectedRole, canAccessRoute, getDefaultRoute } from '@/lib/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Verificar autenticação
    if (!isAuthenticated()) {
      router.push('/');
      return;
    }

    // Verificar permissão de acesso à rota
    const role = getSelectedRole();
    if (!role) {
      router.push('/');
      return;
    }

    // Verificar se o usuário pode acessar esta rota
    if (!canAccessRoute(role, pathname)) {
      const defaultRoute = getDefaultRoute(role);
      router.push(defaultRoute);
      return;
    }
  }, [pathname, router]);

  // Mostrar loading enquanto verifica
  if (!isAuthenticated()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando acesso...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
