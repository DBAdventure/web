/* eslint-disable no-shadow, no-param-reassign */
import axios from 'axios';
import Player from '~/lib/player';
import api from '~/services/api';
import * as types from '../mutation-types';

const state = {
    auth: {},
    connected: false,
};

const actions = {
    fetchPlayer({commit, dispatch}) {
        api.getPlayer().then((res) => {
            axios.post('/session/save', {
                data: res.data,
            }).then(() => {
                commit(types.PLAYER, res.data);
            });
        }).catch(() => {
            dispatch('logout');
        });
    },

    login({dispatch}, {username, password}) {
        return api.login({
            username,
            password,
        }).then(() => {
            dispatch('fetchPlayer');
        }).catch((error) => {
            if (error.response.status === 401) {
                throw new Error('error.bad.credentials');
            }

            throw new Error('error.generic');
        });
    },

    logout({commit}) {
        return api.logout().then(() => {
            axios.post('/session/clear').then(() => {
                commit(types.PLAYER, null);
            });
        });
    },
};

const mutations = {
    [types.PLAYER](state, data) {
        state.auth = data;
        state.connected = true;
    },
};

export default {
    state,
    actions,
    mutations,
};
/* eslint-enable no-shadow, no-param-reassign */
