'use client';

import { useState } from 'react';
import { tecnicos, servicos } from '@/lib/mock/data';
import { User, Clock, CheckCircle, X } from 'lucide-react';

export default function DonoTecnicosPage() {
  const [selectedTecnico, setSelectedTecnico] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const handleVerServicos = (tecnico: any) => {
    setSelectedTecnico(tecnico);
    setShowModal(true);
  };

  const servicosDoTecnico = selectedTecnico
    ? servicos.filter(s => s.tecnico === selectedTecnico.nome)
    : [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">🧠 Monitor de Técnicos</h1>
        <p className="text-slate-400">Acompanhamento de desempenho e serviços</p>
      </div>

      {/* Cards de Técnicos */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tecnicos.map((tecnico) => (
          <div
            key={tecnico.id}
            className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-orange-500 transition-all cursor-pointer"
            onClick={() => handleVerServicos(tecnico)}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-slate-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{tecnico.nome}</h3>
                  <p className="text-slate-400 text-sm">{tecnico.especialidade}</p>
                </div>
              </div>
              <span className={`text-2xl ${tecnico.online ? '🟢' : '⚫'}`} />
            </div>

            {/* Stats */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">Status</span>
                <span className={`font-medium ${tecnico.online ? 'text-green-400' : 'text-slate-500'}`}>
                  {tecnico.online ? 'Online' : 'Offline'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">Serviços Ativos</span>
                <span className="text-white font-bold">{tecnico.servicosAtivos}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">Tempo Médio</span>
                <span className="text-white font-medium">{tecnico.tempoMedio}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">Concluídos (mês)</span>
                <span className="text-green-400 font-bold">{tecnico.concluidos}</span>
              </div>
            </div>

            {/* Botão */}
            <button className="w-full mt-4 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm">
              Ver Serviços
            </button>
          </div>
        ))}
      </div>

      {/* Modal de Serviços do Técnico */}
      {showModal && selectedTecnico && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-slate-700">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <div>
                <h3 className="text-xl font-bold text-white">{selectedTecnico.nome}</h3>
                <p className="text-slate-400 text-sm">{servicosDoTecnico.length} serviços ativos</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Lista de Serviços */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {servicosDoTecnico.map((service) => (
                  <div
                    key={service.id}
                    className="bg-slate-900 rounded-lg p-4 border border-slate-700"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{service.codigo}</span>
                      <span className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs">
                        {service.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-slate-300 text-sm mb-1">{service.cliente}</p>
                    <p className="text-slate-400 text-sm">{service.aparelho}</p>
                    <div className="flex gap-1 mt-2">
                      {service.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-slate-800 text-slate-400 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}

                {servicosDoTecnico.length === 0 && (
                  <div className="text-center py-12 text-slate-500">
                    <p>Nenhum serviço ativo</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
