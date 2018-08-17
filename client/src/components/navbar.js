'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter} from 'react-router-dom';
import userActions from './../actions/user-actions';
import PropTypes from 'prop-types';

const NavBar = ({
  isAuth,
  logoutUser,
  ...props
}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <span className="navbar-brand mb-0 h1">Memory Map</span>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        {!isAuth ?
          (
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">Register</NavLink>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/memory">Memories</NavLink>
              </li>
            </ul>
          )
        }
        {isAuth &&
          (<ul className="navbar-nav flex-row ml-auto">
            <li>
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={() => {
                  logoutUser(props.history);
                }}
                >
                Logout
              </button>
            </li>
          </ul>)
        }
      </div>
    </nav>
  );
};

NavBar.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    isAuth: state.user.isAuth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: history =>
      dispatch(userActions.logoutUser(history))
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar));
