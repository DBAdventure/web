/* eslint-disable no-shadow, no-param-reassign */
import settings from '~/config/general.config';
import * as types from '../mutation-types';

export const state = () => ({
    locales: ['en', 'fr'],
    locale: 'fr',
});

const actions = {
    setLocale({commit}, {req}) {
        const langs = req.acceptsLanguages();
        if (langs) {
            let locale = langs[0].split('-')[0];

            if (!settings.languages.includes(locale)) {
                locale = 'fr';
            }

            commit(types.LOCALE, locale);
        }
    },
};

const getters = {
    activeLocale: (state) => state.locale,
};

const mutations = {
    [types.LOCALE](state, locale) {
        if (state.locales.indexOf(locale) !== -1) {
            state.locale = locale;
        }
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
/* eslint-enable no-shadow, no-param-reassign */
