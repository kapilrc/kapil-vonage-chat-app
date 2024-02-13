import { apiClient } from '../_utils/apiClient';

type apiCreateUser = {
  name: string;
  display_name?: string;
};
export type apiUser = { id: string; name: string };

export type GetUsersResp = {
  users: apiUser[];
};

export type GetUserByIdResp = apiUser;
export type apiGetUserById = {
  userId: string;
};

const userApi = apiClient
  .enhanceEndpoints({
    addTagTypes: ['users']
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      createUser: builder.mutation<apiUser, apiCreateUser>({
        query: ({ name }) => ({
          url: `/createUser`,
          method: 'POST',
          body: { name }
        }),
        invalidatesTags: ['users']
      }),
      getUsers: builder.query<GetUsersResp, unknown>({
        query: () => ({
          url: '/getUsers'
        }),
        providesTags: ['users']
      }),
      getUserById: builder.query<GetUserByIdResp, apiGetUserById>({
        query: ({ userId }) => ({ url: `/users/${userId}` }),
        providesTags: ['users']
      })
    }),
    overrideExisting: false
  });
export { userApi };

export const { useCreateUserMutation, useGetUsersQuery, useGetUserByIdQuery } =
  userApi;
