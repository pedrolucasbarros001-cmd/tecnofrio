'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { USER_ROLES } from '@/lib/constants';
import type { UserRole } from '@/lib/types';

export default function RoleSelectionPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    // Salvar role na sessão (localStorage temporário até implementar auth real)
    localStorage.setItem('selectedRole', role);
    
    // Redirecionar para autenticação
    setTimeout(() => {
      router.push('/auth');
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-lg">
            <span className="text-4xl">❄️</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            TECNOFRIO
          </h1>
          <p className="text-lg text-gray-600">
            Sistema de Gestão de Assistências Técnicas
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {(Object.keys(USER_ROLES) as UserRole[]).map((role) => {
            const config = USER_ROLES[role];
            const isSelected = selectedRole === role;
            
            return (
              <button
                key={role}
                onClick={() => handleRoleSelect(role)}
                className={`
                  group relative overflow-hidden rounded-2xl p-8 text-center
                  transition-all duration-300 transform hover:scale-105
                  ${isSelected 
                    ? 'ring-4 ring-blue-500 shadow-2xl scale-105' 
                    : 'hover:shadow-xl'
                  }
                  bg-white border-2 border-gray-200
                `}
              >
                {/* Gradient Background on Hover */}
                <div className={`
                  absolute inset-0 bg-gradient-to-br ${config.color} opacity-0 
                  group-hover:opacity-10 transition-opacity duration-300
                `} />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {config.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Sou {config.label}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {config.description}
                  </p>
                </div>

                {/* Selected Indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="text-center text-sm text-gray-500">
          <p>Selecione seu perfil para continuar</p>
          <p className="mt-2">
            👑 Autor: <span className="font-semibold text-gray-700">Pedro Lucas</span> – Consultor Estrategista Digital
          </p>
        </div>
      </div>
    </div>
  );
}
