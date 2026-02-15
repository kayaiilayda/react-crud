import type { MediaType } from "../interfaces/IMovie";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterType: MediaType | "hepsi";
  onFilterChange: (value: MediaType | "hepsi") => void;
}

const SearchBar = ({
  searchTerm,
  onSearchChange,
  filterType,
  onFilterChange,
}: SearchBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="flex-1 relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
          &#128269;
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Film veya dizi ara..."
          className="w-full bg-card border border-white/10 rounded-lg pl-10 pr-4 py-3 text-text-main placeholder-text-muted/50 focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      <div className="flex gap-2">
        {(["hepsi", "film", "dizi"] as const).map((t) => (
          <button
            key={t}
            onClick={() => onFilterChange(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border-none cursor-pointer ${
              filterType === t
                ? "bg-primary text-white"
                : "bg-card text-text-muted hover:bg-card-hover hover:text-white"
            }`}
          >
            {t === "hepsi" ? "Hepsi" : t === "film" ? "Filmler" : "Diziler"}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
