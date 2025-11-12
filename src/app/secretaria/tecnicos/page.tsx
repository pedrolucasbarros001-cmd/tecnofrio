'use client';

import { useState } from 'react';
import { tecnicos, getServicosByTecnico } from '@/lib/mock/data';
import { ServiceModal } from '@/components/tecnofrio/service-modal';
import { Eye, X } from 'lucide-react';

export default function SecretariaTecnicosPage() {
  const [selectedTecnico, setSelectedTecnico] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<any>(null);

  const tecnicoServicos = selectedTecnico ? getServicosByTecnico(selectedTecnico) : [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">🧠 Monitor de Técnicos</h1>
        <p className="text-slate-600">Visualização do estado dos técnicos (somente leitura)</p>
      </div>

      {/* Grid de Técnicos */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {tecnicos.map((tecnico) => (
          <button
            key={tecnico.id}
            onClick={() => setSelectedTecnico(tecnico.nome)}
            className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all text-left"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                <span className="text-xl">👤</span>
              </div>
              <span className={`w-3 h-3 rounded-full ${tecnico.online ? 'bg-green-500' : 'bg-slate-400'}`} />
            </div>
            <h3 className="font-bold text-slate-900 mb-1">{tecnico.nome}</h3>
            <p className="text-sm text-slate-600 mb-3">
              {tecnico.online ? '🟢 Online' : '⚫ Offline'}
            </p>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Serviços ativos:</span>
                <span className="font-semibold text-slate-900">{tecnico.servicosAtivos}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Tempo médio:</span>
                <span className="font-semibold text-slate-900">{tecnico.tempoMedio}min</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Modal de Serviços do Técnico */}
      {selectedTecnico && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h3 className="text-xl font-bold text-slate-900">
                Serviços de {selectedTecnico}
              </h3>
              <button
                onClick={() => setSelectedTecnico(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {tecnicoServicos.length > 0 ? (
                <div className="space-y-3">
                  {tecnicoServicos.map((service) => (
                    <div
                      key={service.id}
                      className="bg-slate-50 border border-slate-200 rounded-lg p-4 hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-bold text-slate-900">{service.codigo}</span>
                            <span className="px-2 py-1 bg-cyan-100 text-cyan-700 rounded text-xs">
                              {service.tipo === 'visita' ? '🏠 Visita' : '⚙️ Oficina'}
                            </span>
                          </div>
                          <p className="text-slate-700 font-medium">{service.cliente}</p>
                          <p className="text-slate-600 text-sm">{service.aparelho}</p>
                        </div>
                        <button
                          onClick={() => setSelectedService(service)}
                          className="p-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
                          title="Abrir ficha"
                        >
                          <Eye className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500">
                  <p>Nenhum serviço ativo</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
