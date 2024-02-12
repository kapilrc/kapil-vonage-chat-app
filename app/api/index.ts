import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiKey = process.env.NEXT_PUBLIC_VONAGE_API_KEY as string;
const apiSecret = process.env.NEXT_PUBLIC_VONAGE_API_SECRET as string;
const base64token = [apiKey, apiSecret].join(':');

interface User {
  username: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_VONAGE_BASEURL,
  prepareHeaders: (headers) => {
    headers.set('Authorization', `Basic ${btoa(base64token)}`);
    return headers;
  }
});

export const apiClient = createApi({
  baseQuery,
  tagTypes: ['Chat', 'User'],
  endpoints: (builder) => ({
    createUser: builder.mutation<User, Partial<User>>({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        body: user
      })
    }),
    addUserToConversation: builder.mutation<
      void,
      { userId: string; conversationId: string }
    >({
      query: ({ userId, conversationId }) => ({
        url: `/conversations/${conversationId}/members`,
        method: 'POST',
        body: { user_id: userId }
      })
    })
  })
});

export const { useCreateUserMutation, useAddUserToConversationMutation } =
  apiClient;
