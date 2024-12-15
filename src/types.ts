export interface Pokemon {
  id: number; 
  name: string; 
  image: string; 
  isInTeam: boolean; 
  types: { type: { name: string } }[]; 
  stats: { 
    stat: { name: string }; 
    base_stat: number; 
  }[];
  cry: { latest: string }; 
}

export interface PokemonDetails {
  name: string; 
  sprites: { front_default: string }; 
  types: { type: { name: string } }[];
  cries: { latest: string }; 
  height: number; 
  weight: number; 
  description: string; 
  stats: { 
    stat: { name: string }; 
    base_stat: number; 
  }[];
  evolutionChain?: { 
    name: string; 
    image: string; 
  }[];
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


