module.exports = {
    Query: {
        conversations: (_, __, { dataSources }) =>
            dataSources.conversationAPI.getAllConversations()
    }
};