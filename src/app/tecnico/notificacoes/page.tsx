'use client';

import { useState } from 'react';
import { notificacoes } from '@/lib/mock/data';
import { Check, Eye, UserCheck, X } from 'lucide-react';

export default function TecnicoNotificacoesPage() {
  const [notifications, setNotifications] = useState(notificacoes);
  const [selectedNotif, setSelectedNotif] = useState<any>(null);

  const handleMarcarLida = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, lida: true } : n
    ));
  };

  const handleAbrirServico = (servicoId: string) => {
    alert(`Abrir serviço ${servicoId} (simulado)`);
  };

  const getIconColor = (tipo: string) => {
    const colors: Record<string, string> = {
      peca_pedida: 'bg-blue-500/20 text-blue-400',
      pagamento: 'bg-green-500/20 text-green-400',
      entrega: 'bg-purple-500/20 text-purple-400',
      tecnico_iniciou: 'bg-orange-500/20 text-orange-400',
      finalizado: 'bg-cyan-500/20 text-cyan-400',
      atribuicao: 'bg-yellow-500/20 text-yellow-400',
      transferencia: 'bg-pink-500/20 text-pink-400'
    };
    return colors[tipo] || 'bg-slate-500/20 text-slate-400';
  };

  const naoLidas = notifications.filter(n => !n.lida).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">🔔 Notificações</h1>
        <p className="text-slate-400">
          {naoLidas > 0 ? `${naoLidas} notificação${naoLidas > 1 ? 'ões' : ''} não lida${naoLidas > 1 ? 's' : ''}` : 'Todas as notificações lidas'}
        </p>
      </div>

      {/* Timeline de Notificações */}
      <div className="space-y-4">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`bg-slate-800 border rounded-xl p-6 transition-all ${
              notif.lida 
                ? 'border-slate-700 opacity-60' 
                : 'border-orange-500 shadow-lg shadow-orange-500/10'
            }`}
          >
            <div className="flex gap-4">
              {/* Ícone */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getIconColor(notif.tipo)}`}>
                <span className="text-2xl">{notif.icone}</span>
              </div>

              {/* Conteúdo */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-white font-semibold">{notif.titulo}</h3>
                  {!notif.lida && (
                    <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded-full flex-shrink-0">
                      Nova
                    </span>
                  )}
                </div>
                <p className="text-slate-400 text-sm mb-3">{notif.descricao}</p>
                <p className="text-slate-500 text-xs mb-4">
                  {notif.data.toLocaleDateString('pt-PT')} às {notif.data.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}
                </p>

                {/* Ações */}
                <div className="flex flex-wrap gap-2">
                  {!notif.lida && (
                    <button
                      onClick={() => handleMarcarLida(notif.id)}
                      className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Marcar Lida
                    </button>
                  )}
                  <button
                    onClick={() => handleAbrirServico(notif.servicoId)}
                    className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm transition-colors flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Abrir Serviço
                  </button>
                  {notif.tipo === 'transferencia' && !notif.lida && (
                    <button
                      onClick={() => {
                        alert('Transferência aceite (simulado)');
                        handleMarcarLida(notif.id);
                      }}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors flex items-center gap-2"
                    >
                      <UserCheck className="w-4 h-4" />
                      Aceitar Transferência
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Nenhuma notificação</p>
          </div>
        )}
      </div>

      {/* Modal de Detalhes (opcional) */}
      {selectedNotif && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl max-w-md w-full p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">{selectedNotif.titulo}</h3>
              <button
                onClick={() => setSelectedNotif(null)}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <p className="text-slate-300 mb-4">{selectedNotif.descricao}</p>
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedNotif(null)}
                className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                Fechar
              </button>
              <button
                onClick={() => handleAbrirServico(selectedNotif.servicoId)}
                className="flex-1 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
              >
                Abrir Serviço
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
