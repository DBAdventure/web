import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import settings from '../config/general.config';
import api from '../services/api';
import Player from '../lib/player';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        player: new Player(),
        game: {},
        style: null,
        settings: {
            locale: 'en-US',
        },
    },
    actions: {
        nuxtServerInit({commit, dispatch}, {req}) {
            commit('SET_PLAYER', req.session.player);
            if (req.session && req.session.player) {
                commit('SET_PLAYER', req.session.player);
            }

            const langs = req.acceptsLanguages();
            if (langs) {
                let locale = langs[0].split('-')[0];

                if (!settings.languages.includes(locale)) {
                    locale = 'en';
                }

                commit('SET_LOCALE', locale);
            }

            commit('SET_STYLE', Math.floor(Math.random() * 20) + 1);
            dispatch('fetchGameData');
        },

        fetchGameData(context) {
            api.getGameData().then((res) => {
                context.commit('SET_GAME_DATA', res.data);
            }).catch(() => {});
        },

        fetchPlayer(context) {
            api.getPlayer().then((res) => {
                axios.post('/session/save', {
                    data: res.data,
                }).then(() => {
                    context.commit('SET_PLAYER', res.data);
                });
            }).catch(() => {
                context.dispatch('logout');
            });
        },

        login(context, {email, password}) {
            return api.login({
                email,
                password,
            }).then(() => {
                context.dispatch('fetchPlayer');
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
            }).catch(() => {});
        },
    },
    getters: {
        activeLocale(state) {
            return state.settings.locale;
        },
    },
    /* eslint-disable no-param-reassign */
    // here we need to reassign the locale
    mutations: {
        SET_PLAYER(state, user) {
            state.player = new Player(user);
        },
        SET_GAME_DATA(state, data) {
            state.game = data;
        },
        SET_STYLE(state, style) {
            state.style = `theme-${style}`;
        },
        SET_LOCALE(state, locale) {
            state.settings.locale = locale;
        },
    },
    /* eslint-enable no-param-reassign */
});

export default store;
