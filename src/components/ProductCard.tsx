import React from 'react';
import { Product } from '../types';
import { formatFCFA } from '../data/elsyData';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <article className="group bg-[#FFFEFA] rounded-2xl border border-[#E8DCCB] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md hover:border-[#806451]/50">
      {/* Product Image Frame */}
      <div
        onClick={() => onSelect(product)}
        className="relative aspect-4/3 sm:aspect-square w-full overflow-hidden bg-[#F7F3EC] cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
        />

        {/* Status badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isPromo && (
            <span className="bg-[#4A3027] text-[#FFFEFA] text-[10px] font-bold px-2 py-0.5 rounded-sm tracking-wider uppercase">
              Promo
            </span>
          )}
          {product.isNew && !product.isPromo && (
            <span className="bg-[#806451] text-[#FFFEFA] text-[10px] font-bold px-2 py-0.5 rounded-sm tracking-wider uppercase">
              Nouveau
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#FFFEFA]/90 backdrop-blur-xs flex items-center justify-center text-[#4A3027] hover:scale-110 transition-transform shadow-xs z-10"
        >
          <svg
            className={`w-4 h-4 ${isFavorite ? 'fill-[#4A3027] text-[#4A3027]' : 'text-[#806451]'}`}
            fill={isFavorite ? 'currentColor' : 'none'}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Quick View overlay prompt */}
        <div className="absolute inset-x-0 bottom-0 py-2 bg-gradient-to-t from-[#4A3027]/70 to-transparent text-[#FFFEFA] text-[11px] font-medium text-center opacity-0 group-hover:opacity-100 transition-opacity">
          Aperçu détaillé
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Availability info */}
          <div className="flex items-center justify-between text-[11px] text-[#806451] mb-1">
            <span>{product.categoryLabel}</span>
            <span className={`font-medium ${product.stockStatus === 'En stock' ? 'text-emerald-700' : 'text-amber-800'}`}>
              • {product.stockStatus}
            </span>
          </div>

          <h3
            onClick={() => onSelect(product)}
            className="font-serif-brand text-sm sm:text-base font-bold text-[#4A3027] line-clamp-1 cursor-pointer hover:underline"
          >
            {product.name}
          </h3>

          <p className="text-xs text-[#806451] line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>

          {/* Color previews if available */}
          {product.colors && product.colors.length > 1 && (
            <div className="flex items-center gap-1.5 mt-2">
              {product.colors.map((c) => (
                <span
                  key={c.name}
                  title={c.name}
                  className="w-2.5 h-2.5 rounded-full border border-black/10 shadow-2xs"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
              <span className="text-[10px] text-[#806451] ml-1">
                {product.colors.length} coloris
              </span>
            </div>
          )}
        </div>

        {/* Price & Action Row */}
        <div className="mt-4 pt-3 border-t border-[#E8DCCB]/60 flex items-center justify-between">
          <div>
            <span className="text-sm sm:text-base font-bold text-[#4A3027] font-mono tabular-nums block">
              {formatFCFA(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-[11px] text-[#806451] line-through font-mono tabular-nums">
                {formatFCFA(product.oldPrice)}
              </span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#4A3027] text-[#FFFEFA] hover:bg-[#806451] active:scale-95 transition-all shadow-xs flex items-center gap-1"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Panier</span>
          </button>
        </div>
      </div>
    </article>
  );
};
