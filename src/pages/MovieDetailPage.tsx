import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import type { IMovie } from "../interfaces/IMovie";
import { localStorageService } from "../services/localStorageService";

const MovieDetailPage = () => {
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

  const handleDelete = () => {
    if (movie && window.confirm(`"${movie.title}" silinecek. Emin misiniz?`)) {
      localStorageService.deleteMovie(movie.id);
      navigate("/");
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
    <div className="max-w-4xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="text-text-muted hover:text-white mb-6 flex items-center gap-2 bg-transparent border-none cursor-pointer text-sm"
      >
        &larr; Geri Dön
      </button>

      <div className="bg-card rounded-2xl overflow-hidden shadow-xl">
        {/* Top section: Poster + Info */}
        <div className="flex flex-col md:flex-row">
          {/* Poster */}
          <div className="md:w-1/3 flex-shrink-0">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-64 md:h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://www.shutterstock.com/image-vector/missing-picture-page-website-design-600nw-1552421075.jpg";
              }}
            />
          </div>

          {/* Info */}
          <div className="flex-1 p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                  movie.type === "film" ? "bg-primary" : "bg-blue-600"
                }`}
              >
                {movie.type === "film" ? "Film" : "Dizi"}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {movie.title}
            </h1>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-text-muted text-sm min-w-[100px]">
                  Yönetmen:
                </span>
                <span className="text-white text-sm">{movie.director}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-text-muted text-sm min-w-[100px]">
                  Vizyon Tarihi:
                </span>
                <span className="text-white text-sm">
                  {new Date(movie.releaseDate).toLocaleDateString("tr-TR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-text-muted text-sm min-w-[100px]">
                  Kategori:
                </span>
                <span className="text-white text-sm">{movie.genre}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-text-muted text-sm min-w-[100px]">
                  Puan:
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-accent text-lg">&#9733;</span>
                  <span className="text-white font-bold text-lg">
                    {movie.rating.toFixed(1)}
                  </span>
                  <span className="text-text-muted text-sm">/ 10</span>
                </div>
              </div>
            </div>

            {/* Rating bar */}
            <div className="w-full bg-dark rounded-full h-2 mb-6">
              <div
                className="bg-accent h-2 rounded-full transition-all duration-500"
                style={{ width: `${(movie.rating / 10) * 100}%` }}
              />
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <Link
                to={`/duzenle/${movie.id}`}
                className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors no-underline"
              >
                Düzenle
              </Link>
              <button
                onClick={handleDelete}
                className="flex-1 bg-primary hover:bg-primary-dark text-white font-medium py-3 rounded-lg transition-colors border-none cursor-pointer"
              >
                Sil
              </button>
            </div>
          </div>
        </div>

        {/* Description section */}
        {movie.description && (
          <div className="border-t border-white/10 p-6 md:p-8">
            <h2 className="text-lg font-bold text-white mb-3">Hakkında</h2>
            <p className="text-text-muted leading-relaxed">
              {movie.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailPage;
