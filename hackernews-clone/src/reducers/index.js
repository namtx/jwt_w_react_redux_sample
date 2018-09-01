import {
  AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_POSTS_FAILED, FETCH_POSTS_SUCCESS, REGISTER_USER,
  REGISTER_USER_SUCCESS, REGISTER_USER_FAILED,
} from '../actions/types';

const DEFAULT_STATE = { authenticated: false };

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true };
    case UNAUTH_USER:
      return { ...state, error: '', authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload, authenticated: false };
    case FETCH_POSTS_SUCCESS:
      return { ...state, posts: action.payload, authenticated: true };
    case FETCH_POSTS_FAILED:
      return { ...state, error: action.payload };
    case REGISTER_USER:
      return { ...state, registering: true };
    case REGISTER_USER_FAILED:
      return { ...state, authenticated: false, register: false };
    case REGISTER_USER_SUCCESS:
      console.log(action);
      return { ...state, authenticated: true };
    default:
      return state;
  }
};
