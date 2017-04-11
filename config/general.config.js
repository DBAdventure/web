/**
 * This is the general configuration file
 * Contain all global variables and stuff like that.
 */
module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'local',
    API_DOMAIN: process.env.API_DOMAIN || 'http://127.0.0.1',
    API_TOKEN: process.env.API_TOKEN,
    languages: ['en', 'fr'],
};
