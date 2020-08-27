import { BaseModel } from "./base";
import { IdType, DistributionType } from "./enum";

export class Report extends BaseModel {

    id?: string;
    title?: string;
    body?: string;
    timeBegan?: Date | number;
    externalId?: string;
    externalUrl?: string;
    isEnclave?: boolean = true;
    enclaveIds?: Array<string> | string;
    created?: number;
    updated?: number;

    constructor(id?: string, title?: string, body?: string, timeBegan?: Date | number,
        externalId?: string, externalUrl?: string, isEnclave?: boolean,
        enclaveIds?: Array<string> | string, created?: number, updated?: number) {
        
        super();
        this.id = id;
        this.title = title;
        this.body = body;
        this.timeBegan = timeBegan;
        this.externalId = externalId;
        this.externalUrl = externalUrl;
        this.isEnclave = isEnclave;
        this.created = created;
        this.updated = updated;

        if (typeof enclaveIds === 'string') {
            this.enclaveIds = [enclaveIds];
        } else {
            this.enclaveIds = enclaveIds;
        }
    }

    private _getDistributionType() {
        if (this.isEnclave === true) {
            return DistributionType.ENCLAVE;
        }
        return DistributionType.COMMUNIY;
    }
}