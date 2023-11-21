import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProductsResponse } from '../types/types';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
    endpoints: (builder) => ({
        fetchProducts: builder.query<ProductsResponse, { searchQuery?: string; limit: number; skip: number }>({
            query: ({ searchQuery, limit, skip }) => {
                const searchParam = searchQuery ? `/products/search?q=${encodeURIComponent(searchQuery)}` : '/products';
                const limitParam = `limit=${limit}`;
                const skipParam = `skip=${skip}`;

                return { url: `${searchParam}&${limitParam}&${skipParam}` };
            },
        }),
    }),
});

export const { useFetchProductsQuery } = productsApi;
