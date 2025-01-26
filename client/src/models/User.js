export default class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static fromJson(json) {
        return new User(json.id, json.name);
    }

    toJson() {
        return {
            id: this.id,
            name: this.name
        };
    }
}