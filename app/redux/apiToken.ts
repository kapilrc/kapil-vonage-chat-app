import { apiClient } from '../_utils/apiClient';

type TokenByUserProp = {
  name: string;
};

export type ApiToken = {
  jwt: string;
};

const injectedRtkApi = apiClient
  .enhanceEndpoints({
    addTagTypes: ['token']
  })
  .injectEndpoints({
    endpoints: (build) => ({
      generateToken: build.mutation<ApiToken, TokenByUserProp>({
        query: ({ name }) => {
          return {
            url: `/getJWT`,
            method: 'POST',
            body: { name }
          };
        },
        invalidatesTags: ['token']
      })
    }),
    overrideExisting: false
  });
export { injectedRtkApi as enhancedApi };

export const { useGenerateTokenMutation } = injectedRtkApi;
