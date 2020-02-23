import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Nav from './Nav';
import MLForm from './MLForm';
import NewConversation from './NewConversation';

export default class Root extends Component {
  async componentDidMount() {}
  render() {
    return (
      <Router>
        <main>
          <Nav />
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/ml' component={MLForm} />
            <Route exact path='/' component={Home} />
          </Switch>
        </main>
      </Router>
    );
  }
}
