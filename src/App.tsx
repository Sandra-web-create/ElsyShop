import React, { useState } from 'react';
import { PageId, CategoryId, Product, CartItem, UserProfile } from './types';
import { PRODUCTS } from './data/elsyData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { WhatsAppModal } from './components/WhatsAppModal';
import { SearchModal } from './components/SearchModal';
import { Toast } from './components/Toast';

import { AccueilPage } from './screens/AccueilPage';
import { CategoriesPage } from './screens/CategoriesPage';
import { ProduitsPage } from './screens/ProduitsPage';
import { FavorisPage } from './screens/FavorisPage';
import { PanierPage } from './screens/PanierPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('accueil');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  
  // Initial cart with a nice handbag so the user immediately sees cart dynamics
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-init-1',
      product: PRODUCTS[0],
      selectedColor: 'Chocolat',
      quantity: 1,
    },
  ]);

  // Initial favorites
  const [favoriteIds, setFavoriteIds] = useState<string[]>([PRODUCTS[0].id, PRODUCTS[1].id]);

  // Product Detail Modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Search Modal
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // WhatsApp Order Confirmation Modal
  const [whatsAppMessage, setWhatsAppMessage] = useState<string | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Default customer details for Panier form
  const [userProfile] = useState<UserProfile>({
    isLoggedIn: false,
    fullName: '',
    email: '',
    phone: '',
    city: 'Douala',
    neighborhood: 'Quatier',
    deliveryInstructions: '',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const handleToggleFavorite = (productId: string) => {
    if (favoriteIds.includes(productId)) {
      setFavoriteIds((prev) => prev.filter((id) => id !== productId));
      showToast('Article retiré de vos favoris');
    } else {
      setFavoriteIds((prev) => [...prev, productId]);
      showToast('Article ajouté à vos favoris ♡');
    }
  };

  const handleAddToCart = (product: Product, color?: string, quantity: number = 1) => {
    const chosenColor = color || (product.colors && product.colors.length > 0 ? product.colors[0].name : 'Standard');
    
    setCartItems((prev) => {
      const existing = prev.find(
        (it) => it.product.id === product.id && it.selectedColor === chosenColor
      );
      if (existing) {
        return prev.map((it) =>
          it.id === existing.id ? { ...it, quantity: it.quantity + quantity } : it
        );
      }
      return [
        ...prev,
        {
          id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          product,
          selectedColor: chosenColor,
          quantity,
        },
      ];
    });

    showToast(`« ${product.name} » ajouté au panier !`);
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(itemId);
    } else {
      setCartItems((prev) =>
        prev.map((it) => (it.id === itemId ? { ...it, quantity: newQty } : it))
      );
    }
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCartItems((prev) => prev.filter((it) => it.id !== itemId));
    showToast('Article retiré du panier');
  };

  const handleConfirmOrder = () => {
    if (cartItems.length === 0) return;
    const orderNumber = `ELS-${Math.floor(1000 + Math.random() * 9000)}`;
    setCartItems([]);
    setWhatsAppMessage(null);
    showToast(`Commande ${orderNumber} transmise avec succès sur WhatsApp !`);
  };

  const handleNavigateToCategory = (catId: CategoryId) => {
    setSelectedCategory(catId);
    setCurrentPage('produits');
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F7F3EC] text-[#4A3027] flex flex-col font-sans transition-colors">
      {/* Navigation (Desktop Top Bar & Mobile Bottom Bar) */}
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        cartCount={totalCartCount}
        favoritesCount={favoriteIds.length}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {currentPage === 'accueil' && (
          <AccueilPage
            onNavigate={setCurrentPage}
            onSelectCategory={handleNavigateToCategory}
            onSelectProduct={setSelectedProduct}
            onAddToCart={(p) => handleAddToCart(p)}
            favoriteIds={favoriteIds}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {currentPage === 'categories' && (
          <CategoriesPage
            onNavigate={setCurrentPage}
            onSelectCategory={handleNavigateToCategory}
          />
        )}

        {currentPage === 'produits' && (
          <ProduitsPage
            initialCategory={selectedCategory}
            onSelectProduct={setSelectedProduct}
            onAddToCart={(p) => handleAddToCart(p)}
            favoriteIds={favoriteIds}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {currentPage === 'favoris' && (
          <FavorisPage
            favoriteIds={favoriteIds}
            onToggleFavorite={handleToggleFavorite}
            onAddToCart={(p) => handleAddToCart(p)}
            onSelectProduct={setSelectedProduct}
            onNavigate={setCurrentPage}
          />
        )}

        {currentPage === 'panier' && (
          <PanierPage
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveFromCart}
            onNavigate={setCurrentPage}
            userProfile={userProfile}
            onOpenWhatsAppModal={setWhatsAppMessage}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={setCurrentPage} />

      {/* Fiche Détaillée Product Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isFavorite={selectedProduct ? favoriteIds.includes(selectedProduct.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Direct WhatsApp Order Formatted Message Modal */}
      <WhatsAppModal
        isOpen={Boolean(whatsAppMessage)}
        onClose={() => setWhatsAppMessage(null)}
        message={whatsAppMessage || ''}
        onConfirmOrder={handleConfirmOrder}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={setSelectedProduct}
      />

      {/* Toast Notification */}
      <Toast message={toastMessage} onDismiss={() => setToastMessage(null)} />
    </div>
  );
}
