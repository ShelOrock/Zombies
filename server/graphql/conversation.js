const { DataSource } = require('apollo-datasource');
const { conversationReducer, replyReducer} = require('./commonMethods');

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
        return conversations.map(conversation => conversationReducer(conversation));
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
            const conversation = conversationReducer(dbResult);
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

}

module.exports = ConversationAPI;