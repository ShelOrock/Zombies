const { DataSource } = require('apollo-datasource');
const Sequelize = require('sequelize');


class ConversationAPI extends DataSource {
    constructor({ db }) {
        super();
        this.db = db;
    }

    initialize(config) {
        this.context = config.context;
    }

    async getAllConversations() {
        const conversations = await this.db.Conversation.findAll();
        console.log(conversations);
        return conversations.map(conversation => this.conversationReducer(conversation));
    }

    conversationReducer(conversation) {
        return {
            id: conversation.id,
            title: conversation.title,
            hasAnswer: conversation.hasAnswer,
            repo: conversation.repo,
            replies: [],
            tags: []
        };
    }

    replyReducer(reply) {
        return {
            id: reply.id,
            body: reply.body,
            postIndex: reply.postNumber,
            isFlagged: reply.isFlagged,
            jsCode: reply.javascriptCode,
            cssCode: reply.cssCode,
            htmlCode: reply.htmlCode,
            timeSince: reply.timeSincePosted
        };
    }

    tagReducer(tag) {
        return {
            id: tag.id
        };
    }

}

module.exports = ConversationAPI;