import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './Login';
import NavBar from './NavBar';
import AllConvos from './ConversationsIndex/AllConvos';
import UserProfile from './UserProfile';
import SignUp from './SignUp';
import MessageConsole from './MessageConsole';
import EditUser from './EditUser';
import NewConversation from './ConversationComponents/NewConversation';
import ConversationThread from './ConversationComponents/ConversationThread';
import LastTitleList from './LatestTitleList';
import FlaggedReplies from './FlaggedRepliesView';
import NotFound from './404Page';
import Classifier from './Classifier';

import { getUserFromGitHub } from '../redux/users/thunks';
import { fetchTags } from '../redux/tags/thunks';
import { fetchRepos } from '../redux/repository/thunks';

class Root extends Component {
  async componentDidMount() {
    await this.props.getUserFromGitHub();
    console.log(this.props.user);
    console.log(this.props.user.githubUsername);
    this.props.fetchRepos(this.props.user.githubUsername);
    console.log(this.props.repositories);
    this.props.fetchTags();
  }

  componenDidUpdate(prevProps) {
    if (this.props != prevProps) {
      this.props.setUser(this.props.user);
      if (this.props.user.githubUsername) {
        this.props.fetchRepos(this.props.user.githubUsername);
      }
    }
  }

  render() {
    return (
      <Router>
        <main>
          <NavBar />
          <Switch>
            <Route exact path="/" component={AllConvos} />
            <Route path="/userprofile" component={UserProfile} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/edituser" component={EditUser} />
            <Route path="/new" component={NewConversation} />
            <Route path="/conversations/:id" component={ConversationThread} />
            <Route path="/last" component={LastTitleList} />
            <Route path="/flagged" component={FlaggedReplies} />
            <Route path='/ml' component={Classifier} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </Router>
    );
  }
}

const mapState = ({ user, repositories }) => ({ user, repositories });

const mapDispatch = dispatch => ({
  getUserFromGitHub: () => dispatch(getUserFromGitHub()),
  fetchTags: () => dispatch(fetchTags()),
  fetchRepos: (username) => dispatch(fetchRepos(username)),
});

export default connect(mapState, mapDispatch)(Root);
