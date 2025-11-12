'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SERVICE_STATUS_CONFIG } from '@/lib/constants';
import type { ServiceStatus, Service, ServiceTag } from '@/lib/types';
import ServiceCard from '@/components/custom/ServiceCard';

// Mock data expandido com tags
const MOCK_SERVICES: Service[] = [
  {
    id: '1',
    code: 'TF-000001',
    type: 'visita',
    status: 'por_fazer',
    tags: ['URGENTE', 'VISITA'] as ServiceTag[],
    client: { 
      id: '1', 
      name: 'João Silva', 
      contact: '+351 912 345 678', 
      nif: '123456789',
      address: 'Rua das Flores, 123, Lisboa'
    },
    deviceType: 'Ar Condicionado',
    brand: 'Samsung',
    issue: 'Não liga',
    isUrgent: true,
    isWarranty: false,
    paymentStatus: 'nao_pago',
    parts: [],
    needsPart: false,
    inquirySteps: [],
    photos: [],
    technicianNotes: [],
    adminNotes: [],
    activityLog: [],
    paymentHistory: [],
    createdAt: new Date(),
    createdBy: 'Secretária Ana',
    createdByRole: 'secretaria',
    updatedAt: new Date()
  },
  {
    id: '2',
    code: 'TF-000002',
    type: 'oficina',
    status: 'na_oficina',
    tags: ['GARANTIA', 'OFICINA'] as ServiceTag[],
    client: { 
      id: '2', 
      name: 'Maria Santos', 
      contact: '+351 913 456 789', 
      nif: '987654321' 
    },
    deviceType: 'Frigorífico',
    brand: 'LG',
    issue: 'Não arrefece',
    isUrgent: false,
    isWarranty: true,
    warrantyBrand: 'Marca A',
    warrantyProcessNumber: 'GAR-2024-001',
    paymentStatus: 'garantia',
    parts: [],
    needsPart: false,
    inquirySteps: [],
    photos: [],
    technicianNotes: [],
    adminNotes: [],
    activityLog: [],
    paymentHistory: [],
    workshopEntryDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    workshopDaysStalled: 3,
    assignedTechnicianName: 'Carlos Técnico',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    createdBy: 'Secretária Ana',
    createdByRole: 'secretaria',
    updatedAt: new Date()
  },
  {
    id: '3',
    code: 'TF-000003',
    type: 'entrega',
    status: 'entregas',
    tags: ['ENTREGA', 'PAGO_DESLOCACAO', 'EM_DEBITO', 'CLIENTE_AUSENTE'] as ServiceTag[],
    client: { 
      id: '3', 
      name: 'Pedro Costa', 
      contact: '+351 914 567 890',
      address: 'Av. da República, 456, Porto'
    },
    deviceType: 'Máquina de Lavar',
    brand: 'Bosch',
    issue: 'Faz barulho estranho',
    isUrgent: false,
    isWarranty: false,
    paymentStatus: 'pago_deslocacao',
    amountPaid: 25,
    amountPending: 150,
    parts: [],
    needsPart: false,
    inquirySteps: [],
    photos: [],
    technicianNotes: [],
    adminNotes: [],
    activityLog: [],
    paymentHistory: [
      {
        amount: 25,
        method: 'Dinheiro',
        paidAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        receivedBy: 'Carlos Técnico'
      }
    ],
    clientAbsent: true,
    deliveryAttempts: [
      {
        attemptNumber: 1,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        technicianId: 'tech-1',
        clientPresent: false,
        notes: 'Cliente não atendeu'
      }
    ],
    assignedTechnicianName: 'Carlos Técnico',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    createdBy: 'Secretária Ana',
    createdByRole: 'secretaria',
    updatedAt: new Date()
  },
  {
    id: '4',
    code: 'TF-000004',
    type: 'visita',
    status: 'em_debito',
    tags: ['EM_DEBITO', 'URGENTE'] as ServiceTag[],
    client: { 
      id: '4', 
      name: 'Ana Rodrigues', 
      contact: '+351 915 678 901',
      address: 'Rua do Comércio, 789, Braga'
    },
    deviceType: 'Ar Condicionado',
    brand: 'Daikin',
    issue: 'Não aquece',
    isUrgent: true,
    isWarranty: false,
    paymentStatus: 'nao_pago',
    totalAmount: 180,
    amountPending: 180,
    parts: [
      {
        id: 'p1',
        name: 'Termostato',
        reference: 'TERM-001',
        quantity: 1,
        addedAt: new Date(),
        addedBy: 'Carlos Técnico'
      }
    ],
    needsPart: false,
    inquirySteps: [],
    photos: [],
    technicianNotes: ['Substituído termostato defeituoso'],
    adminNotes: [],
    activityLog: [],
    paymentHistory: [],
    assignedTechnicianName: 'Carlos Técnico',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    createdBy: 'Secretária Ana',
    createdByRole: 'secretaria',
    updatedAt: new Date()
  },
  {
    id: '5',
    code: 'TF-000005',
    type: 'oficina',
    status: 'na_oficina',
    tags: ['OFICINA', 'TRANSFERENCIA_PENDENTE'] as ServiceTag[],
    client: { 
      id: '5', 
      name: 'Rui Ferreira', 
      contact: '+351 916 789 012'
    },
    deviceType: 'Arca Congeladora',
    brand: 'Whirlpool',
    issue: 'Não congela',
    isUrgent: false,
    isWarranty: false,
    paymentStatus: 'nao_pago',
    parts: [],
    needsPart: true,
    inquirySteps: [],
    photos: [],
    technicianNotes: [],
    adminNotes: [],
    activityLog: [],
    paymentHistory: [],
    workshopEntryDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    workshopDaysStalled: 6,
    transferRequested: true,
    transferRequestedBy: 'Manuel Técnico',
    transferRequestedAt: new Date(),
    assignedTechnicianName: 'Manuel Técnico',
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    createdBy: 'Dono',
    createdByRole: 'dono',
    updatedAt: new Date()
  }
];

