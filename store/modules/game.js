/* eslint-disable no-shadow, no-param-reassign */
import * as types from '../mutation-types';
import api from '~/services/api';

const state = {
    style: null,
    data: {},
};

const actions = {
    fetchGameData({commit}) {
        return api.getGameData().then((res) => {
            commit(types.GAME_DATA, res.data);
        }).catch(() => {});
    },
    setStyle({commit}) {
        commit(
            types.GAME_STYLE,
            Math.floor(Math.random() * 20) + 1,
        );
    },
};

const mutations = {
    [types.GAME_DATA](state, data) {
        state.data = data;
    },
    [types.GAME_STYLE](state, style) {
        state.style = `theme-${style}`;
    },
};

export default {
    state,
    actions,
    mutations,
};
/* eslint-enable no-shadow, no-param-reassign */
