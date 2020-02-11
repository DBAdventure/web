/**
 * This is the general configuration file
 * Contain all global variables and stuff like that.
 */
module.exports = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'local',
  API_DOMAIN: process.env.API_DOMAIN || 'http://jdr-dba.localhost',
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
  guild: {
    ROLE_PLAYER: 'ROLE_PLAYER',
    ROLE_ADMIN: 'ROLE_ADMIN',
    ROLE_MODO: 'ROLE_MODO',
  },
  map_object_type: {
    TYPE_SIGN: 9,
  },
  map: {
    TYPE_DEFAULT: 0,
    TYPE_IMPASSABLE: 1,
    TYPE_RESPAWN: 2,
  },
  player: {
    TIME_ACTION_POINT: 5,
    TIME_KI_POINT: 10,
    TIME_FATIGUE_POINT: 5,
    TIME_MOVEMENT_POINT: 3,

    MAX_ACTION_POINTS: 100,
    MAX_MOVEMENT_POINTS: 150,
    MAX_FATIGUE_POINTS: 200,

    ATTACK_TYPE_BETRAY: 'betray',
    ATTACK_TYPE_REVENGE: 'revenge',
    ATTACK_TYPE_SLAP: 'slap',

    HEALTH_POINT: 'HEALTH',
    KI_POINT: 'KI',
    ACTION_POINT: 'AP',
    MOVEMENT_POINT: 'MP',
    FATIGUE_POINT: 'FP',
    SKILL_POINT: 'SK',

    SLAP_ACTION: 0,
    PICKUP_ACTION: 1,
    GIVE_ACTION: 2,
    STEAL_ACTION: 3,
    ANALYSIS_ACTION: 3,
    HEAL_ACTION: 4,
    ATTACK_ACTION: 5,
    SPELL_ACTION: 6,
    MOVEMENT_ACTION: 5,
  },
  objects: {
    TYPE_SPECIAL: 0,
    TYPE_UNIQUE: 2,
    TYPE_CONSUMABLE: 4,
    TYPE_VISION: 5,
    TYPE_WEAPON: 6,
    TYPE_SHIELD: 7,
    TYPE_ACCESSORY: 8,
    TYPE_CAP: 9,
    TYPE_SHOES: 10,
    TYPE_OUTFIT: 11,
  },
};
