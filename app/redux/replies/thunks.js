import axios from 'axios';

import {
  createReply,
  editReply,
  setAllReplies,
  setReply,
  removeReply,
} from './actions';
import { checkError, checkSuccess } from '../statusMessage/utils';

export const newReply = reply => {
  return dispatch => {
    return axios
      .post('/api/reply', reply)
      .then(res => dispatch(createReply(res.data)))
      .catch(e => checkError(dispatch, e.response.status));
  };
};

export const updateReply = (reply, id) => {
  return dispatch => {
    return axios
      .put(`/api/reply/${id}`, reply)
      .then(res => {
        dispatch(editReply(res.data))
        checkSuccess(dispatch, res.status)
      })
      .catch(e => checkError(dispatch, e.response.status));
  };
};

export const fetchReply = id => {
  return dispatch => {
    return axios
      .get(`/api/reply/${id}`)
      .then(res => dispatch(setReply(res.data)))
      .catch(e => checkError(dispatch, e.response.status));
  };
};

export const fetchAllReplies = () => {
  return dispatch => {
    return axios
      .get('/api/reply')
      .then(res => dispatch(setAllReplies(res.data)))
      .catch(e => checkError(dispatch, e.response.status));
  };
};

export const deleteReply = id => {
  return dispatch => {
    return axios
      .delete(`/api/reply/${id}`)
      .then(res => {
        dispatch(removeReply(id))
        checkSuccess(dispatch, res.status)
      })
      .catch(e => checkError(dispatch, e.response.status));
  };
};
