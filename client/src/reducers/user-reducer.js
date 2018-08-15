//Receives a user object with email, token, and isAuth properties.
const userReducer = (state, action) => {
  switch(action.type) {
    case 'LOGIN_USER':
      return {isAuth: true, email: action.email, token: user.token};
    case 'LOGOUT_USER':
      return {isAuth: false, email: '', token: ''};
    default:
      return state;
  }
}

export default userReducer;
