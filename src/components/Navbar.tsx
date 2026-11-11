import React from 'react';
import { PageId } from '../types';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  cartCount: number;
  favoritesCount: number;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  cartCount,
  favoritesCount,
  onOpenSearch,
}) => {
  return (
    <>
      {/* Main Desktop & Tablet Header */}
      <header className="sticky top-0 z-30 bg-[#FFFEFA]/95 backdrop-blur-md border-b border-[#E8DCCB] transition-colors shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 gap-4">
            {/* Logo */}
            <button
              onClick={() => onNavigate('accueil')}
              className="text-left group flex flex-col shrink-0"
            >
              <span className="font-serif-brand text-2xl sm:text-3xl font-bold tracking-tight text-[#4A3027] group-hover:text-[#806451] transition-colors">
                ElsyShop
              </span>
              <span className="text-[10px] tracking-wide uppercase font-medium text-[#806451] -mt-1 flex items-center gap-1">
                <span>Logpom Bassong, Carrefour Obama City</span>
                <span>·</span>
                <span>Douala</span>
              </span>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-[#806451]">
              <button
                onClick={() => onNavigate('accueil')}
                className={`py-1 relative transition-colors hover:text-[#4A3027] ${
                  currentPage === 'accueil' ? 'text-[#4A3027] font-bold' : ''
                }`}
              >
                Accueil
                {currentPage === 'accueil' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4A3027] rounded-full" />
                )}
              </button>

              <button
                onClick={() => onNavigate('categories')}
                className={`py-1 relative transition-colors hover:text-[#4A3027] ${
                  currentPage === 'categories' ? 'text-[#4A3027] font-bold' : ''
                }`}
              >
                Catégories
                {currentPage === 'categories' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4A3027] rounded-full" />
                )}
              </button>

              <button
                onClick={() => onNavigate('produits')}
                className={`py-1 relative transition-colors hover:text-[#4A3027] ${
                  currentPage === 'produits' ? 'text-[#4A3027] font-bold' : ''
                }`}
              >
                Boutique
                {currentPage === 'produits' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4A3027] rounded-full" />
                )}
              </button>

              <button
                onClick={() => onNavigate('favoris')}
                className={`py-1 relative transition-colors hover:text-[#4A3027] flex items-center gap-1.5 ${
                  currentPage === 'favoris' ? 'text-[#4A3027] font-bold' : ''
                }`}
              >
                <span>Favoris</span>
                {favoritesCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-[#E8DCCB] text-[#4A3027] text-[10px] flex items-center justify-center font-bold">
                    {favoritesCount}
                  </span>
                )}
                {currentPage === 'favoris' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4A3027] rounded-full" />
                )}
              </button>

            </nav>

            {/* Right Action Icons & Cart */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* WhatsApp direct order / info link */}
              <a
                href="https://wa.me/237699476492"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366]/10 text-emerald-800 border border-emerald-300 text-xs font-semibold hover:bg-[#25D366]/20 transition-colors"
                title="Contacter sur WhatsApp"
              >
                <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                <span className="font-mono tabular-nums">699476492</span>
              </a>

              {/* Search Trigger */}
              <button
                onClick={onOpenSearch}
                aria-label="Rechercher un produit"
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#4A3027] hover:bg-[#E8DCCB]/50 transition-colors"
              >
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Favorites (Desktop) */}
              <button
                onClick={() => onNavigate('favoris')}
                aria-label="Voir les favoris"
                className="hidden sm:flex relative w-9 h-9 rounded-full items-center justify-center text-[#4A3027] hover:bg-[#E8DCCB]/50 transition-colors"
              >
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {favoritesCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#806451] text-[#FFFEFA] text-[9px] font-bold flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </button>

              {/* Cart Button with Count */}
              <button
                onClick={() => onNavigate('panier')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${
                  currentPage === 'panier'
                    ? 'bg-[#4A3027] text-[#FFFEFA] shadow-xs'
                    : 'bg-[#E8DCCB] text-[#4A3027] hover:bg-[#d8c7b2]'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="hidden sm:inline">Panier</span>
                <span className="w-4 h-4 rounded-full bg-[#4A3027] text-[#FFFEFA] text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Fixed Bottom Navigation Bar (4 Shortcuts: Accueil, Catégories, Favoris, Panier) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFEFA]/95 backdrop-blur-md border-t border-[#E8DCCB] grid grid-cols-4 items-center h-16 px-1 safe-area-pb shadow-lg">
        {/* 1. Accueil */}
        <button
          onClick={() => onNavigate('accueil')}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            currentPage === 'accueil' ? 'text-[#4A3027] font-bold' : 'text-[#806451] hover:text-[#4A3027]'
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={currentPage === 'accueil' ? 2.25 : 1.75} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-[10px] mt-0.5 tracking-tight">Accueil</span>
        </button>

        {/* 2. Catégories */}
        <button
          onClick={() => onNavigate('categories')}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            currentPage === 'categories' ? 'text-[#4A3027] font-bold' : 'text-[#806451] hover:text-[#4A3027]'
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={currentPage === 'categories' ? 2.25 : 1.75} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span className="text-[10px] mt-0.5 tracking-tight">Catégories</span>
        </button>

        {/* 3. Favoris */}
        <button
          onClick={() => onNavigate('favoris')}
          className={`relative flex flex-col items-center justify-center py-1 transition-colors ${
            currentPage === 'favoris' ? 'text-[#4A3027] font-bold' : 'text-[#806451] hover:text-[#4A3027]'
          }`}
        >
          <svg className="w-5 h-5" fill={currentPage === 'favoris' ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={currentPage === 'favoris' ? 2.25 : 1.75} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {favoritesCount > 0 && (
            <span className="absolute top-1 right-3 w-3.5 h-3.5 rounded-full bg-[#4A3027] text-[#FFFEFA] text-[8px] font-bold flex items-center justify-center">
              {favoritesCount}
            </span>
          )}
          <span className="text-[10px] mt-0.5 tracking-tight">Favoris</span>
        </button>

        {/* 4. Panier */}
        <button
          onClick={() => onNavigate('panier')}
          className={`relative flex flex-col items-center justify-center py-1 transition-colors ${
            currentPage === 'panier' ? 'text-[#4A3027] font-bold' : 'text-[#806451] hover:text-[#4A3027]'
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={currentPage === 'panier' ? 2.25 : 1.75} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute top-1 right-3 w-4 h-4 rounded-full bg-[#4A3027] text-[#FFFEFA] text-[9px] font-bold flex items-center justify-center">
              {cartCount}
            </span>
          )}
          <span className="text-[10px] mt-0.5 tracking-tight">Panier</span>
        </button>
      </nav>
    </>
  );
};
