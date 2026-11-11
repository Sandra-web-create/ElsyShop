import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS, formatFCFA } from '../data/elsyData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = query.trim()
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        p.categoryLabel.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handlePick = (p: Product) => {
    onSelectProduct(p);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center pt-20 p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#4A3027]/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative w-full max-w-xl bg-[#FFFEFA] rounded-2xl border border-[#E8DCCB] shadow-2xl p-6 z-10 space-y-4">
        <div className="flex items-center justify-between border-b border-[#E8DCCB] pb-3">
          <div className="flex items-center gap-2 flex-1">
            <svg className="w-5 h-5 text-[#806451]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un sac, des lunettes, une montre, un sérum..."
              className="w-full text-sm bg-transparent text-[#4A3027] placeholder:text-[#806451]/60 focus:outline-hidden"
            />
          </div>
          <button
            onClick={onClose}
            className="text-xs text-[#806451] hover:text-[#4A3027] p-1 font-bold"
          >
            ✕
          </button>
        </div>

        {/* Suggestions or Results */}
        {query.trim().length === 0 ? (
          <div className="space-y-3 pt-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#806451] block">
              Suggestions populaires :
            </span>
            <div className="flex flex-wrap gap-2">
              {['Sac Cabas Léon', 'Lunettes Riviera', 'Montre Rose Gold', 'Sérum Vitamine C', 'Joncs Dorés'].map((item) => (
                <button
                  key={item}
                  onClick={() => setQuery(item)}
                  className="px-3 py-1.5 rounded-lg bg-[#F7F3EC] text-xs font-medium text-[#4A3027] hover:bg-[#E8DCCB] transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className="py-8 text-center text-xs text-[#806451]">
            Aucun résultat pour « {query} ».
          </div>
        ) : (
          <div className="space-y-2 max-h-72 overflow-y-auto custom-scrollbar">
            {results.map((prod) => (
              <div
                key={prod.id}
                onClick={() => handlePick(prod)}
                className="p-2.5 rounded-xl hover:bg-[#F7F3EC] flex items-center gap-3 cursor-pointer transition-colors"
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-lg object-cover bg-slate-100 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-[#4A3027] truncate">
                    {prod.name}
                  </h4>
                  <span className="text-[11px] text-[#806451]">
                    {prod.categoryLabel}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-[#4A3027] tabular-nums">
                  {formatFCFA(prod.price)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
