// Mock data para simulação do sistema TECNOFRIO

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

export interface Servico {
  id: string;
  codigo: string;
  cliente: string;
  nif?: string;
  contato: string;
  morada?: string;
  aparelho: string;
  marca?: string;
  avaria: string;
  status: ServiceStatus;
  tecnico?: string;
  tags: string[];
  urgente: boolean;
  garantia: boolean;
  processoGarantia?: string;
  marcaGarantia?: string;
  dataAgendada?: Date;
  turno?: 'manha' | 'tarde';
  dataCriacao: Date;
  tempoParado?: number; // em dias
  valor?: number;
  observacoes?: string;
  tipo: 'visita' | 'oficina';
}

export interface Tecnico {
  id: string;
  nome: string;
  online: boolean;
  tempoMedio: number; // em horas
  servicosAtivos: number;
}

export interface Notificacao {
  id: string;
  tipo: 'peca_pedida' | 'pagamento' | 'entrega' | 'tecnico_iniciou' | 'finalizado' | 'transferencia' | 'atribuicao';
  titulo: string;
  descricao: string;
  servicoId: string;
  data: Date;
  lida: boolean;
}

// Mock de técnicos
export const tecnicos: Tecnico[] = [
  { id: '1', nome: 'João Silva', online: true, tempoMedio: 2.5, servicosAtivos: 3 },
  { id: '2', nome: 'Maria Santos', online: true, tempoMedio: 3.2, servicosAtivos: 2 },
  { id: '3', nome: 'Pedro Costa', online: false, tempoMedio: 2.8, servicosAtivos: 1 },
  { id: '4', nome: 'Ana Ferreira', online: true, tempoMedio: 2.1, servicosAtivos: 4 },
];

// Mock de serviços
export const servicos: Servico[] = [
  {
    id: '1',
    codigo: 'TF-2024-001',
    cliente: 'Manuel Oliveira',
    nif: '123456789',
    contato: '912345678',
    morada: 'Rua das Flores, 123, Lisboa',
    aparelho: 'Ar Condicionado',
    marca: 'Daikin',
    avaria: 'Não arrefece',
    status: 'por_fazer',
    tecnico: 'João Silva',
    tags: ['🏠 Visita', '🔴 Urgente'],
    urgente: true,
    garantia: false,
    dataAgendada: new Date(2024, 10, 15),
    turno: 'manha',
    dataCriacao: new Date(2024, 10, 10),
    tipo: 'visita'
  },
  {
    id: '2',
    codigo: 'TF-2024-002',
    cliente: 'Sofia Rodrigues',
    nif: '987654321',
    contato: '923456789',
    aparelho: 'Frigorífico',
    marca: 'Samsung',
    avaria: 'Compressor avariado',
    status: 'na_oficina',
    tecnico: 'João Silva',
    tags: ['⚙️ Oficina', '🛡️ Garantia'],
    urgente: false,
    garantia: true,
    marcaGarantia: 'Samsung',
    processoGarantia: 'GAR-2024-045',
    dataCriacao: new Date(2024, 10, 8),
    tempoParado: 3,
    tipo: 'oficina'
  },
  {
    id: '3',
    codigo: 'TF-2024-003',
    cliente: 'Carlos Mendes',
    nif: '456789123',
    contato: '934567890',
    morada: 'Av. da Liberdade, 456, Porto',
    aparelho: 'Máquina de Lavar',
    marca: 'Bosch',
    avaria: 'Não centrifuga',
    status: 'em_execucao',
    tecnico: 'Maria Santos',
    tags: ['🏠 Visita'],
    urgente: false,
    garantia: false,
    dataAgendada: new Date(2024, 10, 14),
    turno: 'tarde',
    dataCriacao: new Date(2024, 10, 12),
    tipo: 'visita'
  },
  {
    id: '4',
    codigo: 'TF-2024-004',
    cliente: 'Beatriz Alves',
    nif: '789123456',
    contato: '945678901',
    aparelho: 'Arca Congeladora',
    marca: 'Whirlpool',
    avaria: 'Fuga de gás',
    status: 'na_oficina',
    tecnico: 'Pedro Costa',
    tags: ['⚙️ Oficina'],
    urgente: false,
    garantia: false,
    dataCriacao: new Date(2024, 10, 5),
    tempoParado: 6,
    tipo: 'oficina'
  },
  {
    id: '5',
    codigo: 'TF-2024-005',
    cliente: 'Ricardo Pereira',
    nif: '321654987',
    contato: '956789012',
    aparelho: 'Ar Condicionado',
    marca: 'LG',
    avaria: 'Ruído anormal',
    status: 'a_precificar',
    tecnico: 'Ana Ferreira',
    tags: ['⚙️ Oficina'],
    urgente: false,
    garantia: false,
    dataCriacao: new Date(2024, 10, 1),
    tipo: 'oficina'
  },
  {
    id: '6',
    codigo: 'TF-2024-006',
    cliente: 'Inês Martins',
    nif: '654987321',
    contato: '967890123',
    morada: 'Rua do Comércio, 789, Braga',
    aparelho: 'Frigorífico',
    marca: 'Siemens',
    avaria: 'Não congela',
    status: 'entregas',
    tecnico: 'João Silva',
    tags: ['🚚 Entrega'],
    urgente: false,
    garantia: false,
    dataAgendada: new Date(2024, 10, 16),
    turno: 'manha',
    dataCriacao: new Date(2024, 10, 3),
    valor: 150,
    tipo: 'visita'
  },
  {
    id: '7',
    codigo: 'TF-2024-007',
    cliente: 'Tiago Fernandes',
    nif: '147258369',
    contato: '978901234',
    aparelho: 'Máquina de Secar',
    marca: 'Electrolux',
    avaria: 'Não aquece',
    status: 'em_debito',
    tecnico: 'Maria Santos',
    tags: ['⚠️ Em Débito'],
    urgente: false,
    garantia: false,
    dataCriacao: new Date(2024, 9, 28),
    valor: 85,
    tipo: 'oficina'
  },
];

