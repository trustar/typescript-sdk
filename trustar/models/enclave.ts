import { BaseModel } from "./base"


export interface EnclaveJSON {
  id: string;
  name?: string | null;
  type?: string | null;
  read?: boolean | null;
  create?: boolean | null;
  update?: boolean | null;
}

/**
 * Enclave
 */
export class Enclave extends BaseModel {

  id: string;
  name?: string | null;
  type?: string | null;


  /**
   * Creates an instance of enclave.
   * @param id The unique ID of the enclave.
   * @param name The name of the enclave.
   * @param type The type of the enclave. 
   */
  constructor(enclave: EnclaveJSON) {

    super();
    this.id = enclave.id;
    this.name = enclave.name;
    this.type = enclave.type;
  }


  /**
   * FromJSON
   * @param json JSON string representing an Enclave.
   * @returns An Enclave object.
   */
  static fromJSON(json: string): Enclave {
    const enclaveJSON = JSON.parse(json);
    return new Enclave(enclaveJSON);
  }
}

/**
 * Enclave permissions
 */
export class EnclavePermissions extends Enclave {

  read?: boolean | null;
  create?: boolean | null;
  update?: boolean | null;


  /**
   * Creates an instance of enclave permissions.
   * @param id The unique ID of the enclave.
   * @param name The name of the enclave.
   * @param type The type of the enclave.
   * @param read Whether the associated user/company has read access.
   * @param create Whether the associated user/company has create access.
   * @param update Whether the associated user/company has update access.
   */
  constructor(enclavePermissions: EnclaveJSON) {

    super(enclavePermissions);
    this.read = enclavePermissions.read;
    this.create = enclavePermissions.create;
    this.update = enclavePermissions.update;

  }
}
