class User {
    constructor(obj) {
        obj && Object.assign(this, obj);
    }

    toString() {
        return ``;
    }
}

module.exports = User;