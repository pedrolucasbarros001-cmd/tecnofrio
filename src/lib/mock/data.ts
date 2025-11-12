// Dados simulados para o sistema TECNOFRIO

export type ServiceStatus = 
  | 'por_fazer' 
  | 'em_execucao' 
  | 'na_oficina' 
  | 'pedir_peca' 
  | 'espera_peca' 
  | 'a_precificar' 
  | 'entregas' 
  | 'em_debito' 
  | 'pago' 
  | 'finalizado';

export type ServiceType = 'visita' | 'oficina' | 'entrega';

export interface Service {
  id: string;
  codigo: string;
  cliente: string;
  nif?: string;
  contato: string;
  morada?: string;
  aparelho: string;
  marca?: string;
  avaria: string;
  tipo: ServiceType;
  status: ServiceStatus;
  tecnico?: string;
  dataCriacao: Date;
  dataAgendada?: Date;
  turno?: 'manha' | 'tarde';
  tempoParado?: number; // dias
  tags: string[];
  urgente: boolean;
  garantia: boolean;
  garantiaMarca?: string;
  garantiaProcesso?: string;
  valorPendente?: number;
  valorRecebido?: number;
  metodoPagamento?: string;
  contexto?: string;
  diagnostico?: string;
  pecasUsadas?: Array<{ nome: string; ref: string; qtd: number }>;
  fotos?: string[];
  observacoesAdmin?: string;
  log: Array<{ data: Date; acao: string; usuario: string }>;
}

export interface Tecnico {
  id: string;
  nome: string;
  online: boolean;
  tempoMedio: number; // minutos
  servicosAtivos: number;
  avatar?: string;
}

export interface Notification {
  id: string;
  tipo: 'peca_pedida' | 'pagamento' | 'entrega' | 'tecnico_iniciou' | 'finalizado' | 'atribuicao' | 'transferencia';
  titulo: string;
  descricao: string;
  servicoId: string;
  data: Date;
  lida: boolean;
  icone: string;
  cor: string;
}

// Mock de técnicos
export const tecnicos: Tecnico[] = [
  { id: 't1', nome: 'João Silva', online: true, tempoMedio: 45, servicosAtivos: 3 },
  { id: 't2', nome: 'Maria Santos', online: true, tempoMedio: 38, servicosAtivos: 2 },
  { id: 't3', nome: 'Pedro Costa', online: false, tempoMedio: 52, servicosAtivos: 1 },
  { id: 't4', nome: 'Ana Ferreira', online: true, tempoMedio: 41, servicosAtivos: 4 },
];

