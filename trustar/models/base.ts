export abstract class BaseModel {

    constructor() {}


    /**
     * Removes nulls
     * @returns Nothing. The object is edited in place. No new object is created.
     */
    removeNulls() {
        return Object.keys(this).forEach(key => this[key] == null && delete this[key]);
    }
}
