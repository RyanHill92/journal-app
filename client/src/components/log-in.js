'use strict';

import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import userActions from './../actions/user-actions';
import PropTypes from 'prop-types';

const LogIn = ({
  errors,
  loginUser,
  match,
  ...props
}) => {
  let email;
  let password;
  return(
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-8 m-auto" style={styles.form}>
          <h1 className="text-center">Log In To Memory Map</h1>
          <hr />
          <form
            onSubmit={e => {
              e.preventDefault();
              loginUser(email.value, password.value, props.history);
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
            <div className="text-center">
              <button type="submit" className="btn btn-primary btn-lg">Log In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

LogIn.propTypes = {
  errors: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    errors: state.errors.login
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (email, password, history) => {
      dispatch(userActions.loginUserAsync(email, password, history))
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

//Cool technique learned from Brad--call connect() in the export statement.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogIn);
