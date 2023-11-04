export const getPlanets = async (params: { page: number }) => {
    const url: string = `https://swapi.dev/api/planets/?page=${params.page}`;
    const response = await fetch(url);
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
}