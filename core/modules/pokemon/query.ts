// Need to use the React-specific entry point to allow generating React hooks
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'core/operations/data-fetch';

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: axiosBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: builder => ({
    getPokemonByName: builder.query({ query: name => ({ url: `pokemon/${name}`, method: 'get' }) }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = pokemonApi;
