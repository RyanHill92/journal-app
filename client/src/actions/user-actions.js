'use strict';

import errorsActions from './errors-actions';
import axios from './../utils/axios-config';
import setAuthHeader from './../utils/set-header';
import jwtDecode from 'jwt-decode';

const loginUser = _id => {
  return {
    type: 'LOGIN_USER',
    _id
  };
};

const logoutUser = history => {
  return function (dispatch) {
    dispatch({
      type: 'LOGOUT_USER',
    });
    setAuthHeader();
    localStorage.removeItem('token');
    history.push('/');
  }
};

const loginUserAsync = (email, password, history) => {
  return function (dispatch) {
    const loginObject = {
      email,
      password
    };

    //Returned function MUST return a promise. Didn't work without.
    return axios.post('/api/users/login', loginObject)
      .then(res => {
        dispatch(errorsActions.clearErrors('login'));
        //Save token in local storage.
        let token = res.data.token;
        localStorage.setItem('token', token);
        //Call function to set axios header.
        setAuthHeader(token);
        //Update user object in store.
        let decoded = jwtDecode(token);
        console.log('Logging in user!');
        dispatch(loginUser(decoded._id));

        //isAuth equal to true should trigger redirects and conditional nav display.
        return token;
      }).then(() => {
        console.log('Redirecting!');
        setTimeout(() => {
          history.push('/memory');
        }, 1000);
      })
      .catch(err => {
        let errors = !err.response ? err : err.response.data;
        console.log(errors);
        dispatch(errorsActions.setErrors('login', errors));
      });
  }
};

const registerUserAsync = (email, password, confirm) => {
  return function (dispatch) {
    const registerObject = {
      email,
      password,
      confirm
    };

    return axios.post('/api/users/register', registerObject)
      .then(res => {
        console.log(res.data);
        dispatch(errorsActions.clearErrors('register'));
      })
      .catch(err => {
        let errors = !err.response ? err : err.response.data;
        console.log(errors);
        dispatch(errorsActions.setErrors('register', errors));
      });
  }
};

const userActions = {
  loginUserAsync,
  registerUserAsync,
  loginUser,
  logoutUser
};

export default userActions;
