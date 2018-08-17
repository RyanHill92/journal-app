'use strict';

import React from 'react';
import {connect} from 'react-redux';
import axios from './../utils/axios-config';
import classNames from 'classnames';
import userActions from './../actions/user-actions';
import PropTypes from 'prop-types';

//Will either get back an errors object with email, password, and/or password 2 fields
//OR
//An error object with errorMessage field.

const Register = ({
  errors,
  registerUser,
  ...props
}) => {
  let email;
  let password;
  let confirm;
  return(
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-8 m-auto" style={styles.form}>
          <h1 className="text-center">Sign Up for Memory Map</h1>
          <p><b>Instructions:</b> <em>Enter a valid email address and password to create your account.
            Passwords are case sensitive and must be between 6-30 characters in length.
          </em></p>
          <hr />
          <form
            onSubmit={e => {
              e.preventDefault();
              registerUser(email.value, password.value, confirm.value);
            }}
            >
            <div className="form-group">
              <label htmlFor="email">
                Email
              </label>
              <input
                ref={node => email = node}
                name="email"
                type="email"
                className={classNames('form-control', {
                  'is-invalid': errors.email
                })}
                />
              {errors.email && (
                <div className="invalid-feedback">
                  {errors.email}
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">
                Password
              </label>
              <input
                ref={node => password = node}
                name="password"
                type="password"
                className={classNames('form-control', {
                  'is-invalid': errors.password
                })}
                />
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password}
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="confirm">
                Confirm Password
              </label>
              <input
                ref={node => confirm = node}
                name="confirm"
                type="password"
                className={classNames('form-control', {
                  'is-invalid': errors.confirm
                })}
                />
              {errors.confirm && (
                <div className="invalid-feedback">
                  {errors.confirm}
                </div>
              )}
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary btn-lg">Create Account</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  errors: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    errors: state.errors.register
  };
};

const mapDispatchToProps = dispatch => {
  return {
    registerUser: (email, password, confirm) => {
      dispatch(userActions.registerUserAsync(email, password, confirm))
    }
  };
};

const styles = {
  form: {
    position: 'relative',
    margin: 'auto',
    top: '50px',
    left: 0,
    right: 0,
    bottom: 0
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
