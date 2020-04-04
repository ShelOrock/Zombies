import axios from 'axios';

import { checkError } from '../statusMessage/utils';
import { setAllRepos } from './actions';

export const fetchRepos = username => {
  return dispatch => {
    console.log(username);
    return axios
      .get(`https://api.github.com/users/${username}/repos`)
      .then(res => res.data)
      .then(repoList => dispatch(setAllRepos(repoList)))
      .catch(e => checkError(dispatch, e.response.status));
  };
};
