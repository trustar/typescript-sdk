export class BaseModel {

    constructor() {}

    removeNulls() {
        return Object.keys(this).forEach(key => this[key] == null && delete this[key]);
    }
}
