/**
 * Player object
 */
const Player = class Player {
    constructor(data = null) {
        this.data = data;
        this.connected = false;

        if (data !== null) {
            this.generateData();
        }
    }

    generateData() {
        this.connected = true;
        this.imagePath = `/images/avatars/players/${this.data.image}`;
        this.displayedName = this.data.name;
    }
};

export default Player;
