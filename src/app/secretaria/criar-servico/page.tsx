'use client';

import { useState } from 'react';
import { Home, Factory, ArrowRight, Check } from 'lucide-react';
import { marcasGarantia, tecnicos } from '@/lib/mock/data';

type Step = 'escolha' | 'formulario' | 'sucesso';
type TipoServico = 'visita' | 'oficina';

export default function CriarServicoPage() {
  const [step, setStep] = useState<Step>('escolha');
  const [tipoServico, setTipoServico] = useState<TipoServico>('visita');
  const [formData, setFormData] = useState({
    cliente: '',
    nif: '',
    contato: '',
    morada: '',
    aparelho: '',
    avaria: '',
    urgente: false,
    garantia: false,
    garantiaMarca: '',
    garantiaProcesso: '',
    marca: '',
    tecnico: '',
    data: '',
    turno: 'manha' as 'manha' | 'tarde'
  });

  const handleEscolha = (tipo: TipoServico) => {
    setTipoServico(tipo);
    setStep('formulario');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simular criação do serviço
    console.log('Criar serviço:', { tipo: tipoServico, ...formData });
    setStep('sucesso');
    
    // Reset após 3 segundos
    setTimeout(() => {
      setStep('escolha');
      setFormData({
        cliente: '',
        nif: '',
        contato: '',
        morada: '',
        aparelho: '',
        avaria: '',
        urgente: false,
        garantia: false,
        garantiaMarca: '',
        garantiaProcesso: '',
        marca: '',
        tecnico: '',
        data: '',
        turno: 'manha'
      });
    }, 3000);
  };

  if (step === 'escolha') {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Criar Novo Serviço</h1>
          <p className="text-slate-600">Escolha o tipo de serviço para começar</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          {/* Visita */}
          <button
            onClick={() => handleEscolha('visita')}
            className="group bg-white border-2 border-slate-200 hover:border-cyan-500 rounded-2xl p-8 transition-all hover:shadow-xl"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-cyan-100 group-hover:bg-cyan-500 rounded-2xl flex items-center justify-center transition-colors">
                <Home className="w-10 h-10 text-cyan-600 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">🏠 Visita ao Cliente</h3>
                <p className="text-slate-600 text-sm">
                  Agendar deslocação ao local do cliente para diagnóstico ou reparação
                </p>
              </div>
              <div className="flex items-center text-cyan-600 font-medium">
                Escolher <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          </button>

          {/* Oficina */}
          <button
            onClick={() => handleEscolha('oficina')}
            className="group bg-white border-2 border-slate-200 hover:border-cyan-500 rounded-2xl p-8 transition-all hover:shadow-xl"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-cyan-100 group-hover:bg-cyan-500 rounded-2xl flex items-center justify-center transition-colors">
                <Factory className="w-10 h-10 text-cyan-600 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">🏭 Deixou na Oficina</h3>
                <p className="text-slate-600 text-sm">
                  Cliente trouxe equipamento para reparação na oficina
                </p>
              </div>
              <div className="flex items-center text-cyan-600 font-medium">
                Escolher <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          </button>
        </div>
      </div>
    );
  }

  if (step === 'sucesso') {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Serviço Criado com Sucesso!</h2>
          <p className="text-slate-600">
            {tipoServico === 'visita' 
              ? 'Visita agendada e técnico notificado' 
              : 'Equipamento registado na oficina'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          {tipoServico === 'visita' ? '🏠 Nova Visita' : '🏭 Equipamento na Oficina'}
        </h1>
        <p className="text-slate-600">Preencha os dados do serviço</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl">
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
          {/* Dados do Cliente */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Dados do Cliente</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nome do Cliente *
                </label>
                <input
                  type="text"
                  required
                  value={formData.cliente}
                  onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Nome completo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  NIF
                </label>
                <input
                  type="text"
                  value={formData.nif}
                  onChange={(e) => setFormData({ ...formData, nif: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="123456789"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Contato *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.contato}
                  onChange={(e) => setFormData({ ...formData, contato: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="912345678"
                />
              </div>
              {tipoServico === 'visita' && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Morada *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.morada}
                    onChange={(e) => setFormData({ ...formData, morada: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Rua, número, cidade"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Dados do Equipamento */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Dados do Equipamento</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tipo de Aparelho *
                </label>
                <input
                  type="text"
                  required
                  value={formData.aparelho}
                  onChange={(e) => setFormData({ ...formData, aparelho: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Ex: Ar Condicionado, Arca, Vitrine..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Marca
                </label>
                <input
                  type="text"
                  value={formData.marca}
                  onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Ex: Daikin, Mitsubishi..."
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Avaria Reportada *
                </label>
                <textarea
                  required
                  value={formData.avaria}
                  onChange={(e) => setFormData({ ...formData, avaria: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Descreva o problema..."
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Opções */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Opções</h3>
            <div className="space-y-4">
              {/* Urgente */}
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.urgente}
                  onChange={(e) => setFormData({ ...formData, urgente: e.target.checked })}
                  className="w-5 h-5 text-cyan-600 border-slate-300 rounded focus:ring-cyan-500"
                />
                <span className="text-slate-700 font-medium">🔴 Marcar como Urgente</span>
              </label>

              {/* Garantia */}
              <div>
                <label className="flex items-center space-x-3 cursor-pointer mb-3">
                  <input
                    type="checkbox"
                    checked={formData.garantia}
                    onChange={(e) => setFormData({ ...formData, garantia: e.target.checked })}
                    className="w-5 h-5 text-cyan-600 border-slate-300 rounded focus:ring-cyan-500"
                  />
                  <span className="text-slate-700 font-medium">🛡️ É Garantia</span>
                </label>

                {formData.garantia && (
                  <div className="ml-8 grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Marca da Garantia *
                      </label>
                      <select
                        required
                        value={formData.garantiaMarca}
                        onChange={(e) => setFormData({ ...formData, garantiaMarca: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      >
                        <option value="">Selecione...</option>
                        {marcasGarantia.map(marca => (
                          <option key={marca} value={marca}>{marca}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Nº do Processo *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.garantiaProcesso}
                        onChange={(e) => setFormData({ ...formData, garantiaProcesso: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        placeholder="GAR-2024-XXX"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Atribuição */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Atribuição</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Técnico Responsável
                </label>
                <select
                  value={formData.tecnico}
                  onChange={(e) => setFormData({ ...formData, tecnico: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="">Por atribuir</option>
                  {tecnicos.map(tec => (
                    <option key={tec.id} value={tec.nome}>
                      {tec.nome} {tec.online ? '🟢' : '⚫'}
                    </option>
                  ))}
                </select>
              </div>
              {tipoServico === 'visita' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Data *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.data}
                      onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Turno *
                    </label>
                    <select
                      required
                      value={formData.turno}
                      onChange={(e) => setFormData({ ...formData, turno: e.target.value as 'manha' | 'tarde' })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    >
                      <option value="manha">🌅 Manhã</option>
                      <option value="tarde">🌆 Tarde</option>
                    </select>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => setStep('escolha')}
              className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-medium transition-colors"
            >
              Voltar
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors"
            >
              Criar Serviço
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
