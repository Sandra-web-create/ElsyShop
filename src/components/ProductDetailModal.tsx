import React, { useState } from 'react';
import { Product } from '../types';
import { formatFCFA, ELSY_WHATSAPP } from '../data/elsyData';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, selectedColor: string, quantity: number) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isFavorite,
  onToggleFavorite,
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors && product.colors.length > 0 ? product.colors[0].name : 'Standard'
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<string>(product.image);

  const handleAdd = () => {
    onAddToCart(product, selectedColor, quantity);
    onClose();
  };

  const handleDirectWhatsApp = () => {
    const text = `Bonjour ElsyShop ! Je souhaite commander directement cet article :
*${product.name}*
- Couleur : ${selectedColor}
- Quantité : ${quantity}
- Prix unitaire : ${formatFCFA(product.price)}
- Total estimé : ${formatFCFA(product.price * quantity)}

Est-il disponible pour une livraison à Douala / Yaoundé ? Merci !`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${ELSY_WHATSAPP}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#4A3027]/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog Chassis */}
      <div className="relative w-full max-w-3xl bg-[#FFFEFA] rounded-2xl border border-[#E8DCCB] shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col">
        {/* Top Header bar with close button */}
        <div className="p-4 px-6 border-b border-[#E8DCCB] flex items-center justify-between bg-[#F7F3EC]/70 shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#806451]">
            <span>Fiche Détaillée</span>
            <span aria-hidden="true">·</span>
            <span>{product.categoryLabel}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(product.id)}
              className="p-1.5 rounded-full text-[#4A3027] hover:bg-[#E8DCCB]/60 transition-colors"
              aria-label="Ajouter aux favoris"
            >
              <svg
                className={`w-5 h-5 ${isFavorite ? 'fill-[#4A3027] text-[#4A3027]' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#806451] hover:text-[#4A3027] hover:bg-[#E8DCCB]/60 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left: Imagery */}
            <div className="space-y-3">
              <div className="relative aspect-4/3 sm:aspect-square w-full rounded-xl overflow-hidden bg-[#F7F3EC] border border-[#E8DCCB]">
                <img
                  src={activeImage}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              {product.gallery && product.gallery.length > 1 && (
                <div className="flex items-center gap-2">
                  {product.gallery.map((imgUrl, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(imgUrl)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImage === imgUrl ? 'border-[#4A3027]' : 'border-transparent opacity-60'
                      }`}
                    >
                      <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Info, Price, Color, Actions */}
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2 text-xs text-emerald-800 font-medium mb-1">
                  <span>● {product.stockStatus} à Douala</span>
                  <span className="text-[#806451]">·</span>
                  <span className="text-[#806451]">Livraison 24h</span>
                </div>

                <h2 className="font-serif-brand text-2xl font-bold text-[#4A3027]">
                  {product.name}
                </h2>

                <p className="text-xs text-[#806451] mt-1">
                  {product.subtitle}
                </p>

                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-2xl font-bold text-[#4A3027] font-mono tabular-nums">
                    {formatFCFA(product.price)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-sm text-[#806451] line-through font-mono tabular-nums">
                      {formatFCFA(product.oldPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Color selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="pt-2">
                  <label className="text-xs font-semibold text-[#4A3027] block mb-2">
                    Couleur sélectionnée : <span className="font-normal text-[#806451]">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                          selectedColor === c.name
                            ? 'border-[#4A3027] bg-[#E8DCCB]/40 text-[#4A3027] font-bold shadow-2xs'
                            : 'border-[#E8DCCB] text-[#806451] hover:border-[#806451]'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity selector */}
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-[#4A3027]">Quantité :</span>
                <div className="flex items-center border border-[#E8DCCB] rounded-lg bg-[#F7F3EC]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-[#4A3027] font-bold hover:bg-[#E8DCCB] rounded-l-lg transition-colors"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-mono font-bold text-xs text-[#4A3027] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-[#4A3027] font-bold hover:bg-[#E8DCCB] rounded-r-lg transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs font-mono text-[#806451] tabular-nums">
                  Total : {formatFCFA(product.price * quantity)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 space-y-2.5">
                <button
                  onClick={handleAdd}
                  className="w-full h-11 rounded-xl text-xs font-semibold bg-[#4A3027] text-[#FFFEFA] hover:bg-[#806451] transition-colors shadow-xs flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span>Ajouter au Panier · {formatFCFA(product.price * quantity)}</span>
                </button>

                <button
                  onClick={handleDirectWhatsApp}
                  className="w-full h-10 rounded-xl text-xs font-semibold bg-[#25D366] text-white hover:bg-[#20ba59] transition-colors shadow-xs flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.541 1.815.82 2.796.82 3.183 0 5.77-2.587 5.77-5.767 0-3.181-2.587-5.766-5.77-5.766zm9.969 5.766c0 5.518-4.482 10-10 10-1.748 0-3.393-.45-4.832-1.246l-7.168 1.88 1.916-6.997c-.88-1.488-1.385-3.228-1.385-5.089 0-5.518 4.482-10 10-10 5.518 0 10 4.482 10 10z"/>
                  </svg>
                  <span>Commander immédiatement sur WhatsApp</span>
                </button>
              </div>

              {/* Description & Details */}
              <div className="pt-4 border-t border-[#E8DCCB] space-y-3 text-xs">
                <div>
                  <h4 className="font-semibold text-[#4A3027] mb-1">Description</h4>
                  <p className="text-[#806451] leading-relaxed">{product.description}</p>
                </div>

                {product.details && product.details.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-[#4A3027] mb-1.5">Caractéristiques & Atouts</h4>
                    <ul className="space-y-1 text-[#806451]">
                      {product.details.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-[#4A3027] font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
