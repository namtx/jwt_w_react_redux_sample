import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import registerUserApi from '../apis/register_user_api';
import { REGISTER_USER_SUCCESS, REGISTER_USER, REGISTER_USER_FAILED } from '../actions/types';

function* registerUser(action) {
  try {
    const token = yield call(registerUserApi, action.payload);
    yield put({ type: REGISTER_USER_SUCCESS, payload: token });
    localStorage.setItem('token', token);
  } catch (error) {
    yield put({ REGISTER_USER_FAILED, payload: error.message });
  }
}

function* saga() {
  yield takeLatest(REGISTER_USER, registerUser);
}

export default saga;
