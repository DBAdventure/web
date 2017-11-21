/**
 * This is the nuxt configuration file.
 */
const {styles} = require('./styles.config');
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
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico',
            },
            {
                rel: 'apple-touch-icon',
                href: '/apple-touch-icon.png',
            },
            {
                rel: 'apple-touch-icon',
                size: '57x57',
                href: '/apple-touch-icon-57x57.png',
            },
            {
                rel: 'apple-touch-icon',
                size: '72x72',
                href: '/apple-touch-icon-72x72',
            },
            {
                rel: 'apple-touch-icon',
                size: '76x76',
                href: '/apple-touch-icon-76x76',
            },
            {
                rel: 'apple-touch-icon',
                size: '114x114',
                href: '/apple-touch-icon-114x114',
            },
            {
                rel: 'apple-touch-icon',
                size: '120x120',
                href: '/apple-touch-icon-120x120',
            },
            {
                rel: 'apple-touch-icon',
                size: '144x144',
                href: '/apple-touch-icon-144x144',
            },
            {
                rel: 'apple-touch-icon',
                size: '152x152',
                href: '/apple-touch-icon-152x152',
            },
            {
                rel: 'apple-touch-icon',
                size: '180x180',
                href: '/apple-touch-icon-180x180',
            },
        ],
    },
    loading: {
        color: '#3fd0ae',
    },
    router: {
        middleware: ['ssr-cookie'],
    },
    build: {
        dll: true,
        vendor: [
            'axios',
            'iview',
            'moment',
            'vue-cookie',
            'vue-i18n',
        ],
        postcss: {
            'postcss-autoprefixer': autoprefixer({
                browsers: ['last 3 versions'],
            }),
        },
    },
    plugins: [
        '~plugins/date',
        '~plugins/iview',
        '~plugins/vue-cookie',
        '~plugins/vue-translate',
    ],
};
