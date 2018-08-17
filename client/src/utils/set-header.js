import axios from './axios-config';

const setAuthHeader = token => {
  if (token) {
    axios.defaults.headers.common['x-auth'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth'];
  }
}

export default setAuthHeader;
