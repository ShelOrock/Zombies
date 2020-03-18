module.exports = {
    Query: {
        conversations: (_, __, { dataSources }) =>
            dataSources.conversationAPI.getAllConversations(),
        conversation: (_, { id }, { dataSources }) => 
            dataSources.conversationAPI.getConversationById({ id }),
    },
    Mutation: {
        PostConversation: async(_, { content }, { dataSources }) => {
            const created = await dataSources.conversationAPI.createConversation({ content });
            if (created) {
                return {
                    success: true,
                    conversation: created
                }
            }
            return {
                success: false,
                conversation: null
            };
        },
        PostReply: async(_, { content }, { dataSources }) => {
            const created = await dataSources.replyAPI.createReply({ content });
            if (created) {
                const parent = await dataSources.conversationAPI.getConversationById({ id: created.conversationId });
                return {
                    success: true,
                    conversation: parent
                }
            }
            return {
                success: false,
                conversation: null
            };
        }
    }
};