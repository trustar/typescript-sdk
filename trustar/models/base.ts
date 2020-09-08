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
   * @returns Nothing. The object is edited in place. No new object is created.
   */
  removeNulls<T>(): T {
    return Object.assign(({} as T), Object.keys(this).map(key => this[key] == null && delete this[key]));
  }
}
