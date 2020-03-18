const { DataSource } = require('apollo-datasource');


class ConversationAPI extends DataSource {
    constructor({ db }) {
        super();
        this.db = db;
    }

    initialize(config) {
        this.context = config.context;
    }

    async getAllConversations() {
        const conversations = await this.db.Conversation.findAll({
            include: [
                {
                  model: this.db.Reply,
                  include: [{ model: this.db.User }],
                  order: [['createdAt', 'DESC']]
                },
                {
                  model: this.db.Tag,
                  through: {
                    attributes: [],
                  },
                },
              ],
        });
        return conversations.map(conversation => this.conversationReducer(conversation));
    }

    async getConversationById({ id }) {
        try {
            const dbResult = await this.db.Conversation.findOne({
                where: {
                    id: id,
                },
                include: [
                    {
                      model: this.db.Reply,
                      include: [{ model: this.db.User }],
                      order: [['createdAt', 'DESC']]
                    },
                    {
                      model: this.db.Tag,
                      through: {
                        attributes: [],
                      },
                    },
                ],
            });
            const conversation = this.conversationReducer(dbResult);
            return conversation;
        }
        catch(e) {
            return null;
        }
    }

    async createConversation({ content }) {
        try {
            const newConversation = await this.db.Conversation.create({
                userId: content.authorId,
                title: content.title,
                repo: content.repo || '',
            });
            if (content.tagId) { 
                await newConversation.addTag(content.tagId); 
            }
            return newConversation;
        }
        catch (e) {
            return null;
        }

    }

    conversationReducer(conversation) {
        return {
            id: conversation.id,
            title: conversation.title,
            hasAnswer: conversation.hasAnswer,
            repo: conversation.repo,
            replies: conversation.replies
                ? conversation.replies.map(reply => this.replyReducer(reply))
                : [],
            tag: conversation.tags && conversation.tags.length
                ? conversation.tags[0].name
                : null,
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

    // tagReducer(tag) {
    //     return {
    //         id: tag.id,
    //         name: tag.name
    //     };
    // }

}

module.exports = ConversationAPI;