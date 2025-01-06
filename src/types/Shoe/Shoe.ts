export interface Shoe {
  id: string;
  name: string;
  distance: number;
  createdAt: Date;
}

export interface ShoeMetadata {
  id: string;
  name: string;
  filePosition: number;
  length: number;
}
