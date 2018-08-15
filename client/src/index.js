'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import NavBar from './components/navbar';
import MemoryForm from './components/memory-form';
import Register from './components/register';
import LogIn from './components/log-in';

import store from './store/store';

const App = () => {
  return(
      <Router>
        <div>
          <NavBar />
          <div>
            <Route exact path='/' component={LogIn} />
            <Route path='/register' component={Register}/>
            <Route path='/memory' component={MemoryForm} />
          </div>
        </div>
      </Router>
  );
}

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
