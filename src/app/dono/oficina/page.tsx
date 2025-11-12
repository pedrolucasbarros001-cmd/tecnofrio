'use client';

import { useState } from 'react';
import { getServicosByStatus, tecnicos, getTempoParadoColor } from '@/lib/mock/data';
import { FileText, Printer, Edit, ArrowRight, User } from 'lucide-react';

export default function DonoOficinaPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const servicosOficina = getServicosByStatus('na_oficina');

  const servicosFiltrados = servicosOficina.filter(s =>
    s.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.aparelho.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">🏭 Oficina</h1>
        <p className="text-slate-400">Serviços em reparação na oficina</p>
      </div>

      {/* Busca */}
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por cliente, código ou aparelho..."
          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500"
        />
      </div>

      {/* Tabela */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Código</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Cliente</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Aparelho</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Técnico</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Tempo Parado</th>
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
                  <td className="px-6 py-4 text-slate-300">{service.tecnico || 'Não atribuído'}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">
                        {service.tempoParado && service.tempoParado <= 2 && '🟢'}
                        {service.tempoParado && service.tempoParado > 2 && service.tempoParado <= 4 && '🟡'}
                        {service.tempoParado && service.tempoParado > 4 && '🔴'}
                      </span>
                      <span className={`font-bold ${getTempoParadoColor(service.tempoParado)}`}>
                        {service.tempoParado}d
                      </span>
                    </div>
                  </td>
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
                      <button
                        onClick={() => alert('Editar observações (simulado)')}
                        className="p-2 hover:bg-slate-600 rounded-lg transition-colors"
                        title="Editar observações"
                      >
                        <Edit className="w-4 h-4 text-slate-400" />
                      </button>
                      <button
                        onClick={() => alert('Atribuir técnico (simulado)')}
                        className="p-2 hover:bg-slate-600 rounded-lg transition-colors"
                        title="Atribuir técnico"
                      >
                        <User className="w-4 h-4 text-slate-400" />
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
            <p>Nenhum serviço na oficina</p>
          </div>
        )}
      </div>
    </div>
  );
}
