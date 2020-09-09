import { BaseModel } from "./base"

export interface TagJSON {
  name: string;
  id?: string | null;
  enclaveId?: string | null;
}

/**
 * Tag
 */
export class Tag extends BaseModel {
  name: string;
  id?: string | null;
  enclaveId?: string | null;


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


  /**
   * Froms json
   * @param json 
   * @returns json 
   */
  static fromJSON(json: string): Tag {
    const tagJSON = JSON.parse(json);
    return new Tag(tagJSON);
  }
}
