'use strict';

import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import memoriesActions from './../actions/memories-actions';

const MemoryList = ({
  showMemories
}) => {
  return(
    <button
      type="button"
      className="btn btn-success btn-large"
      onClick={() => showMemories()}
      >
      See All Memories!
    </button>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    showMemories: () =>
      dispatch(memoriesActions.getAllMemoriesAsync())
  };
}

export default connect(
  null,
  mapDispatchToProps
)(MemoryList);
