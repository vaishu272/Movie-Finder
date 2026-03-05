import { useSelector, useDispatch } from "react-redux";
import {
  removeFromWatchlist,
  toggleWatched,
} from "../redux/features/movies/moviesSlice";
import { FaTrash, FaCheck } from "react-icons/fa";

const Watchlist = () => {
  const watchlist = useSelector((state) => state.movies.watchlist);
  const dispatch = useDispatch();

  if (!watchlist.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">🎬 Your watchlist is empty</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-10">
      <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center md:text-left">
        My Watchlist
      </h2>

      <div className="space-y-4">
        {watchlist.map((movie) => (
          <div
            key={movie.imdbID}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between 
            shadow-md rounded-xl p-4 hover:shadow-lg transition gap-4"
          >
            {/* LEFT SIDE */}
            <div className="flex items-center gap-4">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
                alt={movie.Title}
                className="w-14 h-20 sm:w-16 sm:h-24 object-cover rounded"
              />

              <div>
                <h3 className="font-semibold text-base sm:text-lg">
                  {movie.Title}
                </h3>

                <p className="text-sm text-gray-500">{movie.Year}</p>

                {movie.watched && (
                  <span className="text-xs text-green-600 font-medium">
                    Watched
                  </span>
                )}
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button
                onClick={() => dispatch(toggleWatched(movie.imdbID))}
                className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm cursor-pointer
                ${
                  movie.watched
                    ? "bg-gray-500 text-white"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
              >
                <FaCheck size={12} />
                {movie.watched ? "Watched" : "Mark Watched"}
              </button>

              <button
                onClick={() => dispatch(removeFromWatchlist(movie.imdbID))}
                className="flex items-center gap-2 px-3 py-1.5 cursor-pointer bg-red-600 hover:bg-red-700 text-white rounded text-sm"
              >
                <FaTrash size={12} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
