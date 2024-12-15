import { types } from "util";

interface Pokemon {
  name: string
  sprites: {
    front_default: string
  }
  types: { type: { name: string } }[]
  stats: { stat: { name: string }; base_stat: number }[]
  cries: {
    latest: string
  }
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

export interface Stat {
  base_stat: number;
  stat: { name: string };
}

export {};