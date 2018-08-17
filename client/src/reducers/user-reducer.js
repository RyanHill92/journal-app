//Receives a user object with email, token, and isAuth properties.
const userReducer = (state, action) => {
  switch(action.type) {
    case 'LOGIN_USER':
      return {isAuth: true, _id: action._id};
    case 'LOGOUT_USER':
      return {isAuth: false, _id: ''};
    default:
      return state;
  }
}

export default userReducer;
