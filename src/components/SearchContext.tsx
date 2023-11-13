import React, { createContext, useState, useContext, ReactNode } from 'react';

interface SearchContextType {
    inputSearchQuery: string;
    setInputSearchQuery: (query: string) => void;
}

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
    const [inputSearchQuery, setInputSearchQuery] = useState<string>(localStorage.getItem('inputSearchQuery') || '');

    return (
        <SearchContext.Provider value={{ inputSearchQuery, setInputSearchQuery }}>
            {children}
        </SearchContext.Provider>
    );
};
