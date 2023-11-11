import { describe, it, expect, vi } from 'vitest';
import { fetchProducts } from './api';

global.fetch = vi.fn() as typeof fetch;

type Product = {
    id: number;
    name: string;
    price: number;
};

describe('fetchProducts', () => {
    it('returns data successfully for a valid request', async () => {
        const mockProducts: Product[] = [
            { id: 1, name: 'Product 1', price: 100 },
        ];
        (fetch as vi.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ products: mockProducts }),
        } as Response);

        const response = await fetchProducts('test', 10, 0);
        expect(response).toEqual({ products: mockProducts });
    });

    it('throws an error when the API request fails', async () => {
        (fetch as vi.Mock).mockResolvedValueOnce({
            ok: false,
            status: 404,
        } as Response);

        await expect(fetchProducts('test', 10, 0)).rejects.toThrow('API request failed with status 404');
    });

    it('constructs the correct API URL with given parameters', async () => {
        const mockResponse = { products: [] };
        (fetch as vi.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        } as Response);

        await fetchProducts('shoes', 5, 10);
        expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/products/search?q=shoes&limit=5&skip=10');
    });
});
