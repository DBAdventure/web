/* eslint-disable no-shadow, no-param-reassign */
import api from '~/services/api';
import * as types from '../mutation-types';

const state = () => ({
    style: null,
    data: {},
    mapReload: false,
});

const actions = {
    fetchGameData({commit}) {
        return api.getGameData().then((res) => {
            commit(types.GAME_DATA, res.data);
        }).catch((res) => {
            console.log(res);
        });
    },
    setStyle({commit}) {
        commit(
            types.GAME_STYLE,
            Math.floor(Math.random() * 20) + 1,
        );
    },
    reloadMap({commit}, value = true) {
        commit(types.GAME_MAP_RELOAD, value);
    },
};

const mutations = {
    [types.GAME_DATA](state, data) {
        state.data = data;
    },
    [types.GAME_STYLE](state, style) {
        state.style = `theme-${style}`;
    },
    [types.GAME_MAP_RELOAD](state, value) {
        state.mapReload = value;
    },
};

export default {
    state,
    actions,
    mutations,
};
/* eslint-enable no-shadow, no-param-reassign */
