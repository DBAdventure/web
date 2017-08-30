import Vue from 'vue';
import moment from 'moment';

/* eslint-disable no-shadow, no-param-reassign */
const MomentPlugin = {};

MomentPlugin.install = (Vue) => {
    Vue.prototype.$moment = (...args) => moment(...args);
};

Vue.use(MomentPlugin);
/* eslint-enable no-shadow, no-param-reassign */
