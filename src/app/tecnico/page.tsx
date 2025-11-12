'use client';

import { useState } from 'react';
import { servicos, tecnicos } from '@/lib/mock/data';
import { MapPin, Play, Users, X, Camera, Upload, Package, DollarSign, CheckCircle, ArrowRightLeft } from 'lucide-react';

type InqueritoStep = 'resumo' | 'contexto' | 'escolha' | 'pecas' | 'pagamento' | 'concluido';

export default function TecnicoServicosPage() {
  const [showInquerito, setShowInquerito] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedTecnico, setSelectedTecnico] = useState('');
  const [motivoTransferencia, setMotivoTransferencia] = useState('');
  const [inqueritoStep, setInqueritoStep] = useState<InqueritoStep>('resumo');
  const [inqueritoData, setInqueritoData] = useState({
    chegou: false,
    contexto: '',
    fotos: [] as string[],
    escolha: '' as 'local' | 'oficina' | '',
    pecas: [] as Array<{ nome: string; ref: string; qtd: number }>,
    pagamento: '' as 'pagou' | 'deslocacao' | 'nao_pagou' | 'garantia' | '',
    valor: ''
  });

  // Filtrar serviços do técnico (simulado - João Silva)
  const meusServicos = servicos.filter(s => 
    s.tecnico === 'João Silva' && 
    (s.status === 'por_fazer' || s.status === 'em_execucao')
  );

  // Técnicos disponíveis para transferência (exceto o atual)
  const tecnicosDisponiveis = tecnicos.filter(t => t.nome !== 'João Silva');

  const handleComecar = (service: any) => {
    setSelectedService(service);
    setShowInquerito(true);
    setInqueritoStep('resumo');
  };

  const handleSolicitarTransferencia = (service: any) => {
    setSelectedService(service);
    setShowTransferModal(true);
  };

  const handleConfirmarTransferencia = () => {
    if (!selectedTecnico) {
      alert('Selecione um técnico');
      return;
    }

    alert(`Solicitação de transferência enviada!\n\nServiço: ${selectedService.codigo}\nPara: ${selectedTecnico}\nMotivo: ${motivoTransferencia || 'Não especificado'}\n\nAguardando aprovação do dono ou secretária.`);
    setShowTransferModal(false);
    setSelectedTecnico('');
    setMotivoTransferencia('');
  };

  const handleNextStep = () => {
    if (inqueritoStep === 'resumo' && inqueritoData.chegou) {
      setInqueritoStep('contexto');
    } else if (inqueritoStep === 'contexto' && (inqueritoData.contexto || inqueritoData.fotos.length > 0)) {
      setInqueritoStep('escolha');
    } else if (inqueritoStep === 'escolha' && inqueritoData.escolha) {
      if (inqueritoData.escolha === 'local') {
        setInqueritoStep('pecas');
      } else {
        setInqueritoStep('pagamento');
      }
    } else if (inqueritoStep === 'pecas') {
      setInqueritoStep('pagamento');
    } else if (inqueritoStep === 'pagamento' && inqueritoData.pagamento) {
      setInqueritoStep('concluido');
      setTimeout(() => {
        setShowInquerito(false);
        setInqueritoData({
          chegou: false,
          contexto: '',
          fotos: [],
          escolha: '',
          pecas: [],
          pagamento: '',
          valor: ''
        });
      }, 2000);
    }
  };

  const addPeca = () => {
    setInqueritoData({
      ...inqueritoData,
      pecas: [...inqueritoData.pecas, { nome: '', ref: '', qtd: 1 }]
    });
  };

  const updatePeca = (index: number, field: string, value: any) => {
    const newPecas = [...inqueritoData.pecas];
    newPecas[index] = { ...newPecas[index], [field]: value };
    setInqueritoData({ ...inqueritoData, pecas: newPecas });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">📋 Meus Serviços</h1>
        <p className="text-slate-400">Visitas e entregas atribuídas</p>
      </div>

      {/* Cards de Serviços */}
      <div className="grid md:grid-cols-2 gap-4">
        {meusServicos.map((service) => (
          <div
            key={service.id}
            className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-orange-500 transition-all"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-bold text-white">{service.codigo}</span>
              <div className="flex gap-1">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="space-y-2 mb-4">
              <p className="text-white font-medium">{service.cliente}</p>
              <p className="text-slate-400 text-sm">{service.aparelho} - {service.marca}</p>
              <p className="text-slate-400 text-sm">Avaria: {service.avaria}</p>
              {service.morada && (
                <div className="flex items-start gap-2 text-sm text-slate-400">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{service.morada}</span>
                </div>
              )}
              {service.dataAgendada && (
                <p className="text-sm text-slate-400">
                  📅 {service.dataAgendada.toLocaleDateString('pt-PT')} - 
                  {service.turno === 'manha' ? ' 🌅 Manhã' : ' 🌆 Tarde'}
                </p>
              )}
            </div>

            {/* Ações */}
            <div className="flex gap-2">
              <button
                onClick={() => handleComecar(service)}
                className="flex-1 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" />
                Começar
              </button>
              <button
                onClick={() => handleSolicitarTransferencia(service)}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                title="Solicitar transferência"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {meusServicos.length === 0 && (
          <div className="col-span-2 text-center py-12 text-slate-500">
            <p>Nenhum serviço atribuído</p>
          </div>
        )}
      </div>

      {/* Modal de Transferência */}
      {showTransferModal && selectedService && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl max-w-md w-full border border-slate-700">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h3 className="text-xl font-bold text-white">🔄 Solicitar Transferência</h3>
              <button
                onClick={() => {
                  setShowTransferModal(false);
                  setSelectedTecnico('');
                  setMotivoTransferencia('');
                }}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Conteúdo */}
            <div className="p-6 space-y-6">
              <div className="bg-slate-900 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-1">Serviço:</p>
                <p className="text-white font-medium">{selectedService.codigo} - {selectedService.cliente}</p>
                <p className="text-slate-400 text-sm mt-1">{selectedService.aparelho}</p>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Transferir para: *</label>
                <select
                  value={selectedTecnico}
                  onChange={(e) => setSelectedTecnico(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  required
                >
                  <option value="">Selecione um técnico...</option>
                  {tecnicosDisponiveis.map(t => (
                    <option key={t.id} value={t.nome}>
                      {t.nome} {t.online ? '🟢' : '⚫'} ({t.servicosAtivos} serviços ativos)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Motivo (opcional):</label>
                <textarea
                  value={motivoTransferencia}
                  onChange={(e) => setMotivoTransferencia(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500"
                  placeholder="Ex: Conflito de horário, área distante..."
                  rows={3}
                />
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-400 text-sm">
                  ℹ️ A solicitação será enviada para aprovação do dono ou secretária. Você será notificado quando for processada.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-700">
              <button
                onClick={handleConfirmarTransferencia}
                disabled={!selectedTecnico}
                className="w-full px-6 py-3 bg-orange-600 hover:bg-orange-700 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg font-medium transition-colors"
              >
                Enviar Solicitação
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Inquérito */}
      {showInquerito && selectedService && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-slate-700">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <div>
                <h3 className="text-xl font-bold text-white">
                  {selectedService.codigo} - {selectedService.cliente}
                </h3>
                <p className="text-slate-400 text-sm">{selectedService.aparelho}</p>
              </div>
              <button
                onClick={() => setShowInquerito(false)}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Conteúdo */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Step: Resumo */}
              {inqueritoStep === 'resumo' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">📍 Resumo da Visita</h4>
                    <div className="bg-slate-900 rounded-lg p-4 space-y-2 text-sm">
                      <p className="text-slate-300"><span className="text-slate-500">Cliente:</span> {selectedService.cliente}</p>
                      <p className="text-slate-300"><span className="text-slate-500">Morada:</span> {selectedService.morada}</p>
                      <p className="text-slate-300"><span className="text-slate-500">Aparelho:</span> {selectedService.aparelho}</p>
                      <p className="text-slate-300"><span className="text-slate-500">Avaria:</span> {selectedService.avaria}</p>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => alert('Abrir mapa (simulado)')}
                      className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <MapPin className="w-5 h-5" />
                      Ir até o local
                    </button>
                  </div>

                  <div>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={inqueritoData.chegou}
                        onChange={(e) => setInqueritoData({ ...inqueritoData, chegou: e.target.checked })}
                        className="w-5 h-5 text-orange-600 border-slate-600 rounded focus:ring-orange-500 bg-slate-700"
                      />
                      <span className="text-white font-medium">✅ Cheguei ao local</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Step: Contexto */}
              {inqueritoStep === 'contexto' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">📝 Contexto Inicial</h4>
                    <textarea
                      value={inqueritoData.contexto}
                      onChange={(e) => setInqueritoData({ ...inqueritoData, contexto: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Descreva o que encontrou no local..."
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-3">📷 Fotos (mínimo 1)</label>
                    <button
                      onClick={() => alert('Tirar foto (simulado)')}
                      className="w-full px-4 py-3 bg-slate-700 hover:bg-slate-600 border-2 border-dashed border-slate-600 rounded-lg text-slate-300 transition-colors flex items-center justify-center gap-2"
                    >
                      <Camera className="w-5 h-5" />
                      Tirar Foto
                    </button>
                    {inqueritoData.fotos.length > 0 && (
                      <p className="text-sm text-green-400 mt-2">✓ {inqueritoData.fotos.length} foto(s) adicionada(s)</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step: Escolha */}
              {inqueritoStep === 'escolha' && (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white mb-4">🔧 Como proceder?</h4>
                  
                  <button
                    onClick={() => setInqueritoData({ ...inqueritoData, escolha: 'local' })}
                    className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                      inqueritoData.escolha === 'local'
                        ? 'border-orange-500 bg-orange-500/10'
                        : 'border-slate-700 bg-slate-900 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">🔧</span>
                      </div>
                      <div>
                        <h5 className="text-white font-semibold mb-1">Reparar no Local</h5>
                        <p className="text-slate-400 text-sm">Problema pode ser resolvido aqui</p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setInqueritoData({ ...inqueritoData, escolha: 'oficina' })}
                    className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                      inqueritoData.escolha === 'oficina'
                        ? 'border-orange-500 bg-orange-500/10'
                        : 'border-slate-700 bg-slate-900 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">🏭</span>
                      </div>
                      <div>
                        <h5 className="text-white font-semibold mb-1">Levar para Oficina</h5>
                        <p className="text-slate-400 text-sm">Precisa de reparação na oficina</p>
                      </div>
                    </div>
                  </button>
                </div>
              )}

              {/* Step: Peças */}
              {inqueritoStep === 'pecas' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">📦 Peças Utilizadas</h4>
                    <p className="text-slate-400 text-sm mb-4">Adicione as peças usadas na reparação (opcional)</p>
                  </div>

                  {inqueritoData.pecas.map((peca, index) => (
                    <div key={index} className="bg-slate-900 rounded-lg p-4 space-y-3">
                      <input
                        type="text"
                        value={peca.nome}
                        onChange={(e) => updatePeca(index, 'nome', e.target.value)}
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500"
                        placeholder="Nome da peça"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={peca.ref}
                          onChange={(e) => updatePeca(index, 'ref', e.target.value)}
                          className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500"
                          placeholder="Referência"
                        />
                        <input
                          type="number"
                          value={peca.qtd}
                          onChange={(e) => updatePeca(index, 'qtd', parseInt(e.target.value))}
                          className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                          min="1"
                        />
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={addPeca}
                    className="w-full px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Package className="w-4 h-4" />
                    Adicionar Peça
                  </button>
                </div>
              )}

              {/* Step: Pagamento */}
              {inqueritoStep === 'pagamento' && (
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-white mb-4">💰 Pagamento</h4>

                  <div className="space-y-3">
                    {['pagou', 'deslocacao', 'nao_pagou', 'garantia'].map((tipo) => (
                      <button
                        key={tipo}
                        onClick={() => setInqueritoData({ ...inqueritoData, pagamento: tipo as any })}
                        className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                          inqueritoData.pagamento === tipo
                            ? 'border-orange-500 bg-orange-500/10'
                            : 'border-slate-700 bg-slate-900 hover:border-slate-600'
                        }`}
                      >
                        <span className="text-white font-medium">
                          {tipo === 'pagou' && '✅ Pagou'}
                          {tipo === 'deslocacao' && '💸 Só Deslocação'}
                          {tipo === 'nao_pagou' && '⚠️ Não Pagou'}
                          {tipo === 'garantia' && '🛡️ É Garantia'}
                        </span>
                      </button>
                    ))}
                  </div>

                  {(inqueritoData.pagamento === 'pagou' || inqueritoData.pagamento === 'deslocacao') && (
                    <div>
                      <label className="block text-white font-medium mb-2">Valor Recebido (€)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={inqueritoData.valor}
                        onChange={(e) => setInqueritoData({ ...inqueritoData, valor: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white"
                        placeholder="0.00"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Step: Concluído */}
              {inqueritoStep === 'concluido' && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">Serviço Concluído!</h4>
                  <p className="text-slate-400">Dados registados com sucesso</p>
                </div>
              )}
            </div>

            {/* Footer */}
            {inqueritoStep !== 'concluido' && (
              <div className="p-6 border-t border-slate-700">
                <button
                  onClick={handleNextStep}
                  disabled={
                    (inqueritoStep === 'resumo' && !inqueritoData.chegou) ||
                    (inqueritoStep === 'contexto' && !inqueritoData.contexto && inqueritoData.fotos.length === 0) ||
                    (inqueritoStep === 'escolha' && !inqueritoData.escolha) ||
                    (inqueritoStep === 'pagamento' && !inqueritoData.pagamento)
                  }
                  className="w-full px-6 py-3 bg-orange-600 hover:bg-orange-700 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg font-medium transition-colors"
                >
                  Continuar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
