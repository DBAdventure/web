/* eslint-disable no-restricted-syntax */

/**
 * Check if value is empty
 */
export const isEmpty = value => ['', null, undefined, false].indexOf(value) !== -1;

/* Because Airbnb don't use generator for now */
/* eslint-disable consistent-return */
export const entries = function* entries(obj) {
    if (isEmpty(obj)) {
        return [];
    }

    for (const key of Object.keys(obj)) {
        yield [key, obj[key]];
    }
};
/* eslint-enable consistent-return */

/**
 * Detect the appropriate file size unit
 *
 * @param s
 * @param reach
 */
export const smartSize = (s, reach = 0.9) => {
    const sizes = {
        Pio: (1024 ** 5),
        Tio: (1024 ** 4),
        Gio: (1024 ** 3),
        Mio: (1024 ** 2),
        Kio: 1024,
        octet: 0,
    };

    for (const [k, v] of entries(sizes)) {
        if (s >= v * reach) {
            const disp = s / v;
            return `${disp.toPrecision(4).replace('.', ',')}\u00a0${k}`;
        }
    }

    return null;
};


/**
 * Create custom Object.values function for browser
 * compatibility
 */
export const values = object => Object.keys(object).map(key => object[key]);


export default {};
/* eslint-enable no-restricted-syntax */
