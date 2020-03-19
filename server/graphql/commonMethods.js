
const replyReducer = (reply) => {
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

const conversationReducer = (conversation) => {
    return {
        id: conversation.id,
        title: conversation.title,
        hasAnswer: conversation.hasAnswer,
        repo: conversation.repo,
        replies: conversation.replies
            ? conversation.replies.map(reply => replyReducer(reply))
            : [],
        tag: conversation.tags && conversation.tags.length
            ? conversation.tags[0].name
            : null,
    };
}

const tagReducer = (tag) => {
    return {
        id: tag.id,
        name: tag.name,
        conversations: tag.conversations
        ? tag.conversations.map(conversation => conversationReducer(conversation))
        : []
    };
}

module.exports = {
    conversationReducer,
    replyReducer,
    tagReducer
}