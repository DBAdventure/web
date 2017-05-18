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
        return type;
        // preg_match('~^([A-Z]+)~', $this->getImage(), $matches);
        // return sprintf('/bundles/dbagame/images/actions/%s/%s.png', $matches[1], $type);
    }

    getTimeRemaining(what) {
        let name;
        let pointTime;
        switch (what) {
            case 'ACTION_POINT':
                name = 'action';
                pointTime = settings.player.TIME_ACTION_POINT;
                break;
            case 'MOVEMENT_POINT':
                name = 'movement';
                pointTime = settings.player.TIME_MOVEMENT_POINT;
                break;
            case 'FATIGUE_POINT':
                name = 'fatigue';
                pointTime = settings.player.TIME_FATIGUE_POINT;
                break;
            case 'KI_POINT':
                name = 'Ki';
                pointTime = settings.player.TIME_KI_POINT;
            break;
        default:
            error();
        }

        const $originalTime = this[`${name}_updated_at`];
        return 1;
        // $currentDate = new DateTime;
        // return pointTime - (int) $currentDate->diff($originalTime)->format('%i');
    }
};

export default Player;
