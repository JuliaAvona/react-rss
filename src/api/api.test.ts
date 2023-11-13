import vi, { describe, it, expect} from 'vitest';
import { fetchProducts } from './api';

global.fetch = vi.fn() as typeof fetch;

type Product = {
    id: string;
    title: string;
    description: string;
    brand: string;
    images: string[];
};

describe('fetchProducts', () => {
    it('returns data successfully for a valid request', async () => {
        const mockProducts: Product[] = [
            { id: '1', title: 'Product 1', description: 'Description 1', brand: 'Brand 1', images: ['img1.jpg'] },
        ];
        (fetch as vi.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ products: mockProducts, total: mockProducts.length }),
        } as Response);

        const response = await fetchProducts('test', 10, 0);
        expect(response).toEqual({ products: mockProducts, total: mockProducts.length });
    });

    it('throws an error when the API request fails', async () => {
        (fetch as vi.Mock).mockResolvedValueOnce({
            ok: false,
            status: 404,
        } as Response);

        await expect(fetchProducts('test', 10, 0)).rejects.toThrow('API request failed with status 404');
    });

it('constructs the correct API URL with given parameters', async () => {
    const mockResponse = { products: [], total: 0 };
    (fetch as vi.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
    } as Response);

    await fetchProducts('shoes', 5, 10);
    expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/products/search?q=shoes&limit=5&skip=10');

    (fetch as vi.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
    } as Response);

    await fetchProducts('', 5, 10);
    expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/products/limit=5&skip=10');
});

});
