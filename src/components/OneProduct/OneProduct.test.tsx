import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import OneProduct from './OneProduct';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

vi.mock('react-router-dom', async () => ({
    ...await vi.importActual('react-router-dom'),
    useParams: vi.fn(() => ({ id: '1' })),
    useNavigate: vi.fn(),
}));

describe('OneProduct', () => {
    beforeEach(() => {
        global.fetch = vi.fn();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('displays loading and then product details', async () => {
        const mockProduct: Product = {
            id: 1,
            title: 'Test Product',
            description: 'Test Description',
            price: 100,
            discountPercentage: 10,
            rating: 4.5,
            stock: 20,
            brand: 'Test Brand',
            category: 'Test Category',
            thumbnail: 'test_thumbnail.jpg',
            images: ['test_image.jpg'],
        };

        (fetch as vi.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockProduct,
        } as Response);

        render(
            <MemoryRouter>
                <Routes>
                    <Route path="*" element={<OneProduct />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('Test Product')).toBeInTheDocument();
        });
    });

    it('displays an error message if the fetch fails', async () => {
        (fetch as vi.Mock).mockResolvedValueOnce({
            ok: false,
            status: 404,
        } as Response);

        render(
            <MemoryRouter>
                <Routes>
                    <Route path="*" element={<OneProduct />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Error:/i)).toBeInTheDocument();
        });
    });
});
