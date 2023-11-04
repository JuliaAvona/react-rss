export interface PlanetResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Planet[];
}

export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  created: string;
  edited: string;
}

interface MainProps {
    getPlanets: (options?: any) => Promise<any>;
    page: number;
    allPages: number;
    setPage: (page: number) => void;
}