const { DataSource } = require('apollo-datasource');

class ReplyAPI extends DataSource {
    constructor({ db }) {
        super();
        this.db = db;
    }

    initialize(config) {
        this.context = config.context;
    }

    async createReply({ content }) {
        try {
            const newReply = await this.db.Reply.create({
                conversationId: content.conversationId,
                body: content.body,
                postNumber: content.postIndex,
                cssCode: content.cssCode,
                htmlCode: content.htmlCode,
                javascriptCode: content.jsCode,
                userId: content.authorId
            });
            return newReply;
        }
        catch (e) {
            return null;
        } 
    }
}

module.exports = ReplyAPI;