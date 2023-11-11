import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import SearchForm from './SearchForm';

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
        localStorageMock.setItem('searchQuery', testQuery);
        render(<SearchForm inputSearchQuery={testQuery} handleSearchSubmit={() => { }} setInputSearchQuery={() => { }} />);

        expect(screen.getByDisplayValue(testQuery)).toBeInTheDocument();
    });
});