// Mock de notificações
export const notificacoes: Notificacao[] = [
  {
    id: '1',
    tipo: 'atribuicao',
    titulo: 'Novo Serviço Atribuído',
    descricao: 'TF-2024-001 - Manuel Oliveira',
    servicoId: '1',
    data: new Date(2024, 10, 14, 9, 30),
    lida: false
  },
  {
    id: '2',
    tipo: 'peca_pedida',
    titulo: 'Peça Pedida',
    descricao: 'Compressor para TF-2024-002',
    servicoId: '2',
    data: new Date(2024, 10, 13, 14, 15),
    lida: false
  },
  {
    id: '3',
    tipo: 'pagamento',
    titulo: 'Pagamento Recebido',
    descricao: 'TF-2024-006 - €150,00',
    servicoId: '6',
    data: new Date(2024, 10, 12, 16, 45),
    lida: true
  },
  {
    id: '4',
    tipo: 'transferencia',
    titulo: 'Solicitação de Transferência',
    descricao: 'João Silva solicita transferir TF-2024-003',
    servicoId: '3',
    data: new Date(2024, 10, 14, 11, 20),
    lida: false
  },
];

// Funções auxiliares
export function getServicosByStatus(status: ServiceStatus): Servico[] {
  return servicos.filter(s => s.status === status);
}

export function getServicosByTecnico(tecnicoNome: string): Servico[] {
  return servicos.filter(s => s.tecnico === tecnicoNome);
}

export function getTempoParadoColor(dias?: number): string {
  if (!dias) return 'text-slate-400';
  if (dias <= 2) return 'text-green-500';
  if (dias <= 4) return 'text-yellow-500';
  return 'text-red-500';
}

export function getTecnicoById(id: string): Tecnico | undefined {
  return tecnicos.find(t => t.id === id);
}

export function getServicoById(id: string): Servico | undefined {
  return servicos.find(s => s.id === id);
}

// Marcas de garantia disponíveis
export const marcasGarantia = [
  'Daikin',
  'Samsung',
  'LG',
  'Bosch',
  'Siemens',
  'Whirlpool'
];
