import React from 'react';
import { PageId, Product } from '../types';
import { PRODUCTS, formatFCFA } from '../data/elsyData';

interface FavorisPageProps {
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onNavigate: (page: PageId) => void;
}

export const FavorisPage: React.FC<FavorisPageProps> = ({
  favoriteIds,
  onToggleFavorite,
  onAddToCart,
  onSelectProduct,
  onNavigate,
}) => {
  const favoriteProducts = PRODUCTS.filter((p) => favoriteIds.includes(p.id));

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold tracking-widest uppercase text-[#806451]">
          Vos Coups de Cœur
        </span>
        <h1 className="font-serif-brand text-3xl sm:text-4xl font-bold text-[#4A3027]">
          Mes Favoris
        </h1>
        <p className="text-xs sm:text-sm text-[#806451]">
          Retrouvez tous les articles que vous avez sauvegardés pour vos futurs achats ou cadeaux.
        </p>
      </div>

      {favoriteProducts.length === 0 ? (
        /* Empty State */
        <div className="p-12 sm:p-16 rounded-3xl border border-dashed border-[#E8DCCB] bg-[#FFFEFA] text-center max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#F7F3EC] text-[#4A3027] flex items-center justify-center mx-auto text-2xl">
            ♡
          </div>
          <h2 className="font-serif-brand text-xl font-bold text-[#4A3027]">
            Votre liste de favoris est vide pour l'instant
          </h2>
          <p className="text-xs text-[#806451] leading-relaxed">
            Parcourez nos collections de sacs, d'accessoires chic et de soins pour ajouter vos articles préférés en un clic sur le cœur.
          </p>
          <button
            onClick={() => onNavigate('produits')}
            className="px-6 py-3 rounded-xl text-xs font-bold bg-[#4A3027] text-[#FFFEFA] hover:bg-[#806451] active:scale-95 transition-all shadow-xs"
          >
            Découvrir les Collections ElsyShop
          </button>
        </div>
      ) : (
        /* Favorites Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteProducts.map((prod) => (
            <div
              key={prod.id}
              className="group bg-[#FFFEFA] rounded-2xl border border-[#E8DCCB] p-4 flex gap-4 transition-all hover:shadow-md hover:border-[#806451]"
            >
              <div
                onClick={() => onSelectProduct(prod)}
                className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-[#F7F3EC] shrink-0 cursor-pointer"
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div>
                  <div className="flex items-start justify-between gap-1">
                    <span className="text-[10px] text-[#806451] uppercase font-semibold">
                      {prod.categoryLabel}
                    </span>
                    <button
                      onClick={() => onToggleFavorite(prod.id)}
                      className="text-xs text-[#806451] hover:text-red-700 transition-colors p-1"
                      title="Retirer des favoris"
                    >
                      ✕
                    </button>
                  </div>

                  <h3
                    onClick={() => onSelectProduct(prod)}
                    className="font-serif-brand text-sm sm:text-base font-bold text-[#4A3027] truncate cursor-pointer hover:underline"
                  >
                    {prod.name}
                  </h3>

                  <span className="text-sm font-bold text-[#4A3027] font-mono tabular-nums block mt-1">
                    {formatFCFA(prod.price)}
                  </span>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => onAddToCart(prod)}
                    className="flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold bg-[#4A3027] text-[#FFFEFA] hover:bg-[#806451] transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span>Ajouter au panier</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
