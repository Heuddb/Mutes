import React from 'react';
import { CheckCircle, Truck, RefreshCw, Clock, Package, AlertCircle } from 'lucide-react';

const STATUS_BADGE = {
  delivered: 'bg-green-50 text-green-700 border-green-200',
  shipped: 'bg-blue-50 text-blue-700 border-blue-200',
  processing: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  pending: 'bg-orange-50 text-orange-700 border-orange-200',
  cancelled: 'bg-red-50 text-red-700 border-red-200',
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'delivered': return <CheckCircle className="w-4 h-4" />;
    case 'shipped': return <Truck className="w-4 h-4" />;
    case 'processing': return <RefreshCw className="w-4 h-4" />;
    case 'pending': return <Clock className="w-4 h-4" />;
    case 'cancelled': return <AlertCircle className="w-4 h-4" />;
    default: return <Package className="w-4 h-4" />;
  }
};

export default function StatusBadge({ status, text }) {
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1 ${STATUS_BADGE[status] || 'bg-gray-50 text-gray-700 border-gray-200'}`}>
      {getStatusIcon(status)}
      {text}
    </span>
  );
}
