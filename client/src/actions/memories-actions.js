'use strict';

import axios from './../utils/axios-config';
import errorsActions from './errors-actions';
import dateErrorsCatcher from './../utils/date-errors-catcher';
import dateMaker from './../utils/date-maker';
import tagsMaker from './../utils/tags-maker';

const getAllMemoriesAsync = () => {
  return function (dispatch) {
    return axios.get('/api/memories')
      .then(res => console.log(res.data))
      .catch(e => console.log(e));
  }
};

//Takes an object with seven props: day, month, year, location, text, tags, and _creator.
const postMemoryAsync = memory => {
  return function (dispatch) {
    let {day, month, year, location, text, tags, _id} = memory;

    let dateErrors = dateErrorsCatcher(day, month, year);

    if (dateErrors.isError) {
      dispatch(errorsActions.setErrors('memoryDate', dateErrors.errors));
      return;
    } else {
      dispatch(errorsActions.clearErrors('memoryDate'));
    }

    let date = dateMaker(day, month, year);

    tags = tagsMaker(tags);

    const memoryObject = {
      date,
      location,
      text,
      tags,
      _creator: _id
    };

    return axios.post('/api/memories', memoryObject)
      .then(res => {
        console.log(res.data);
        dispatch(errorsActions.clearErrors('memoryBody'));
      })
      .catch(err => {
        if (!err.response) {
          console.log(err);
        } else {
          if (err.response.status === 401) {
            console.log(err.response);
          } else {
            dispatch(errorsActions.setErrors('memoryBody', err.response.data));
          }
        }
      });
  };
};

const memoriesActions = {
  postMemoryAsync,
  getAllMemoriesAsync
};

export default memoriesActions;
