import React, { useState } from 'react';
import { PageId, CartItem, UserProfile } from '../types';
import { formatFCFA, DELIVERY_ZONES } from '../data/elsyData';

interface PanierPageProps {
  items: CartItem[];
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onNavigate: (page: PageId) => void;
  userProfile: UserProfile;
  onOpenWhatsAppModal: (formattedMessage: string) => void;
}

export const PanierPage: React.FC<PanierPageProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onNavigate,
  userProfile,
  onOpenWhatsAppModal,
}) => {
  const [selectedCity, setSelectedCity] = useState<string>(userProfile.city || 'Douala');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>(
    userProfile.neighborhood || 'Logpom Bassong (Carrefour Obama City)'
  );
  const [clientName, setClientName] = useState<string>(userProfile.fullName || '');
  const [clientPhone, setClientPhone] = useState<string>(userProfile.phone || '');
  const [deliveryNote, setDeliveryNote] = useState<string>(userProfile.deliveryInstructions || '');
  const [paymentPreference, setPaymentPreference] = useState<'MoMo' | 'OrangeMoney' | 'Livraison'>('MoMo');

  const currentZone = DELIVERY_ZONES.find((z) => z.city === selectedCity) || DELIVERY_ZONES[0];
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = items.length > 0 ? currentZone.fee : 0;
  const total = subtotal + deliveryFee;

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    const zone = DELIVERY_ZONES.find((z) => z.city === city);
    if (zone && zone.neighborhoods.length > 0) {
      setSelectedNeighborhood(zone.neighborhoods[0]);
    }
  };

  const handleCommanderWhatsApp = () => {
    if (items.length === 0) return;

    // Build the formatted WhatsApp order message as specified
    const itemsList = items
      .map(
        (it, idx) =>
          `${idx + 1}. *${it.product.name}*\n   • Couleur : ${it.selectedColor}\n   • Quantité : ${it.quantity}\n   • Prix unitaire : ${formatFCFA(it.product.price)}\n   • Sous-total : ${formatFCFA(it.product.price * it.quantity)}`
      )
      .join('\n\n');

    const paymentLabel =
      paymentPreference === 'MoMo'
        ? 'MTN Mobile Money'
        : paymentPreference === 'OrangeMoney'
        ? 'Orange Money'
        : 'Paiement en espèces à la livraison';

    const formattedMessage = `Bonjour ElsyShop 
Je souhaite valider ma commande passée sur votre boutique en ligne.

 DÉTAIL DE MA COMMANDE :
${itemsList}

 INFORMATIONS DE LIVRAISON :
• Nom du client : ${clientName.trim() || 'Client ElsyShop'}
• Téléphone de contact : ${clientPhone.trim() || '+237 ...'}
• Ville : ${selectedCity}
• Quartier / Repère : ${selectedNeighborhood}${deliveryNote.trim() ? `\n• Précisions livreur : ${deliveryNote.trim()}` : ''}
• Mode de règlement souhaité : ${paymentLabel}

Merci de me confirmer la disponibilité et le créneau de livraison ! ✨`;

    onOpenWhatsAppModal(formattedMessage);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold tracking-widest uppercase text-[#806451]">
          Vos Achats en Cours
        </span>
        <h1 className="font-serif-brand text-3xl sm:text-4xl font-bold text-[#4A3027]">
          Mon Panier
        </h1>
        <p className="text-xs sm:text-sm text-[#806451]">
          Vérifiez vos articles, renseignez votre adresse de livraison et commandez directement sur WhatsApp.
        </p>
      </div>

      {items.length === 0 ? (
        /* Empty Cart State */
        <div className="p-12 sm:p-16 rounded-3xl border border-dashed border-[#E8DCCB] bg-[#FFFEFA] text-center max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#F7F3EC] text-[#4A3027] flex items-center justify-center mx-auto text-2xl">
            🛍️
          </div>
          <h2 className="font-serif-brand text-xl font-bold text-[#4A3027]">
            Votre panier est actuellement vide
          </h2>
          <p className="text-xs text-[#806451] leading-relaxed">
            Trouvez le sac de vos rêves, des solaires tendance ou un soin éclat pour remplir votre panier dès maintenant.
          </p>
          <button
            onClick={() => onNavigate('produits')}
            className="px-6 py-3 rounded-xl text-xs font-bold bg-[#4A3027] text-[#FFFEFA] hover:bg-[#806451] active:scale-95 transition-all shadow-xs"
          >
            Commencer mes achats
          </button>
        </div>
      ) : (
        /* Main Cart & Checkout Split */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: List of items */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-4 rounded-2xl bg-[#FFFEFA] border border-[#E8DCCB] flex items-center justify-between text-xs text-[#806451]">
              <span className="font-semibold text-[#4A3027]">
                {items.length} {items.length === 1 ? 'article sélectionné' : 'articles sélectionnés'}
              </span>
              <span>Disponibilité vérifiée à Douala</span>
            </div>

            <div className="space-y-3">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="p-4 rounded-2xl bg-[#FFFEFA] border border-[#E8DCCB] flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all hover:border-[#806451]/50 shadow-xs"
                >
                  <img
                    src={it.product.image}
                    alt={it.product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-xl object-cover bg-[#F7F3EC] shrink-0 border border-[#E8DCCB]"
                  />

                  <div className="flex-1 min-w-0 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#806451]">
                      {it.product.categoryLabel}
                    </span>
                    <h3 className="font-serif-brand text-sm sm:text-base font-bold text-[#4A3027] truncate">
                      {it.product.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-[#806451]">
                      <span>Couleur : <strong>{it.selectedColor}</strong></span>
                      <span>·</span>
                      <span className="font-mono tabular-nums">{formatFCFA(it.product.price)}</span>
                    </div>
                  </div>

                  {/* Quantity and removal */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E8DCCB]/60">
                    <span className="text-sm font-bold text-[#4A3027] font-mono tabular-nums">
                      {formatFCFA(it.product.price * it.quantity)}
                    </span>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-[#E8DCCB] rounded-lg bg-[#F7F3EC]">
                        <button
                          onClick={() => onUpdateQuantity(it.id, it.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#4A3027] font-bold hover:bg-[#E8DCCB] rounded-l-lg transition-colors text-xs"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-mono font-bold text-xs text-[#4A3027] tabular-nums">
                          {it.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(it.id, it.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#4A3027] font-bold hover:bg-[#E8DCCB] rounded-r-lg transition-colors text-xs"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(it.id)}
                        className="text-[11px] text-[#806451] hover:text-red-700 transition-colors p-1"
                        title="Supprimer cet article"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate('produits')}
              className="text-xs font-semibold text-[#4A3027] hover:underline flex items-center gap-1.5 pt-2"
            >
              <span>← Continuer mes achats</span>
            </button>
          </div>

          {/* Right Column: Delivery Info & WhatsApp Order Action */}
          <div className="lg:col-span-5 space-y-6">
            {/* Delivery address form */}
            <div className="p-6 rounded-2xl bg-[#FFFEFA] border border-[#E8DCCB] shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs text-[#806451]">
                <span>1. Informations de Livraison</span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-[#4A3027]">Cameroun</span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-[#4A3027] block mb-1">
                    Votre Nom complet *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ex: Danielle Mbarga"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DCCB] bg-[#F7F3EC] text-[#4A3027] placeholder:text-[#806451]/60 focus:outline-hidden focus:ring-1 focus:ring-[#4A3027]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#4A3027] block mb-1">
                    Téléphone WhatsApp (+237) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="Ex: 699 00 00 00"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DCCB] bg-[#F7F3EC] text-[#4A3027] placeholder:text-[#806451]/60 focus:outline-hidden focus:ring-1 focus:ring-[#4A3027]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-[#4A3027] block mb-1">
                      Ville de livraison *
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) => handleCityChange(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DCCB] bg-[#F7F3EC] text-[#4A3027] font-medium focus:outline-hidden"
                    >
                      {DELIVERY_ZONES.map((z) => (
                        <option key={z.city} value={z.city}>
                          {z.city} ({formatFCFA(z.fee)})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-[#4A3027] block mb-1">
                      Quartier de livraison *
                    </label>
                    <select
                      value={selectedNeighborhood}
                      onChange={(e) => setSelectedNeighborhood(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DCCB] bg-[#F7F3EC] text-[#4A3027] font-medium focus:outline-hidden"
                    >
                      {currentZone.neighborhoods.map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-[#4A3027] block mb-1">
                    Repère ou précision pour le coursier
                  </label>
                  <input
                    type="text"
                    value={deliveryNote}
                    onChange={(e) => setDeliveryNote(e.target.value)}
                    placeholder="Ex: Face boulangerie Saker, portail marron"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DCCB] bg-[#F7F3EC] text-[#4A3027] placeholder:text-[#806451]/60 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#4A3027] block mb-1.5">
                    Mode de règlement préféré
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentPreference('MoMo')}
                      className={`p-2 rounded-xl border text-[11px] font-semibold text-center transition-all ${
                        paymentPreference === 'MoMo'
                          ? 'border-[#4A3027] bg-[#E8DCCB]/50 text-[#4A3027]'
                          : 'border-[#E8DCCB] text-[#806451]'
                      }`}
                    >
                      MTN MoMo
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentPreference('OrangeMoney')}
                      className={`p-2 rounded-xl border text-[11px] font-semibold text-center transition-all ${
                        paymentPreference === 'OrangeMoney'
                          ? 'border-[#4A3027] bg-[#E8DCCB]/50 text-[#4A3027]'
                          : 'border-[#E8DCCB] text-[#806451]'
                      }`}
                    >
                      Orange Money
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentPreference('Livraison')}
                      className={`p-2 rounded-xl border text-[11px] font-semibold text-center transition-all ${
                        paymentPreference === 'Livraison'
                          ? 'border-[#4A3027] bg-[#E8DCCB]/50 text-[#4A3027]'
                          : 'border-[#E8DCCB] text-[#806451]'
                      }`}
                    >
                      À la livraison
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Summary & WhatsApp Order CTA */}
            <div className="p-6 rounded-2xl bg-[#FFFEFA] border border-[#E8DCCB] shadow-md space-y-4">
              <h3 className="font-serif-brand text-base font-bold text-[#4A3027]">
                Récapitulatif de la commande
              </h3>

              <div className="space-y-2 text-xs text-[#806451]">
                <div className="flex justify-between">
                  <span>Sous-total articles ({items.length})</span>
                  <span className="font-mono tabular-nums font-semibold text-[#4A3027]">
                    {formatFCFA(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Frais de livraison ({selectedCity})</span>
                  <span className="font-mono tabular-nums font-semibold text-[#4A3027]">
                    {formatFCFA(deliveryFee)}
                  </span>
                </div>
                <div className="text-[11px] text-[#806451] italic">
                  Délais estimé : {currentZone.estimatedTime}
                </div>

                <div className="pt-3 border-t border-[#E8DCCB] flex justify-between items-baseline font-bold text-[#4A3027] text-base">
                  <span>Total à régler</span>
                  <span className="font-mono tabular-nums text-lg text-[#4A3027]">
                    {formatFCFA(total)}
                  </span>
                </div>
              </div>

              {/* PRIMARY ACTION BUTTON */}
              <button
                onClick={handleCommanderWhatsApp}
                className="w-full h-13 rounded-xl text-xs sm:text-sm font-bold bg-[#25D366] text-white hover:bg-[#20ba59] active:scale-98 transition-all shadow-md flex items-center justify-center gap-2.5"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.541 1.815.82 2.796.82 3.183 0 5.77-2.587 5.77-5.767 0-3.181-2.587-5.766-5.77-5.766zm9.969 5.766c0 5.518-4.482 10-10 10-1.748 0-3.393-.45-4.832-1.246l-7.168 1.88 1.916-6.997c-.88-1.488-1.385-3.228-1.385-5.089 0-5.518 4.482-10 10-10 5.518 0 10 4.482 10 10z"/>
                </svg>
                <span className="uppercase tracking-wider">Commander sur WhatsApp</span>
              </button>

              <p className="text-[11px] text-center text-[#806451] leading-relaxed">
                Votre commande sera transmise directement au service commercial d'ElsyShop à Douala. Aucun débit immédiat par carte.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
