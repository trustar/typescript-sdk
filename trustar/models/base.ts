/**
 * Base model
 */
export abstract class BaseModel {

  [index: string]: any;

  constructor() {}

  /**
   * To json
   * @returns object to be processed by JSON.stringify.
   */
  toJSON() {
    return Object.assign({}, this);
  }

  /**
   * Removes nulls
   * @returns Calling object with null and undefined values removed.
   */
  removeNulls() {
    
    const obj = Object.create(this);
    for (const [key, value] of Object.entries(this)) {
      if (value && value.length !== 0) {
        obj[key] = value;
      }
    }

    return obj;
  }
}
