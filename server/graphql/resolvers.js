module.exports = {
    Query: {
        conversations: (_, __, { dataSources }) =>
            dataSources.conversationAPI.getAllConversations()
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
        }
    }
};