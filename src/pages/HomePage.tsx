import { useState, useEffect } from "react";
import type { IMovie, MediaType } from "../interfaces/IMovie";
import { localStorageService } from "../services/localStorageService";
import { sampleMovies } from "../data/sampleMovies";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

const HomePage = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<MediaType | "hepsi">("hepsi");

  useEffect(() => {
    localStorageService.initializeWithSampleData(sampleMovies);
    setMovies(localStorageService.getMovies());
  }, []);

  const handleDelete = (id: string) => {
    localStorageService.deleteMovie(id);
    setMovies(localStorageService.getMovies());
  };

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch =
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === "hepsi" || movie.type === filterType;

    return matchesSearch && matchesType;
  });

  const totalMovies = movies.filter((m) => m.type === "film").length;
  const totalSeries = movies.filter((m) => m.type === "dizi").length;

  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary/20 to-card rounded-2xl p-6 md:p-10 mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
          Hoş Geldiniz!
        </h1>
        <p className="text-text-muted text-sm md:text-base mb-4">
          İzlediğiniz film ve dizileri takip edin, puanlayın ve koleksiyonunuzu
          oluşturun.
        </p>
        <div className="flex gap-4 text-sm">
          <div className="bg-dark/50 px-4 py-2 rounded-lg">
            <span className="text-primary font-bold text-lg">{totalMovies}</span>
            <span className="text-text-muted ml-1">Film</span>
          </div>
          <div className="bg-dark/50 px-4 py-2 rounded-lg">
            <span className="text-blue-500 font-bold text-lg">{totalSeries}</span>
            <span className="text-text-muted ml-1">Dizi</span>
          </div>
          <div className="bg-dark/50 px-4 py-2 rounded-lg">
            <span className="text-accent font-bold text-lg">{movies.length}</span>
            <span className="text-text-muted ml-1">Toplam</span>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterType={filterType}
        onFilterChange={setFilterType}
      />

      {/* Movie Grid */}
      {filteredMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-6xl mb-4">&#127916;</p>
          <p className="text-text-muted text-lg">
            {searchTerm || filterType !== "hepsi"
              ? "Aramanızla eşleşen sonuç bulunamadı."
              : "Henüz eklenmiş film veya dizi yok."}
          </p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
