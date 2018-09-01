import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter, Route } from 'react-router-dom';
import createSagaMiddleware from 'redux-saga';
import registerServiceWorker from './registerServiceWorker';
import authReducer from './reducers';
import Navigation from './components/navlink';
import SignInForm from './components/signin';
import RequireAuthentication from './components/require_auth';
import Posts from './components/posts';
import saga from './sagas';

const rootReducer = combineReducers({ form: formReducer, auth: authReducer });
const sagaMiddlware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, sagaMiddlware)),
);

sagaMiddlware.run(saga);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Navigation />
        <Route path="/signin" exact component={SignInForm} />
        <Route path="/posts" exact component={RequireAuthentication(Posts)} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
