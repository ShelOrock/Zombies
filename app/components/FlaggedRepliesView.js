import React from 'react';
import { connect } from 'react-redux';

import * as Container from './styled/Div';
import * as Font from './styled/Font';
import * as Card from './styled/card';
import { Button } from './styled/Button';
import { Hr } from './styled/Div';

import {
  fetchAllReplies,
  updateReply,
  deleteReply,
} from '../redux/replies/thunks';
import { fetchUsers } from '../redux/users/thunks';

import NotFound from './404Page';

class FlaggedReplies extends React.Component {
  constructor() {
    super();
    this.state = {
      isFlagged: true,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.props.fetchReplies(this.props.user.userType);
    this.props.fetchUsers(this.props.user.userType);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.replies.length === 0) {
      this.props.fetchReplies(this.props.user.userType);
    }

    if(prevProps.users.length === 0) {
      this.props.fetchUsers(this.props.user.userType);
    }
  }

  handleUpdateReply = (e, id) => {
    e.preventDefault();
    this.setState({ isLoading: true })
    this.props.updateReply(id, { isFlagged: false }, this.props.user.userType)
    .then(() => this.setState({ isLoading: false }))
  };

  handleDeleteReply = (e, id) => {
    e.preventDefault();
    this.setState({ isLoading: true })
    this.props.deleteReply(id, this.props.user.userType)
    .then(() => this.setState({ isLoading: false }))
  }
  
  render() {
    return (
      this.props.user.userType === 'admin' ? (
        <Container.Paper id="conversations-index">
          <Font.hero>Flagged Replies</Font.hero>
          <Card.CardContainer>
            {this.props.replies.map(reply => (
              <Card.Card key={reply.id}>
                <Font.Header>Conversation Title:</Font.Header>
                <Font.Paragraph>{reply.conversation.title}</Font.Paragraph>
                <Hr />
                <Font.Header>User name:</Font.Header>
                <Font.Paragraph>
                  {this.props.users.length &&
                    this.props.users.find(user => user.id === reply.userId).name}
                </Font.Paragraph>
                <Hr />
                <Font.Header>Flagged Reply:</Font.Header>
                <Font.Paragraph>{reply.body}</Font.Paragraph>

                <Button onClick={e => this.handleUpdateReply(e, reply.id)}>
                  Remove Flag
                </Button>
                <Button onClick={e => this.handleDeleteReply(e, reply.id)}>
                  Delete
                </Button>
              </Card.Card>
            ))}
          </Card.CardContainer>
        </Container.Paper>
      ) : (
        <NotFound />
      )
    )
  }
}

const mapStateToProps = ({ replies, users, user }) => ({
  replies,
  users,
  user,
});

const mapDispatchToProps = dispatch => {
  return {
    fetchReplies: token => dispatch(fetchAllReplies(token)),
    fetchUsers: token => dispatch(fetchUsers(token)),
    updateReply: (id, flagged, token) => dispatch(updateReply(id, flagged, token)),
    deleteReply: (id, token) => dispatch(deleteReply(id, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlaggedReplies);
