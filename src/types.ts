export interface Pokemon {
  name: string;
  url: string; 
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