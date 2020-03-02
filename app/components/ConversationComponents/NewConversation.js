import React, { Component } from 'react';
import { connect } from 'react-redux';
import nlp from 'compromise';

import { MainContainer } from '../styled/Div';
import { Header } from '../styled/Font';
import { Form } from '../styled/Form';
import { Input, InputFeedback, Label } from '../styled/Input';
import { Button } from '../styled/Button';
import { Select, Option } from '../styled/Select';
import { Pill, PillContainer } from '../styled/Pill';
import { NavSpan } from '../styled/Nav';

import { fetchRepos } from '../../redux/repository/thunks';
import {
  createConversation,
  fetchCurrentConversation,
} from '../../redux/conversations/thunks';
import { createReply } from '../../redux/replies/thunks';

import Editor from './Editor';

import { extractTokens, pruneHTML } from '../../utils';

let whiteList = {};

class NewConversation extends Component {
  constructor() {
    super();
    this.state = {
      repo: '',
      topic: '',
      body: '',
      errors: {
        topicError: '',
        bodyError: '',
      },
      tags: [],
    };
  }

  handleOnChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      this.validate(name, value);
      this.generateTags(value);
    });
  };

  handleOnClick = e => {
    e.preventDefault();
    const cleanText = pruneHTML(this.state.body);
    let results = extractTokens(cleanText, this.props.whitelist);
    const searchTags = this.props.tags.filter(t => results[t.name]);

    this.props.createConversation({
      userId: this.props.user.id,
      title: this.state.topic,
      tags: searchTags,
    })
    .then(() => {
      this.props.createReply({
        conversationId: this.props.conversation.id,
        userId: this.props.user.id,
        body: this.state.body,
        repo: this.state.repo,
        tags: this.state.tags
    })
  })
    .then(() => this.props.history.push(`/conversations/${this.props.conversation.id}`))
  };

  handleCodeType = (e, codeType) => {
    e.preventDefault();
    this.setState({ codeType });
  };

  getCodeBlock = codeblock => {
    this.setState({
      codeblocks: [
        ...this.state.codeblocks,
        { type: this.state.codeType, codeblock },
      ],
    });
    this.setState({ codeType: null });
  };

  generateTags = value => {
    const { tags } = this.state;
    const newTags = tags;
    //run compromise on body content
    let postTopics = nlp(value)
      .normalize({ plurals: true, parentheses: true })
      .nouns();
    //loop through returned terms
    postTopics.out('freq').forEach(term => {
      //if term is NOT already in the tags list and IS in the whitelist, add it
      if (!newTags.includes(term.reduced) && whiteList[term.reduced]) {
        newTags.push(term.reduced);
      }
    });
    if (newTags.length > tags.length) {
      this.setState({ tags: newTags });
    }
  };

  getBodyText = text => {
    this.setState({ body: text });
  };

  validate = (name, value) => {
    const { errors } = this.state;
    switch (name) {
      case 'topic':
        if (!value) {
          this.setState({
            errors: {
              ...errors,
              topicError: 'Required field',
            },
          });
        } else {
          this.setState({
            errors: {
              ...errors,
              topicError: '',
            },
          });
        }
        break;

      case 'body':
        if (!value) {
          this.setState({
            errors: {
              ...errors,
              bodyError: 'Required field',
            },
          });
        } else {
          this.setState({
            errors: {
              ...errors,
              bodyError: '',
            },
          });
        }
        break;
    }
  };

  render() {
    const {
      topic,
      body,
      tags,
      errors,
      errors: { topicError, bodyError },
    } = this.state;

    return (
      <MainContainer>
        {/* <Link to="postpage">Post Page</Link> */}
        <Form>
          <Header>Create a New Conversation</Header>
          <Label>Topic</Label>
          <Input
            type="text"
            name="topic"
            placeholder="Help running NPM Testem"
            value={topic}
            onChange={ev => this.setState({ topic: ev.target.value })}
          />
          <InputFeedback>{topicError}</InputFeedback>
          {this.props.repositories.length && this.props.user.githubUsername ? (
            <div>
              <label>Add repository link to your Conversation:</label>
              <Select
                id="repository"
                onChange={ev => this.setState({ body: ev.target.value })}
              >
                {this.props.repositories.map(repo => {
                  return (
                    <Option key={repo.id} value={repo.html_url}>
                      {repo.name}
                    </Option>
                  );
                })}
              </Select>
            </div>
          ) : null}
          <Label>Body</Label>
          <Editor getBodyText={this.getBodyText} />
          <InputFeedback>{bodyError}</InputFeedback>
          <PillContainer>
            {tags.length ? tags.map(tag => <Pill key={tag}>{tag}</Pill>) : ''}
          </PillContainer>
          {
            this.props.user.id
            ? (
          <Button
            disabled={
              !topic || !body || Object.values(errors).some(val => !!val)
                ? true
                : false
            }
            onClick={this.handleOnClick}
          >
            Post New Conversation
          </Button>
            )
            : (
            <div>
              <NavSpan secondary to='/login'>Login</NavSpan> or <NavSpan secondary to='/signup'>Create an account</NavSpan> to join the conversation.
            </div>
            )
          }
        </Form>
      </MainContainer>
    );
  }
}

const mapState = ({
  authentication,
  user,
  repositories,
  conversation,
  tags,
}) => ({
  authentication,
  user,
  repositories,
  conversation,
  tags: tags.all,
  whitelist: tags.whitelist,
});

const mapDispatch = dispatch => ({
  createConversation: content => dispatch(createConversation(content)),
  createReply: content => dispatch(createReply(content)),
  fetchCurrentConversation: conversationId =>
    dispatch(fetchCurrentConversation(conversationId)),
  fetchRepos: () => dispatch(fetchRepos()),
});

export default connect(mapState, mapDispatch)(NewConversation);