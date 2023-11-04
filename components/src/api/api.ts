import { PlanetResponse } from "../types/types";

export const getPlanets = async (params: { page: number }): Promise<PlanetResponse> => {
    const url: string = `https://swapi.dev/api/planets/?page=${params.page}`;
    const response = await fetch(url);
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
}

export const getTotalPages = async () => {
    const url: string = `https://swapi.dev/api/planets/?page=1`;
    const response = await fetch(url);
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
}

// export default searcPlanets = async (name: string) => {
//     const url: string = `https://swapi.dev/api/planets/?search=${name}`;
//     const response = await fetch(url);
//     if (response.ok) {
//         return await response.json();
//     } else {
//         throw new Error(`Failed to fetch data: ${response.statusText}`);
//     }
// }