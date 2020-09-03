export abstract class BaseModel {

  [index: string]: any;

  constructor() {}

  toJSON() {
      return (<any>Object).assign({}, this);
  }

  /**
   * Removes nulls
   * @returns Nothing. The object is edited in place. No new object is created.
   */
  removeNulls() {
      Object.keys(this).forEach(key => this[key] == null && delete this[key]);
  }
}
