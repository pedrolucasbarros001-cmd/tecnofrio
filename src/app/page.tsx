'use client';

import { useRouter } from 'next/navigation';
import { Crown, Briefcase, Wrench } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Logo e Título */}
        <div className="text-center mb-12 animate-in fade-in duration-700">
          <div className="inline-block bg-gradient-to-br from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-2xl shadow-2xl mb-6 transform hover:scale-105 transition-transform duration-300">
            <h1 className="text-5xl font-bold tracking-tight">TECNOFRIO</h1>
          </div>
          <p className="text-xl text-slate-600 font-medium">
            Central de Comando Operacional
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Sistema de Gestão de Assistências Técnicas
          </p>
        </div>

        {/* Botões de Seleção */}
        <div className="grid md:grid-cols-3 gap-6 animate-in slide-in-from-bottom duration-700">
          {/* Dono */}
          <button
            onClick={() => router.push('/dono')}
            className="group relative bg-gradient-to-br from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-slate-700"
          >
            <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity">
              <Crown className="w-16 h-16" />
            </div>
            <div className="relative z-10">
              <Crown className="w-12 h-12 mb-4 text-amber-400" />
              <h2 className="text-2xl font-bold mb-2">Sou Dono</h2>
              <p className="text-sm text-slate-300">
                Painel administrativo completo
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          {/* Secretária */}
          <button
            onClick={() => router.push('/secretaria')}
            className="group relative bg-white hover:bg-slate-50 text-slate-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-cyan-200"
          >
            <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Briefcase className="w-16 h-16" />
            </div>
            <div className="relative z-10">
              <Briefcase className="w-12 h-12 mb-4 text-cyan-600" />
              <h2 className="text-2xl font-bold mb-2">Sou Secretária</h2>
              <p className="text-sm text-slate-600">
                Gestão de serviços e atendimento
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          {/* Técnico */}
          <button
            onClick={() => router.push('/tecnico')}
            className="group relative bg-gradient-to-br from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity">
              <Wrench className="w-16 h-16" />
            </div>
            <div className="relative z-10">
              <Wrench className="w-12 h-12 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Sou Técnico</h2>
              <p className="text-sm text-blue-100">
                Minhas atribuições e oficina
              </p>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-slate-500">
          <p>Versão Demo • Sistema Simulado Premium</p>
        </div>
      </div>
    </div>
  );
}
