import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import type { IMovie } from "../interfaces/IMovie";
import { localStorageService } from "../services/localStorageService";
import MovieForm from "../components/MovieForm";

const AddMoviePage = () => {
  const navigate = useNavigate();

  const handleSubmit = (movieData: Omit<IMovie, "id" | "isFromApi">) => {
    const newMovie: IMovie = {
      ...movieData,
      id: uuidv4(),
    };
    localStorageService.addMovie(newMovie);
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Yeni Film / Dizi Ekle
        </h1>
        <p className="text-text-muted text-sm mt-1">
          Koleksiyonunuza yeni bir film veya dizi ekleyin.
        </p>
      </div>

      <div className="bg-card rounded-2xl p-6 md:p-8 shadow-lg">
        <MovieForm onSubmit={handleSubmit} submitLabel="Kaydet" />
      </div>
    </div>
  );
};

export default AddMoviePage;
