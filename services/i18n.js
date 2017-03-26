import i18next from 'i18next';

let instance = null;

export default class I18N {
    /**
     * defaultLocale: Maintains the default locale from init
     * isInitialized: Test whether instance is isInitialized
     * registeredLocales: Maintains the supported locales that will be loaded
     * i18n: Maintains the loaded implementation for i18n logic
     * @returns {*}
     */
    constructor() {
        if (!instance) {
            instance = this;
        }

        this.defaultLocale = null;
        this.isInitialized = false;
        this.registeredLocales = [];
        this.i18n = null;

        return instance;
    }

    /**
     * Create a new instance of I18N
     * @returns {I18N}
     */
    static getInstance() {
        return new I18N();
    }

    translate(translationKey, overrides = {}) {
        let value = translationKey;
        /* eslint-disable no-param-reassign */
        // disable param reassign because we need to update the overrides object
        overrides.lng = overrides.locale;
        /* eslint-enable no-param-reassign */
        if (this.i18n && translationKey) {
            value = this.i18n.t(translationKey, overrides);
        }

        return value;
    }

    /**
     * Initialize i18next
     * @param allLocales: Array of supported locales
     * @param defaultLocale: The default locale
     */
    init(allLocales, defaultLocale) {
        if (!this.isInitialized) {
            // Save provided settings
            this.registeredLocales = allLocales;
            this.defaultLocale = defaultLocale;

            // Build resource bundle of translations
            const resources = instance.loadAllTranslations();

            i18next.init({
                initImmediate: false,
                lng: this.defaultLocale,
                preload: this.registeredLocales,
                defaultNS: 'common',
                interpolation: {
                    escapeValue: false,
                },
                resources,
            });

            // Add i18n implementation to service
            this.i18n = i18next;
            // Mark as initialized
            this.isInitialized = true;
        }
    }

    /**
     * Load the javascript file that contain
     * the wanted translations.
     * (located in ./locales/[locale]/common.js)
     * return an empty object of not found.
     * @returns {{}}
     */
    loadAllTranslations() {
        const resources = {};

        if (this.registeredLocales && this.registeredLocales.length > 0) {
            this.registeredLocales.map((locale) => {
                // Initialize tree for locale
                resources[locale] = {};
                /* eslint-disable global-require, import/no-dynamic-require */
                // here we need to make a dynamic import,
                // so we need to disable global-require and no-dynamic-require
                const common = require(`../locales/${locale}/common.js`) || {};
                /* eslint-enable global-require, import/no-dynamic-require */
                resources[locale].common = common;

                return resources[locale].common;
            });
        }

        return resources;
    }
}
