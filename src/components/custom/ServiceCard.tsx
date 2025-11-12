'use client';

import { Service } from '@/lib/types';
import { SERVICE_STATUS_CONFIG, getWorkshopTimeColor } from '@/lib/constants';
import ServiceTagBar from './ServiceTagBar';

interface ServiceCardProps {
  service: Service;
  onOpenDetails?: (service: Service) => void;
  onPrint?: (service: Service) => void;
  showActions?: boolean;
  className?: string;
}

export default function ServiceCard({ 
  service, 
  onOpenDetails, 
  onPrint,
  showActions = true,
  className = '' 
}: ServiceCardProps) {
  const statusConfig = SERVICE_STATUS_CONFIG[service.status];

  // Determinar cor predominante do card baseado no estado
  let cardBgColor = statusConfig.bgColor;
  let cardBorderColor = statusConfig.borderColor;

  // Se cliente ausente, sobrescreve com cor de alerta
  if (service.clientAbsent) {
    cardBgColor = 'bg-rose-50';
    cardBorderColor = 'border-rose-300';
  }

  // Se urgente e não finalizado, adiciona borda vermelha mais forte
  if (service.isUrgent && service.status !== 'finalizado') {
    cardBorderColor = 'border-red-400';
  }

  return (
    <div
      className={`
        p-6 rounded-2xl border-2 transition-all duration-300
        hover:shadow-lg hover:scale-[1.02] cursor-pointer
        ${cardBgColor} ${cardBorderColor}
        ${className}
      `}
      onClick={() => onOpenDetails?.(service)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Header com código e status */}
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-sm font-mono font-bold text-blue-600 bg-white px-3 py-1 rounded-lg shadow-sm">
              {service.code}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.bgColor} ${statusConfig.color} border-2 ${statusConfig.borderColor}`}>
              {statusConfig.icon} {statusConfig.label}
            </span>
          </div>

          {/* Cliente e aparelho */}
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            {service.client.name}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            {service.deviceType} {service.brand && `• ${service.brand}`}
          </p>
          <p className="text-sm text-gray-700 mb-3">
            <span className="font-medium">Avaria:</span> {service.issue}
          </p>

          {/* Técnico atribuído */}
          {service.assignedTechnicianName && (
            <div className="mb-3 inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-white border border-gray-200">
              <span className="text-sm">🧰</span>
              <span className="text-sm font-medium text-gray-700">
                {service.assignedTechnicianName}
              </span>
            </div>
          )}

          {/* Termômetro de tempo (oficina) */}
          {service.workshopDaysStalled !== undefined && (
            <div className="mb-3">
              <div className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg border-2 ${getWorkshopTimeColor(service.workshopDaysStalled).color}`}>
                <span className="text-lg">
                  {getWorkshopTimeColor(service.workshopDaysStalled).icon}
                </span>
                <span className="text-sm font-bold">
                  {service.workshopDaysStalled} dias na oficina
                </span>
              </div>
            </div>
          )}

          {/* Barra de tags */}
          <ServiceTagBar tags={service.tags} className="mt-3" />

          {/* Alerta de cliente ausente */}
          {service.clientAbsent && (
            <div className="mt-3 p-3 bg-rose-100 border-2 border-rose-300 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-lg">🚫</span>
                <div>
                  <p className="text-sm font-bold text-rose-900">Cliente Ausente</p>
                  <p className="text-xs text-rose-700">Pendente de nova tentativa de entrega</p>
                </div>
              </div>
            </div>
          )}

          {/* Transferência pendente */}
          {service.transferRequested && (
            <div className="mt-3 p-3 bg-amber-100 border-2 border-amber-300 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-lg">🔄</span>
                <div>
                  <p className="text-sm font-bold text-amber-900">Transferência Solicitada</p>
                  <p className="text-xs text-amber-700">
                    Por {service.transferRequestedBy} • Aguardando aceitação
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Ações */}
        {showActions && (
          <div className="flex flex-col items-end space-y-2 ml-4">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetails?.(service);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              Abrir Ficha
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onPrint?.(service);
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors border border-gray-300"
            >
              🖨️ Imprimir
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
