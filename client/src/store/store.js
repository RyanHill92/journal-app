import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import userReducer from './../reducers/user-reducer';
import errorsReducer from './../reducers/errors-reducer';
import memoriesReducer from './../reducers/memories-reducer';
import StateSaver from './state-saver';

const stateSaver = new StateSaver();

const rootReducer = (state, action) => {
  return {
    user: userReducer(state.user, action),
    errors: errorsReducer(state.errors, action),
    memories: memoriesReducer(state.memories, action)
  };
}

//Call load, not initialize, in case of refresh.
const store = createStore(
  rootReducer,
  stateSaver.loadState(),
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.subscribe(() => {
  stateSaver.saveState(store.getState());
});

export default store;
