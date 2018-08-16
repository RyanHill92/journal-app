const setErrors = (category, errors) => {
  return {
    type: 'SET_ERRORS',
    category,
    errors
  };
};

const clearErrors = category => {
  return {
    type: 'CLEAR_ERRORS',
    category
  };
};

const errorsActions = {
  setErrors,
  clearErrors
};

export default errorsActions;
