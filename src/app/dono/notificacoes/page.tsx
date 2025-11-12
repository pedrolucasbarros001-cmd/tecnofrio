'use client';

import { useState } from 'react';
import { notificacoes } from '@/lib/mock/data';
import { Check, Eye } from 'lucide-react';

export default function DonoNotificacoes() {
  const [notifications, setNotifications] = useState(notificacoes);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, lida: true } : n)
    );
  };

  const unreadCount = notifications.filter(n => !n.lida).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Notificações</h1>
        <p className="text-slate-400">
          {unreadCount > 0 ? `${unreadCount} não lidas` : 'Todas lidas'}
        </p>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`bg-slate-900 rounded-xl p-6 border transition-all duration-300 ${
              notif.lida
                ? 'border-slate-800 opacity-60'
                : 'border-amber-500/50 shadow-lg shadow-amber-500/10'
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Ícone */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                  notif.cor === 'blue' ? 'bg-blue-500/20' :
                  notif.cor === 'green' ? 'bg-green-500/20' :
                  notif.cor === 'purple' ? 'bg-purple-500/20' :
                  notif.cor === 'orange' ? 'bg-orange-500/20' :
                  'bg-cyan-500/20'
                }`}
              >
                {notif.icone}
              </div>

              {/* Conteúdo */}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">{notif.titulo}</h3>
                <p className="text-slate-400 text-sm mb-2">{notif.descricao}</p>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span>{notif.data.toLocaleDateString('pt-PT')}</span>
                  <span>{notif.data.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>

              {/* Ações */}
              <div className="flex gap-2">
                {!notif.lida && (
                  <button
                    onClick={() => markAsRead(notif.id)}
                    className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                    title="Marcar como lida"
                  >
                    <Check className="w-4 h-4 text-white" />
                  </button>
                )}
                <button
                  onClick={() => alert(`Abrir serviço ${notif.servicoId} (simulado)`)}
                  className="p-2 bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors"
                  title="Abrir serviço"
                >
                  <Eye className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">Nenhuma notificação</p>
        </div>
      )}
    </div>
  );
}
