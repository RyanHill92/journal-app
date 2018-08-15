import errorsActions from './errors-actions';
import axios from './../utils/axios-config';

const loginUserAsync = (email, password) => {
  return function (dispatch) {
    const loginObject = {
      email,
      password
    };

    //Returned function MUST return a promise. Didn't work without. 
    return axios.post('/api/users/login', loginObject)
      .then(res => {
        console.log(res.data);
        dispatch(errorsActions.clearErrors('login'));
      })
      .catch(err => {
        let errors = !err.response ? err : err.response.data;
        console.log(errors);
        dispatch(errorsActions.setErrors('login', errors));
      });
  }
}

export default {
  loginUserAsync
}
