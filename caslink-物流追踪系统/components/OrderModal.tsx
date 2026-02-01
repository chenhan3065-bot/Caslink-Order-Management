
import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { Order, OrderStatus, Language } from '../types';
import { translations } from '../i18n/translations';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (order: Order) => void;
  editingOrder: Order | null;
  lang: Language;
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, onSave, editingOrder, lang }) => {
  const t = translations[lang];

  const [formData, setFormData] = useState<Order>(() => {
    if (editingOrder) return { ...editingOrder };
    return {
      id: `ORD-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`,
      customerName: '',
      productName: '',
      styleCode: '',
      date: new Date().toISOString().split('T')[0],
      dimensions: '',
      status: OrderStatus.PROCESSING,
      location: ''
    };
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id.trim() || !formData.customerName.trim()) {
      alert(lang === 'zh' ? '订单编号和客户名称为必填项' : lang === 'ms' ? 'ID Pesanan dan Nama Pelanggan wajib diisi' : 'Order ID and Customer Name are required');
      return;
    }
    onSave(formData);
  };

  if (!isOpen) return null;

  const labelClass = "block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1";
  const inputClass = "w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7C2D12]/20 focus:bg-white transition-all placeholder:text-gray-300 text-gray-800";

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose}
      />
      
      <div 
        className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#7C2D12] px-8 py-5 text-white flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl tracking-wide">
              {editingOrder ? t.edit_record : t.add_record}
            </h2>
            <p className="text-[9px] opacity-60 uppercase tracking-tighter mt-0.5">CASLINK LOGISTICS MGMT</p>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5 max-h-[80vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{t.order_id}</label>
              <input 
                name="id"
                value={formData.id}
                onChange={handleChange}
                className={inputClass}
                required
                autoComplete="off"
                autoFocus
                placeholder="Ex: ORD-001"
              />
            </div>
            <div>
              <label className={labelClass}>{t.biz_date}</label>
              <input 
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>{t.customer_name}</label>
            <input 
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder={t.customer_placeholder}
              className={inputClass}
              required
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{t.style_code}</label>
              <input 
                name="styleCode"
                value={formData.styleCode}
                onChange={handleChange}
                placeholder="Ex: CSL-DX"
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>{t.product_name}</label>
              <input 
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                placeholder="Ex: Classic Oak"
                className={inputClass}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{t.dimensions}</label>
              <input 
                name="dimensions"
                value={formData.dimensions}
                onChange={handleChange}
                placeholder="2100 x 900..."
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>{t.logistics_status}</label>
              <select 
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={`${inputClass} cursor-pointer appearance-none`}
              >
                <option value={OrderStatus.PROCESSING}>{t.status[OrderStatus.PROCESSING]}</option>
                <option value={OrderStatus.READY_TO_PICK_UP}>{t.status[OrderStatus.READY_TO_PICK_UP]}</option>
                <option value={OrderStatus.SHIPPED}>{t.status[OrderStatus.SHIPPED]}</option>
                <option value={OrderStatus.DELIVERED}>{t.status[OrderStatus.DELIVERED]}</option>
              </select>
            </div>
          </div>

          <div className="pt-6 flex gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 py-3.5 border border-gray-200 text-gray-500 rounded-2xl text-xs font-bold uppercase hover:bg-gray-50 transition-colors"
            >
              {t.cancel}
            </button>
            <button 
              type="submit" 
              className="flex-[2] py-3.5 bg-[#7C2D12] text-white rounded-2xl text-xs font-bold uppercase shadow-xl hover:shadow-[#7C2D12]/20 hover:-translate-y-0.5 transition-all active:scale-95 flex items-center justify-center"
            >
              <Save size={16} className="mr-2" />
              {t.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
