'use client';

import Sidebar from '@/components/custom/Sidebar';
import ProtectedRoute from '@/components/custom/ProtectedRoute';

export default function SecretariaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 overflow-y-auto lg:ml-72">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
