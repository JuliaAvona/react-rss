import React, { createContext, useState, useContext, ReactNode } from 'react';
import { SearchContextType, Product } from '../types/types';

const SearchContext = createContext<SearchContextType | null>(null);

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
};

interface SearchProviderProps {
    children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
    const [inputSearchQuery, setInputSearchQuery] = useState<string>('');
    const [products, setProducts] = useState<Product[]>([]);

    const onProductClick = (product: Product) => {
        console.log("Product clicked:", product);
    };

    return (
        <SearchContext.Provider value={{ inputSearchQuery, setInputSearchQuery, products, setProducts, onProductClick }}>
            {children}
        </SearchContext.Provider>
    );
};
