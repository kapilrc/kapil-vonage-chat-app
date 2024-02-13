import { apiClient } from '../_utils/apiClient';

type Conversation = {
  userId: string;
  conversationId: string;
  message: string;
};

export const apiChat = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (conversationId: string) => ({
        url: `/conversations/${conversationId}/messages`,
        method: 'GET'
      })
    }),
    sendMessage: builder.mutation({
      query: ({ userId, conversationId, message }: Conversation) => ({
        url: `messages/${conversationId}`,
        method: 'POST',
        body: { user_id: userId, text: message }
      })
    })
  })
});

export const { useGetMessagesQuery, useSendMessageMutation } = apiChat;
