const { DataSource } = require('apollo-datasource');
const { tagReducer } = require('./commonMethods');

class TagAPI extends DataSource {
    constructor({ db }) {
        super();
        this.db = db;
    }

    initialize(config) {
        this.context = config.context;
    }

    async getAllTags() {
        const allTags = await this.db.Tag.findAll();
        return allTags.map(tag => tagReducer(tag));
    }
    
    async getTagByName({ name }) {
        const tag = await this.db.Tag.findOne({
            where: {
                name,
            },
            include: {
                model: this.db.Conversation,
                through: {
                    attributes: []
                }
            }
        });
        return tag ? tagReducer(tag) : [];
    }
}

module.exports = TagAPI;