'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

import NavBar from './components/navbar';
import MemoryForm from './components/memory-form';
import Register from './components/register';
import LogIn from './components/log-in';

import store from './store/store';

//Props passed from Route via render to its possible child.
//This ensures match, location, history still get passed as props.
const App = ({
  isAuth
}) => {
  return(
      <Router>
        <div>
          <NavBar />
          <div>
            <Route exact path='/' render={props =>
                isAuth ? (
                  <Redirect to='/memory' />
                ) : (
                  <LogIn {...props}/>
                )
              } />
            <Route path='/register' render={props =>
                isAuth ? (
                  <Redirect to='/memory' />
                ) : (
                  <Register {...props}/>
                )
              } />
            <Route path='/memory' render={props =>
                !isAuth ? (
                  <Redirect exact to='/' />
                ) : (
                  <MemoryForm {...props} />
                )
              } />
          </div>
        </div>
      </Router>
  );
}

const mapStateToProps = state => {
  return {
    isAuth: state.user.isAuth
  };
}

const WrappedApp = connect(
  mapStateToProps,
  null
)(App);

ReactDOM.render(
  <Provider store={store}>
    <WrappedApp/>
  </Provider>,
  document.getElementById('root')
);
