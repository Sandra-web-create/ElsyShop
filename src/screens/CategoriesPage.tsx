import React, { useState } from 'react';
import { PageId, CategoryId } from '../types';
import { CATEGORIES } from '../data/elsyData';

interface CategoriesPageProps {
  onNavigate: (page: PageId) => void;
  onSelectCategory: (category: CategoryId) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({
  onNavigate,
  onSelectCategory,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | CategoryId>('all');

  const filteredCategories = CATEGORIES.filter((cat) => {
    const matchesSearch =
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.tagline.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || cat.id === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleExplore = (id: CategoryId) => {
    onSelectCategory(id);
    onNavigate('produits');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold tracking-widest uppercase text-[#806451]">
          Univers & Collections
        </span>
        <h1 className="font-serif-brand text-3xl sm:text-4xl font-bold text-[#4A3027]">
          Nos Catégories
        </h1>
        <p className="text-xs sm:text-sm text-[#806451]">
          Explorez nos 4 univers raffinés et trouvez la pièce maîtresse qui complètera votre style.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#FFFEFA] border border-[#E8DCCB] shadow-xs">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeFilter === 'all'
                ? 'bg-[#4A3027] text-[#FFFEFA] shadow-xs'
                : 'bg-[#F7F3EC] text-[#806451] hover:bg-[#E8DCCB]'
            }`}
          >
            Toutes ({CATEGORIES.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                activeFilter === cat.id
                  ? 'bg-[#4A3027] text-[#FFFEFA] shadow-xs'
                  : 'bg-[#F7F3EC] text-[#806451] hover:bg-[#E8DCCB]'
              }`}
            >
              {cat.name.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher une catégorie..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E8DCCB] bg-[#F7F3EC] text-[#4A3027] placeholder:text-[#806451]/60 focus:outline-hidden focus:ring-1 focus:ring-[#4A3027]"
          />
          <svg className="w-4 h-4 text-[#806451] absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Categories Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {filteredCategories.map((cat) => (
          <div
            key={cat.id}
            className="group rounded-3xl border border-[#E8DCCB] bg-[#FFFEFA] overflow-hidden shadow-xs hover:shadow-lg hover:border-[#806451] transition-all duration-300 flex flex-col"
          >
            <div
              onClick={() => handleExplore(cat.id)}
              className="relative aspect-16/9 sm:aspect-21/9 w-full overflow-hidden bg-[#F7F3EC] cursor-pointer"
            >
              <img
                src={cat.image}
                alt={cat.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A3027]/75 via-transparent to-transparent" />
              
              <div className="absolute bottom-3 left-4 right-4 text-[#FFFEFA]">
                <span className="text-[11px] font-semibold tracking-wider uppercase text-[#E8DCCB]">
                  {cat.tagline}
                </span>
                <h3 className="font-serif-brand text-xl sm:text-2xl font-bold">
                  {cat.name}
                </h3>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-xs sm:text-sm text-[#806451] leading-relaxed">
                {cat.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-[#E8DCCB]/60">
                <span className="text-xs font-mono font-medium text-[#806451]">
                  {cat.productCount} modèles en boutique
                </span>

                <button
                  onClick={() => handleExplore(cat.id)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#4A3027] text-[#FFFEFA] hover:bg-[#806451] active:scale-95 transition-all shadow-xs flex items-center gap-1.5"
                >
                  <span>Consulter les produits</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
