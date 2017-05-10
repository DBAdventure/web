/* eslint-disable no-restricted-syntax */
import {enumerate} from './utils';

const DEFAULT_TIMEOUT = 10000;

export function MessagesManager() {
    const self = {};
    const messages = {};
    const listeners = [];
    let nextIdx = 0;

    function makeMessagesList() {
        const keys = Object.keys(messages).sort();
        const out = [];

        keys.forEach((key) => {
            out.push(messages[key]);
        });

        return out;
    }

    function propagateChange() {
        const msgs = makeMessagesList();

        listeners.forEach((cb) => {
            cb(msgs);
        });
    }

    function drop(idx) {
        if (messages[idx] && messages[idx].timeoutId) {
            clearTimeout(messages[idx].timeoutId);
        }

        delete messages[idx];
        propagateChange();
    }

    function push(message, level = 'info', timeout = DEFAULT_TIMEOUT) {
        const idx = nextIdx;
        nextIdx += 1;
        let timeoutId;

        const start = new Date();
        if (timeout) {
            timeoutId = setTimeout(() => {
                drop(idx);
            }, timeout);
        }
        messages[idx] = {message, level, timeout, timeoutId, start, idx};
        propagateChange();

        return idx;
    }

    function getMessage(idx) {
        return messages[idx];
    }

    function onChange(cb) {
        listeners.push(cb);
        setTimeout(() => {
            cb(makeMessagesList());
        }, 0);

        return () => {
            let cbIdx;
            for (const {idx, item} of enumerate(listeners)) {
                if (item === cb) {
                    cbIdx = idx;
                }
            }

            listeners.splice(cbIdx, 1);
        };
    }
    self.push = push;
    self.drop = drop;
    self.getMessage = getMessage;
    self.onChange = onChange;

    return Object.freeze(self);
}

export const manager = new MessagesManager();
/* eslint-enable no-restricted-syntax */
