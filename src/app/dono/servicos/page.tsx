'use client';

import { useState } from 'react';
import { servicos, ServiceStatus, getStatusLabel, tecnicos } from '@/lib/mock/data';
import { ServiceModal } from '@/components/tecnofrio/service-modal';
import { Filter, Plus, X, Search, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

export default function DonoServicos() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState<ServiceStatus | 'all'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [newService, setNewService] = useState({
    cliente: '',
    nif: '',
    contato: '',
    email: '',
    morada: '',
    codigoPostal: '',
    aparelho: '',
    marca: '',
    avaria: '',
    tipo: 'visita' as 'visita' | 'oficina',
    tecnico: '',
    urgente: false,
    garantia: false,
    garantiaMarca: '',
    garantiaProcesso: ''
  });

  // Filtrar serviços por busca
  const filteredServices = servicos.filter(s => {
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    const matchesSearch = !searchQuery || 
      s.cliente.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.codigo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.aparelho.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.contato.includes(searchQuery) ||
      (s.nif && s.nif.includes(searchQuery)) ||
      s.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const statusOptions: Array<{ value: ServiceStatus | 'all'; label: string }> = [
    { value: 'all', label: 'Todos' },
    { value: 'por_fazer', label: '📋 Por Fazer' },
    { value: 'em_execucao', label: '🔧 Em Execução' },
    { value: 'na_oficina', label: '🏭 Na Oficina' },
    { value: 'pedir_peca', label: '📦 Para Pedir Peça' },
    { value: 'espera_peca', label: '⏳ Em Espera de Peça' },
    { value: 'a_precificar', label: '💰 A Precificar' },
    { value: 'entregas', label: '🚚 Entregas' },
    { value: 'em_debito', label: '🧾 Em Débito' },
    { value: 'pago', label: '✅ Pago' },
    { value: 'finalizado', label: '🏁 Finalizado' },
  ];

  // Funções de calendário
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const getServicesForDate = (date: Date) => {
    return servicos.filter(s => {
      if (!s.dataAgendada) return false;
      return s.dataAgendada.toDateString() === date.toDateString();
    });
  };

  const changeMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);
  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  const handleCreateService = () => {
    if (!newService.codigoPostal || !newService.email) {
      alert('Por favor, preencha o código postal e email (campos obrigatórios)');
      return;
    }
    alert(`Serviço criado com sucesso!\nCliente: ${newService.cliente}\nTécnico: ${newService.tecnico || 'Não atribuído'}`);
    setShowCreateModal(false);
    setNewService({
      cliente: '',
      nif: '',
      contato: '',
      email: '',
      morada: '',
      codigoPostal: '',
      aparelho: '',
      marca: '',
      avaria: '',
      tipo: 'visita',
      tecnico: '',
      urgente: false,
      garantia: false,
      garantiaMarca: '',
      garantiaProcesso: ''
    });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 mb-1">Todos os Serviços</h1>
          <p className="text-slate-500 text-sm">Gestão completa de serviços</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Criar Serviço
        </button>
      </div>

      {/* Barra de Pesquisa e Filtros */}
      <div className="bg-white rounded-xl p-4 mb-4 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar por cliente, código, aparelho, contacto, NIF, tags..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 text-slate-800 rounded-lg border border-slate-200 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as ServiceStatus | 'all')}
              className="bg-slate-50 text-slate-800 px-3 py-2 rounded-lg border border-slate-200 focus:border-cyan-500 focus:outline-none text-sm"
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tabela de Serviços */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left p-3 text-slate-600 font-semibold text-sm">Código</th>
                <th className="text-left p-3 text-slate-600 font-semibold text-sm">Cliente</th>
                <th className="text-left p-3 text-slate-600 font-semibold text-sm">Aparelho</th>
                <th className="text-left p-3 text-slate-600 font-semibold text-sm">Status</th>
                <th className="text-left p-3 text-slate-600 font-semibold text-sm">Técnico</th>
                <th className="text-left p-3 text-slate-600 font-semibold text-sm">Tags</th>
                <th className="text-left p-3 text-slate-600 font-semibold text-sm">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((service) => (
                <tr key={service.id} className="border-t border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="p-3 text-slate-800 font-medium text-sm">{service.codigo}</td>
                  <td className="p-3 text-slate-600 text-sm">{service.cliente}</td>
                  <td className="p-3 text-slate-600 text-sm">{service.aparelho}</td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                      {getStatusLabel(service.status)}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600 text-sm">{service.tecnico || 'Não atribuído'}</td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1">
                      {service.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-cyan-50 text-cyan-600 rounded text-xs"
                          title={tag}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => setSelectedService(service)}
                      className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white text-xs font-medium transition-colors"
                    >
                      Abrir Ficha
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Calendário/Agenda */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-slate-600" />
            <h2 className="text-lg font-semibold text-slate-800">Agenda de Serviços</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => changeMonth('prev')}
              className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-slate-600" />
            </button>
            <span className="text-sm font-medium text-slate-700 min-w-[140px] text-center">
              {monthNames[month]} {year}
            </span>
            <button
              onClick={() => changeMonth('next')}
              className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
              <div key={day} className="text-center text-xs font-semibold text-slate-500 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: startingDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const date = new Date(year, month, day);
              const servicesOnDay = getServicesForDate(date);
              const isToday = date.toDateString() === new Date().toDateString();

              return (
                <div
                  key={day}
                  className={`aspect-square border rounded-lg p-1.5 hover:border-cyan-300 transition-colors ${
                    isToday ? 'border-cyan-500 bg-cyan-50' : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className={`text-xs font-medium mb-1 ${
                    isToday ? 'text-cyan-600' : 'text-slate-600'
                  }`}>
                    {day}
                  </div>
                  {servicesOnDay.length > 0 && (
                    <div className="space-y-0.5">
                      {servicesOnDay.slice(0, 2).map(s => (
                        <div
                          key={s.id}
                          className="text-[10px] bg-cyan-100 text-cyan-700 px-1 py-0.5 rounded truncate"
                          title={`${s.codigo} - ${s.cliente}`}
                        >
                          {s.codigo}
                        </div>
                      ))}
                      {servicesOnDay.length > 2 && (
                        <div className="text-[9px] text-slate-500 text-center">
                          +{servicesOnDay.length - 2}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal de Criação de Serviço */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-slate-200 shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <h3 className="text-xl font-bold text-slate-800">Criar Novo Serviço</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Conteúdo */}
            <div className="flex-1 overflow-y-auto p-5">
              <div className="space-y-5">
                {/* Informações do Cliente */}
                <div>
                  <h4 className="text-base font-semibold text-slate-700 mb-3">📋 Informações do Cliente</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 text-sm font-medium mb-1.5">
                        Nome do Cliente *
                      </label>
                      <input
                        type="text"
                        value={newService.cliente}
                        onChange={(e) => setNewService({ ...newService, cliente: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 text-sm"
                        placeholder="Nome completo"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 text-sm font-medium mb-1.5">
                        NIF
                      </label>
                      <input
                        type="text"
                        value={newService.nif}
                        onChange={(e) => setNewService({ ...newService, nif: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 text-sm"
                        placeholder="123456789"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 text-sm font-medium mb-1.5">
                        Contato *
                      </label>
                      <input
                        type="tel"
                        value={newService.contato}
                        onChange={(e) => setNewService({ ...newService, contato: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 text-sm"
                        placeholder="912345678"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 text-sm font-medium mb-1.5">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={newService.email}
                        onChange={(e) => setNewService({ ...newService, email: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 text-sm"
                        placeholder="email@exemplo.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 text-sm font-medium mb-1.5">
                        Morada
                      </label>
                      <input
                        type="text"
                        value={newService.morada}
                        onChange={(e) => setNewService({ ...newService, morada: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 text-sm"
                        placeholder="Rua, número, cidade"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 text-sm font-medium mb-1.5">
                        Código Postal *
                      </label>
                      <input
                        type="text"
                        value={newService.codigoPostal}
                        onChange={(e) => setNewService({ ...newService, codigoPostal: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 text-sm"
                        placeholder="1000-001"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Informações do Equipamento */}
                <div>
                  <h4 className="text-base font-semibold text-slate-700 mb-3">🔧 Informações do Equipamento</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 text-sm font-medium mb-1.5">
                        Aparelho *
                      </label>
                      <input
                        type="text"
                        value={newService.aparelho}
                        onChange={(e) => setNewService({ ...newService, aparelho: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 text-sm"
                        placeholder="Ex: Ar Condicionado, Câmara Frigorífica"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 text-sm font-medium mb-1.5">
                        Marca
                      </label>
                      <input
                        type="text"
                        value={newService.marca}
                        onChange={(e) => setNewService({ ...newService, marca: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 text-sm"
                        placeholder="Ex: Daikin, Mitsubishi"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-slate-600 text-sm font-medium mb-1.5">
                        Avaria Reportada *
                      </label>
                      <textarea
                        value={newService.avaria}
                        onChange={(e) => setNewService({ ...newService, avaria: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 text-sm"
                        placeholder="Descreva o problema reportado pelo cliente"
                        rows={3}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Tipo de Serviço */}
                <div>
                  <h4 className="text-base font-semibold text-slate-700 mb-3">📦 Tipo de Serviço</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <button
                      onClick={() => setNewService({ ...newService, tipo: 'visita' })}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        newService.tipo === 'visita'
                          ? 'border-cyan-500 bg-cyan-50'
                          : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-center">
                        <span className="text-2xl mb-1 block">🏠</span>
                        <span className="text-slate-700 font-medium text-sm">Visita</span>
                      </div>
                    </button>
                    <button
                      onClick={() => setNewService({ ...newService, tipo: 'oficina' })}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        newService.tipo === 'oficina'
                          ? 'border-cyan-500 bg-cyan-50'
                          : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-center">
                        <span className="text-2xl mb-1 block">🏭</span>
                        <span className="text-slate-700 font-medium text-sm">Oficina</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Atribuição e Opções */}
                <div>
                  <h4 className="text-base font-semibold text-slate-700 mb-3">👤 Atribuição e Opções</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-slate-600 text-sm font-medium mb-1.5">
                        Atribuir Técnico
                      </label>
                      <select
                        value={newService.tecnico}
                        onChange={(e) => setNewService({ ...newService, tecnico: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 text-sm"
                      >
                        <option value="">Não atribuir agora</option>
                        {tecnicos.map((tec) => (
                          <option key={tec.id} value={tec.nome}>
                            {tec.nome} {tec.online ? '🟢' : '⚫'}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex gap-4">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newService.urgente}
                          onChange={(e) => setNewService({ ...newService, urgente: e.target.checked })}
                          className="w-4 h-4 text-cyan-600 border-slate-300 rounded focus:ring-cyan-500"
                        />
                        <span className="text-slate-700 font-medium text-sm">🔴 Urgente</span>
                      </label>

                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newService.garantia}
                          onChange={(e) => setNewService({ ...newService, garantia: e.target.checked })}
                          className="w-4 h-4 text-cyan-600 border-slate-300 rounded focus:ring-cyan-500"
                        />
                        <span className="text-slate-700 font-medium text-sm">🛡️ Garantia</span>
                      </label>
                    </div>

                    {newService.garantia && (
                      <div className="grid md:grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <div>
                          <label className="block text-slate-600 text-sm font-medium mb-1.5">
                            Marca da Garantia
                          </label>
                          <input
                            type="text"
                            value={newService.garantiaMarca}
                            onChange={(e) => setNewService({ ...newService, garantiaMarca: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 text-sm"
                            placeholder="Ex: Daikin"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-600 text-sm font-medium mb-1.5">
                            Nº Processo
                          </label>
                          <input
                            type="text"
                            value={newService.garantiaProcesso}
                            onChange={(e) => setNewService({ ...newService, garantiaProcesso: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 text-sm"
                            placeholder="GAR-2024-XXX"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-slate-200 flex gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateService}
                disabled={!newService.cliente || !newService.contato || !newService.email || !newService.codigoPostal || !newService.aparelho || !newService.avaria}
                className="flex-1 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-lg font-medium transition-colors text-sm"
              >
                Criar Serviço
              </button>
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
        />
      )}
    </div>
  );
}
