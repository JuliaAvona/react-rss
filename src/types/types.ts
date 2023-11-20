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
  },
}

export interface Product {
    id: string;
    title: string;
    description: string;
    brand: string;
    images: string[];
}

export interface ProductsResponse {
    products: Product[];
    total: number;
}

export interface IErrorBoundaryState {
  hasError: boolean;
}

export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

export interface HttpError extends Error {
  statusText?: string;
} 

export interface ResultsControlProps {
    inputLimit: string;
    handleUpdateClick: (e: React.FormEvent) => void;
    setInputLimit: (value: string) => void;
} 

export interface SearchProps {
    handleSearchSubmit: (e: React.FormEvent) => void;
}

export interface SearchContextType {
    inputSearchQuery: string;
    setInputSearchQuery: (query: string) => void;
    products: Product[];
    setProducts: (products: Product[]) => void;
    onProductClick: (product: Product) => void;
}