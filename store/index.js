import Vue from 'vue';
import Vuex from 'vuex';
import settings from '~/config/general.config';
import * as actions from './actions';
import locale from './modules/locale';
import player from './modules/player';
import game from './modules/game';

Vue.use(Vuex);

const debug = settings.NODE_ENV === 'local';

const createStore = () => new Vuex.Store({
    actions,
    modules: {
        game,
        locale,
        player,
    },
    strict: debug,
});

export default createStore;
