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
    constructor({name, id, enclaveId}: {name: string, id?: string, enclaveId?: string}) {
        
        super();
        this.name = name;
        this.id = id;
        this.enclaveId = enclaveId;
    }

    static fromJSON<TagJSON>(json: TagJSON): Tag {
        let tag = Object.create(Tag.prototype);
        return Object.assign(tag, json);
    }
}
