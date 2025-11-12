'use client';

import { useState } from 'react';
import { servicos } from '@/lib/mock/data';
import { ServiceModal } from '@/components/tecnofrio/service-modal';
import { Eye, Printer, Search, Calendar, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

export default function SecretariaGeral() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());

  // Filtrar serviços por busca
  const filteredServices = servicos.filter(s => {
    if (!searchQuery) return true;
    return s.cliente.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.codigo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.aparelho.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.contato.includes(searchQuery) ||
      (s.nif && s.nif.includes(searchQuery)) ||
      s.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
  });

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

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 mb-1">Visão Geral</h1>
          <p className="text-slate-500 text-sm">Todos os serviços criados e em andamento</p>
        </div>
        <button
          className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Criar Serviço
        </button>
      </div>

      {/* Barra de Pesquisa */}
      <div className="bg-white rounded-xl p-4 mb-4 border border-slate-200 shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar por cliente, código, aparelho, contacto, NIF, tags..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 text-slate-800 rounded-lg border border-slate-200 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 text-sm"
          />
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left p-3 text-slate-600 font-semibold text-sm">Código</th>
                <th className="text-left p-3 text-slate-600 font-semibold text-sm">Cliente</th>
                <th className="text-left p-3 text-slate-600 font-semibold text-sm">Tipo</th>
                <th className="text-left p-3 text-slate-600 font-semibold text-sm">Aparelho</th>
                <th className="text-left p-3 text-slate-600 font-semibold text-sm">Técnico</th>
                <th className="text-left p-3 text-slate-600 font-semibold text-sm">Data</th>
                <th className="text-left p-3 text-slate-600 font-semibold text-sm">Tags</th>
                <th className="text-left p-3 text-slate-600 font-semibold text-sm">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((service) => (
                <tr key={service.id} className="border-t border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="p-3 text-slate-800 font-medium text-sm">{service.codigo}</td>
                  <td className="p-3 text-slate-600 text-sm">{service.cliente}</td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 bg-cyan-50 text-cyan-600 rounded-full text-xs font-medium">
                      {service.tipo === 'visita' ? '🏠 Visita' : '⚙️ Oficina'}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600 text-sm">{service.aparelho}</td>
                  <td className="p-3 text-slate-600 text-sm">{service.tecnico || 'Não atribuído'}</td>
                  <td className="p-3 text-slate-500 text-xs">
                    {service.dataCriacao.toLocaleDateString('pt-PT')}
                  </td>
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
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedService(service)}
                        className="p-1.5 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
                        title="Abrir ficha"
                      >
                        <Eye className="w-3.5 h-3.5 text-white" />
                      </button>
                      <button
                        onClick={() => alert('Imprimir ficha (simulado)')}
                        className="p-1.5 bg-slate-200 hover:bg-slate-300 rounded-lg transition-colors"
                        title="Imprimir"
                      >
                        <Printer className="w-3.5 h-3.5 text-slate-600" />
                      </button>
                    </div>
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
