const bodyParser = require('body-parser');
const express = require('express');
const session = require('cookie-session');
const proxy = require('http-proxy-middleware');
const Nuxt = require('nuxt');
const morgan = require('morgan');
const nuxtConfig = require('./config/nuxt.config');
const generalConfig = require('./config/general.config');

const app = express();
const isDev = generalConfig.NODE_ENV === 'local';

function runNuxt() {
    nuxtConfig.dev = isDev;
    return new Nuxt(nuxtConfig);
}

/**
 * This is the Nuxt instance, it's important to make
 * the Vue.js Server Side Rendering.
 * This is here that we set all the middlewares and stuff like that.
 */
runNuxt().then((nuxt) => {
    const morganMode = isDev ? 'dev' : 'combined';
    const logger = morgan(morganMode);
    const pro = proxy({
        target: generalConfig.API_DOMAIN,
        changeOrigin: true,
        xfwd: true,
        headers: {
            Authorization: `Token ${generalConfig.API_TOKEN}`,
            Accept: 'application/json',
        },
    });

    app.use('/api', pro);
    app.use('/media', pro);
    app.use(logger);
    app.use(bodyParser.json());

    app.use(session({
        secret: process.env.SESSION_SECRET || 'awesomecookiesecret',
        resave: false,
        saveUninitialized: false,
        cookie: {maxAge: 60 * 60 * 1000},
    }));

    /* eslint-disable no-param-reassign */
    app.post('/session/save', (req, res) => {
        req.session.authUser = req.body.data;
        return res.json(req.body.data);
    });

    app.post('/session/clear', (req, res) => {
        req.session.authUser = null;
        return res.json({});
    });
    /* eslint-enable no-param-reassign */

    if (isDev) {
        nuxt.build();
    }
    app.use(nuxt.render);

    app.listen(process.env.SOCKET_PATH || generalConfig.PORT, () => {
        console.log(`Running server... on ${process.env.SOCKET_PATH || 3000}`);
    });
}).catch((error) => {
    console.log(error);
});
