import { useState, useEffect } from "react";
import type { IMovie, MediaType } from "../interfaces/IMovie";

interface MovieFormProps {
  initialData?: IMovie;
  onSubmit: (movie: Omit<IMovie, "id" | "isFromApi">) => void;
  submitLabel: string;
}

const MovieForm = ({ initialData, onSubmit, submitLabel }: MovieFormProps) => {
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [type, setType] = useState<MediaType>("film");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState(5);
  const [description, setDescription] = useState("");
  const [posterUrl, setPosterUrl] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDirector(initialData.director);
      setReleaseDate(initialData.releaseDate);
      setType(initialData.type);
      setGenre(initialData.genre);
      setRating(initialData.rating);
      setDescription(initialData.description);
      setPosterUrl(initialData.posterUrl);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      director,
      releaseDate,
      type,
      genre,
      rating,
      description,
      posterUrl,
    });
  };

  const inputClass =
    "w-full bg-dark border border-white/20 rounded-lg px-4 py-3 text-text-main placeholder-text-muted/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors";
  const labelClass = "block text-text-muted text-sm mb-1 font-medium";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Başlık *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Film veya dizi adi"
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Yönetmen / Yapımcı *</label>
          <input
            type="text"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            placeholder="Yönetmen veya yapımcı adı"
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Vizyon Tarihi *</label>
          <input
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Tür *</label>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="type"
                value="film"
                checked={type === "film"}
                onChange={() => setType("film")}
                className="accent-primary w-4 h-4"
              />
              <span className="text-text-main">Film</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="type"
                value="dizi"
                checked={type === "dizi"}
                onChange={() => setType("dizi")}
                className="accent-primary w-4 h-4"
              />
              <span className="text-text-main">Dizi</span>
            </label>
          </div>
        </div>

        <div>
          <label className={labelClass}>Kategori *</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="Örnek: Dram, Aksiyon, Bilim Kurgu"
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className={labelClass}>
            Puan: <span className="text-accent font-bold">{rating}</span> / 10
          </label>
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={rating}
            onChange={(e) => setRating(parseFloat(e.target.value))}
            className="w-full mt-2 accent-primary"
          />
          <div className="flex justify-between text-xs text-text-muted mt-1">
            <span>0</span>
            <span>5</span>
            <span>10</span>
          </div>
        </div>
      </div>

      <div>
        <label className={labelClass}>Poster URL</label>
        <input
          type="url"
          value={posterUrl}
          onChange={(e) => setPosterUrl(e.target.value)}
          placeholder="https://ornek.com/poster.jpg"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Açıklama</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Film veya dizi hakkında kısa bir açıklama yazın..."
          rows={4}
          className={`${inputClass} resize-y`}
        />
      </div>

      {posterUrl && (
        <div className="flex justify-center">
          <img
            src={posterUrl}
            alt="Poster önizleme"
            className="h-48 rounded-lg shadow-lg object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition-colors text-lg border-none cursor-pointer"
      >
        {submitLabel}
      </button>
    </form>
  );
};

export default MovieForm;
