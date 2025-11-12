'use client';

import { useState } from 'react';
import { getServicosByStatus } from '@/lib/mock/data';
import { Package, Calendar, CheckCircle, X } from 'lucide-react';

export default function SecretariaEntregasPage() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'levanta' | 'entrega' | 'pago' | null>(null);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [entregaData, setEntregaData] = useState({ tecnico: '', data: '', turno: 'manha' });

  const servicosEntrega = getServicosByStatus('entregas');

  const handleAction = (service: any, type: 'levanta' | 'entrega' | 'pago') => {
    setSelectedService(service);
    setModalType(type);
    setShowModal(true);
  };

  const handleConfirm = () => {
    if (modalType === 'levanta') {
      alert(`${selectedService.codigo} marcado para levantamento em loja`);
    } else if (modalType === 'entrega') {
      alert(`Entrega agendada para ${entregaData.data} (${entregaData.turno})`);
    } else if (modalType === 'pago') {
      alert(`${selectedService.codigo} marcado como pago`);
    }
    setShowModal(false);
    setModalType(null);
    setSelectedService(null);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">🚚 Entregas</h1>
        <p className="text-slate-600">Gestão de entregas e levantamentos</p>
      </div>

      {/* Lista de Entregas */}
      <div className="space-y-4">
        {servicosEntrega.map((service) => (
          <div
            key={service.id}
            className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-lg font-bold text-slate-900">{service.codigo}</span>
                  <div className="flex gap-1">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-slate-700 font-medium mb-1">{service.cliente}</p>
                <p className="text-slate-600 text-sm">{service.aparelho} - {service.marca}</p>
                {service.dataAgendada && (
                  <div className="flex items-center gap-2 mt-2 text-sm text-slate-600">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {service.dataAgendada.toLocaleDateString('pt-PT')} - 
                      {service.turno === 'manha' ? ' 🌅 Manhã' : ' 🌆 Tarde'}
                    </span>
                  </div>
                )}
                {service.tecnico && (
                  <p className="text-sm text-slate-600 mt-1">
                    Técnico: <span className="font-medium">{service.tecnico}</span>
                  </p>
                )}
              </div>

              {/* Ações */}
              <div className="flex flex-col gap-2 md:w-48">
                <button
                  onClick={() => handleAction(service, 'levanta')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  📦 Vai Levantar
                </button>
                <button
                  onClick={() => handleAction(service, 'entrega')}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  🚚 Solicitar Entrega
                </button>
                <button
                  onClick={() => handleAction(service, 'pago')}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  ✅ Marcar Pago
                </button>
              </div>
            </div>
          </div>
        ))}

        {servicosEntrega.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Nenhuma entrega pendente</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-900">
                {modalType === 'levanta' && '📦 Levantamento em Loja'}
                {modalType === 'entrega' && '🚚 Agendar Entrega'}
                {modalType === 'pago' && '✅ Confirmar Pagamento'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-slate-700 mb-2">
                <span className="font-semibold">{selectedService.codigo}</span> - {selectedService.cliente}
              </p>
              <p className="text-slate-600 text-sm">{selectedService.aparelho}</p>
            </div>

            {modalType === 'levanta' && (
              <p className="text-slate-600 mb-6">
                O equipamento será marcado para levantamento em loja. 
                Nenhuma tarefa de entrega será criada.
              </p>
            )}

            {modalType === 'entrega' && (
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Técnico para Entrega
                  </label>
                  <select
                    value={entregaData.tecnico}
                    onChange={(e) => setEntregaData({ ...entregaData, tecnico: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="">Selecione...</option>
                    <option value="João Silva">João Silva</option>
                    <option value="Maria Santos">Maria Santos</option>
                    <option value="Pedro Costa">Pedro Costa</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Data
                  </label>
                  <input
                    type="date"
                    value={entregaData.data}
                    onChange={(e) => setEntregaData({ ...entregaData, data: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Turno
                  </label>
                  <select
                    value={entregaData.turno}
                    onChange={(e) => setEntregaData({ ...entregaData, turno: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="manha">🌅 Manhã</option>
                    <option value="tarde">🌆 Tarde</option>
                  </select>
                </div>
              </div>
            )}

            {modalType === 'pago' && (
              <p className="text-slate-600 mb-6">
                Confirmar que o pagamento foi recebido? 
                O serviço será movido para ✅ Pago.
              </p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
