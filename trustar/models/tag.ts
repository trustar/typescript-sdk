import { BaseModel } from "./base"

export class Tag extends BaseModel {
    name: string;
    id?: string;
    enclave_id?: string;

    constructor(name: string, id?: string, enclave_id?: string) {
        super();
        this.name = name;
        this.id = id;
        this.enclave_id = enclave_id;
    }
}