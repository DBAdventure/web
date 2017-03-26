/**
 * User object
 */
const User = class User {
    constructor(data = null) {
        this.data = data;
        this.connected = false;

        if (data !== null) {
            this.connected = true;
            this.initGroups();
        }
    }
    initGroups() {
        this.data.groups.forEach((value) => {
            this[value.name] = true;
        });
    }
};

export default User;
