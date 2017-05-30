/**
 * This is the nuxt configuration file.
 */
const styles = require('./styles.config').styles;
const autoprefixer = require('autoprefixer');

module.exports = {
    css: styles,
    head: {
        titleTemplate: '%s - DBAdventure',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: 'Meta description'},
        ],
    },
    loading: {
        color: '#3fd0ae',
    },
    build: {
        vendor: [
            'axios',
            'vue-i18n',
            'moment',
            'vuex-router-sync',
            'vue-cookie',
        ],
        postcss: [
            autoprefixer({
                browsers: ['last 3 versions'],
            }),
        ],
    },
    plugins: [
        '~plugins/vue-cookie',
        '~plugins/vue-translate',
        '~plugins/date',
    ],
};
