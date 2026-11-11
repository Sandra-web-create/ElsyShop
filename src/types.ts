export type PageId = 'accueil' | 'categories' | 'produits' | 'favoris' | 'panier';

export type CategoryId = 'sacs' | 'accessoires' | 'gadgets' | 'beaute'| 'vetements'| 'COMMANDE SHEIN';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  tagline: string;
  description: string;
  image: string;
  productCount: number;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: CategoryId;
  categoryLabel: string;
  price: number; // in FCFA
  oldPrice?: number;
  image: string;
  gallery: string[];
  colors: ProductColor[];
  description: string;
  details: string[];
  isNew?: boolean;
  isPromo?: boolean;
  stockStatus: 'En stock' | 'Dernières pièces' | 'Sur commande' | 'Rupture de stock';
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  id: string; // unique item instance id
  product: Product;
  selectedColor: string;
  quantity: number;
}

export interface DeliveryZone {
  city: string;
  fee: number;
  estimatedTime: string;
  neighborhoods: string[];
}

export interface UserProfile {
  isLoggedIn: boolean;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  neighborhood: string;
  deliveryInstructions: string;
}

export interface OrderRecord {
  id: string;
  date: string;
  items: {
    name: string;
    quantity: number;
    color: string;
    price: number;
  }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'En préparation' | 'En cours de livraison' | 'Livrée';
  deliveryCity: string;
  deliveryNeighborhood: string;
}
