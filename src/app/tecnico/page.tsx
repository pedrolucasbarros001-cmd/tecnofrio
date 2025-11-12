'use client';

import { useState } from 'react';
import { servicos, tecnicos } from '@/lib/mock/data';
import { MapPin, Play, Users, X, Camera, Package, CheckCircle, Send, Search, ChevronLeft, ChevronRight } from 'lucide-react';

type InqueritoStep = 'resumo' | 'contexto' | 'escolha' | 'pecas' | 'pagamento' | 'concluido';

export default function TecnicoServicosPage() {
  const [showInquerito, setShowInquerito] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [inqueritoStep, setInqueritoStep] = useState<InqueritoStep>('resumo');
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferService, setTransferService] = useState<any>(null);
  const [selectedTecnico, setSelectedTecnico] = useState('');
  const [transferMotivo, setTransferMotivo] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentWeekStart, setCurrentWeekStart] = useState(getMonday(new Date()));
  const [inqueritoData, setInqueritoData] = useState({
    chegou: false,
    contexto: '',
    fotos: [] as string[],
    escolha: '' as 'local' | 'oficina' | '',
    pecas: [] as Array<{ nome: string; ref: string; qtd: number }>,
    pagamento: '' as 'pagou' | 'deslocacao' | 'nao_pagou' | 'garantia' | '',
    valor: ''
  });

  // Função para obter a segunda-feira da semana
  function getMonday(date: Date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }

  // Filtrar serviços do técnico (simulado - João Silva)
  const meusServicos = servicos.filter(s => 
    s.tecnico === 'João Silva' && 
    (s.status === 'por_fazer' || s.status === 'em_execucao')
  );

  // Filtrar por busca
  const filteredServices = meusServicos.filter(s => {
    if (!searchQuery) return true;
    return s.cliente.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.codigo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.aparelho.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.contato.includes(searchQuery) ||
      (s.nif && s.nif.includes(searchQuery)) ||
      s.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  // Técnicos disponíveis (excluindo o atual)
  const tecnicosDisponiveis = tecnicos.filter(t => t.nome !== 'João Silva');

  // Gerar dias da semana (Segunda a Sábado)
  const weekDays = Array.from({ length: 6 }, (_, i) => {
    const date = new Date(currentWeekStart);
    date.setDate(date.getDate() + i);
    return date;
  });

  const changeWeek = (direction: 'prev' | 'next') => {
    setCurrentWeekStart(prev => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + (direction === 'prev' ? -7 : 7));
      return newDate;
    });
  };

  const getServicesForDate = (date: Date) => {
    return filteredServices.filter(s => {
      if (!s.dataAgendada) return false;
      return s.dataAgendada.toDateString() === date.toDateString();
    });
  };

  const handleComecar = (service: any) => {
    setSelectedService(service);
    setShowInquerito(true);
    setInqueritoStep('resumo');
  };

  const handleSolicitarTransferencia = (service: any) => {
    setTransferService(service);
    setShowTransferModal(true);
  };

  const handleConfirmarTransferencia = () => {
    if (!selectedTecnico || !transferMotivo) {
      alert('Por favor, selecione um técnico e informe o motivo');
      return;
    }
    alert(`Solicitação de transferência enviada!\nServiço: ${transferService.codigo}\nPara: ${selectedTecnico}\nMotivo: ${transferMotivo}`);
    setShowTransferModal(false);
    setSelectedTecnico('');
    setTransferMotivo('');
    setTransferService(null);
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">📋 Meus Serviços</h1>
        <p className="text-slate-400 text-sm">Visitas e entregas atribuídas</p>
      </div>

      {/* Barra de Pesquisa */}
      <div className="bg-slate-800 rounded-xl p-4 mb-4 border border-slate-700">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar por cliente, código, aparelho, contacto, NIF, tags..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900 text-white rounded-lg border border-slate-700 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-sm placeholder-slate-500"
          />
        </div>
      </div>

      {/* Agenda Semanal (Segunda a Sábado) */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden mb-6">
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">📅 Agenda Semanal</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => changeWeek('prev')}
              className="p-1.5 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-slate-400" />
            </button>
            <span className="text-sm text-slate-300 min-w-[180px] text-center">
              {weekDays[0].toLocaleDateString('pt-PT', { day: '2-digit', month: 'short' })} - {weekDays[5].toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' })}
            </span>
            <button
              onClick={() => changeWeek('next')}
              className="p-1.5 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="space-y-4">
            {weekDays.map((date, idx) => {
              const dayName = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'][idx];
              const servicesOnDay = getServicesForDate(date);
              const isToday = date.toDateString() === new Date().toDateString();
              
              // Separar por turno
              const manhaServices = servicesOnDay.filter(s => s.turno === 'manha');
              const tardeServices = servicesOnDay.filter(s => s.turno === 'tarde');

              return (
                <div key={idx} className={`border rounded-lg overflow-hidden ${
                  isToday ? 'border-orange-500 bg-orange-500/5' : 'border-slate-700 bg-slate-900'
                }`}>
                  <div className={`px-4 py-2 border-b ${
                    isToday ? 'border-orange-500/30 bg-orange-500/10' : 'border-slate-700 bg-slate-800'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className={`font-semibold ${isToday ? 'text-orange-400' : 'text-white'}`}>
                        {dayName}
                      </span>
                      <span className="text-xs text-slate-400">
                        {date.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short' })}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 space-y-3">
                    {/* Turno Manhã */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-slate-400">🌅 Manhã</span>
                        {manhaServices.length > 0 && (
                          <span className="text-xs text-slate-500">({manhaServices.length})</span>
                        )}
                      </div>
                      {manhaServices.length > 0 ? (
                        <div className="space-y-2">
                          {manhaServices.map(service => (
                            <div key={service.id} className="bg-slate-800 border border-slate-700 rounded-lg p-3">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <span className="text-sm font-semibold text-white">{service.codigo}</span>
                                  <p className="text-xs text-slate-400 mt-0.5">{service.cliente}</p>
                                </div>
                                <div className="flex gap-1">
                                  {service.tags.slice(0, 2).map(tag => (
                                    <span key={tag} className="text-xs px-1.5 py-0.5 bg-slate-700 text-slate-300 rounded">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <p className="text-xs text-slate-400 mb-2">{service.aparelho}</p>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleComecar(service)}
                                  className="flex-1 px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded text-xs font-medium transition-colors flex items-center justify-center gap-1"
                                >
                                  <Play className="w-3 h-3" />
                                  Começar
                                </button>
                                <button
                                  onClick={() => handleSolicitarTransferencia(service)}
                                  className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded text-xs transition-colors"
                                  title="Transferir"
                                >
                                  <Users className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-slate-600 italic">Sem serviços</p>
                      )}
                    </div>

                    {/* Turno Tarde */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-slate-400">🌆 Tarde</span>
                        {tardeServices.length > 0 && (
                          <span className="text-xs text-slate-500">({tardeServices.length})</span>
                        )}
                      </div>
                      {tardeServices.length > 0 ? (
                        <div className="space-y-2">
                          {tardeServices.map(service => (
                            <div key={service.id} className="bg-slate-800 border border-slate-700 rounded-lg p-3">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <span className="text-sm font-semibold text-white">{service.codigo}</span>
                                  <p className="text-xs text-slate-400 mt-0.5">{service.cliente}</p>
                                </div>
                                <div className="flex gap-1">
                                  {service.tags.slice(0, 2).map(tag => (
                                    <span key={tag} className="text-xs px-1.5 py-0.5 bg-slate-700 text-slate-300 rounded">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <p className="text-xs text-slate-400 mb-2">{service.aparelho}</p>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleComecar(service)}
                                  className="flex-1 px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded text-xs font-medium transition-colors flex items-center justify-center gap-1"
                                >
                                  <Play className="w-3 h-3" />
                                  Começar
                                </button>
                                <button
                                  onClick={() => handleSolicitarTransferencia(service)}
                                  className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded text-xs transition-colors"
                                  title="Transferir"
                                >
                                  <Users className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-slate-600 italic">Sem serviços</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          <p>Nenhum serviço encontrado</p>
        </div>
      )}

      {/* Modal de Transferência */}
      {showTransferModal && transferService && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl max-w-lg w-full border border-slate-700">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <div>
                <h3 className="text-xl font-bold text-white">Solicitar Transferência</h3>
                <p className="text-slate-400 text-sm mt-1">{transferService.codigo} - {transferService.cliente}</p>
              </div>
              <button
                onClick={() => {
                  setShowTransferModal(false);
                  setSelectedTecnico('');
                  setTransferMotivo('');
                }}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Conteúdo */}
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-white font-medium mb-3">
                  Transferir para qual técnico?
                </label>
                <select
                  value={selectedTecnico}
                  onChange={(e) => setSelectedTecnico(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Selecione um técnico</option>
                  {tecnicosDisponiveis.map((tec) => (
                    <option key={tec.id} value={tec.nome}>
                      {tec.nome} {tec.online ? '🟢 Online' : '⚫ Offline'} - {tec.servicosAtivos} serviços ativos
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-3">
                  Motivo da transferência
                </label>
                <textarea
                  value={transferMotivo}
                  onChange={(e) => setTransferMotivo(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-orange-500"
                  placeholder="Ex: Não consigo chegar a tempo, preciso de ajuda especializada, etc."
                  rows={4}
                />
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <p className="text-amber-200 text-sm">
                  ℹ️ A solicitação será enviada para aprovação da secretaria/dono
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-700 flex gap-3">
              <button
                onClick={() => {
                  setShowTransferModal(false);
                  setSelectedTecnico('');
                  setTransferMotivo('');
                }}
                className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmarTransferencia}
                disabled={!selectedTecnico || !transferMotivo}
                className="flex-1 px-6 py-3 bg-orange-600 hover:bg-orange-700 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
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
