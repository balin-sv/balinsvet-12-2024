export interface Pokemon {
  name: string;
  url: string;
  image: string;
  isInTeam?: boolean; 
}

export interface PokemonDetails {
  name: string; 
  weight: number; 
  height: number; 
  sprites: {
    front_default: string; 
  };
}

export type PokemonTeam = Array<Pokemon>;