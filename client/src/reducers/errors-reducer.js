//Receives an errors object with nested objects memory, login, and register.
const errorsReducer = (state, action) => {
  switch(action.type) {
    case 'SET_ERRORS':
      return {
        ...state,
        [action.category]: action.errors
      };
    case 'CLEAR_ERRORS':
      return {...state, [action.category]: {}};
    default:
      return state;
  }
}

export default errorsReducer;
