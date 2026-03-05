import { configureStore } from "@reduxjs/toolkit";
import { movieFinderApi } from "./api/movieFinderApi";
import moviesReducer from "./features/movies/moviesSlice";
import authReducer from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer,
    [movieFinderApi.reducerPath]: movieFinderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(movieFinderApi.middleware),
});
