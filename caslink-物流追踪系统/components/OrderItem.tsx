
import React from 'react';
import { Box, Trash2, Edit3 } from 'lucide-react';
import { Order, OrderStatus, Language } from '../types';
import { translations } from '../i18n/translations';

interface OrderItemProps {
  order: Order;
  onEdit: (order: Order) => void;
  onDelete: (id: string) => void;
  lang: Language;
}

const OrderItem: React.FC<OrderItemProps> = ({ order, onEdit, onDelete, lang }) => {
  const t = translations[lang];

  const getStatusStyle = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PROCESSING: return 'text-amber-600 bg-amber-50';
      case OrderStatus.READY_TO_PICK_UP: return 'text-yellow-600 bg-yellow-50';
      case OrderStatus.DELIVERED: return 'text-emerald-600 bg-emerald-50';
      case OrderStatus.SHIPPED: return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="group bg-white/80 backdrop-blur-sm border border-white hover:border-[#7C2D12]/30 p-4 rounded-2xl flex items-center shadow-sm hover:shadow-md transition-all">
      <div className="w-12 h-12 flex items-center justify-center bg-[#F2EBE1] rounded-xl text-[#7C2D12] shrink-0">
        <Box size={22} />
      </div>

      <div className="ml-4 flex-1 min-w-0">
        <div className="flex items-baseline space-x-2">
          <h3 className="font-bold text-gray-800 text-sm truncate">{order.styleCode}</h3>
          <span className="text-[10px] text-gray-400 uppercase truncate">{order.productName}</span>
        </div>
        <div className="flex items-center text-[10px] text-gray-400 mt-1 space-x-3 overflow-hidden">
          <span className="bg-gray-100 px-1.5 py-0.5 rounded text-[9px] font-bold">{order.id}</span>
          <span>•</span>
          <span className="truncate">{order.customerName}</span>
          <span>•</span>
          <span className="whitespace-nowrap">{order.date}</span>
        </div>
      </div>

      <div className="flex items-center space-x-2 shrink-0 ml-4">
        <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase whitespace-nowrap ${getStatusStyle(order.status)}`}>
          {t.status[order.status]}
        </span>
        
        <div className="flex items-center border-l border-gray-100 pl-2">
          <button 
            type="button"
            onClick={(e) => { 
              e.stopPropagation(); 
              onEdit(order); 
            }}
            className="p-2 text-gray-300 hover:text-[#7C2D12] hover:bg-[#7C2D12]/5 rounded-lg transition-colors active:scale-90"
            title={t.edit}
          >
            <Edit3 size={16} />
          </button>
          <button 
            type="button"
            onClick={(e) => { 
              e.stopPropagation(); 
              onDelete(order.id); 
            }}
            className="p-2 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors active:scale-90"
            aria-label={t.delete}
            title={t.delete}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
