import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_VONAGE_BASEURL,
  prepareHeaders: (headers) => {
    return headers;
  }
});

export const apiClient = createApi({
  baseQuery,
  endpoints: (builder) => ({})
});
