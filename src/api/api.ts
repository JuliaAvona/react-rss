interface Product {
    id: number;
    name: string;
    price: number;
}

interface FetchProductsResponse {
    products: Product[];
    total: number;
}

const BASE_ENDPOINT = 'https://dummyjson.com/products';

export const fetchProducts = async (
    searchQuery: string, 
    limit: number, 
    skip: number
): Promise<FetchProductsResponse> => {
    const searchParam = searchQuery ? `/search?q=${encodeURIComponent(searchQuery)}` : '?';
    const limitParam = `limit=${limit}`;
    const skipParam = `skip=${skip}`;

    const url = `${BASE_ENDPOINT}${searchParam}&${limitParam}&${skipParam}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
    }
    return response.json() as Promise<FetchProductsResponse>;
};
