import Vue from 'vue';
import VueI18n from 'vue-i18n';
import fr from '~/locales/fr';
import en from '~/locales/en';

Vue.use(VueI18n);

/* eslint-disable no-param-reassign */
export default ({app, store}) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: store.state.locale.locale,
    fallbackLocale: 'en',
    messages: {
      en,
      fr,
    },
  });

  store.watch((state) => state.locale.locale, (value) => {
    app.i18n.locale = value;
  });
};
/* eslint-enable  no-param-reassign */
