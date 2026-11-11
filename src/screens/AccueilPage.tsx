import React from 'react';
import { PageId, Product, CategoryId } from '../types';
import { CATEGORIES, PRODUCTS } from '../data/elsyData';
import { ProductCard } from '../components/ProductCard';

interface AccueilPageProps {
  onNavigate: (page: PageId) => void;
  onSelectCategory: (category: CategoryId) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
}

export const AccueilPage: React.FC<AccueilPageProps> = ({
  onNavigate,
  onSelectCategory,
  onSelectProduct,
  onAddToCart,
  favoriteIds,
  onToggleFavorite,
}) => {
  const promoProducts = PRODUCTS.filter((p) => p.isPromo || p.isNew).slice(0, 4);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* 1. Hero Banner (Élégant bandeau sans image) */}
      <section className="relative overflow-hidden rounded-3xl bg-[#4A3027] text-[#FFFEFA] shadow-md border border-[#806451]/40 py-12 sm:py-16 md:py-20 px-6 sm:px-12 md:px-16">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#806451]/50 border border-[#E8DCCB]/30 text-[11px] font-semibold tracking-widest uppercase text-[#E8DCCB]">
            <span>Boutique en ligne · Douala, Cameroun</span>
          </div>

          <h1 className="font-serif-brand text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#FFFEFA] leading-tight">
            L’élégance au quotidien
          </h1>

          <p className="text-sm sm:text-base text-[#E8DCCB] max-w-2xl leading-relaxed">
            Sublimez votre allure avec nos sacs en cuir texturé, accessoires raffinés, lunettes de soleil, gadgets connectés et soins de beauté d'exception.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('produits')}
              className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-[#E8DCCB] text-[#4A3027] hover:bg-[#d8c7b2] active:scale-95 transition-all shadow-md flex items-center gap-2"
            >
              <span>Découvrez nos Produits</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            <button
              onClick={() => onNavigate('categories')}
              className="px-5 py-3.5 rounded-xl text-xs sm:text-sm font-semibold bg-transparent text-[#FFFEFA] border border-[#E8DCCB]/40 hover:bg-[#806451]/30 transition-colors"
            >
              Parcourir les Catégories
            </button>
          </div>
        </div>
      </section>

      {/* 2. Section "Nos Catégories" */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#806451]">
              Sélection Exclusive
            </span>
            <h2 className="font-serif-brand text-2xl sm:text-3xl font-bold text-[#4A3027]">
              Nos Catégories
            </h2>
          </div>

          <button
            onClick={() => onNavigate('categories')}
            className="text-xs font-bold text-[#4A3027] hover:text-[#806451] flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>Toutes les catégories</span>
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id);
                onNavigate('produits');
              }}
              className="group relative rounded-2xl overflow-hidden border border-[#E8DCCB] bg-[#FFFEFA] cursor-pointer shadow-xs transition-all duration-300 hover:shadow-lg hover:border-[#806451]"
            >
              <div className="aspect-4/3 sm:aspect-square w-full overflow-hidden bg-[#F7F3EC]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-3 sm:p-4 bg-[#FFFEFA] text-center">
                <h3 className="font-serif-brand text-sm sm:text-base font-bold text-[#4A3027] group-hover:text-[#806451] transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[11px] text-[#806451] mt-0.5 block">
                  {cat.productCount} articles disponibles
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Section "Promotions & Nouveautés" */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#806451]">
              Tendances du Moment
            </span>
            <h2 className="font-serif-brand text-2xl sm:text-3xl font-bold text-[#4A3027]">
              Promotions & Nouveautés
            </h2>
          </div>

          <button
            onClick={() => onNavigate('produits')}
            className="text-xs font-bold text-[#4A3027] hover:text-[#806451] flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>Voir toute la boutique</span>
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {promoProducts.map((prod) => (
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
      </section>

      {/* 4. Section "À Propos d'ElsyShop" */}
      <section className="p-6 sm:p-10 rounded-3xl bg-[#FFFEFA] border border-[#E8DCCB] shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#806451]">
              Notre Histoire
            </span>
            <h2 className="font-serif-brand text-2xl sm:text-3xl font-bold text-[#4A3027]">
              L’élégance accessible au cœur de Douala
            </h2>
            <p className="text-xs sm:text-sm text-[#806451] leading-relaxed">
              Basée à Douala au Cameroun, <strong>ElsyShop</strong> a été créée pour offrir aux femmes et aux hommes modernes une sélection pointue d’articles raffinés : sacs à main, lunettes de soleil, bijoux délicats, gadgets électroniques utiles et cosmétiques naturels.
            </p>
            <p className="text-xs sm:text-sm text-[#806451] leading-relaxed">
              Chaque article est testé et contrôlé avec minutie avant expédition. Vous commandez en toute sérénité et réglez facilement par <strong>Mobile Money</strong>, <strong>Orange Money</strong> ou <strong>directement à la livraison</strong> de votre colis.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-semibold text-[#4A3027]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#4A3027]" />
                Logpom Bassong, Carrefour Obama City
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#4A3027]" />
                Livraison Douala & Yaoundé
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#4A3027]" />
                WhatsApp : 699476492
              </span>
            </div>
          </div>

          <div className="md:col-span-5 rounded-2xl overflow-hidden border border-[#E8DCCB] bg-[#F7F3EC] p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#E8DCCB] text-[#4A3027] font-serif-brand font-bold text-2xl flex items-center justify-center mx-auto shadow-inner">
              ES
            </div>
            <h3 className="font-serif-brand text-xl font-bold text-[#4A3027]">
              Besoin d'un conseil ?
            </h3>
            <p className="text-xs text-[#806451]">
              Notre équipe à Logpom Bassong (Carrefour Obama City) vous répond directement en moins de 15 minutes sur WhatsApp.
            </p>
            <a
              href="https://wa.me/237699476492"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#25D366] text-white hover:bg-[#20ba59] transition-colors shadow-xs"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.541 1.815.82 2.796.82 3.183 0 5.77-2.587 5.77-5.767 0-3.181-2.587-5.766-5.77-5.766zm9.969 5.766c0 5.518-4.482 10-10 10-1.748 0-3.393-.45-4.832-1.246l-7.168 1.88 1.916-6.997c-.88-1.488-1.385-3.228-1.385-5.089 0-5.518 4.482-10 10-10 5.518 0 10 4.482 10 10z"/>
              </svg>
              <span>Discuter avec ElsyShop</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
