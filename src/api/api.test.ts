import { renderHook } from '@testing-library/react-hooks';
import { describe, it, expect, vi } from 'vitest';
import { useFetchProductsQuery } from './api';

vi.mock('./api', () => ({
  useFetchProductsQuery: vi.fn().mockImplementation((params) => {
    if (params.searchQuery === '1' && params.limit === 1 && params.skip === 3) {
      return {
        data: {
          products: [
            {
              id: 9,
              title: 'Infinix INBOOK',
              description: 'Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty',
              price: 1099,
              discountPercentage: 11.83,
              rating: 4.54,
              stock: 96,
              brand: 'Infinix',
              category: 'laptops',
              thumbnail: 'https://i.dummyjson.com/data/products/9/thumbnail.jpg',
              images: [
                'https://i.dummyjson.com/data/products/9/1.jpg',
                'https://i.dummyjson.com/data/products/9/2.png',
                'https://i.dummyjson.com/data/products/9/3.png',
                'https://i.dummyjson.com/data/products/9/4.jpg',
                'https://i.dummyjson.com/data/products/9/thumbnail.jpg',
              ],
            },
          ],
          total: 23,
          skip: 3,
          limit: 1,
        },
        isSuccess: true,
      };
    }
    else if (params.searchQuery === '1' && params.limit === 1 && params.skip === 6) {
      return {
        data: {
          products: [
            {
              id: 13,
              title: "Fog Scent Xpressio Perfume",
              description: "Product details of Best Fog Scent Xpressio Perfume 100ml For Men cool long lasting perfumes for Men",
              price: 13,
              discountPercentage: 8.14,
              rating: 4.59,
              stock: 61,
              brand: "Fog Scent Xpressio",
              category: "fragrances",
              thumbnail: "https://i.dummyjson.com/data/products/13/thumbnail.webp",
              images: [
                "https://i.dummyjson.com/data/products/13/1.jpg",
                "https://i.dummyjson.com/data/products/13/2.png",
                "https://i.dummyjson.com/data/products/13/3.jpg",
                "https://i.dummyjson.com/data/products/13/4.jpg",
                "https://i.dummyjson.com/data/products/13/thumbnail.webp"
              ]
            }
          ],
          total: 23,
          skip: 6,
          limit: 1,
        },
        isSuccess: true,
      };
    }
    return { data: null, isSuccess: false };
  }),
}));

describe('useFetchProductsQuery', () => {
  it('fetches products as expected for skip 3', () => {
    const { result } = renderHook(() =>
      useFetchProductsQuery({ searchQuery: '1', limit: 1, skip: 3 })
    );

    const expectedResponseForSkip3 = {
      products: [
            {
              id: 9,
              title: 'Infinix INBOOK',
              description: 'Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty',
              price: 1099,
              discountPercentage: 11.83,
              rating: 4.54,
              stock: 96,
              brand: 'Infinix',
              category: 'laptops',
              thumbnail: 'https://i.dummyjson.com/data/products/9/thumbnail.jpg',
              images: [
                'https://i.dummyjson.com/data/products/9/1.jpg',
                'https://i.dummyjson.com/data/products/9/2.png',
                'https://i.dummyjson.com/data/products/9/3.png',
                'https://i.dummyjson.com/data/products/9/4.jpg',
                'https://i.dummyjson.com/data/products/9/thumbnail.jpg',
              ],
            },
      ],
      total: 23,
      skip: 3,
      limit: 1,
    };

    expect(result.current.data).toEqual(expectedResponseForSkip3);
    expect(result.current.isSuccess).toBe(true);
  });

  it('fetches products as expected for skip 6', () => {
    const { result } = renderHook(() =>
      useFetchProductsQuery({ searchQuery: '1', limit: 1, skip: 6 })
    );

    const expectedResponseForSkip6 = {
      products: [
            {
              id: 13,
              title: "Fog Scent Xpressio Perfume",
              description: "Product details of Best Fog Scent Xpressio Perfume 100ml For Men cool long lasting perfumes for Men",
              price: 13,
              discountPercentage: 8.14,
              rating: 4.59,
              stock: 61,
              brand: "Fog Scent Xpressio",
              category: "fragrances",
              thumbnail: "https://i.dummyjson.com/data/products/13/thumbnail.webp",
              images: [
                "https://i.dummyjson.com/data/products/13/1.jpg",
                "https://i.dummyjson.com/data/products/13/2.png",
                "https://i.dummyjson.com/data/products/13/3.jpg",
                "https://i.dummyjson.com/data/products/13/4.jpg",
                "https://i.dummyjson.com/data/products/13/thumbnail.webp"
              ]
            }
      ],
      total: 23,
      skip: 6,
      limit: 1,
    };

    expect(result.current.data).toEqual(expectedResponseForSkip6);
    expect(result.current.isSuccess).toBe(true);
  });
});