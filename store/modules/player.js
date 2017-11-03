/* eslint-disable no-shadow, no-param-reassign */
import settings from '~/config/general.config';
import {isEmpty} from '~/lib/utils';
import Player from '~/lib/player';
import axios from 'axios';
import api from '~/services/api';
import * as types from '../mutation-types';

const state = () => ({
    auth: {},
    connected: false,
});

let instance;
if (!process.browser && !process.env.SOCKET_PATH && settings.PORT) {
    instance = axios.create({baseURL: `http://localhost:${settings.PORT}`});
} else {
    instance = axios.create();
}

const actions = {
    async fetchPlayer({commit, dispatch}) {
        await api.getPlayer().then((res) => {
            commit(types.PLAYER, res.data);
            instance.post('/session/save', {
                data: res.data,
            });
        }).catch(() => {
            dispatch('logout');
        });
    },

    async login({dispatch}, {username, password}) {
        await api.login({
            username,
            password,
        }).then(
            () => dispatch('fetchPlayer'),
        ).catch((error) => {
            if (error.response.status === 401) {
                throw new Error('error.bad.credentials');
            }

            throw new Error('error.generic');
        });
    },

    logout({commit}) {
        api.logout().then(() => {}).catch(() => {});
        instance.post('/session/clear').then(() => {}).catch(() => {});
        commit(types.PLAYER, null);
    },
};

const getters = {
    currentPlayer: state => new Player(state.auth),
};

const mutations = {
    [types.PLAYER](state, data) {
        state.auth = data;
        state.connected = !isEmpty(data);
    },
};

export default {
    actions,
    getters,
    mutations,
    state,
};
/* eslint-enable no-shadow, no-param-reassign */
