/**
 * User object
 */
const User = class User {
    constructor(data = null) {
        this.data = data;
        this.connected = false;

        if (data !== null) {
            this.connected = true;
        }
    }
};

export default User;
