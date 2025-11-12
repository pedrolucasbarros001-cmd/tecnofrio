'use client';

import { useState } from 'react';
import { getServicosByStatus, getTempoParadoColor } from '@/lib/mock/data';
import { Play, X, Camera, CheckCircle, AlertCircle } from 'lucide-react';

type InqueritoStep = 'contexto' | 'diagnostico' | 'pecas' | 'resultado' | 'concluido';

export default function TecnicoOficinaPage() {
  const [showInquerito, setShowInquerito] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [inqueritoStep, setInqueritoStep] = useState<InqueritoStep>('contexto');
  const [inqueritoData, setInqueritoData] = useState({
    contexto: '',
    foto: false,
    diagnostico: '',
    causa: '',
    pecas: [] as Array<{ nome: string; ref: string; qtd: number }>,
    resultado: '' as 'concluida' | 'nao_concluida' | '',
    precisaPeca: false
  });

  const servicosOficina = getServicosByStatus('na_oficina');

  const handleReparar = (service: any) => {
    setSelectedService(service);
    setShowInquerito(true);
    setInqueritoStep('contexto');
  };

  const handleNextStep = () => {
    if (inqueritoStep === 'contexto' && inqueritoData.contexto && inqueritoData.foto) {
      setInqueritoStep('diagnostico');
    } else if (inqueritoStep === 'diagnostico' && inqueritoData.diagnostico) {
      setInqueritoStep('pecas');
    } else if (inqueritoStep === 'pecas') {
      setInqueritoStep('resultado');
    } else if (inqueritoStep === 'resultado' && inqueritoData.resultado) {
      if (inqueritoData.resultado === 'concluida') {
        // Vai direto para A Precificar (sem perguntar pagamento)
        setInqueritoStep('concluido');
        setTimeout(() => {
          alert('Serviço movido para "A Precificar"');
          setShowInquerito(false);
          resetInquerito();
        }, 2000);
      } else if (inqueritoData.precisaPeca) {
        // Simular envio para "Pedir Peça"
        alert('Serviço movido para "Para Pedir Peça"');
        setShowInquerito(false);
        resetInquerito();
      } else {
        // Permanece na oficina
        alert('Serviço permanece na oficina');
        setShowInquerito(false);
        resetInquerito();
      }
    }
  };

  const resetInquerito = () => {
    setInqueritoData({
      contexto: '',
      foto: false,
      diagnostico: '',
      causa: '',
      pecas: [],
      resultado: '',
      precisaPeca: false
    });
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
        <h1 className="text-3xl font-bold text-white mb-2">🏭 Oficina</h1>
        <p className="text-slate-400">Serviços de bancada para reparação</p>
      </div>

      {/* Lista de Serviços */}
      <div className="space-y-4">
        {servicosOficina.map((service) => (
          <div
            key={service.id}
            className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-orange-500 transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-lg font-bold text-white">{service.codigo}</span>
                  <span className={`text-2xl ${getTempoParadoColor(service.tempoParado)}`}>
                    {service.tempoParado && service.tempoParado <= 2 && '🟢'}
                    {service.tempoParado && service.tempoParado > 2 && service.tempoParado <= 4 && '🟡'}
                    {service.tempoParado && service.tempoParado > 4 && '🔴'}
                  </span>
                  <span className={`font-bold ${getTempoParadoColor(service.tempoParado)}`}>
                    {service.tempoParado}d
                  </span>
                </div>
                <p className="text-white font-medium mb-1">{service.cliente}</p>
                <p className="text-slate-400 text-sm mb-2">{service.aparelho} - {service.marca}</p>
                <p className="text-slate-400 text-sm">Avaria: {service.avaria}</p>
                <div className="flex gap-2 mt-2">
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

              {/* Ação */}
              <button
                onClick={() => handleReparar(service)}
                className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" />
                Reparar Aparelho
              </button>
            </div>
          </div>
        ))}

        {servicosOficina.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <p>Nenhum serviço na oficina</p>
          </div>
        )}
      </div>

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
              {/* Step 1: Contexto */}
              {inqueritoStep === 'contexto' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">1️⃣ Contexto Inicial</h4>
                    <textarea
                      value={inqueritoData.contexto}
                      onChange={(e) => setInqueritoData({ ...inqueritoData, contexto: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-orange-500"
                      placeholder="Descreva o estado do equipamento ao receber..."
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-3">📷 Foto Obrigatória</label>
                    <button
                      onClick={() => setInqueritoData({ ...inqueritoData, foto: true })}
                      className={`w-full px-4 py-3 border-2 border-dashed rounded-lg transition-colors flex items-center justify-center gap-2 ${
                        inqueritoData.foto
                          ? 'bg-green-500/10 border-green-500 text-green-400'
                          : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      <Camera className="w-5 h-5" />
                      {inqueritoData.foto ? '✓ Foto Adicionada' : 'Tirar Foto'}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Diagnóstico */}
              {inqueritoStep === 'diagnostico' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">2️⃣ Diagnóstico</h4>
                    <textarea
                      value={inqueritoData.diagnostico}
                      onChange={(e) => setInqueritoData({ ...inqueritoData, diagnostico: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-orange-500"
                      placeholder="Qual o problema identificado?"
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Causa Provável (opcional)</label>
                    <input
                      type="text"
                      value={inqueritoData.causa}
                      onChange={(e) => setInqueritoData({ ...inqueritoData, causa: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500"
                      placeholder="Ex: Compressor avariado, falta de gás..."
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Peças */}
              {inqueritoStep === 'pecas' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">3️⃣ Peças Utilizadas</h4>
                    <p className="text-slate-400 text-sm mb-4">Adicione as peças usadas (opcional)</p>
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
                    className="w-full px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                  >
                    + Adicionar Peça
                  </button>
                </div>
              )}

              {/* Step 4: Resultado */}
              {inqueritoStep === 'resultado' && (
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-white mb-4">4️⃣ Resultado</h4>

                  <div className="space-y-3">
                    <button
                      onClick={() => setInqueritoData({ ...inqueritoData, resultado: 'concluida', precisaPeca: false })}
                      className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                        inqueritoData.resultado === 'concluida'
                          ? 'border-green-500 bg-green-500/10'
                          : 'border-slate-700 bg-slate-900 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <CheckCircle className="w-8 h-8 text-green-500" />
                        <div>
                          <h5 className="text-white font-semibold mb-1">✅ Concluída</h5>
                          <p className="text-slate-400 text-sm">Reparação finalizada - vai para precificar</p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => setInqueritoData({ ...inqueritoData, resultado: 'nao_concluida' })}
                      className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                        inqueritoData.resultado === 'nao_concluida'
                          ? 'border-orange-500 bg-orange-500/10'
                          : 'border-slate-700 bg-slate-900 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <AlertCircle className="w-8 h-8 text-orange-500" />
                        <div>
                          <h5 className="text-white font-semibold mb-1">⚠️ Não Concluída</h5>
                          <p className="text-slate-400 text-sm">Precisa de mais ações</p>
                        </div>
                      </div>
                    </button>
                  </div>

                  {inqueritoData.resultado === 'nao_concluida' && (
                    <div className="bg-slate-900 rounded-lg p-4">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={inqueritoData.precisaPeca}
                          onChange={(e) => setInqueritoData({ ...inqueritoData, precisaPeca: e.target.checked })}
                          className="w-5 h-5 text-orange-600 border-slate-600 rounded focus:ring-orange-500 bg-slate-700"
                        />
                        <span className="text-white font-medium">📦 Precisa pedir peça?</span>
                      </label>
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
                  <h4 className="text-2xl font-bold text-white mb-2">Reparação Registada!</h4>
                  <p className="text-slate-400">Serviço movido para A Precificar</p>
                  <p className="text-slate-500 text-sm mt-2">O dono pode adicionar custos adicionais se necessário</p>
                </div>
              )}
            </div>

            {/* Footer */}
            {inqueritoStep !== 'concluido' && (
              <div className="p-6 border-t border-slate-700">
                <button
                  onClick={handleNextStep}
                  disabled={
                    (inqueritoStep === 'contexto' && (!inqueritoData.contexto || !inqueritoData.foto)) ||
                    (inqueritoStep === 'diagnostico' && !inqueritoData.diagnostico) ||
                    (inqueritoStep === 'resultado' && !inqueritoData.resultado)
                  }
                  className="w-full px-6 py-3 bg-orange-600 hover:bg-orange-700 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg font-medium transition-colors"
                >
                  {inqueritoStep === 'resultado' && inqueritoData.resultado === 'concluida' ? 'Finalizar para Precificar' : 'Continuar'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
