import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Pagination from './Pagination';

describe('Pagination', () => {
    it('calls handlePrevPage and handleNextPage correctly', () => {
        const handlePrevPage = vi.fn();
        const handleNextPage = vi.fn();
        const currentPage = 2;
        const totalPages = 5;

        render(
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
            />
        );

        fireEvent.click(screen.getByText('Prev Page'));
        expect(handlePrevPage).toHaveBeenCalled();

        fireEvent.click(screen.getByText('Next Page'));
        expect(handleNextPage).toHaveBeenCalled();
    });
});
