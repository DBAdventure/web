import settings from '~/config/general.config';
import {isEmpty} from '~/lib/utils';

/**
 * Player object
 */
const Player = class Player {
    constructor(data = null) {
        Object.assign(this, data);
    }

    getDisplayName() {
        if (!isEmpty(this.guild_player) && this.guild_player.enabled) {
            return `[${this.guild_player.guild.short_name}] - ${this.name}`;
        }

        return this.name;
    }

    isPlayer() {
        if (isEmpty(this.side)) {
            return false;
        }

        const GOOD = 1;
        const BAD = 2;
        return [GOOD, BAD].indexOf(this.side.id) !== -1;
    }

    canConvert() {
        return this.isPlayer() &&
            this.action_points >= 20 &&
            this.movement_points + 40 <= settings.player.MAX_MOVEMENT_POINTS;
    }

    getImagePath() {
        const directory = this.isPlayer() ? 'players' : 'npc';
        return `/images/avatars/${directory}/${this.image}`;
    }

    getInventoryImagePath() {
        const directory = this.isPlayer() ? 'players' : 'npc';
        return `/images/avatars/inventory/${directory}/${this.image}`;
    }

    getActionImagePath(type) {
        const matches = this.image.match(/^([A-Z]+)/);
        return `/images/actions/${matches[1]}/${type}.png`;
    }

    getTimeRemaining(what) {
        return this.time_remainning[what];
    }

    getTarget() {
        if (isEmpty(this.target)) {
            return {};
        }

        return this.target;
    }

    getGuild() {
        if (isEmpty(this.guild)) {
            return {};
        }

        return this.guild;
    }
};

export default Player;
