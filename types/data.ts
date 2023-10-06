export interface TCategory {
  id: number;
  title: string;
  description: string;
  image: string;
  parent: {
    id: number;
    title: string;
    description: string;
    image: string;
    parent: null;
  };
}

export interface IdCategory {
  id: number;
  title: string;
  description: string;
  image: string;
  parent: null;
}
