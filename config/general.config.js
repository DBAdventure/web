/**
 * This is the general configuration file
 * Contain all global variables and stuff like that.
 */
module.exports = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'local',
    API_DOMAIN: process.env.API_DOMAIN || 'http://127.0.0.1',
    API_TOKEN: process.env.API_TOKEN,
    languages: ['en', 'fr'],
    races: [
        {value: 1, label: 'human'},
        {value: 2, label: 'human-saiyajin'},
        {value: 3, label: 'namekian'},
        {value: 4, label: 'saiyajin'},
        {value: 5, label: 'alien'},
        {value: 6, label: 'cyborg'},
        {value: 7, label: 'majin'},
        {value: 8, label: 'dragon'},
    ],
    sides: [
        {value: 1, label: 'bad'},
        {value: 2, label: 'good'},
    ],
    classes: [
        {value: 1, label: 'warrior'},
        {value: 2, label: 'magus'},
        {value: 3, label: 'thief'},
        {value: 4, label: 'healer'},
        {value: 5, label: 'analyst'},
        {value: 6, label: 'ranger'},
    ],
};
