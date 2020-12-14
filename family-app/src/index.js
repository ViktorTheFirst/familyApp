import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import authReducer from './store/reducers/authReducer';
import userReducer from './store/reducers/userReducer';
import memoryReducer from './store/reducers/memoryReducer';
import notificationReducer from './store/reducers/notifReducer';
import Test from '../src/containers/Test';

const rootReducer = combineReducers({
  authRed: authReducer,
  userRed: userReducer,
  memoriesRed: memoryReducer,
  notificationRed: notificationReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
        {/* <Test /> */}
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
