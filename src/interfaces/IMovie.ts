export type MediaType = "film" | "dizi";

export interface IMovie {
  id: string;
  title: string;
  director: string;
  releaseDate: string;
  type: MediaType;
  genre: string;
  rating: number;
  description: string;
  posterUrl: string;
}
