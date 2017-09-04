const bodyParser = require('body-parser');
const express = require('express');
const generalConfig = require('./config/general.config');
const helmet = require('helmet');
const morgan = require('morgan');
const nuxtConfig = require('./config/nuxt.config');
const proxy = require('http-proxy-middleware');
const session = require('express-session');
const {Nuxt, Builder} = require('nuxt');

const app = express();
const isDev = generalConfig.NODE_ENV === 'local';

nuxtConfig.dev = isDev;
const nuxt = new Nuxt(nuxtConfig);
const morganMode = isDev ? 'dev' : 'combined';
const logger = morgan(morganMode);
const proxies = [
    '/api',
    '/media',
    '/admin',
    '/bundles',
];

if (isDev) {
    proxies.push('/_wdt');
    proxies.push('/_profiler');
    proxies.push('/_error');
}

const pro = proxy(proxies, {
    target: generalConfig.API_DOMAIN,
    changeOrigin: true,
    xfwd: true,
    headers: {
        Accept: 'application/json',
    },
});

proxies.forEach((u) => {
    app.use(u, pro);
});

app.use(logger);
app.use(helmet());
app.use(bodyParser.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'awesomecookiesecret',
    resave: true,
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

if (isDev) {
    const builder = new Builder(nuxt);
    builder.build();
}
app.use(nuxt.render);

app.listen(process.env.SOCKET_PATH || generalConfig.PORT, () => {
    console.log(`Running server... on ${process.env.SOCKET_PATH || generalConfig.PORT}`);
});
