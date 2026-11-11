import React, { useState } from 'react';
import { Product, CategoryId } from '../types';
import { PRODUCTS, CATEGORIES, formatFCFA } from '../data/elsyData';
import { ProductCard } from '../components/ProductCard';

interface ProduitsPageProps {
  initialCategory?: CategoryId | 'all';
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
}

export const ProduitsPage: React.FC<ProduitsPageProps> = ({
  initialCategory = 'all',
  onSelectProduct,
  onAddToCart,
  favoriteIds,
  onToggleFavorite,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'rating'>('default');
  const [onlyPromos, setOnlyPromos] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(45000);

  // Filter products
  const filteredProducts = PRODUCTS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPromo = !onlyPromos || item.isPromo === true;
    const matchesPrice = item.price <= maxPrice;

    return matchesCategory && matchesSearch && matchesPromo && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold tracking-widest uppercase text-[#806451]">
          Catalogue ElsyShop
        </span>
        <h1 className="font-serif-brand text-3xl sm:text-4xl font-bold text-[#4A3027]">
          Nos Créations & Produits
        </h1>
        <p className="text-xs sm:text-sm text-[#806451]">
          Prix affichés en Francs CFA (FCFA) · Disponibles immédiatement pour livraison à Douala, Yaoundé et tout le Cameroun.
        </p>
      </div>

      {/* Filter and Sorting Toolbar */}
      <div className="space-y-4 p-5 rounded-2xl bg-[#FFFEFA] border border-[#E8DCCB] shadow-xs">
        {/* Row 1: Category Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#4A3027] text-[#FFFEFA] shadow-xs'
                : 'bg-[#F7F3EC] text-[#806451] hover:bg-[#E8DCCB]'
            }`}
          >
            Tous les articles ({PRODUCTS.length})
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#4A3027] text-[#FFFEFA] shadow-xs'
                  : 'bg-[#F7F3EC] text-[#806451] hover:bg-[#E8DCCB]'
              }`}
            >
              {cat.name}
            </button>
          ))}

          <button
            onClick={() => setOnlyPromos(!onlyPromos)}
            className={`ml-auto px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all flex items-center gap-1.5 ${
              onlyPromos
                ? 'border-[#4A3027] bg-[#4A3027] text-[#FFFEFA]'
                : 'border-[#E8DCCB] text-[#806451] hover:bg-[#F7F3EC]'
            }`}
          >
            <span>🏷️ Promotions seulement</span>
          </button>
        </div>

        {/* Row 2: Search, Price Slider, and Sorting */}
        <div className="pt-3 border-t border-[#E8DCCB]/60 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-1 max-w-sm">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par mot-clé (sac, montre, sérum, lunettes)..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E8DCCB] bg-[#F7F3EC] text-[#4A3027] placeholder:text-[#806451]/60 focus:outline-hidden focus:ring-1 focus:ring-[#4A3027]"
            />
            <svg className="w-4 h-4 text-[#806451] absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Price Range Slider */}
          <div className="flex items-center gap-3 text-xs text-[#806451]">
            <span className="shrink-0 font-medium">Prix max :</span>
            <input
              type="range"
              min="10000"
              max="45000"
              step="2500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-28 sm:w-36 accent-[#4A3027]"
            />
            <span className="font-mono font-bold text-[#4A3027] tabular-nums whitespace-nowrap">
              {formatFCFA(maxPrice)}
            </span>
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#806451] shrink-0 font-medium">Trier par :</span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-[#E8DCCB] bg-[#F7F3EC] text-[#4A3027] font-medium focus:outline-hidden"
            >
              <option value="default">Par défaut</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="rating">Mieux notés ★</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Results Status */}
      <div className="flex items-center justify-between text-xs text-[#806451] px-1">
        <span>
          Affichage de <strong className="text-[#4A3027] font-mono tabular-nums">{filteredProducts.length}</strong> produits trouvés
        </span>
        {(selectedCategory !== 'all' || searchQuery || onlyPromos || maxPrice < 45000) && (
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              setOnlyPromos(false);
              setMaxPrice(45000);
              setSortBy('default');
            }}
            className="text-[#4A3027] font-semibold hover:underline"
          >
            Réinitialiser les filtres
          </button>
        )}
      </div>

      {/* Grid */}
      {filteredProducts.length === 0 ? (
        <div className="p-12 text-center rounded-3xl border border-dashed border-[#E8DCCB] bg-[#FFFEFA] space-y-3">
          <div className="text-3xl">🔍</div>
          <h3 className="font-serif-brand text-lg font-bold text-[#4A3027]">
            Aucun article ne correspond à votre recherche
          </h3>
          <p className="text-xs text-[#806451] max-w-md mx-auto">
            Essayez de modifier vos filtres de prix ou votre mot-clé pour découvrir d’autres pépites de la boutique.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              setOnlyPromos(false);
              setMaxPrice(45000);
            }}
            className="mt-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#4A3027] text-[#FFFEFA] hover:bg-[#806451]"
          >
            Voir tous les produits
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onSelect={onSelectProduct}
              onAddToCart={onAddToCart}
              isFavorite={favoriteIds.includes(prod.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};
