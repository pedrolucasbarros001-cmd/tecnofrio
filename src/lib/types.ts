// ============================================
// TECNOFRIO - Sistema de Gestão de Assistências Técnicas
// Tipos TypeScript Centralizados
// ============================================

export type UserRole = 'dono' | 'secretaria' | 'tecnico';

export type ServiceType = 'visita' | 'oficina' | 'entrega';

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

export type PaymentStatus = 
  | 'nao_pago'
  | 'pago_deslocacao'
  | 'pago'
  | 'garantia';

export type Shift = 'manha' | 'tarde';

export type WarrantyBrand = 
  | 'Marca A'
  | 'Marca B'
  | 'Marca C'
  | 'Marca D'
  | 'Marca E'
  | 'Marca F';

export type ServiceTag = 
  | 'URGENTE'
  | 'GARANTIA'
  | 'OFICINA'
  | 'PAGO_DESLOCACAO'
  | 'EM_DEBITO'
  | 'VISITA'
  | 'ENTREGA'
  | 'CLIENTE_AUSENTE'
  | 'TRANSFERENCIA_PENDENTE';

// ============================================
// ENTIDADES PRINCIPAIS
// ============================================

export interface User {
  id: string;
  email: string;
  phone: string;
  name: string;
  role: UserRole;
  avatar?: string;
  isOnline?: boolean;
  createdAt: Date;
}

export interface Client {
  id: string;
  name: string;
  nif?: string;
  contact: string;
  address?: string;
}

export interface Part {
  id: string;
  name: string;
  reference: string;
  quantity: number;
  addedAt: Date;
  addedBy: string;
}

export interface ServicePhoto {
  id: string;
  url: string;
  uploadedAt: Date;
  uploadedBy: string;
  description?: string;
}

export interface InquiryStep {
  step: number;
  title: string;
  data: Record<string, any>;
  completedAt?: Date;
  completedBy?: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  description: string;
  performedBy: string;
  performedByRole: UserRole;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface Service {
  id: string;
  code: string; // TF-000xxx
  type: ServiceType;
  status: ServiceStatus;
  tags: ServiceTag[];
  
  // Cliente
  client: Client;
  
  // Detalhes técnicos
  deviceType: string;
  brand?: string;
  issue: string;
  
  // Atribuição
  assignedTechnicianId?: string;
  assignedTechnicianName?: string;
  scheduledDate?: Date;
  shift?: Shift;
  
  // Tags e flags
  isUrgent: boolean;
  isWarranty: boolean;
  warrantyBrand?: WarrantyBrand;
  warrantyProcessNumber?: string;
  
  // Financeiro
  paymentStatus: PaymentStatus;
  amountPaid?: number;
  amountPending?: number;
  totalAmount?: number;
  paymentHistory: {
    amount: number;
    method: string;
    paidAt: Date;
    receivedBy: string;
  }[];
  
  // Peças
  parts: Part[];
  needsPart: boolean;
  partRequested?: boolean;
  partRequestedAt?: Date;
  partRequestedBy?: string;
  partReceived?: boolean;
  partReceivedAt?: Date;
  
  // Inquérito/Progresso
  inquirySteps: InquiryStep[];
  photos: ServicePhoto[];
  technicianNotes: string[];
  adminNotes: string[];
  
  // Oficina
  workshopEntryDate?: Date;
  workshopDaysStalled?: number;
  
  // Entrega
  deliveryAttempts?: {
    attemptNumber: number;
    date: Date;
    technicianId: string;
    clientPresent: boolean;
    notes?: string;
  }[];
  clientAbsent?: boolean;
  
  // Transferência
  transferRequested?: boolean;
  transferRequestedBy?: string;
  transferRequestedAt?: Date;
  transferAcceptedBy?: string;
  
  // Logs e auditoria
  activityLog: ActivityLog[];
  
  // Timestamps
  createdAt: Date;
  createdBy: string;
  createdByRole: UserRole;
  updatedAt: Date;
  completedAt?: Date;
  finalizedAt?: Date;
  finalizedBy?: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'action';
  title: string;
  message: string;
  serviceId?: string;
  serviceCode?: string;
  isRead: boolean;
  createdAt: Date;
  userId: string;
  actionRequired?: boolean;
  actionUrl?: string;
}

export interface TechnicianStats {
  technicianId: string;
  technicianName: string;
  avatar?: string;
  isOnline: boolean;
  activeServices: {
    visitas: number;
    oficina: number;
    entregas: number;
  }[];
  averageTime: number; // em horas
  delayedServices: number;
  completedToday: number;
  completedThisWeek: number;
  completedThisMonth: number;
}

// ============================================
// FILTROS E PESQUISA
// ============================================

export interface ServiceFilters {
  status?: ServiceStatus[];
  type?: ServiceType[];
  technicianId?: string;
  isUrgent?: boolean;
  isWarranty?: boolean;
  dateFrom?: Date;
  dateTo?: Date;
  searchTerm?: string;
  tags?: ServiceTag[];
}

// ============================================
// FORMULÁRIOS
// ============================================

export interface CreateServiceForm {
  type: ServiceType;
  clientName: string;
  clientNif?: string;
  clientContact: string;
  clientAddress?: string;
  deviceType: string;
  brand?: string;
  issue: string;
  isUrgent: boolean;
  isWarranty: boolean;
  warrantyBrand?: WarrantyBrand;
  warrantyProcessNumber?: string;
  assignedTechnicianId?: string;
  scheduledDate?: Date;
  shift?: Shift;
}

export interface InquiryVisitaForm {
  arrivedAtLocation: boolean;
  context: string;
  photos: File[];
  repairLocation: 'local' | 'oficina';
  partsUsed?: Part[];
  paymentStatus: PaymentStatus;
  amountPaid?: number;
}

export interface InquiryOficinaForm {
  initialContext: string;
  initialPhoto: File;
  diagnosis: string;
  probableCause?: string;
  partsUsed: Part[];
  isCompleted: boolean;
  needsPart?: boolean;
  paymentStatus: PaymentStatus;
  amountPaid?: number;
}

export interface InquiryEntregaForm {
  clientPresent: boolean;
  everythingWorking: boolean;
  paymentStatus: PaymentStatus;
  amountPaid?: number;
  notes?: string;
}

export interface PricingForm {
  totalAmount: number;
  breakdown?: {
    labor: number;
    parts: number;
    displacement?: number;
    other?: number;
  };
  notes?: string;
}
