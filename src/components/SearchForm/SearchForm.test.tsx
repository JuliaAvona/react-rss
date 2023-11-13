import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import SearchForm from './SearchForm';
import { SearchProvider } from '../SearchContext';

const localStorageMock = (() => {
    let store = {};
    return {
        getItem(key) {
            return store[key] || null;
        },
        setItem(key, value) {
            store[key] = value;
        },
        clear() {
            store = {};
        }
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
});

describe('SearchForm', () => {
    beforeEach(() => {
        localStorageMock.clear();
    });

    it('retrieves the value from local storage upon mounting', () => {
        const testQuery = 'stored query';
        localStorageMock.setItem('inputSearchQuery', testQuery);
        render(
            <SearchProvider>
                <SearchForm handleSearchSubmit={() => { }} />
            </SearchProvider>
        );

        expect(screen.getByDisplayValue(testQuery)).toBeInTheDocument();
    });
});
