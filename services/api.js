/* eslint-env es6 */
import axios from 'axios';
import settings from '~/config/general.config';

axios.defaults.xsrfHeaderName = 'X-CSRFToken';

let baseUrl = '';
if (!process.BROWSER_BUILD) {
    baseUrl = settings.API_DOMAIN;
}

/**
 * Abstract function that make a DELETE request to the U2Guide API
 * @param {string} path
 * @returns {Promise}
 */
const makeDeleteRequest = (path, params = {}) => new Promise((resolve, reject) => {
    axios.delete(`${baseUrl}/api${path}`, {params}).then((result) => {
        resolve(result);
    }).catch((err) => {
        reject(err);
    });
});

/**
 * Abstract function that make a GET request to the U2Guide API
 * @param {string} path
 * @returns {Promise}
 */
const makeGetRequest = (path, params = {}) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/api${path}`, {params}).then((result) => {
        resolve(result);
    }).catch((err) => {
        reject(err);
    });
});

/**
 * Abstract function that make a POST request to the U2Guide API
 * @param {string} path
 * @param {object} postData
 * @returns {Promise}
 */
const makePostRequest = (path, postData, config = {}) => new Promise((resolve, reject) => {
    axios.post(`${baseUrl}/api${path}`, postData, config).then((result) => {
        resolve(result);
    }).catch((err) => {
        reject(err);
    });
});

const api = {
    register(postData) {
        return makePostRequest('/register', postData);
    },
    login(postData) {
        return makePostRequest('/login', postData);
    },
    logout() {
        return makeGetRequest('/logout');
    },

    /**
     * Data
     */
    getGameData() {
        return makeGetRequest('/data/game');
    },
    getNews() {
        return makeGetRequest('/data/news');
    },
    getAppearanceData() {
        return makeGetRequest('/data/appearance');
    },
    getOnlinePlayers() {
        return makeGetRequest('/data/online');
    },

    /**
     * Account
     */
    getPlayer() {
        return makeGetRequest('/account/player');
    },
    getEvents() {
        return makeGetRequest('/account/events');
    },

    /**
     * Map
     */
    getMap() {
        return makeGetRequest('/map/');
    },
};

export default api;
