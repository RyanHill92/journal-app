import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import userReducer from './../reducers/user-reducer';
import errorsReducer from './../reducers/errors-reducer';
import memoriesReducer from './../reducers/memories-reducer';

const initialState = {
  user: {
    email: '',
    token: '',
    isAuth: false
  },
  errors: {
    memoryDate: {},
    memoryBody: {},
    login: {},
    register: {}
  },
  memories: []
}

const rootReducer = (state, action) => {
  return {
    user: userReducer(state.user, action),
    errors: errorsReducer(state.errors, action),
    memories: memoriesReducer(state.memories, action)
  };
}

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