// Mock de serviços
export const servicos: Service[] = [
  {
    id: 's1',
    codigo: 'TF-2024-001',
    cliente: 'Carlos Mendes',
    nif: '123456789',
    contato: '912345678',
    morada: 'Rua das Flores, 123, Lisboa',
    aparelho: 'Ar Condicionado',
    marca: 'Daikin',
    avaria: 'Não arrefece',
    tipo: 'visita',
    status: 'por_fazer',
    tecnico: 'João Silva',
    dataCriacao: new Date('2024-01-15'),
    dataAgendada: new Date('2024-01-20'),
    turno: 'manha',
    tags: ['🏠 Visita'],
    urgente: false,
    garantia: false,
    log: [
      { data: new Date('2024-01-15'), acao: 'Serviço criado', usuario: 'Secretária' }
    ]
  },
  {
    id: 's2',
    codigo: 'TF-2024-002',
    cliente: 'Loja Central',
    nif: '987654321',
    contato: '913456789',
    aparelho: 'Câmara Frigorífica',
    marca: 'Zanotti',
    avaria: 'Temperatura instável',
    tipo: 'oficina',
    status: 'na_oficina',
    tecnico: 'Maria Santos',
    dataCriacao: new Date('2024-01-10'),
    tempoParado: 3,
    tags: ['⚙️ Oficina'],
    urgente: true,
    garantia: false,
    log: [
      { data: new Date('2024-01-10'), acao: 'Equipamento deixado na oficina', usuario: 'Secretária' },
      { data: new Date('2024-01-12'), acao: 'Técnico iniciou diagnóstico', usuario: 'Maria Santos' }
    ]
  },
  {
    id: 's3',
    codigo: 'TF-2024-003',
    cliente: 'Restaurante Sabor',
    nif: '456789123',
    contato: '914567890',
    aparelho: 'Arca Congeladora',
    marca: 'Electrolux',
    avaria: 'Não congela',
    tipo: 'oficina',
    status: 'pedir_peca',
    tecnico: 'Pedro Costa',
    dataCriacao: new Date('2024-01-08'),
    tempoParado: 5,
    tags: ['⚙️ Oficina', '📦 Peça'],
    urgente: false,
    garantia: true,
    garantiaMarca: 'Electrolux',
    garantiaProcesso: 'GAR-2024-045',
    diagnostico: 'Compressor avariado',
    log: [
      { data: new Date('2024-01-08'), acao: 'Equipamento na oficina', usuario: 'Secretária' },
      { data: new Date('2024-01-10'), acao: 'Diagnóstico concluído', usuario: 'Pedro Costa' },
      { data: new Date('2024-01-12'), acao: 'Peça solicitada', usuario: 'Pedro Costa' }
    ]
  },
  {
    id: 's4',
    codigo: 'TF-2024-004',
    cliente: 'Supermercado Bom Preço',
    nif: '789123456',
    contato: '915678901',
    aparelho: 'Expositor Refrigerado',
    marca: 'Arneg',
    avaria: 'Luz não acende',
    tipo: 'oficina',
    status: 'a_precificar',
    tecnico: 'Ana Ferreira',
    dataCriacao: new Date('2024-01-12'),
    tempoParado: 1,
    tags: ['⚙️ Oficina'],
    urgente: false,
    garantia: false,
    contexto: 'Cliente trouxe equipamento. Luz interior não funciona.',
    diagnostico: 'Lâmpada LED queimada e balastro com defeito',
    pecasUsadas: [
      { nome: 'Lâmpada LED 12W', ref: 'LED-12W-6500K', qtd: 2 },
      { nome: 'Balastro LED', ref: 'BAL-LED-24V', qtd: 1 }
    ],
    log: [
      { data: new Date('2024-01-12'), acao: 'Equipamento recebido', usuario: 'Secretária' },
      { data: new Date('2024-01-13'), acao: 'Reparação concluída', usuario: 'Ana Ferreira' }
    ]
  },
  {
    id: 's5',
    codigo: 'TF-2024-005',
    cliente: 'Padaria Central',
    nif: '321654987',
    contato: '916789012',
    morada: 'Av. da República, 456, Porto',
    aparelho: 'Vitrine Refrigerada',
    marca: 'ISA',
    avaria: 'Faz muito barulho',
    tipo: 'visita',
    status: 'em_execucao',
    tecnico: 'João Silva',
    dataCriacao: new Date('2024-01-16'),
    dataAgendada: new Date('2024-01-17'),
    turno: 'tarde',
    tags: ['🏠 Visita', '🔴 Urgente'],
    urgente: true,
    garantia: false,
    log: [
      { data: new Date('2024-01-16'), acao: 'Visita agendada', usuario: 'Secretária' },
      { data: new Date('2024-01-17'), acao: 'Técnico a caminho', usuario: 'João Silva' }
    ]
  },
  {
    id: 's6',
    codigo: 'TF-2024-006',
    cliente: 'Hotel Vista Mar',
    nif: '654987321',
    contato: '917890123',
    aparelho: 'Ar Condicionado Central',
    marca: 'Mitsubishi',
    avaria: 'Reparado - aguarda pagamento',
    tipo: 'oficina',
    status: 'em_debito',
    tecnico: 'Maria Santos',
    dataCriacao: new Date('2024-01-05'),
    tempoParado: 0,
    tags: ['⚙️ Oficina', '⚠️ Em Débito'],
    urgente: false,
    garantia: false,
    valorPendente: 350,
    diagnostico: 'Filtros entupidos e gás baixo',
    pecasUsadas: [
      { nome: 'Filtro de ar', ref: 'FIL-AC-MITS', qtd: 4 },
      { nome: 'Gás R410A', ref: 'GAS-R410A-1KG', qtd: 2 }
    ],
    log: [
      { data: new Date('2024-01-05'), acao: 'Equipamento recebido', usuario: 'Secretária' },
      { data: new Date('2024-01-08'), acao: 'Reparação concluída', usuario: 'Maria Santos' },
      { data: new Date('2024-01-10'), acao: 'Cliente contactado', usuario: 'Secretária' }
    ]
  },
  {
    id: 's7',
    codigo: 'TF-2024-007',
    cliente: 'Café Avenida',
    nif: '147258369',
    contato: '918901234',
    aparelho: 'Máquina de Gelo',
    marca: 'Scotsman',
    avaria: 'Não produz gelo',
    tipo: 'oficina',
    status: 'entregas',
    tecnico: 'Pedro Costa',
    dataCriacao: new Date('2024-01-03'),
    dataAgendada: new Date('2024-01-18'),
    turno: 'manha',
    tags: ['🚚 Entrega', '🛡️ Garantia'],
    urgente: false,
    garantia: true,
    garantiaMarca: 'Scotsman',
    garantiaProcesso: 'GAR-2024-012',
    valorRecebido: 0,
    metodoPagamento: 'Garantia',
    log: [
      { data: new Date('2024-01-03'), acao: 'Equipamento recebido', usuario: 'Secretária' },
      { data: new Date('2024-01-06'), acao: 'Reparação em garantia concluída', usuario: 'Pedro Costa' },
      { data: new Date('2024-01-15'), acao: 'Entrega agendada', usuario: 'Secretária' }
    ]
  }
];

