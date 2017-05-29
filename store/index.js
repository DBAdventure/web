import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import locale from './modules/locale';
import player from './modules/player';
import game from './modules/game';
import settings from '~/config/general.config';

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
