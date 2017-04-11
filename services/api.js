/* eslint-env es6 */
import axios from 'axios';

axios.defaults.xsrfHeaderName = 'X-CSRFToken';

/**
 * Abstract function that make a GET request to API
 * @param {string} path
 * @returns {Promise}
 */
const makeGetRequest = path => new Promise((resolve, reject) => {
    axios.get(`/api${path}`).then((result) => {
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
    axios.post(`/api${path}`, postData, config).then((result) => {
        resolve(result);
    }).catch((err) => {
        reject(err);
    });
});

const api = {
    getPlayer() {
        return makeGetRequest('/player');
    },
    getNews() {
        return makeGetRequest('/news');
    },
    registration(postData) {
        return makePostRequest('/register', postData);
    },
    login(postData) {
        return makePostRequest('/login', postData);
    },
    logout() {
        return makeGetRequest('/logout');
    },
    getGameData() {
        return makeGetRequest('/game/data');
    },
};

export default api;
