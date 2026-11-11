import React, { useState } from 'react';
import { ELSY_WHATSAPP, ELSY_PHONE } from '../data/elsyData';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  onConfirmOrder: () => void;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
  isOpen,
  onClose,
  message,
  onConfirmOrder,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleOpenWhatsApp = () => {
    onConfirmOrder();
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${ELSY_WHATSAPP}?text=${encoded}`, '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#4A3027]/70 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-[#FFFEFA] rounded-2xl border border-[#E8DCCB] shadow-2xl p-6 z-10 space-y-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.541 1.815.82 2.796.82 3.183 0 5.77-2.587 5.77-5.767 0-3.181-2.587-5.766-5.77-5.766zm9.969 5.766c0 5.518-4.482 10-10 10-1.748 0-3.393-.45-4.832-1.246l-7.168 1.88 1.916-6.997c-.88-1.488-1.385-3.228-1.385-5.089 0-5.518 4.482-10 10-10 5.518 0 10 4.482 10 10z"/>
              </svg>
            </div>
            <div>
              <h3 className="font-serif-brand text-lg font-bold text-[#4A3027]">
                Finaliser sur WhatsApp
              </h3>
              <p className="text-xs text-[#806451]">
                Boutique ElsyShop Douala ({ELSY_PHONE})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#806451] hover:text-[#4A3027] hover:bg-[#E8DCCB]/60"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Payment options info banner */}
        <div className="p-3.5 rounded-xl bg-[#F7F3EC] border border-[#E8DCCB] text-xs text-[#4A3027] space-y-1">
          <div className="font-semibold flex items-center gap-1.5">
            <span>💳 Modes de paiement acceptés :</span>
          </div>
          <p className="text-[11px] text-[#806451] leading-relaxed">
            • <strong>MTN Mobile Money</strong> ou <strong>Orange Money</strong> après confirmation avec notre équipe.<br />
            • <strong>Paiement à la livraison</strong> disponible sur Douala et Yaoundé.
          </p>
        </div>

        {/* Message Preview Box */}
        <div>
          <div className="flex items-center justify-between text-xs text-[#806451] mb-1.5">
            <span className="font-medium">Message pré-formaté pour ElsyShop :</span>
            <button
              onClick={handleCopy}
              className="text-[#4A3027] font-semibold hover:underline flex items-center gap-1"
            >
              {copied ? '✓ Message copié' : 'Copier le texte'}
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F7F3EC] border border-[#E8DCCB] text-xs font-mono text-[#4A3027] max-h-56 overflow-y-auto whitespace-pre-wrap leading-relaxed custom-scrollbar">
            {message}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleOpenWhatsApp}
            className="w-full sm:flex-1 h-12 rounded-xl text-xs font-bold bg-[#25D366] text-white hover:bg-[#20ba59] transition-all shadow-md flex items-center justify-center gap-2 active:scale-98"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.541 1.815.82 2.796.82 3.183 0 5.77-2.587 5.77-5.767 0-3.181-2.587-5.766-5.77-5.766zm9.969 5.766c0 5.518-4.482 10-10 10-1.748 0-3.393-.45-4.832-1.246l-7.168 1.88 1.916-6.997c-.88-1.488-1.385-3.228-1.385-5.089 0-5.518 4.482-10 10-10 5.518 0 10 4.482 10 10z"/>
            </svg>
            <span>Envoyer la commande sur WhatsApp</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 h-12 rounded-xl text-xs font-medium text-[#806451] hover:bg-[#E8DCCB]/50 transition-colors"
          >
            Retour
          </button>
        </div>
      </div>
    </div>
  );
};
