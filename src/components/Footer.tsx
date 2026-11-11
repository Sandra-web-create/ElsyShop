import React from 'react';
import { PageId } from '../types';
import { ELSY_PHONE, ELSY_ADDRESS, ELSY_EMAIL, ELSY_WHATSAPP } from '../data/elsyData';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#4A3027] text-[#FFFEFA] pt-12 pb-24 md:pb-12 border-t border-[#806451] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-3">
            <h3 className="font-serif-brand text-2xl font-bold tracking-tight text-[#FFFEFA]">
              ElsyShop
            </h3>
            <p className="text-xs text-[#E8DCCB] leading-relaxed">
              « L’élégance au quotidien » — Votre boutique en ligne de référence à Douala pour vos sacs, accessoires de mode, gadgets électroniques et soins de beauté.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-[#E8DCCB]">
              <a
                href={`https://wa.me/${ELSY_WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#806451] hover:bg-[#25D366] text-white flex items-center justify-center transition-colors shadow-2xs"
                title="WhatsApp ElsyShop"
              >
                💬
              </a>
              <span className="text-[11px]">Assistance 7j/7 de 8h à 20h</span>
            </div>
          </div>

          {/* Col 2: Navigation Rapide */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E8DCCB]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#E8DCCB]/90">
              <li>
                <button
                  onClick={() => onNavigate('accueil')}
                  className="hover:text-white transition-colors"
                >
                  Accueil
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('categories')}
                  className="hover:text-white transition-colors"
                >
                  Nos Catégories
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('produits')}
                  className="hover:text-white transition-colors"
                >
                  Tous les Produits
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('favoris')}
                  className="hover:text-white transition-colors"
                >
                  Mes Favoris
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('panier')}
                  className="hover:text-white transition-colors"
                >
                  Mon Panier & Commande
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Coordonnées Douala */}
          <div className="space-y-3 text-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E8DCCB]">
              Boutique Douala
            </h4>
            <div className="space-y-2 text-[#E8DCCB]/90 leading-relaxed">
              <p>📍 {ELSY_ADDRESS}</p>
              <p>📞 Téléphone : {ELSY_PHONE}</p>
              <p>✉️ Email : {ELSY_EMAIL}</p>
              <p>🚚 Villes livrées : <strong>Douala et Yaoundé</strong> (Livraison rapide sous 24h à 48h).</p>
            </div>
          </div>

          {/* Col 4: Paiement & Sécurité */}
          <div className="space-y-3 text-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E8DCCB]">
              Paiements & Confiance
            </h4>
            <div className="space-y-2 text-[#E8DCCB]/90">
              <p>Règlement sécurisé direct via :</p>
              <div className="flex flex-col gap-1.5 font-semibold text-[#FFFEFA]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-yellow-400" />
                  MTN Mobile Money (MoMo)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-400" />
                  Orange Money Cameroun
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Paiement en espèces à la livraison
                </span>
              </div>
              <p className="text-[11px] text-[#E8DCCB]/70 pt-2">
                Validation directe par notre équipe à Douala avant tout départ en livraison.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[#806451] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#E8DCCB]">
          <span>© 2026 ElsyShop Douala. Tous droits réservés.</span>
          <span className="font-serif-brand italic">L’élégance au quotidien</span>
        </div>
      </div>
    </footer>
  );
};
