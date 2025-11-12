'use client';

import { useState } from 'react';
import { servicos } from '@/lib/mock/data';
import { ServiceModal } from '@/components/tecnofrio/service-modal';
import { Eye, Printer } from 'lucide-react';

export default function SecretariaGeral() {
  const [selectedService, setSelectedService] = useState<any>(null);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Visão Geral</h1>
        <p className="text-slate-600">Todos os serviços criados e em andamento</p>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left p-4 text-slate-700 font-semibold">Código</th>
                <th className="text-left p-4 text-slate-700 font-semibold">Cliente</th>
                <th className="text-left p-4 text-slate-700 font-semibold">Tipo</th>
                <th className="text-left p-4 text-slate-700 font-semibold">Aparelho</th>
                <th className="text-left p-4 text-slate-700 font-semibold">Técnico</th>
                <th className="text-left p-4 text-slate-700 font-semibold">Data</th>
                <th className="text-left p-4 text-slate-700 font-semibold">Tags</th>
                <th className="text-left p-4 text-slate-700 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {servicos.map((service) => (
                <tr key={service.id} className="border-t border-slate-200 hover:bg-slate-50">
                  <td className="p-4 text-slate-900 font-medium">{service.codigo}</td>
                  <td className="p-4 text-slate-700">{service.cliente}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-medium">
                      {service.tipo === 'visita' ? '🏠 Visita' : '⚙️ Oficina'}
                    </span>
                  </td>
                  <td className="p-4 text-slate-700">{service.aparelho}</td>
                  <td className="p-4 text-slate-700">{service.tecnico || 'Não atribuído'}</td>
                  <td className="p-4 text-slate-600 text-sm">
                    {service.dataCriacao.toLocaleDateString('pt-PT')}
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {service.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedService(service)}
                        className="p-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
                        title="Abrir ficha"
                      >
                        <Eye className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={() => alert('Imprimir ficha (simulado)')}
                        className="p-2 bg-slate-200 hover:bg-slate-300 rounded-lg transition-colors"
                        title="Imprimir"
                      >
                        <Printer className="w-4 h-4 text-slate-700" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Serviço */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          theme="light"
        />
      )}
    </div>
  );
}
