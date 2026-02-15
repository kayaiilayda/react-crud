import { Link } from "react-router-dom";
import type { IMovie } from "../interfaces/IMovie";

interface MovieCardProps {
  movie: IMovie;
  onDelete: (id: string) => void;
}

const MovieCard = ({ movie, onDelete }: MovieCardProps) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`"${movie.title}" silinecek. Emin misiniz?`)) {
      onDelete(movie.id);
    }
  };

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex flex-col group">
      <Link to={`/detay/${movie.id}`} className="no-underline text-inherit">
        <div className="relative overflow-hidden aspect-[2/3]">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/300x450/1a1a2e/e50914?text=Poster+Yok";
            }}
          />
          <div className="absolute top-2 right-2 flex gap-1">
            <span
              className={`px-2 py-1 rounded-md text-xs font-bold text-white ${
                movie.type === "film" ? "bg-primary" : "bg-blue-600"
              }`}
            >
              {movie.type === "film" ? "Film" : "Dizi"}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3">
            <div className="flex items-center gap-1">
              <span className="text-accent text-sm">&#9733;</span>
              <span className="text-white text-sm font-bold">
                {movie.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        <div className="p-3 flex-1">
          <h3 className="text-white font-bold text-sm md:text-base line-clamp-2 mb-1">
            {movie.title}
          </h3>
          <p className="text-text-muted text-xs mb-1">{movie.director}</p>
          <p className="text-text-muted/70 text-xs">{movie.genre}</p>
        </div>
      </Link>

      <div className="px-3 pb-3 flex gap-2 mt-auto">
        <Link
          to={`/duzenle/${movie.id}`}
          className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 rounded-lg transition-colors no-underline"
        >
          Düzenle
        </Link>
        <button
          onClick={handleDelete}
          className="flex-1 bg-primary hover:bg-primary-dark text-white text-xs py-2 rounded-lg transition-colors border-none cursor-pointer"
        >
          Sil
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
