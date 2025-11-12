'use client';

import { useState } from 'react';
import { servicos, tecnicos, marcasGarantia } from '@/lib/mock/data';
import { Plus, Search, Filter, FileText, Printer, X, Calendar, User, Wrench, AlertCircle } from 'lucide-react';

export default function DonoServicosPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createStep, setCreateStep] = useState<'tipo' | 'formulario'>('tipo');
  const [tipoServico, setTipoServico] = useState<'visita' | 'oficina' | ''>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [filterTecnico, setFilterTecnico] = useState('todos');

  // Estado do formulário
  const [formData, setFormData] = useState({
    cliente: '',
    nif: '',
    contato: '',
    morada: '',
    aparelho: '',
    avaria: '',
    urgente: false,
    garantia: false,
    marcaGarantia: '',
    processoGarantia: '',
    marca: '',
    tecnico: '',
    dataAgendada: '',
    turno: 'manha' as 'manha' | 'tarde'
  });

  const handleCreateService = () => {
    // Simulação de criação de serviço
    const novoServico = {
      ...formData,
      id: `${servicos.length + 1}`,
      codigo: `TF-2024-${String(servicos.length + 1).padStart(3, '0')}`,
      status: tipoServico === 'oficina' ? 'na_oficina' : 'por_fazer',
      tipo: tipoServico,
      tags: [
        tipoServico === 'oficina' ? '⚙️ Oficina' : '🏠 Visita',
        formData.urgente ? '🔴 Urgente' : '',
        formData.garantia ? '🛡️ Garantia' : ''
      ].filter(Boolean),
      dataCriacao: new Date()
    };

    alert(`Serviço ${novoServico.codigo} criado com sucesso!`);
    setShowCreateModal(false);
    resetForm();
  };

  const resetForm = () => {
    setCreateStep('tipo');
    setTipoServico('');
    setFormData({
      cliente: '',
      nif: '',
      contato: '',
      morada: '',
      aparelho: '',
      avaria: '',
      urgente: false,
      garantia: false,
      marcaGarantia: '',
      processoGarantia: '',
      marca: '',
      tecnico: '',
      dataAgendada: '',
      turno: 'manha'
    });
  };

  // Filtros
  const servicosFiltrados = servicos.filter(s => {
    const matchSearch = s.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       s.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       s.aparelho.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'todos' || s.status === filterStatus;
    const matchTecnico = filterTecnico === 'todos' || s.tecnico === filterTecnico;
    return matchSearch && matchStatus && matchTecnico;
  });

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">🗂️ Serviços</h1>
          <p className="text-slate-400">Gestão completa de todos os serviços</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Criar Serviço
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-6">
        <div className="grid md:grid-cols-3 gap-4">
          {/* Busca */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por cliente, código..."
              className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500"
            />
          </div>

          {/* Filtro Status */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white"
          >
            <option value="todos">Todos os Status</option>
            <option value="por_fazer">Por Fazer</option>
            <option value="em_execucao">Em Execução</option>
            <option value="na_oficina">Na Oficina</option>
            <option value="a_precificar">A Precificar</option>
            <option value="entregas">Entregas</option>
            <option value="em_debito">Em Débito</option>
            <option value="pago">Pago</option>
            <option value="finalizado">Finalizado</option>
          </select>

          {/* Filtro Técnico */}
          <select
            value={filterTecnico}
            onChange={(e) => setFilterTecnico(e.target.value)}
            className="px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white"
          >
            <option value="todos">Todos os Técnicos</option>
            {tecnicos.map(t => (
              <option key={t.id} value={t.nome}>{t.nome}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabela de Serviços */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Código</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Cliente</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Aparelho</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Técnico</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Tags</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {servicosFiltrados.map((service) => (
                <tr key={service.id} className="hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">{service.codigo}</td>
                  <td className="px-6 py-4 text-slate-300">{service.cliente}</td>
                  <td className="px-6 py-4 text-slate-300">{service.aparelho}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs">
                      {service.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{service.tecnico || 'Não atribuído'}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      {service.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => alert('Abrir ficha (simulado)')}
                        className="p-2 hover:bg-slate-600 rounded-lg transition-colors"
                        title="Abrir ficha"
                      >
                        <FileText className="w-4 h-4 text-slate-400" />
                      </button>
                      <button
                        onClick={() => alert('Imprimir (simulado)')}
                        className="p-2 hover:bg-slate-600 rounded-lg transition-colors"
                        title="Imprimir"
                      >
                        <Printer className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {servicosFiltrados.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <p>Nenhum serviço encontrado</p>
          </div>
        )}
      </div>

      {/* Modal de Criação */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-slate-700">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h3 className="text-xl font-bold text-white">🧩 Criar Novo Serviço</h3>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  resetForm();
                }}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Conteúdo */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Passo 1: Escolher Tipo */}
              {createStep === 'tipo' && (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white mb-4">Escolha o tipo de serviço:</h4>
                  
                  <button
                    onClick={() => {
                      setTipoServico('visita');
                      setCreateStep('formulario');
                    }}
                    className="w-full p-6 rounded-xl border-2 border-slate-700 bg-slate-900 hover:border-orange-500 transition-all text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">🏠</span>
                      </div>
                      <div>
                        <h5 className="text-white font-semibold mb-1">Visita</h5>
                        <p className="text-slate-400 text-sm">Serviço no local do cliente</p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setTipoServico('oficina');
                      setCreateStep('formulario');
                    }}
                    className="w-full p-6 rounded-xl border-2 border-slate-700 bg-slate-900 hover:border-orange-500 transition-all text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">🏭</span>
                      </div>
                      <div>
                        <h5 className="text-white font-semibold mb-1">Deixou na Oficina</h5>
                        <p className="text-slate-400 text-sm">Cliente deixou equipamento para reparação</p>
                      </div>
                    </div>
                  </button>
                </div>
              )}

              {/* Passo 2: Formulário */}
              {createStep === 'formulario' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <button
                      onClick={() => setCreateStep('tipo')}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      ← Voltar
                    </button>
                    <span className="text-slate-500">|</span>
                    <span className="text-white font-medium">
                      {tipoServico === 'visita' ? '🏠 Visita' : '🏭 Oficina'}
                    </span>
                  </div>

                  {/* Dados do Cliente */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Nome do Cliente *</label>
                      <input
                        type="text"
                        value={formData.cliente}
                        onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">NIF</label>
                      <input
                        type="text"
                        value={formData.nif}
                        onChange={(e) => setFormData({ ...formData, nif: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Contato *</label>
                      <input
                        type="text"
                        value={formData.contato}
                        onChange={(e) => setFormData({ ...formData, contato: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white"
                        required
                      />
                    </div>
                    {tipoServico === 'visita' && (
                      <div>
                        <label className="block text-white font-medium mb-2">Morada *</label>
                        <input
                          type="text"
                          value={formData.morada}
                          onChange={(e) => setFormData({ ...formData, morada: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white"
                          required
                        />
                      </div>
                    )}
                  </div>

                  {/* Dados do Equipamento */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Tipo de Aparelho *</label>
                      <input
                        type="text"
                        value={formData.aparelho}
                        onChange={(e) => setFormData({ ...formData, aparelho: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white"
                        placeholder="Ex: Ar Condicionado, Frigorífico..."
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Marca</label>
                      <input
                        type="text"
                        value={formData.marca}
                        onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Avaria Reportada *</label>
                    <textarea
                      value={formData.avaria}
                      onChange={(e) => setFormData({ ...formData, avaria: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      rows={3}
                      required
                    />
                  </div>

                  {/* Opções */}
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.urgente}
                        onChange={(e) => setFormData({ ...formData, urgente: e.target.checked })}
                        className="w-5 h-5 text-orange-600 border-slate-600 rounded focus:ring-orange-500 bg-slate-700"
                      />
                      <span className="text-white font-medium">🔴 Urgente</span>
                    </label>

                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.garantia}
                        onChange={(e) => setFormData({ ...formData, garantia: e.target.checked })}
                        className="w-5 h-5 text-orange-600 border-slate-600 rounded focus:ring-orange-500 bg-slate-700"
                      />
                      <span className="text-white font-medium">🛡️ É Garantia</span>
                    </label>
                  </div>

                  {/* Campos de Garantia */}
                  {formData.garantia && (
                    <div className="bg-slate-900 rounded-lg p-4 space-y-4">
                      <div>
                        <label className="block text-white font-medium mb-2">Marca da Garantia *</label>
                        <select
                          value={formData.marcaGarantia}
                          onChange={(e) => setFormData({ ...formData, marcaGarantia: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white"
                          required
                        >
                          <option value="">Selecione...</option>
                          {marcasGarantia.map(marca => (
                            <option key={marca} value={marca}>{marca}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">Nº do Processo *</label>
                        <input
                          type="text"
                          value={formData.processoGarantia}
                          onChange={(e) => setFormData({ ...formData, processoGarantia: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white"
                          placeholder="Ex: GAR-2024-001"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Atribuição */}
                  <div>
                    <label className="block text-white font-medium mb-2">Técnico Responsável</label>
                    <select
                      value={formData.tecnico}
                      onChange={(e) => setFormData({ ...formData, tecnico: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white"
                    >
                      <option value="">Por atribuir</option>
                      {tecnicos.map(t => (
                        <option key={t.id} value={t.nome}>{t.nome}</option>
                      ))}
                    </select>
                  </div>

                  {/* Data e Turno */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Data</label>
                      <input
                        type="date"
                        value={formData.dataAgendada}
                        onChange={(e) => setFormData({ ...formData, dataAgendada: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Turno</label>
                      <select
                        value={formData.turno}
                        onChange={(e) => setFormData({ ...formData, turno: e.target.value as 'manha' | 'tarde' })}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      >
                        <option value="manha">🌅 Manhã</option>
                        <option value="tarde">🌆 Tarde</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {createStep === 'formulario' && (
              <div className="p-6 border-t border-slate-700">
                <button
                  onClick={handleCreateService}
                  disabled={!formData.cliente || !formData.contato || !formData.aparelho || !formData.avaria}
                  className="w-full px-6 py-3 bg-orange-600 hover:bg-orange-700 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg font-medium transition-colors"
                >
                  Criar Serviço
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
