import type { IMovie } from "../interfaces/IMovie";

const STORAGE_KEY = "filmDiziM_movies";

export const localStorageService = {
  getMovies(): IMovie[] {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as IMovie[];
  },

  saveMovies(movies: IMovie[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
  },

  addMovie(movie: IMovie): void {
    const movies = this.getMovies();
    movies.push(movie);
    this.saveMovies(movies);
  },

  updateMovie(updatedMovie: IMovie): void {
    const movies = this.getMovies();
    const index = movies.findIndex((m) => m.id === updatedMovie.id);
    if (index !== -1) {
      movies[index] = updatedMovie;
      this.saveMovies(movies);
    }
  },

  deleteMovie(id: string): void {
    const movies = this.getMovies();
    const filtered = movies.filter((m) => m.id !== id);
    this.saveMovies(filtered);
  },

  getMovieById(id: string): IMovie | undefined {
    const movies = this.getMovies();
    return movies.find((m) => m.id === id);
  },

  isInitialized(): boolean {
    return localStorage.getItem(STORAGE_KEY) !== null;
  },

  initializeWithSampleData(sampleMovies: IMovie[]): void {
    if (!this.isInitialized()) {
      this.saveMovies(sampleMovies);
    }
  },
};
