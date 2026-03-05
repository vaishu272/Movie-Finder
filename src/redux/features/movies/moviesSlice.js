import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (search) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`,
    );
    return response.data.Search || [];
  },
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    searchTerm: "",
    movies: [],
    watchlist: [],
    loading: false,
    error: null,
  },

  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    addToWatchlist: (state, action) => {
      const exists = state.watchlist.find(
        (m) => m.imdbID === action.payload.imdbID,
      );
      if (!exists) {
        state.watchlist.push({ ...action.payload, watched: false });
      }
    },

    removeFromWatchlist: (state, action) => {
      state.watchlist = state.watchlist.filter(
        (m) => m.imdbID !== action.payload,
      );
    },

    toggleWatched: (state, action) => {
      const movie = state.watchlist.find((m) => m.imdbID === action.payload);
      if (movie) movie.watched = !movie.watched;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch movies";
      });
  },
});

export const {
  setSearchTerm,
  addToWatchlist,
  removeFromWatchlist,
  toggleWatched,
} = moviesSlice.actions;

export default moviesSlice.reducer;
