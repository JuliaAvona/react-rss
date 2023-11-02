export interface MainProps {
  posts: ICharacter[];
  loading: boolean;
  fetchCharacters: () => Promise<void>;
}

export interface ICharacter {
  name: string;
  image: string;
  species: string;
  type: string;
}