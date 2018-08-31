import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER } from './types';

const AUTH_URL = 'http://localhost:3090/signin';

export const signIn = ({ email, password }) => (
  (dispatch) => {
    axios.post(AUTH_URL, { email, password }, {
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      localStorage.setItem('token', response.data.token);
      dispatch({ type: AUTH_USER });
    }).catch((error) => {
      dispatch({ type: AUTH_ERROR, payload: error.message });
    });
  }
);

export const signOut = () => {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
};
