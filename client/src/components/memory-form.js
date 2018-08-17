'use strict';

import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import memoriesActions from './../actions/memories-actions';

import MemoryList from './memory-list';

const MemoryForm = ({
  dateErrors,
  bodyErrors,
  user,
  postMemory,
  ...props
}) => {
  //Declare variables for the captured ref nodes.
  let day, month, year, location, text, tags;
  const {_id} = user;
  return(
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-8 m-auto" style={styles.form}>
          <h1 className="text-center">Store a Memory</h1>
          <p><b>Instructions:</b> <em>Leave all date fields blank to default to current date,
            or specify at least a year to set custom date. Incorrect date information will block form submission.
            The location field is flexible, given one or more specific address markers is submitted.
            Tag your memory with relevant descriptive words, separating each tag with a comma.
          </em></p>
          <hr />
          <form
            onSubmit={e => {
              e.preventDefault();
              postMemory({
                day: day.value,
                month: month.value,
                year: year.value,
                location: location.value,
                text: text.value,
                tags: tags.value,
                _id
              });
            }}
            >
            <div className="form-row">
              <div className="form-group col">
                <label htmlFor="month">Month</label>
                <input
                  ref={node => month = node}
                  type="number"
                  className={classNames('form-control', {
                    'is-invalid': dateErrors.month
                  })}
                  name="month"
                  placeholder="MM"
                  />
                {dateErrors.month && (
                  <div className="invalid-feedback">
                    {dateErrors.month}
                  </div>
                )}
              </div>
              <div className="form-group col">
                <label htmlFor="day">Day</label>
                <input
                  ref={node => day = node}
                  type="number"
                  className={classNames('form-control', {
                    'is-invalid': dateErrors.day
                  })}
                  name="day"
                  placeholder="DD"
                  />
                {dateErrors.day && (
                  <div className="invalid-feedback">
                    {dateErrors.day}
                  </div>
                )}
              </div>
              <div className="form-group col">
                <label htmlFor="year">Year</label>
                <input
                  ref={node => year = node}
                  type="number"
                  className={classNames('form-control', {
                    'is-invalid': dateErrors.year
                  })}
                  name="year"
                  placeholder="YYYY"
                  />
                {dateErrors.year && (
                  <div className="invalid-feedback">
                    {dateErrors.year}
                  </div>
                )}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                ref={node => location = node}
                type="text"
                name="location"
                className={classNames('form-control', {
                  'is-invalid': bodyErrors.location
                })}
                placeholder="Enter a landmark, street address, city, state, zip code, and/or country"
                />
              {bodyErrors.location && (
                <div className="invalid-feedback">
                  {bodyErrors.location}
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="memory">Describe Your Memory</label>
              <textarea
                ref={node => text = node}
                className={classNames('form-control', {
                  'is-invalid': bodyErrors.text
                })}
                name="memory"
                />
              {bodyErrors.text && (
                <div className="invalid-feedback">
                  {bodyErrors.text}
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="tags">Tag Your Memory</label>
              <input
                ref={node => tags = node}
                className={classNames('form-control', {
                  'is-invalid': bodyErrors.tags
                })}
                name="tags"
                />
              {bodyErrors.tags && (
                <div className="invalid-feedback">
                  {bodyErrors.tags}
                </div>
              )}
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary btn-lg">Submit Memory</button>
              <MemoryList />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

MemoryForm.propTypes = {
  dateErrors: PropTypes.object.isRequired,
  bodyErrors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  postMemory: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};


const styles = {
  form: {
    position: 'relative',
    margin: 'auto',
    top: '25px',
    left: 0,
    right: 0,
    bottom: 0
  }
};

const mapStateToProps = state => {
  return {
    dateErrors: state.errors.memoryDate,
    bodyErrors: state.errors.memoryBody,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postMemory: (memory) => {
      dispatch(memoriesActions.postMemoryAsync(memory));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemoryForm);
