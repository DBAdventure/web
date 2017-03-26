/* eslint-env es6 */
import axios from 'axios';

const API_VERSION = 'v1';

axios.defaults.xsrfHeaderName = 'X-CSRFToken';

/**
 * Abstract function that make a GET request to API
 * @param {string} path
 * @returns {Promise}
 */
const makeGetRequest = path => new Promise((resolve, reject) => {
    axios.get(`/${API_VERSION}${path}`).then((result) => {
        resolve(result);
    }).catch((err) => {
        reject(err);
    });
});

/**
 * Abstract function that make a POST request to API
 * @param {string} path
 * @param {object} postData
 * @returns {Promise}
 */
const makePostRequest = (path, postData, config = {}) => new Promise((resolve, reject) => {
    axios.post(`/${API_VERSION}${path}`, postData, config).then((result) => {
        resolve(result);
    }).catch((err) => {
        reject(err);
    });
});

const api = {
    getUser() {
        return makeGetRequest('/user');
    },
    registration(postData) {
        return makePostRequest('/user/register', postData);
    },
    login(postData) {
        return makePostRequest('/user/login', postData);
    },
    logout() {
        return makeGetRequest('/user/logout');
    },
};

export default api;