export default function DonoDashboardPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<ServiceStatus | null>(null);
  const [services, setServices] = useState<Service[]>(MOCK_SERVICES);

  useEffect(() => {
    // Verificar autenticação
    const isAuth = localStorage.getItem('isAuthenticated');
    const userStr = localStorage.getItem('user');
    
    if (!isAuth || !userStr) {
      router.push('/');
      return;
    }

    const user = JSON.parse(userStr);
    if (user.role !== 'dono') {
      router.push('/');
    }
  }, [router]);

  // Contar serviços por status
  const getStatusCount = (status: ServiceStatus) => {
    return services.filter(s => s.status === status).length;
  };

  // Filtrar serviços
  const filteredServices = selectedStatus 
    ? services.filter(s => s.status === selectedStatus)
    : services;

  const searchedServices = searchTerm
    ? filteredServices.filter(s => 
        s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.deviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.assignedTechnicianName?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredServices;

  const handleLogout = () => {
    localStorage.clear();
    router.push('/');
  };

  const handleOpenDetails = (service: Service) => {
    console.log('Abrir detalhes:', service);
    // TODO: Implementar modal/página de detalhes
  };

  const handlePrint = (service: Service) => {
    console.log('Imprimir:', service);
    // TODO: Implementar impressão
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">❄️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">TECNOFRIO</h1>
                <p className="text-sm text-gray-600 flex items-center space-x-1">
                  <span>👑</span>
                  <span>Painel do Dono</span>
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors font-medium"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="🔍 Pesquisar por cliente, código TF, aparelho, técnico..."
              className="w-full px-6 py-4 pl-12 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-lg shadow-sm bg-white"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Status Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {(Object.keys(SERVICE_STATUS_CONFIG) as ServiceStatus[]).map((status) => {
            const config = SERVICE_STATUS_CONFIG[status];
            const count = getStatusCount(status);
            const isSelected = selectedStatus === status;

            return (
              <button
                key={status}
                onClick={() => setSelectedStatus(isSelected ? null : status)}
                className={`
                  p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105
                  ${isSelected 
                    ? `${config.bgColor} border-current ring-4 ring-blue-200 scale-105 shadow-lg` 
                    : 'bg-white border-gray-200 hover:shadow-lg'
                  }
                `}
              >
                <div className="text-center">
                  <div className="text-4xl mb-2">{config.icon}</div>
                  <div className={`text-3xl font-bold mb-1 ${config.color}`}>
                    {count}
                  </div>
                  <div className="text-xs font-medium text-gray-700">
                    {config.label}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Filter Indicator */}
        {selectedStatus && (
          <div className="mb-6 flex items-center justify-between bg-blue-50 border-2 border-blue-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{SERVICE_STATUS_CONFIG[selectedStatus].icon}</span>
              <div>
                <p className="text-sm font-medium text-gray-700">Filtrando por:</p>
                <p className="text-lg font-bold text-blue-900">
                  {SERVICE_STATUS_CONFIG[selectedStatus].label}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedStatus(null)}
              className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Limpar filtro
            </button>
          </div>
        )}

        {/* Services List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Serviços ({searchedServices.length})
            </h2>
          </div>

          {searchedServices.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-200 p-12 text-center">
              <div className="text-6xl mb-4">📋</div>
              <p className="text-gray-600 text-lg font-medium">Nenhum serviço encontrado</p>
              <p className="text-gray-500 text-sm mt-2">
                {selectedStatus ? 'Tente outro filtro' : 'Crie um novo serviço para começar'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {searchedServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onOpenDetails={handleOpenDetails}
                  onPrint={handlePrint}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
