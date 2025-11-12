'use client';

import { useState } from 'react';
import { servicos, getServicosByStatus, getTempoParadoColor, tecnicos } from '@/lib/mock/data';
import { ServiceModal } from '@/components/tecnofrio/service-modal';
import { Eye, Printer, Edit, ArrowRight, UserPlus } from 'lucide-react';

export default function DonoOficina() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showAssignModal, setShowAssignModal] = useState<string | null>(null);

  const oficinaServices = servicos.filter(s => 
    s.status === 'na_oficina' || s.status === 'pedir_peca' || s.status === 'espera_peca'
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Oficina</h1>
        <p className="text-slate-400">Equipamentos em bancada</p>
      </div>

      {/* Tabela */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800">
              <tr>
                <th className="text-left p-4 text-slate-300 font-semibold">Código</th>
                <th className="text-left p-4 text-slate-300 font-semibold">Cliente</th>
                <th className="text-left p-4 text-slate-300 font-semibold">Aparelho</th>
                <th className="text-left p-4 text-slate-300 font-semibold">Técnico</th>
                <th className="text-left p-4 text-slate-300 font-semibold">Tempo Parado</th>
                <th className="text-left p-4 text-slate-300 font-semibold">Tags</th>
                <th className="text-left p-4 text-slate-300 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {oficinaServices.map((service) => (
                <tr key={service.id} className="border-t border-slate-800 hover:bg-slate-800/50">
                  <td className="p-4 text-white font-medium">{service.codigo}</td>
                  <td className="p-4 text-slate-300">{service.cliente}</td>
                  <td className="p-4 text-slate-300">{service.aparelho}</td>
                  <td className="p-4 text-slate-300">{service.tecnico || 'Não atribuído'}</td>
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
                          className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs"
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
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                        title="Abrir ficha"
                      >
                        <Eye className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={() => alert('Imprimir ficha (simulado)')}
                        className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                        title="Imprimir"
                      >
                        <Printer className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={() => setShowAssignModal(service.id)}
                        className="p-2 bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors"
                        title="Atribuir técnico"
                      >
                        <UserPlus className="w-4 h-4 text-white" />
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
          theme="dark"
        />
      )}

      {/* Modal de Atribuição */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-slate-900 rounded-xl p-6 w-full max-w-md border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-4">Atribuir Técnico</h3>
            <div className="space-y-2">
              {tecnicos.map((tec) => (
                <button
                  key={tec.id}
                  onClick={() => {
                    alert(`Técnico ${tec.nome} atribuído (simulado)`);
                    setShowAssignModal(null);
                  }}
                  className="w-full p-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-left transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">{tec.nome}</p>
                      <p className="text-slate-400 text-sm">
                        {tec.servicosAtivos} serviços ativos
                      </p>
                    </div>
                    <div
                      className={`w-3 h-3 rounded-full ${
                        tec.online ? 'bg-green-500' : 'bg-slate-600'
                      }`}
                    />
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowAssignModal(null)}
              className="w-full mt-4 p-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-white transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
