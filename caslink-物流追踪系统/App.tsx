
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import SearchFilter from './components/SearchFilter';
import OrderItem from './components/OrderItem';
import OrderModal from './components/OrderModal';
import AIAssistant from './components/AIAssistant';
import { MOCK_ORDERS } from './constants';
import { Order, OrderStatus, Language } from './types';
import { Plus, Package, ClipboardList } from 'lucide-react';
import { translations } from './i18n/translations';

const App: React.FC = () => {
  // Persistence for Language and Orders
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem('caslink_lang') as Language) || 'zh';
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('caslink_orders');
      return saved ? JSON.parse(saved) : MOCK_ORDERS;
    } catch (e) {
      return MOCK_ORDERS;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<OrderStatus | 'ALL'>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);

  const t = translations[lang];

  useEffect(() => {
    localStorage.setItem('caslink_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('caslink_lang', lang);
  }, [lang]);

  const filteredOrders = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return orders.filter(order => {
      const matchesSearch = 
        order.id.toLowerCase().includes(query) ||
        order.customerName.toLowerCase().includes(query) ||
        order.styleCode.toLowerCase().includes(query) ||
        order.productName.toLowerCase().includes(query);
      
      const matchesFilter = activeFilter === 'ALL' || order.status === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [orders, searchQuery, activeFilter]);

  const handleSaveOrder = (newOrder: Order) => {
    setOrders(prev => {
      if (editingOrder) {
        return prev.map(o => o.id === editingOrder.id ? newOrder : o);
      } else {
        if (prev.some(o => o.id === newOrder.id)) {
          alert(lang === 'zh' ? '订单编号已存在' : lang === 'ms' ? 'ID Pesanan sudah wujud' : 'Order ID already exists');
          return prev;
        }
        return [newOrder, ...prev];
      }
    });
    setIsModalOpen(false);
    setEditingOrder(null);
  };

  const handleDeleteOrder = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  const handleOpenCreate = () => {
    setEditingOrder(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (order: Order) => {
    setEditingOrder(order);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen pb-24 bg-[#F2EBE1]">
      <Header lang={lang} setLang={setLang} />

      <main className="max-w-4xl mx-auto mt-8 px-4">
        <div className="flex items-center justify-between mb-8 max-w-2xl mx-auto">
          <div className="flex items-center text-[#7C2D12]">
            <ClipboardList size={20} className="mr-2" />
            <span className="text-xs font-bold tracking-widest uppercase">{t.live_list}</span>
          </div>
          <button 
            type="button"
            onClick={handleOpenCreate}
            className="flex items-center px-6 py-2.5 bg-[#7C2D12] text-white rounded-full shadow-lg hover:bg-[#5d210d] transition-all active:scale-95 text-xs font-bold uppercase tracking-widest"
          >
            <Plus size={16} className="mr-2" />
            {t.new_order}
          </button>
        </div>

        <SearchFilter 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          lang={lang}
        />

        <div className="space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <OrderItem 
                key={order.id} 
                order={order} 
                onEdit={handleOpenEdit}
                onDelete={handleDeleteOrder}
                lang={lang}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-gray-400 bg-white/30 rounded-3xl border-2 border-dashed border-gray-200">
              <Package size={40} className="opacity-10 mb-4" />
              <p className="text-sm italic">{t.no_orders}</p>
            </div>
          )}
        </div>
      </main>

      {isModalOpen && (
        <OrderModal 
          key={editingOrder ? `edit-${editingOrder.id}` : 'create-new'}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveOrder}
          editingOrder={editingOrder}
          lang={lang}
        />
      )}

      <AIAssistant orders={orders} lang={lang} />
    </div>
  );
};

export default App;
