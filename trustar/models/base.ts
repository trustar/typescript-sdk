export class BaseModel {

    constructor() {}

    toJSON(removeNulls: boolean = false) {
        if (removeNulls === true) {
            Object.keys(this).forEach(k => (!this[k] && this[k] !== undefined) && delete this[k]);
        }
        return JSON.stringify(this);
    }
}