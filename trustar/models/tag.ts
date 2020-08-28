import { BaseModel } from "./base"

/**
 * Tag
 */
export class Tag extends BaseModel {
    name: string;
    id?: string;
    enclave_id?: string;


    /**
     * Creates a Tag instance.
     * @param name The name of the tag; i.e. "malicious"
     * @param [id] The ID of the tag.
     * @param [enclave_id] The ID of the enclave associated with the tag.
     */
    constructor(name: string, id?: string, enclave_id?: string) {
        super();
        this.name = name;
        this.id = id;
        this.enclave_id = enclave_id;
    }
}