'use client';

import { useState } from 'react';
import { servicos, getServicosByStatus, getStatusLabel, ServiceStatus } from '@/lib/mock/data';
import { ServiceModal } from '@/components/tecnofrio/service-modal';

export default function DonoDashboard() {
  const [selectedStatus, setSelectedStatus] = useState<ServiceStatus | null>(null);
  const [selectedService, setSelectedService] = useState<any>(null);

  const statusCards: Array<{ status: ServiceStatus; icon: string; color: string }> = [
    { status: 'por_fazer', icon: '📋', color: 'from-blue-500 to-blue-600' },
    { status: 'em_execucao', icon: '🔧', color: 'from-orange-500 to-orange-600' },
    { status: 'na_oficina', icon: '🏭', color: 'from-purple-500 to-purple-600' },
    { status: 'pedir_peca', icon: '📦', color: 'from-red-500 to-red-600' },
    { status: 'espera_peca', icon: '⏳', color: 'from-yellow-500 to-yellow-600' },
    { status: 'a_precificar', icon: '💰', color: 'from-green-500 to-green-600' },
    { status: 'entregas', icon: '🚚', color: 'from-indigo-500 to-indigo-600' },
    { status: 'em_debito', icon: '🧾', color: 'from-pink-500 to-pink-600' },
    { status: 'pago', icon: '✅', color: 'from-emerald-500 to-emerald-600' },
    { status: 'finalizado', icon: '🏁', color: 'from-slate-500 to-slate-600' },
  ];

  const handleCardClick = (status: ServiceStatus) => {
    setSelectedStatus(status);
  };

  const filteredServices = selectedStatus ? getServicosByStatus(selectedStatus) : [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-slate-400">Visão geral de todos os serviços</p>
      </div>

      {/* Status Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {statusCards.map((card) => {
          const count = getServicosByStatus(card.status).length;
          return (
            <button
              key={card.status}
              onClick={() => handleCardClick(card.status)}
              className={`bg-gradient-to-br ${card.color} p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-white`}
            >
              <div className="text-4xl mb-2">{card.icon}</div>
              <div className="text-3xl font-bold mb-1">{count}</div>
              <div className="text-sm opacity-90">{getStatusLabel(card.status)}</div>
            </button>
          );
        })}
      </div>

      {/* Lista Filtrada */}
      {selectedStatus && (
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">
              {getStatusLabel(selectedStatus)}
            </h2>
            <button
              onClick={() => setSelectedStatus(null)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              Fechar
            </button>
          </div>

          {filteredServices.length === 0 ? (
            <p className="text-center text-slate-500 py-8">Nenhum serviço neste estado</p>
          ) : (
            <div className="space-y-3">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-slate-800 p-4 rounded-lg hover:bg-slate-750 transition-colors cursor-pointer"
                  onClick={() => setSelectedService(service)}
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
                  {service.tecnico && (
                    <div className="mt-2 text-sm text-slate-400">
                      Técnico: {service.tecnico}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
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
