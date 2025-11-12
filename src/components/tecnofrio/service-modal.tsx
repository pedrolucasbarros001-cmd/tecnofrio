'use client';

import { Service } from '@/lib/mock/data';
import { X, FileText, MessageSquare, History, ClipboardList } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface ServiceModalProps {
  service: Service;
  onClose: () => void;
  theme?: 'dark' | 'light';
  readOnly?: boolean;
}

export function ServiceModal({ service, onClose, theme = 'dark', readOnly = false }: ServiceModalProps) {
  const [activeTab, setActiveTab] = useState<'resumo' | 'inquerito' | 'observacoes' | 'log'>('resumo');
  const isDark = theme === 'dark';

  const tabs = [
    { id: 'resumo', label: 'Resumo', icon: FileText },
    { id: 'inquerito', label: 'Inquérito', icon: ClipboardList },
    { id: 'observacoes', label: 'Observações', icon: MessageSquare },
    { id: 'log', label: 'Log', icon: History },
  ] as const;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        className={cn(
          'w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden',
          isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
        )}
      >
        {/* Header */}
        <div className={cn('p-6 border-b', isDark ? 'border-slate-800' : 'border-slate-200')}>
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold">{service.codigo}</h2>
              <p className={cn('text-sm mt-1', isDark ? 'text-slate-400' : 'text-slate-600')}>
                {service.cliente}
              </p>
              {readOnly && (
                <span className={cn('text-xs mt-2 inline-block', isDark ? 'text-slate-500' : 'text-slate-500')}>
                  🔒 Visualização somente leitura
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className={cn(
                'p-2 rounded-lg transition-colors',
                isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
              )}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  'px-3 py-1 rounded-full text-xs font-medium',
                  isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className={cn('border-b', isDark ? 'border-slate-800' : 'border-slate-200')}>
          <div className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex items-center gap-2 px-6 py-4 border-b-2 transition-colors',
                    activeTab === tab.id
                      ? isDark
                        ? 'border-amber-500 text-amber-500'
                        : 'border-cyan-500 text-cyan-600'
                      : isDark
                      ? 'border-transparent text-slate-400 hover:text-white'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'resumo' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={cn('text-sm font-medium', isDark ? 'text-slate-400' : 'text-slate-600')}>
                    Cliente
                  </label>
                  <p className="mt-1">{service.cliente}</p>
                </div>
                <div>
                  <label className={cn('text-sm font-medium', isDark ? 'text-slate-400' : 'text-slate-600')}>
                    Contato
                  </label>
                  <p className="mt-1">{service.contato}</p>
                </div>
                <div>
                  <label className={cn('text-sm font-medium', isDark ? 'text-slate-400' : 'text-slate-600')}>
                    Aparelho
                  </label>
                  <p className="mt-1">{service.aparelho}</p>
                </div>
                <div>
                  <label className={cn('text-sm font-medium', isDark ? 'text-slate-400' : 'text-slate-600')}>
                    Marca
                  </label>
                  <p className="mt-1">{service.marca || 'Não especificada'}</p>
                </div>
                {service.morada && (
                  <div className="col-span-2">
                    <label className={cn('text-sm font-medium', isDark ? 'text-slate-400' : 'text-slate-600')}>
                      Morada
                    </label>
                    <p className="mt-1">{service.morada}</p>
                  </div>
                )}
                <div className="col-span-2">
                  <label className={cn('text-sm font-medium', isDark ? 'text-slate-400' : 'text-slate-600')}>
                    Avaria
                  </label>
                  <p className="mt-1">{service.avaria}</p>
                </div>
                {service.tecnico && (
                  <div>
                    <label className={cn('text-sm font-medium', isDark ? 'text-slate-400' : 'text-slate-600')}>
                      Técnico
                    </label>
                    <p className="mt-1">{service.tecnico}</p>
                  </div>
                )}
                {service.garantia && (
                  <>
                    <div>
                      <label className={cn('text-sm font-medium', isDark ? 'text-slate-400' : 'text-slate-600')}>
                        Garantia
                      </label>
                      <p className="mt-1">{service.garantiaMarca}</p>
                    </div>
                    <div>
                      <label className={cn('text-sm font-medium', isDark ? 'text-slate-400' : 'text-slate-600')}>
                        Nº Processo
                      </label>
                      <p className="mt-1">{service.garantiaProcesso}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {activeTab === 'inquerito' && (
            <div className="space-y-4">
              {service.contexto && (
                <div>
                  <label className={cn('text-sm font-medium', isDark ? 'text-slate-400' : 'text-slate-600')}>
                    Contexto
                  </label>
                  <p className="mt-2">{service.contexto}</p>
                </div>
              )}
              {service.diagnostico && (
                <div>
                  <label className={cn('text-sm font-medium', isDark ? 'text-slate-400' : 'text-slate-600')}>
                    Diagnóstico
                  </label>
                  <p className="mt-2">{service.diagnostico}</p>
                </div>
              )}
              {service.pecasUsadas && service.pecasUsadas.length > 0 && (
                <div>
                  <label className={cn('text-sm font-medium', isDark ? 'text-slate-400' : 'text-slate-600')}>
                    Peças Usadas
                  </label>
                  <div className="mt-2 space-y-2">
                    {service.pecasUsadas.map((peca, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          'p-3 rounded-lg',
                          isDark ? 'bg-slate-800' : 'bg-slate-100'
                        )}
                      >
                        <div className="flex justify-between">
                          <span className="font-medium">{peca.nome}</span>
                          <span className={cn('text-sm', isDark ? 'text-slate-400' : 'text-slate-600')}>
                            Qtd: {peca.qtd}
                          </span>
                        </div>
                        <div className={cn('text-sm mt-1', isDark ? 'text-slate-400' : 'text-slate-600')}>
                          Ref: {peca.ref}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {!service.contexto && !service.diagnostico && !service.pecasUsadas && (
                <p className={cn('text-center py-8', isDark ? 'text-slate-500' : 'text-slate-400')}>
                  Nenhum inquérito registrado ainda
                </p>
              )}
            </div>
          )}

          {activeTab === 'observacoes' && (
            <div>
              {service.observacoesAdmin ? (
                <p>{service.observacoesAdmin}</p>
              ) : (
                <p className={cn('text-center py-8', isDark ? 'text-slate-500' : 'text-slate-400')}>
                  Sem observações administrativas
                </p>
              )}
            </div>
          )}

          {activeTab === 'log' && (
            <div className="space-y-3">
              {service.log.map((entry, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'p-4 rounded-lg border-l-4',
                    isDark
                      ? 'bg-slate-800 border-amber-500'
                      : 'bg-slate-50 border-cyan-500'
                  )}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{entry.acao}</p>
                      <p className={cn('text-sm mt-1', isDark ? 'text-slate-400' : 'text-slate-600')}>
                        {entry.usuario}
                      </p>
                    </div>
                    <span className={cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-400')}>
                      {entry.data.toLocaleDateString('pt-PT')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
