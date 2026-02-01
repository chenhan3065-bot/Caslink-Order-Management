
import React from 'react';
import { Search } from 'lucide-react';
import { OrderStatus, Language } from '../types';
import { translations } from '../i18n/translations';

interface SearchFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilter: OrderStatus | 'ALL';
  setActiveFilter: (filter: OrderStatus | 'ALL') => void;
  lang: Language;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  activeFilter, 
  setActiveFilter,
  lang
}) => {
  const t = translations[lang];
  const filters: { label: string; value: OrderStatus | 'ALL' }[] = [
    { label: t.all_orders, value: 'ALL' },
    { label: t.status[OrderStatus.PROCESSING], value: OrderStatus.PROCESSING },
    { label: t.status[OrderStatus.READY_TO_PICK_UP], value: OrderStatus.READY_TO_PICK_UP },
    { label: t.status[OrderStatus.SHIPPED], value: OrderStatus.SHIPPED },
    { label: t.status[OrderStatus.DELIVERED], value: OrderStatus.DELIVERED },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 mb-8 px-4">
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#7C2D12] transition-colors" size={18} />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.search_placeholder}
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7C2D12]/20 transition-all placeholder:text-gray-300 text-sm"
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all ${
              activeFilter === f.value 
              ? 'bg-[#7C2D12] text-white shadow-md scale-105' 
              : 'bg-white/40 text-gray-500 hover:bg-white hover:text-gray-700'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchFilter;
