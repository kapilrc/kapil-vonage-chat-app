import { apiChat } from './apiChat';

type CreateConversationApiArg = {
  name: string;
  display_name: string;
};
export type CreateConversationApiResp = { id: string; name: string };

export type conversationsResp = {
  conversations: CreateConversationApiResp[];
};

export type conversationByIDResp = CreateConversationApiResp;
export type conversationBYIDArgs = {
  coversationId: string;
};

const apiChatRoom = apiChat
  .enhanceEndpoints({
    addTagTypes: ['rooms']
  })
  .injectEndpoints({
    endpoints: (build) => ({
      createConversation: build.mutation<
        CreateConversationApiResp,
        CreateConversationApiArg
      >({
        query: (queryArg) => ({
          url: `/createConversation`,
          method: 'POST',
          body: queryArg
        }),
        invalidatesTags: ['rooms']
      }),
      getConversations: build.query<conversationsResp, unknown>({
        query: () => ({
          url: `/getConversations`
        }),
        providesTags: ['rooms']
      }),
      getConversationById: build.query<
        conversationByIDResp,
        conversationBYIDArgs
      >({
        query: ({ coversationId }) => ({
          url: `/conversations/${coversationId}`
        }),
        providesTags: ['rooms']
      })
    }),
    overrideExisting: false
  });
export { apiChatRoom as enhancedApi };

export const {
  useCreateConversationMutation,
  useGetConversationsQuery,
  useGetConversationByIdQuery
} = apiChatRoom;
