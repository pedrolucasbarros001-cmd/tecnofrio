'use client';

import { useState } from 'react';
import { getServicosByStatus } from '@/lib/mock/data';
import { Phone, DollarSign, Truck, X } from 'lucide-react';

export default function SecretariaEmDebitoPage() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'contactar' | 'pagamento' | 'agendar' | null>(null);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [pagamentoData, setPagamentoData] = useState({ valor: '', metodo: 'dinheiro' });

  const servicosDebito = getServicosByStatus('em_debito');

  const handleAction = (service: any, type: 'contactar' | 'pagamento' | 'agendar') => {
    setSelectedService(service);
    setModalType(type);
    setShowModal(true);
    if (type === 'pagamento') {
      setPagamentoData({ valor: service.valorPendente?.toString() || '', metodo: 'dinheiro' });
    }
  };

  const handleConfirm = () => {
    if (modalType === 'contactar') {
      window.open(`tel:${selectedService.contato}`);
    } else if (modalType === 'pagamento') {
      alert(`Pagamento de €${pagamentoData.valor} registado (${pagamentoData.metodo})`);
    } else if (modalType === 'agendar') {
      alert('Redirecionando para Entregas...');
    }
    setShowModal(false);
    setModalType(null);
    setSelectedService(null);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">💰 Em Débito</h1>
        <p className="text-slate-600">Serviços com pagamento pendente</p>
      </div>

      {/* Lista de Débitos */}
      <div className="space-y-4">
        {servicosDebito.map((service) => (
          <div
            key={service.id}
            className="bg-white border-2 border-orange-200 rounded-xl p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-lg font-bold text-slate-900">{service.codigo}</span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                    ⚠️ Em Débito
                  </span>
                </div>
                <p className="text-slate-700 font-medium mb-1">{service.cliente}</p>
                <p className="text-slate-600 text-sm mb-2">{service.aparelho} - {service.marca}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-slate-600">
                    📞 {service.contato}
                  </span>
                  <span className="text-orange-600 font-bold text-lg">
                    €{service.valorPendente?.toFixed(2)}
                  </span>
                </div>
                <div className="flex gap-2 mt-2">
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

              {/* Ações */}
              <div className="flex flex-col gap-2 md:w-48">
                <button
                  onClick={() => handleAction(service, 'contactar')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Contactar
                </button>
                <button
                  onClick={() => handleAction(service, 'pagamento')}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <DollarSign className="w-4 h-4" />
                  Registar Pagamento
                </button>
                <button
                  onClick={() => handleAction(service, 'agendar')}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Truck className="w-4 h-4" />
                  Agendar Entrega
                </button>
              </div>
            </div>
          </div>
        ))}

        {servicosDebito.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <DollarSign className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Nenhum débito pendente</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-900">
                {modalType === 'contactar' && '📞 Contactar Cliente'}
                {modalType === 'pagamento' && '💰 Registar Pagamento'}
                {modalType === 'agendar' && '🚚 Agendar Levantamento/Entrega'}
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
              <p className="text-orange-600 font-bold text-lg mt-2">
                Valor pendente: €{selectedService.valorPendente?.toFixed(2)}
              </p>
            </div>

            {modalType === 'contactar' && (
              <div className="mb-6">
                <p className="text-slate-600 mb-4">
                  Contacto: <span className="font-semibold">{selectedService.contato}</span>
                </p>
                <p className="text-sm text-slate-500">
                  Ao confirmar, será aberta a aplicação de telefone.
                </p>
              </div>
            )}

            {modalType === 'pagamento' && (
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Valor Recebido (€)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={pagamentoData.valor}
                    onChange={(e) => setPagamentoData({ ...pagamentoData, valor: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Método de Pagamento
                  </label>
                  <select
                    value={pagamentoData.metodo}
                    onChange={(e) => setPagamentoData({ ...pagamentoData, metodo: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="dinheiro">💵 Dinheiro</option>
                    <option value="multibanco">💳 Multibanco</option>
                    <option value="mbway">📱 MB WAY</option>
                    <option value="transferencia">🏦 Transferência</option>
                  </select>
                </div>
              </div>
            )}

            {modalType === 'agendar' && (
              <p className="text-slate-600 mb-6">
                Será redirecionado para a página de Entregas para agendar 
                o levantamento ou entrega deste equipamento.
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
