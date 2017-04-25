const bodyParser = require('body-parser');
const express = require('express');
const session = require('cookie-session');
const proxy = require('http-proxy-middleware');
const Nuxt = require('nuxt');
const morgan = require('morgan');
const nuxtConfig = require('./config/nuxt.config');
const generalConfig = require('./config/general.config');

const app = express();

function runNuxt(dev) {
    nuxtConfig.dev = dev;

    if (dev) {
        return new Nuxt(nuxtConfig).build();
    }

    return new Promise((resolve) => {
        const nuxt = new Nuxt(nuxtConfig);
        resolve(nuxt);
    });
}

/**
 * This is the Nuxt instance, it's important to make
 * the Vue.js Server Side Rendering.
 * This is here that we set all the middlewares and stuff like that.
 */
runNuxt(generalConfig.NODE_ENV === 'local').then((nuxt) => {
    const morganMode = generalConfig.NODE_ENV === 'local' ? 'dev' : 'combined';
    const logger = morgan(morganMode);
    const pro = proxy({
        target: generalConfig.API_DOMAIN,
        changeOrigin: true,
        xfwd: false,
        headers: {
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
        req.session.authPlayer = req.body.data;
        return res.json(req.body.data);
    });

    app.post('/session/clear', (req, res) => {
        req.session.authPlayer = null;
        return res.json({});
    });
    /* eslint-enable no-param-reassign */

    app.use(nuxt.render);

    const listenOn = process.env.SOCKET_PATH || generalConfig.PORT;
    app.listen(listenOn, () => {
        console.log(`Running server... on ${listenOn}`);
    });
}).catch((error) => {
    console.log(error);
});
