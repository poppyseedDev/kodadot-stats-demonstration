export interface Metadata {
    name: string;
    description: string;
    image: string;
    external_url?: string;
    animation_url?: string;
  }
  
export interface Item {
    id: string;
    createdAt: Date;
    name: string;
    metadata: string;
    currentOwner: string;
    image?: string;
    meta?: Metadata;
    price: bigint;
    issuer: string;
}

interface CollectionMeta {
  id: string;
  name: string;
  description: string;
  image: string;
  animationUrl: string;
  type: null | string; // Use the correct type here if it's not null or string
}

export interface Collection {
  id: string;
  createdAt: string;
  name: string;
  metadata: string;
  currentOwner: string;
  issuer: string;
  meta?: CollectionMeta;
}

export type CollectionType = { collection: Collection; }

export type GraphLike<T> = { data: T } | T

export type SingleItem = GraphLike<{ item: Item; } | null>

export type  MultipleItems = GraphLike<{ items: Item[]; } | null>

