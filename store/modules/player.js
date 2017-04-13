/* eslint-disable no-shadow, no-param-reassign */
import axios from 'axios';
import * as types from '../mutation-types';
import Player from '~/lib/player';
import api from '~/services/api';

const state = {
    player: new Player(),
};

const actions = {
    fetchPlayer({commit, dispatch}) {
        api.getPlayer().then((res) => {
            axios.post('/session/save', {
                data: res.data,
            }).then(() => {
                commit('SET_PLAYER', res.data);
            });
        }).catch(() => {
            dispatch('logout');
        });
    },

    login({dispatch}, {email, password}) {
        return api.login({
            email,
            password,
        }).then(() => {
            dispatch('fetchPlayer');
        }).catch((error) => {
            if (error.response.status === 400) {
                throw new Error('error.bad.credentials');
            }

            throw new Error('error.generic');
        });
    },

    logout({commit}) {
        return api.logout().then(() => {
            axios.post('/session/clear').then(() => {
                commit('SET_PLAYER', null);
            });
        });
    },
};

const mutations = {
    [types.PLAYER](state, data) {
        state.player = new Player(data);
    },
};

export default {
    state,
    actions,
    mutations,
};
/* eslint-enable no-shadow, no-param-reassign */
