import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllConversations, filterConversations, searchReplies } from '../../redux/conversations/thunks';
import { fetchTags } from '../../redux/tags/thunks';
import * as Container from '../styled/Div';
import * as Font from '../styled/Font';
import * as Card from './Card';
import * as Div from '../styled/Div';
import * as Button from '../styled/Button';
import * as InputField from '../styled/Input';
import SearchCollapse from '../styled/SearchCollapse';
import { Pill } from '../styled/Pill';
import { extractTokens } from '../../utils';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_CONVERSATIONS = gql`
  query allConversations {
    conversations {
      id
      title
      hasAnswer
      replies {
        id
      }
      tag
    }
    tags {
      id
      name
    }
  }
`;

function AllConvos(props) {
  const [tags, setTags] = useState([]);
  const [searchStr, setSearch] = useState('');

  const { data, loading, error } = useQuery(GET_CONVERSATIONS);
  const [conversationList, setList] = useState([]);
  const [allTags, setAllTags] = useState([]);

  const handleClick = id => {
    props.history.push(`/conversations/${id}`);
  };

  const handleChange = (str) => {
    if (data) {
      let searchData = data.conversations;
      if (str) {
        searchData = searchData.filter(convo => convo.title.search(str) >= 0);
      }
      setSearch(str);
      setList(searchData);
    }
  };

  const handleFilter = (tag) => {
    let updatedTags = [...tags];
    if (tags.includes(tag)) {
      updatedTags = tags.filter(t => t !== tag);
    } else {
      updatedTags.push(tag);
    }
    setTags(updatedTags);
  };

  useEffect(() => {
    //load the whitelist of tags
    if (data && !allTags.length) {
      setAllTags(data.tags);
    }
    //if the data has loaded but conversation list is still empty, reset it
    if (data && !conversationList.length) {
      setList(data.conversations);
    }
  });

  useEffect(() => {
    if (data) {
      let filteredData = data.conversations;
      if (tags.length) {
        filteredData = filteredData.filter(convo => tags.includes(convo.tag));
      }
      setList(filteredData);
    }
  }, [tags])

  if (loading) return (
    <div>
      Loading...
    </div>
  );

  if (error || !data) return (
    <div>
      graphQL Error
    </div>
  );

  return (
    <Div.Container id="conversations-index">
      <Font.h1>Discuss. Develop. Learn.</Font.h1>
      <Font.Paragraph>
        LearnDot forums are a great way to get help from your peers.
      </Font.Paragraph>
      <Card.CardContainer>
        {
            allTags.map(tag => (
            <Pill
                key={tag.id}
                selected={tags.includes(tag.name)}
                onClick={() => handleFilter(tag.name)}
            >
                {tag.name}
            </Pill>))
        }
      </Card.CardContainer>
      <SearchCollapse
        type="text"
        name="search"
        placeholder="Search All"
        value={searchStr}
        onChange={e => handleChange(e.target.value)}
      />
      <Card.CardContainer>
        {conversationList.map(convo => (
          <Card.Card key={convo.id} onClick={() => handleClick(convo.id)}>
            <Font.h5>{convo.title}</Font.h5>
            {convo.hasAnswer && <Font.Label style={{ color: '#7992FF' }}>Answered</Font.Label>}
          </Card.Card>
        ))}
      </Card.CardContainer>
    </Div.Container>
  );
};

export default AllConvos;
