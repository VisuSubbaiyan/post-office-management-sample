import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';


export const postalService = (requestType, path, requestParam) => {
  if (!path || !requestParam) {
    new Error('Invalid request');
  }

  switch (requestType) {
    case 'GET': {
      const queryPath = requestParam ? `${path}/${requestParam}` : path;

      return axios.get(queryPath)
        .then(response => response.data)
        .catch(error => Promise.reject(arror.data));
    }

    case 'POST': {
      return axios.post(path, requestParam)
        .then(response => response.data)
        .catch(error => Promise.reject(arror.data));
    }

    default:
      return null;
  }
};
