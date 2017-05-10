import Vue from 'vue';
import {sync} from 'vuex-router-sync';
import store from '~/store';
import router from '~/.nuxt/router';
import I18N from '~/services/i18n';
import settings from '~/config/general.config';

sync(store, router);

const DbaTranslatePlugin = {};

const i18nService = I18N.getInstance();
i18nService.init(settings.languages, settings.languages[0]);

/* eslint-disable no-shadow, no-param-reassign */
// no-shadown because Vue is defined a the top of the file :o
// no-param-reassign because we need to update the Vue object prototype.
/**
 * Create a Vue plugin to support i18next translate function
 * @param Vue
 */
DbaTranslatePlugin.install = (Vue) => {
    /**
     * Global Translate Function
     * @param key
     * @param options
     * @returns {*}
     */
    Vue.prototype.translate = (key, options) => {
        const activeLocale = store.getters.activeLocale;
        return i18nService.translate(key, {locale: activeLocale, ...options});
    };

    /**
     * Translate shortcut
     * @param key
     * @param options
     */
    Vue.prototype.$trans = (key, options) => Vue.prototype.translate(key, options);
};
/* eslint-ensable no-shadow, no-unused-vars, no-param-reassign */

Vue.use(DbaTranslatePlugin);