// Mock de notificações
export const notificacoes: Notification[] = [
  {
    id: 'n1',
    tipo: 'peca_pedida',
    titulo: 'Peça solicitada',
    descricao: 'Compressor para TF-2024-003 - Restaurante Sabor',
    servicoId: 's3',
    data: new Date('2024-01-12T10:30:00'),
    lida: false,
    icone: '🧩',
    cor: 'blue'
  },
  {
    id: 'n2',
    tipo: 'pagamento',
    titulo: 'Pagamento recebido',
    descricao: 'Cliente pagou €120 - TF-2024-004',
    servicoId: 's4',
    data: new Date('2024-01-13T14:20:00'),
    lida: true,
    icone: '🧾',
    cor: 'green'
  },
  {
    id: 'n3',
    tipo: 'entrega',
    titulo: 'Entrega agendada',
    descricao: 'Máquina de Gelo - Café Avenida (18/01 manhã)',
    servicoId: 's7',
    data: new Date('2024-01-15T09:00:00'),
    lida: false,
    icone: '🚚',
    cor: 'purple'
  },
  {
    id: 'n4',
    tipo: 'tecnico_iniciou',
    titulo: 'Técnico iniciou serviço',
    descricao: 'João Silva começou visita - Padaria Central',
    servicoId: 's5',
    data: new Date('2024-01-17T15:30:00'),
    lida: false,
    icone: '🧰',
    cor: 'orange'
  },
  {
    id: 'n5',
    tipo: 'atribuicao',
    titulo: 'Nova atribuição',
    descricao: 'Visita agendada para Carlos Mendes (20/01 manhã)',
    servicoId: 's1',
    data: new Date('2024-01-15T11:00:00'),
    lida: true,
    icone: '📋',
    cor: 'cyan'
  }
];

// Funções auxiliares
export function getServicosByStatus(status: ServiceStatus): Service[] {
  return servicos.filter(s => s.status === status);
}

export function getServicosByTecnico(tecnicoNome: string): Service[] {
  return servicos.filter(s => s.tecnico === tecnicoNome);
}

export function getTempoParadoColor(dias?: number): string {
  if (!dias) return 'text-gray-400';
  if (dias <= 2) return 'text-green-500';
  if (dias <= 4) return 'text-yellow-500';
  return 'text-red-500';
}

export function getStatusLabel(status: ServiceStatus): string {
  const labels: Record<ServiceStatus, string> = {
    por_fazer: '📋 Por Fazer',
    em_execucao: '🔧 Em Execução',
    na_oficina: '🏭 Na Oficina',
    pedir_peca: '📦 Para Pedir Peça',
    espera_peca: '⏳ Em Espera de Peça',
    a_precificar: '💰 A Precificar',
    entregas: '🚚 Entregas',
    em_debito: '🧾 Em Débito',
    pago: '✅ Pago',
    finalizado: '🏁 Finalizado'
  };
  return labels[status];
}

export const marcasGarantia = [
  'Daikin',
  'Mitsubishi',
  'Electrolux',
  'Zanotti',
  'Scotsman',
  'Arneg'
];
