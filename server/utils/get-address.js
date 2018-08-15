const axios = require('axios');

const getAddress = address => {
  let addressParam = address.replace(' ', '+');
  return axios({
    method: 'get',
    url: 'https://maps.googleapis.com/maps/api/geocode/json',
    params: {
      address: addressParam,
      key: 'AIzaSyBY8cC4ImXVUZe7EidvktoZy4_7-hfJ4CE'
    }
  }).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
      throw new Error();
    }
    let address = {
      location: response.data.results[0].formatted_address,
      placeId: response.data.results[0].place_id
    };
    return Promise.resolve(address);
  }).catch((err) => {
    if (err.response && err.response.data.status === 'INVALID_REQUEST') {
      return Promise.reject('Bad request to Google server. Must include location.');
    } else {
      return Promise.reject('Unable to find given location');
    }
  });
}

module.exports = {getAddress};
