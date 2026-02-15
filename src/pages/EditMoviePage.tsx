import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { IMovie } from "../interfaces/IMovie";
import { localStorageService } from "../services/localStorageService";
import MovieForm from "../components/MovieForm";

const EditMoviePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<IMovie | undefined>(undefined);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (id) {
      const found = localStorageService.getMovieById(id);
      if (found) {
        setMovie(found);
      } else {
        setNotFound(true);
      }
    }
  }, [id]);

  const handleSubmit = (movieData: Omit<IMovie, "id">) => {
    if (movie) {
      const updatedMovie: IMovie = {
        ...movieData,
        id: movie.id,
      };
      localStorageService.updateMovie(updatedMovie);
      navigate(`/detay/${movie.id}`);
    }
  };

  if (notFound) {
    return (
      <div className="text-center py-20">
        <p className="text-6xl mb-4">&#128533;</p>
        <p className="text-text-muted text-lg">Film veya dizi bulunamadı.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg transition-colors border-none cursor-pointer"
        >
          Ana Sayfaya Dön
        </button>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-center py-20">
        <p className="text-text-muted text-lg">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Düzenle: {movie.title}
        </h1>
        <p className="text-text-muted text-sm mt-1">
          Bilgileri güncelleyin ve kaydedin.
        </p>
      </div>

      <div className="bg-card rounded-2xl p-6 md:p-8 shadow-lg">
        <MovieForm
          initialData={movie}
          onSubmit={handleSubmit}
          submitLabel="Güncelle"
        />
      </div>
    </div>
  );
};

export default EditMoviePage;
