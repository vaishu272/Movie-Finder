import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export const movieFinderApi = createApi({
  reducerPath: "movieFinderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.omdbapi.com/",
  }),
  endpoints: (builder) => ({
    getMoviesByName: builder.query({
      query: ({ name, page = 1 }) =>
        `?apikey=${API_KEY}&s=${name}&page=${page}`,
    }),
  }),
});

export const { useGetMoviesByNameQuery } = movieFinderApi;
