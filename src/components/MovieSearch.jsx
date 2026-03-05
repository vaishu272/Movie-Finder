import { useState, useEffect, useMemo } from "react";
import { useGetMoviesByNameQuery } from "../redux/api/movieFinderApi";
import { useDispatch, useSelector } from "react-redux";
import { addToWatchlist } from "../redux/features/movies/moviesSlice";
import { FaPlus } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";

const MovieSearch = () => {
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.movies.watchlist);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState({});
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  /* ---------------- Debounce Search ---------------- */

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!searchTerm.trim()) return;
      setDebouncedSearch(searchTerm);
      setPage(1);
      setPages({});
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  /* ---------------- API Query ---------------- */

  const { data, isLoading, error } = useGetMoviesByNameQuery(
    { name: debouncedSearch, page },
    { skip: !debouncedSearch },
  );

  /* ---------------- Store Pages ---------------- */

  useEffect(() => {
    if (!data?.Search) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPages((prev) => ({
      ...prev,
      [page]: data.Search,
    }));
  }, [data, page]);

  /* ---------------- Combine Pages ---------------- */

  const movies = useMemo(() => {
    return Object.values(pages).flat();
  }, [pages]);

  /* ---------------- Remove Duplicates ---------------- */

  const uniqueMovies = useMemo(() => {
    const map = new Map();
    movies.forEach((m) => {
      if (!map.has(m.imdbID)) map.set(m.imdbID, m);
    });
    return Array.from(map.values());
  }, [movies]);

  /* ---------------- Suggestions ---------------- */

  const suggestions = data?.Search?.slice(0, 5) || [];

  /* ---------------- Infinite Scroll ---------------- */

  const fetchMoreMovies = () => {
    const total = Number(data?.totalResults || 0);

    if (uniqueMovies.length < total) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* SEARCH BAR */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Discover Your Movie 🎬</h1>

        <p className="text-gray-400">
          Search from thousands of movies and build your watchlist
        </p>
      </div>
      <div className="relative flex justify-center mb-12">
        <input
          type="text"
          placeholder="Search movies like Avengers, Inception, Batman..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              setShowSuggestions(false);
              setDebouncedSearch(searchTerm);
              setPage(1);
              setPages({});
            }
          }}
          className="w-full max-w-xl px-5 py-3 rounded border border-gray-300
  shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Suggestions */}
        {showSuggestions && searchTerm && suggestions.length > 0 && (
          <div className="absolute top-14 w-full max-w-xl rounded-xl shadow-lg z-10 bg-white text-gray-800 border">
            {suggestions.map((movie) => (
              <div
                key={movie.imdbID}
                onClick={() => {
                  setSearchTerm(movie.Title);
                  setShowSuggestions(false);
                }}
                className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 hover:rounded-xl"
              >
                {movie.Title} ({movie.Year})
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Loading */}
      {isLoading && page === 1 && (
        <p className="text-center text-gray-500">Searching movies...</p>
      )}

      {/* Error */}
      {error && (
        <p className="text-center text-red-500">
          Something went wrong while fetching movies
        </p>
      )}

      {/* MOVIE GRID */}
      <InfiniteScroll
        dataLength={uniqueMovies.length}
        next={fetchMoreMovies}
        hasMore={uniqueMovies.length < Number(data?.totalResults || 0)}
        loader={
          <p className="text-center mt-6 text-gray-500">
            Loading more movies...
          </p>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {uniqueMovies.map((movie) => {
            const isAdded = watchlist.some(
              (item) => item.imdbID === movie.imdbID,
            );

            return (
              <div
                key={movie.imdbID}
                onClick={() =>
                  setActiveCard(
                    activeCard === movie.imdbID ? null : movie.imdbID,
                  )
                }
                className="group relative rounded-xl overflow-hidden shadow-lg 
                  transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
              >
                {/* Poster */}
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
                  alt={movie.Title}
                  className="w-full h-96 sm:h-72 object-cover"
                />

                {/* Overlay */}
                <div
                  className={`absolute inset-0 bg-black/70 
                    transition flex flex-col justify-end p-4 text-white
                    ${
                      activeCard === movie.imdbID
                        ? "opacity-100"
                        : "opacity-0 md:group-hover:opacity-100"
                    }`}
                >
                  <h3 className="text-sm font-semibold line-clamp-2">
                    {movie.Title}
                  </h3>

                  <p className="text-xs text-gray-300 mb-3">{movie.Year}</p>

                  <button
                    disabled={isAdded}
                    onClick={() =>
                      dispatch(
                        addToWatchlist({
                          imdbID: movie.imdbID,
                          Title: movie.Title,
                          Poster: movie.Poster,
                          Year: movie.Year,
                        }),
                      )
                    }
                    className={`flex items-center justify-center gap-2 py-1.5 rounded-md text-sm
                    ${
                      isAdded
                        ? "bg-green-600 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                    }`}
                  >
                    {isAdded ? (
                      "✓ Added"
                    ) : (
                      <>
                        <FaPlus size={12} />
                        Watchlist
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default MovieSearch;
