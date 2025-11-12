'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { USER_ROLES } from '@/lib/constants';
import { signIn, signUp, getDefaultRoute } from '@/lib/auth';
import type { UserRole } from '@/lib/types';

export default function AuthPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  useEffect(() => {
    // Recuperar role selecionado
    const role = localStorage.getItem('selectedRole') as UserRole;
    if (!role) {
      router.push('/');
      return;
    }
    setSelectedRole(role);
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validação básica
    if (!formData.emailOrPhone || !formData.password) {
      setError('Preencha todos os campos obrigatórios');
      return;
    }

    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        setError('As senhas não coincidem');
        return;
      }
      if (!formData.name) {
        setError('Nome é obrigatório');
        return;
      }
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        // Login
        const result = await signIn(formData.emailOrPhone, formData.password);
        
        if (!result.success) {
          setError(result.error || 'Erro ao fazer login');
          setIsLoading(false);
          return;
        }

        // Redirecionar para painel correto
        const defaultRoute = getDefaultRoute(result.user!.role);
        router.push(defaultRoute);
      } else {
        // Cadastro
        const result = await signUp(
          formData.emailOrPhone,
          formData.password,
          formData.name,
          selectedRole!
        );

        if (!result.success) {
          setError(result.error || 'Erro ao criar conta');
          setIsLoading(false);
          return;
        }

        // Após cadastro, fazer login automático
        const loginResult = await signIn(formData.emailOrPhone, formData.password);
        
        if (loginResult.success) {
          const defaultRoute = getDefaultRoute(selectedRole!);
          router.push(defaultRoute);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Erro inesperado');
      setIsLoading(false);
    }
  };

  if (!selectedRole) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const roleConfig = USER_ROLES[selectedRole];
  const canCreateAccount = selectedRole === 'dono' || selectedRole === 'secretaria';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar
          </button>

          <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${roleConfig.color} rounded-2xl mb-4 shadow-lg`}>
            <span className="text-3xl">{roleConfig.icon}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isLogin ? 'Entrar' : 'Criar Conta'}
          </h1>
          <p className="text-gray-600">
            Acesso como <span className="font-semibold">{roleConfig.label}</span>
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nome (apenas no cadastro) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Seu nome"
                  required={!isLogin}
                  disabled={isLoading}
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.emailOrPhone}
                onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="email@exemplo.com"
                required
                disabled={isLoading}
              />
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
            </div>

            {/* Confirmar Senha (apenas no cadastro) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required={!isLogin}
                  disabled={isLoading}
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-xl text-white font-semibold bg-gradient-to-r ${roleConfig.color} hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processando...
                </span>
              ) : (
                isLogin ? 'Entrar' : 'Criar Conta'
              )}
            </button>
          </form>

          {/* Toggle Login/Cadastro */}
          {canCreateAccount && (
            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                disabled={isLoading}
              >
                {isLogin ? 'Não tem conta? Criar conta' : 'Já tem conta? Entrar'}
              </button>
            </div>
          )}

          {/* Aviso para Técnico */}
          {selectedRole === 'tecnico' && !isLogin && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs text-yellow-800">
                ⚠️ Contas de técnico são criadas pelo Dono ou Secretária
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>TECNOFRIO © 2024 - Sistema de Gestão</p>
        </div>
      </div>
    </div>
  );
}
