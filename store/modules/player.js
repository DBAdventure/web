/* eslint-disable no-shadow, no-param-reassign */
import axios from 'axios';
import api from '~/services/api';
import * as types from '../mutation-types';

const state = () => ({
    auth: {},
    connected: false,
});

const actions = {
    async fetchPlayer({commit, dispatch}) {
        await api.getPlayer().then(res =>
            axios.post('/session/save', {
                data: res.data,
            }).then(() =>
                commit(types.PLAYER, res.data),
            ),
        ).catch(() => {
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
        api.logout().then(() => {});
        axios.post('/session/clear').then(() => {
            commit(types.PLAYER, null);
        });
    },
};

const mutations = {
    [types.PLAYER](state, data) {
        state.auth = data;
        state.connected = (data !== null);
    },
};

export default {
    state,
    actions,
    mutations,
};
/* eslint-enable no-shadow, no-param-reassign */
