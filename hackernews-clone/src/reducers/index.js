import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from '../actions/types';

const DEFAULT_STATE = { authenticated: false };

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true };
    case UNAUTH_USER:
      return { ...state, error: '', authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload, authenticated: false };
    default:
      return DEFAULT_STATE;
  }
};
