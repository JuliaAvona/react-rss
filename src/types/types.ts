export interface Product {
    id: string;
    title: string;
    description: string;
    brand: string;
    images: string[];
}

export interface ProductListProps {
    products: Product[];
    onProductClick: (product: Product) => void;
}

export interface SearchState {
  searchQuery: string;
}

export interface RootState {
  search: SearchState;
  cards: {
    cards: Product[];
  }
}