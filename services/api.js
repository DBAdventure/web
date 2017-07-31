/* eslint-env es6 */
import isEmpty from '~/lib/utils';
import axios from 'axios';
import settings from '~/config/general.config';

axios.defaults.xsrfHeaderName = 'X-CSRFToken';

let baseUrl = '';
if (!process.BROWSER_BUILD) {
    baseUrl = settings.API_DOMAIN;
}

/**
 * Abstract function that make a GET request to the U2Guide API
 * @param {string} path
 * @returns {Promise}
 */
const makeGetRequest = (path, params = {}) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/api${path}`, {params}).then((result) => {
        resolve(result);
    }).catch((error) => {
        reject(error);
    });
});

/**
 * Abstract function that make a POST request to the U2Guide API
 * @param {string} path
 * @param {object} postData
 * @returns {Promise}
 */
const makePostRequest = (path, postData, config = {}) => new Promise((resolve, reject) => {
    const newConfig = Object.assign({
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
        },
    }, config);
    axios.post(`${baseUrl}/api${path}`, postData, newConfig).then((result) => {
        resolve(result);
    }).catch((error) => {
        reject(error);
    });
});

const api = {
    register(postData) {
        return makePostRequest('/registers', postData);
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
    enterBuilding(id) {
        return makeGetRequest(`/building/enters/${id}`);
    },
    teleport(id, where) {
        return makePostRequest(`/building/teleports/${id}`, {where});
    },

    /**
     * Action
     */
    convert() {
        return makePostRequest('/action/converts');
    },

    move(where) {
        return makePostRequest(`/action/moves/${where}`);
    },

    spell(id, spellId, type) {
        let url = `/action/spells/${id}`;
        if (isEmpty(spellId)) {
            return makeGetRequest(url);
        }

        url = `${url}/${spellId}`;
        if (!isEmpty(type)) {
            url = `${url}/${type}`;
        }
        return makePostRequest(url);
    },

    attack(id, type) {
        let url = `/action/attacks/${id}`;
        if (!isEmpty(type)) {
            url = `${url}/${type}`;
        }

        return makePostRequest(url);
    },

    pickup(id) {
        return makePostRequest(`/action/pickups/${id}`);
    },

    steal(id) {
        return makePostRequest(`/action/steals/${id}`);
    },

    analysis(id) {
        return makePostRequest(`/action/analyses/${id}`);
    },

    slap(id) {
        return makePostRequest(`/action/slaps/${id}`);
    },

    heal(id) {
        return makePostRequest(`/action/heals/${id}`);
    },

    give(id, objectId) {
        if (isEmpty(objectId)) {
            return makeGetRequest(`/action/gives/${id}`);
        }

        return makePostRequest(`/action/gives/${id}/${objectId}`);
    },
};

export default api;
