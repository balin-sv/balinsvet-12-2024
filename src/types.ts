export interface Pokemon {
  id: number; 
  name: string; 
  url?: string; 
  image: string; 
  sprites: { front_default: string }; 
  types: { type: { name: string } }[]; 
  stats: { stat: { name: string }; base_stat: number }[]; 
  cry: { latest: string }; 
  cries: { latest: string }; 
  isInTeam: boolean; 
  weight?: number; 
  height?: number; 
  description?: string; 
  evolutionChain?: EvolutionStage[];
}

export interface EvolutionStage {
  name: string; 
  image: string; 
}

export interface PokemonDetails {
  name: string;
  weight: number;
  height: number;
  sprites: {
    front_default: string;
  };
}

export type PokemonTeam = Pokemon[];

export interface Stat {
  base_stat: number;
  stat: { name: string };
}


