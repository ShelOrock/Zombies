const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const ConversationAPI = require('./graphql/conversation');
const ReplyAPI = require('./graphql/reply');
const { Conversation, Reply, Tag, User, Cohort } = require('./db');

const db = { Conversation, Reply, Tag, User, Cohort };

const apollo_Server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        conversationAPI: new ConversationAPI({ db }),
        replyAPI: new ReplyAPI({ db })
    })
});


module.exports = apollo_Server;