import { BaseModel } from "./base"

export interface TagJSON {
  name: string;
  id?: string;
  enclaveId?: string;
}

/**
 * Tag
 */
export class Tag extends BaseModel {
  name: string;
  id?: string;
  enclaveId?: string;


  /**
   * Creates a Tag instance.
   * @param name The name of the tag; i.e. "malicious"
   * @param [id] The ID of the tag.
   * @param [enclaveId] The ID of the enclave associated with the tag.
   */
  constructor(tag: TagJSON) {

    super();
    this.name = tag.name;
    this.id = tag.id;
    this.enclaveId = tag.enclaveId;
  }

  static fromJSON(json: string): Tag {
    const tagJSON = JSON.parse(json);
    return new Tag(tagJSON);
  }
}
