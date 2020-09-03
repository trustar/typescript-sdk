import { BaseModel } from "./base"


export interface EnclaveJSON {
    id: string;
    name?: string;
    type?: string;
}

/**
 * Enclave
 */
export class Enclave extends BaseModel {

    id: string;
    name?: string;
    type?: string;


    /**
     * Creates an instance of enclave.
     * @param id The unique ID of the enclave.
     * @param name The name of the enclave.
     * @param type The type of the enclave. 
     */
    constructor({id, name, type}: {id: string, name?: string, type?: string}) {

        super();
        this.id = id;
        this.name = name;
        this.type = type;
    }

    static fromJSON<EnclaveJSON>(json: EnclaveJSON): Enclave {
        let enclave = Object.create(Enclave.prototype);
        return Object.assign(enclave, json);
    }
}


/**
 * Enclave permissions
 */
export class EnclavePermissions extends Enclave {

    name?: string;
    type?: string;
    read?: boolean;
    create?: boolean;
    update?: boolean;


    /**
     * Creates an instance of enclave permissions.
     * @param id The unique ID of the enclave.
     * @param name The name of the enclave.
     * @param type The type of the enclave.
     * @param read Whether the associated user/company has read access.
     * @param create Whether the associated user/company has create access.
     * @param update Whether the associated user/company has update access.
     */
    constructor({id, name, type, read, create, update}: {id: string, name?: string,
        type?: string, read?: boolean, create?: boolean, update?: boolean}) {

            super({id, name, type});
            this.read = read;
            this.create = create;
            this.update = update;
            
        }
}
