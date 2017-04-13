import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import locale from './modules/locale';
import player from './modules/player';
import game from './modules/game';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
    actions,
    modules: {
        game,
        locale,
        player,
    },
    strict: debug,
});

export default store;
