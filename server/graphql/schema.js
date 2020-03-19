const { gql } = require('apollo-server');

const typeDefs = gql`
    type Conversation {
        id: ID!
        title: String!
        hasAnswer: Boolean!
        repo: String
        replies: [Reply]
        tag: String
    }

    type Reply {
        id: ID!
        body: String
        postIndex: Int!
        isFlagged: Boolean!
        jsCode: String
        cssCode: String
        htmlCode: String
        timeSince: String
    }

    type User {
        id: ID!
        name: String
        email: String!
        password: String!
    }

    type Tag {
        id: ID!
        name: String!
        conversations: [Conversation]
    }

    type Query {
        conversations: [Conversation]!
        conversation(id: ID!): Conversation
        tags: [Tag]!
        tag(name: String): Tag
    }

    input ReplyInput {
        body: String
        jsCode: String
        cssCode: String
        htmlCode: String
        conversationId: ID!
        authorId: ID!
    }

    input ConversationInput {
        title: String!
        authorId: ID!
        repo: String
        tagId: ID
    }

    type Mutation {
        PostConversation(content: ConversationInput!): PostResponse
        PostReply(content: ReplyInput!): PostResponse
    }

    type PostResponse {
        success: Boolean!
        conversation: Conversation
    }
`;

module.exports = typeDefs;