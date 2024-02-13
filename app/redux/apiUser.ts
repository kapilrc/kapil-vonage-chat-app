import { apiClient } from '../_utils/apiClient';

type apiCreateUser = {
  name: string;
  display_name?: string;
};
export type apiUser = { id: string; name: string };

const injectedRtkApi = apiClient
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
      })
    }),
    overrideExisting: false
  });
export { injectedRtkApi as enhancedApi };

export const { useCreateUserMutation } = injectedRtkApi;
