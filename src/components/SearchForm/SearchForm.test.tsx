import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import SearchForm from './SearchForm';
import { SearchProvider, useSearch } from '../SearchContext';

// Mock the useSearch hook
vi.mock('../SearchContext', async () => {
    const actual = await vi.importActual('../SearchContext');
    return {
        ...actual,
        useSearch: vi.fn(),
    };
});

describe('SearchForm', () => {
    const mockSetInputSearchQuery = vi.fn();

    beforeEach(() => {
        mockSetInputSearchQuery.mockReset();
        useSearch.mockImplementation(() => ({
            inputSearchQuery: '',
            setInputSearchQuery: mockSetInputSearchQuery,
        }));
    });

    it('renders the search form with an empty input', () => {
        render(
            <SearchProvider>
                <SearchForm handleSearchSubmit={() => { }} />
            </SearchProvider>
        );

        expect(screen.getByPlaceholderText('Search... #iphone')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Search... #iphone')).toHaveValue('');
    });

    it('updates the input value on change', () => {
        render(
            <SearchProvider>
                <SearchForm handleSearchSubmit={() => { }} />
            </SearchProvider>
        );

        const input = screen.getByPlaceholderText('Search... #iphone');
        fireEvent.change(input, { target: { value: 'new query' } });

        expect(mockSetInputSearchQuery).toHaveBeenCalledWith('new query');
    });

});
