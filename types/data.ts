
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
  parent: null ;
}


export type  TChangeCategory = {
  id: number | null;
  title: string;
  description: string;
  image: null | File;
  parent: null | number;
}


export type TPostCategory = {
  title?: string
  title_uz?: string
  title_ru?: string
  title_en?: string
  description?: string
  description_ru?: string
  description_uz?: string
  description_en?: string
  image?: File
  parent?: null
}