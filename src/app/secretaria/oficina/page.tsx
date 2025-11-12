'use client';

import { useState } from 'react';
import { getServicosByStatus, getTempoParadoColor } from '@/lib/mock/data';
import { ServiceModal } from '@/components/tecnofrio/service-modal';
import { Eye, Printer } from 'lucide-react';

export default function SecretariaOficinaPage() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const servicosOficina = getServicosByStatus('na_oficina');

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">🏭 Oficina</h1>
        <p className="text-slate-600">Equipamentos em reparação na oficina (visualização)</p>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left p-4 text-slate-700 font-semibold">Código</th>
                <th className="text-left p-4 text-slate-700 font-semibold">Cliente</th>
                <th className="text-left p-4 text-slate-700 font-semibold">Aparelho</th>
                <th className="text-left p-4 text-slate-700 font-semibold">Técnico</th>
                <th className="text-left p-4 text-slate-700 font-semibold">Tempo Parado</th>
                <th className="text-left p-4 text-slate-700 font-semibold">Tags</th>
                <th className="text-left p-4 text-slate-700 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {servicosOficina.map((service) => (
                <tr key={service.id} className="border-t border-slate-200 hover:bg-slate-50">
                  <td className="p-4 text-slate-900 font-medium">{service.codigo}</td>
                  <td className="p-4 text-slate-700">{service.cliente}</td>
                  <td className="p-4 text-slate-700">{service.aparelho}</td>
                  <td className="p-4 text-slate-700">{service.tecnico || 'Não atribuído'}</td>
                  <td className="p-4">
                    <span className={`font-bold ${getTempoParadoColor(service.tempoParado)}`}>
                      {service.tempoParado ? `${service.tempoParado}d` : '-'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {service.tags.map((tag) => (
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
          readOnly
        />
      )}
    </div>
  );
}
