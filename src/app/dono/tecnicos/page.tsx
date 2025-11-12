'use client';

import { useState } from 'react';
import { tecnicos, getServicosByTecnico } from '@/lib/mock/data';
import { ServiceModal } from '@/components/tecnofrio/service-modal';

export default function DonoTecnicos() {
  const [selectedTecnico, setSelectedTecnico] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<any>(null);

  const tecnicoServices = selectedTecnico ? getServicosByTecnico(selectedTecnico) : [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Monitor de Técnicos</h1>
        <p className="text-slate-400">Acompanhamento em tempo real</p>
      </div>

      {/* Cards de Técnicos */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tecnicos.map((tec) => (
          <button
            key={tec.id}
            onClick={() => setSelectedTecnico(tec.nome)}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-amber-500 transition-all duration-300 text-left"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {tec.nome.charAt(0)}
              </div>
              <div
                className={`w-3 h-3 rounded-full ${
                  tec.online ? 'bg-green-500 animate-pulse' : 'bg-slate-600'
                }`}
              />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{tec.nome}</h3>
            <p className="text-slate-400 text-sm mb-3">
              {tec.online ? 'Online' : 'Offline'}
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Serviços ativos:</span>
                <span className="text-white font-bold">{tec.servicosAtivos}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Tempo médio:</span>
                <span className="text-white font-bold">{tec.tempoMedio}min</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Modal de Serviços do Técnico */}
      {selectedTecnico && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-slate-900 rounded-xl w-full max-w-3xl max-h-[80vh] overflow-hidden border border-slate-800">
            <div className="p-6 border-b border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedTecnico}</h2>
                  <p className="text-slate-400 mt-1">
                    {tecnicoServices.length} serviços ativos
                  </p>
                </div>
                <button
                  onClick={() => setSelectedTecnico(null)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Fechar
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {tecnicoServices.length === 0 ? (
                <p className="text-center text-slate-500 py-8">
                  Nenhum serviço ativo
                </p>
              ) : (
                <div className="space-y-3">
                  {tecnicoServices.map((service) => (
                    <div
                      key={service.id}
                      className="bg-slate-800 p-4 rounded-lg hover:bg-slate-750 transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedService(service);
                        setSelectedTecnico(null);
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-white">{service.codigo}</h3>
                          <p className="text-slate-400 text-sm mt-1">{service.cliente}</p>
                          <p className="text-slate-500 text-sm">{service.aparelho}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {service.tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
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
          theme="dark"
        />
      )}
    </div>
  );
}
