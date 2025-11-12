// ============================================
// TECNOFRIO - Constantes do Sistema
// ============================================

import { ServiceStatus, ServiceType, UserRole } from './types';

// ============================================
// ESTADOS DE SERVIÇO
// ============================================

export const SERVICE_STATUS_CONFIG: Record<ServiceStatus, {
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
}> = {
  por_fazer: {
    label: 'Por Fazer',
    icon: '📋',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  em_execucao: {
    label: 'Em Execução',
    icon: '🔧',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  },
  na_oficina: {
    label: 'Na Oficina',
    icon: '🏭',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  pedir_peca: {
    label: 'Para Pedir Peça',
    icon: '📦',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200'
  },
  espera_peca: {
    label: 'Em Espera de Peça',
    icon: '⏳',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200'
  },
  a_precificar: {
    label: 'A Precificar',
    icon: '💰',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200'
  },
  entregas: {
    label: 'Entregas',
    icon: '🚚',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200'
  },
  em_debito: {
    label: 'Em Débito',
    icon: '🧾',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  },
  pago: {
    label: 'Pago',
    icon: '✅',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  finalizado: {
    label: 'Finalizados',
    icon: '🏁',
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200'
  }
};

// ============================================
// TAGS AUTOMÁTICAS COM TOOLTIPS
// ============================================

export interface TagConfig {
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  tooltip: string;
  action?: string;
}

export const TAGS: Record<string, TagConfig> = {
  URGENTE: {
    label: 'Urgente',
    icon: '🔴',
    color: 'text-red-700',
    bgColor: 'bg-red-100',
    borderColor: 'border-red-300',
    tooltip: 'Serviço marcado como urgente',
    action: 'Priorize este atendimento'
  },
  GARANTIA: {
    label: 'Garantia',
    icon: '🛡️',
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
    borderColor: 'border-blue-300',
    tooltip: 'Serviço em garantia',
    action: 'Não cobrar cliente'
  },
  OFICINA: {
    label: 'Oficina',
    icon: '⚙️',
    color: 'text-purple-700',
    bgColor: 'bg-purple-100',
    borderColor: 'border-purple-300',
    tooltip: 'Aparelho deixado na oficina',
    action: 'Verificar bancada'
  },
  PAGO_DESLOCACAO: {
    label: 'Pago Deslocação',
    icon: '💸',
    color: 'text-green-700',
    bgColor: 'bg-green-100',
    borderColor: 'border-green-300',
    tooltip: 'Cliente pagou apenas a deslocação',
    action: 'Restante em débito'
  },
  EM_DEBITO: {
    label: 'Em Débito',
    icon: '⚠️',
    color: 'text-orange-700',
    bgColor: 'bg-orange-100',
    borderColor: 'border-orange-300',
    tooltip: 'Pagamento pendente',
    action: 'Contactar cliente para cobrança'
  },
  VISITA: {
    label: 'Visita',
    icon: '🏠',
    color: 'text-cyan-700',
    bgColor: 'bg-cyan-100',
    borderColor: 'border-cyan-300',
    tooltip: 'Serviço de visita ao cliente',
    action: 'Verificar morada e horário'
  },
  ENTREGA: {
    label: 'Entrega',
    icon: '📦',
    color: 'text-indigo-700',
    bgColor: 'bg-indigo-100',
    borderColor: 'border-indigo-300',
    tooltip: 'Aguardando entrega ao cliente',
    action: 'Agendar com técnico'
  },
  CLIENTE_AUSENTE: {
    label: 'Cliente Ausente',
    icon: '🚫',
    color: 'text-rose-700',
    bgColor: 'bg-rose-100',
    borderColor: 'border-rose-300',
    tooltip: 'Cliente não estava presente na entrega',
    action: 'Reagendar nova tentativa'
  },
  TRANSFERENCIA_PENDENTE: {
    label: 'Transferência Pendente',
    icon: '🔄',
    color: 'text-amber-700',
    bgColor: 'bg-amber-100',
    borderColor: 'border-amber-300',
    tooltip: 'Técnico solicitou transferência',
    action: 'Aguardando aceitação de outro técnico'
  }
};

// ============================================
// PERFIS DE USUÁRIO
// ============================================

export const USER_ROLES: Record<UserRole, {
  label: string;
  icon: string;
  color: string;
  description: string;
}> = {
  dono: {
    label: 'Dono',
    icon: '👑',
    color: 'from-yellow-500 to-orange-600',
    description: 'Acesso total ao sistema'
  },
  secretaria: {
    label: 'Secretária',
    icon: '💼',
    color: 'from-blue-500 to-indigo-600',
    description: 'Gestão de serviços e clientes'
  },
  tecnico: {
    label: 'Técnico',
    icon: '🧰',
    color: 'from-green-500 to-teal-600',
    description: 'Execução de serviços'
  }
};

// ============================================
// TIPOS DE SERVIÇO
// ============================================

export const SERVICE_TYPES: Record<ServiceType, {
  label: string;
  icon: string;
}> = {
  visita: { label: 'Visita', icon: '🏠' },
  oficina: { label: 'Oficina', icon: '🏭' },
  entrega: { label: 'Entrega', icon: '📦' }
};

// ============================================
// TURNOS
// ============================================

export const SHIFTS = {
  manha: { label: 'Manhã', icon: '🌅', time: '09:00 - 13:00' },
  tarde: { label: 'Tarde', icon: '🌆', time: '14:00 - 18:00' }
};

// ============================================
// MARCAS DE GARANTIA
// ============================================

export const WARRANTY_BRANDS = [
  'Marca A',
  'Marca B',
  'Marca C',
  'Marca D',
  'Marca E',
  'Marca F'
];

// ============================================
// TERMÔMETRO DE TEMPO (OFICINA)
// ============================================

export const WORKSHOP_TIME_THRESHOLDS = {
  GREEN: { max: 2, color: 'text-green-600 bg-green-100', icon: '🟢', label: '≤2 dias' },
  YELLOW: { max: 4, color: 'text-yellow-600 bg-yellow-100', icon: '🟡', label: '≤4 dias' },
  RED: { max: Infinity, color: 'text-red-600 bg-red-100', icon: '🔴', label: '5+ dias' }
};

export function getWorkshopTimeColor(days: number) {
  if (days <= 2) return WORKSHOP_TIME_THRESHOLDS.GREEN;
  if (days <= 4) return WORKSHOP_TIME_THRESHOLDS.YELLOW;
  return WORKSHOP_TIME_THRESHOLDS.RED;
}

// ============================================
// OPÇÕES DE PAGAMENTO
// ============================================

export const PAYMENT_OPTIONS = [
  { value: 'nao_pago', label: 'Não Pagou' },
  { value: 'pago_deslocacao', label: 'Só Deslocação' },
  { value: 'pago', label: 'Pagou' },
  { value: 'garantia', label: 'É Garantia' }
];

// ============================================
// NAVEGAÇÃO POR PERFIL
// ============================================

export const NAVIGATION = {
  dono: [
    { label: 'Dashboard', icon: '📊', href: '/dono/dashboard' },
    { label: 'Oficina', icon: '🏭', href: '/dono/oficina' },
    { label: 'Monitor de Técnicos', icon: '🧠', href: '/dono/tecnicos' },
    { label: 'Serviços', icon: '🗂️', href: '/dono/servicos' },
    { label: 'Notificações', icon: '💬', href: '/dono/notificacoes' }
  ],
  secretaria: [
    { label: 'Geral', icon: '🏠', href: '/secretaria/geral' },
    { label: 'Criar Serviço', icon: '🧩', href: '/secretaria/criar' },
    { label: 'Oficina', icon: '🏭', href: '/secretaria/oficina' },
    { label: 'Entregas', icon: '🚚', href: '/secretaria/entregas' },
    { label: 'Em Débito', icon: '💰', href: '/secretaria/debito' },
    { label: 'Monitor de Técnicos', icon: '🧠', href: '/secretaria/tecnicos' }
  ],
  tecnico: [
    { label: 'Serviços', icon: '📋', href: '/tecnico/servicos' },
    { label: 'Oficina', icon: '🏭', href: '/tecnico/oficina' },
    { label: 'Notificações', icon: '🔔', href: '/tecnico/notificacoes' }
  ]
};

// ============================================
// FLUXO DE ESTADOS (TRANSIÇÕES PERMITIDAS)
// ============================================

export const STATE_TRANSITIONS: Record<ServiceStatus, ServiceStatus[]> = {
  por_fazer: ['em_execucao'],
  em_execucao: ['na_oficina', 'a_precificar', 'em_debito'],
  na_oficina: ['pedir_peca', 'a_precificar', 'na_oficina'],
  pedir_peca: ['espera_peca'],
  espera_peca: ['a_precificar'],
  a_precificar: ['em_debito', 'pago'],
  entregas: ['pago', 'em_debito', 'entregas'],
  em_debito: ['pago', 'entregas'],
  pago: ['finalizado'],
  finalizado: []
};
