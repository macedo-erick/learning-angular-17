interface Collection {
  id: string;
  name: string;
  image: string;
}

interface Rarity {
  name: string;
  color: string;
}

export interface Skin {
  id: string;
  name: string;
  description: string;
  weapon: string;
  pattern: string;
  min_float: number;
  max_float: number;
  rarity: Rarity;
  image: string;
  collections: Collection[];
}
