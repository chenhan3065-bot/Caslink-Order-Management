
import React from 'react';
import { RotateCcw, Clock, Globe } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface HeaderProps {
  lang: Language;
  setLang: (l: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ lang, setLang }) => {
  const t = translations[lang];

  return (
    <header className="flex flex-col items-center pt-10 pb-6 w-full max-w-4xl mx-auto">
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-5xl font-serif font-semibold tracking-widest text-[#7C2D12] uppercase">
          Caslink
        </h1>
        <div className="flex items-center space-x-2 mt-1">
          <div className="h-[1px] w-8 bg-[#7C2D12]"></div>
          <span className="text-[10px] tracking-[0.4em] font-medium text-[#7C2D12] uppercase">
            {t.system_name}
          </span>
          <div className="h-[1px] w-8 bg-[#7C2D12]"></div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] font-semibold tracking-wider text-gray-500 uppercase">
        <div className="flex items-center px-3 py-1 bg-white/50 rounded-full border border-gray-200 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></div>
          {t.status_running}
        </div>
        
        <div className="flex items-center px-3 py-1 bg-white/50 rounded-full border border-gray-200">
          <Globe size={12} className="mr-1.5 text-[#7C2D12]" />
          {t.global_network}
        </div>

        {/* Language Switcher */}
        <div className="flex items-center bg-white/50 rounded-full border border-gray-200 p-0.5 ml-2">
          {(['zh', 'en', 'ms'] as Language[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-2 py-0.5 rounded-full text-[9px] font-bold transition-all ${
                lang === l 
                ? 'bg-[#7C2D12] text-white shadow-sm' 
                : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-3 ml-2">
          <span title={t.history}>
            <Clock size={14} className="cursor-pointer hover:text-[#7C2D12] transition-colors" />
          </span>
          <span title={t.refresh}>
            <RotateCcw size={14} className="cursor-pointer hover:text-[#7C2D12] transition-colors" />
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
