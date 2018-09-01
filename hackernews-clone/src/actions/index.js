import axios from 'axios';
import {
  AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILED,
} from './types';

const API_ORIGIN = 'http://localhost:3090';

export const signIn = ({ email, password }, history) => (
  (dispatch) => {
    axios.post(`${API_ORIGIN}/signin`, { email, password }, {
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      dispatch({ type: AUTH_USER });
      localStorage.setItem('token', response.data.token);
      history.push('/');
    }).catch((error) => {
      dispatch({ type: AUTH_ERROR, payload: error.message });
    });
  }
);

export const fetchPosts = () => (
  (dispatch) => {
    axios.get(`${API_ORIGIN}/`, {
      headers: { Authorization: localStorage.getItem('token') },
    }).then((response) => {
      dispatch({ type: FETCH_POSTS_SUCCESS, payload: response.data });
    }).catch((error) => {
      dispatch({ type: FETCH_POSTS_FAILED, payload: error.message });
      if (error.response.status === 401) {
        dispatch({ type: AUTH_ERROR, payload: error.message });
      }
    });
  }
);

export const signOut = () => {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
};
