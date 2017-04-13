/* eslint-disable no-shadow, no-param-reassign */
import * as types from '../mutation-types';
import settings from '~/config/general.config';

const state = {
    settings: {
        locale: 'en',
    },
};

const actions = {
    setLocale({commit}, {req}) {
        const langs = req.acceptsLanguages();
        if (langs) {
            let locale = langs[0].split('-')[0];

            if (!settings.languages.includes(locale)) {
                locale = 'en';
            }

            commit(types.LOCALE, locale);
        }
    },
};

const getters = {
    activeLocale: state => state.settings.locale,
};

const mutations = {
    [types.LOCALE](state, locale) {
        state.settings.locale = locale;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
/* eslint-enable no-shadow, no-param-reassign */
