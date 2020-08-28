import { BaseModel } from "./base";
import { IdType, DistributionType } from "./enum";


/**
 * Report
 */
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


    /**
     * Creates an instance of Report.
     * 
     * @param [id] The unique ID of the report.
     * @param [title] The report title.
     * @param [body] The report body.
     * @param [timeBegan] The time that the incident described in the report began.
     * @param [externalId] An ID created by the external system from which the report was sourced.
     * @param [externalUrl] A URL link to the report in an external system.
     * @param [isEnclave] A boolean indicating whether the distribubtion type of a report is ENCLAVE or COMMUNITY
     * @param [enclaveIds] A list of the enclave IDs the report is associated with.
     * @param [created] The time the report was created.
     * @param [updated] The last time the report was updated.
     * 
     */
    constructor(id?: string, title?: string, body?: string, timeBegan?: Date | number,
        externalId?: string, externalUrl?: string, isEnclave?: boolean,
        enclaveIds?: Array<string> | string, created?: number, updated?: number) {
        
        super();

        if (typeof enclaveIds === 'string') {
            this.enclaveIds = [enclaveIds];
        } else {
            this.enclaveIds = enclaveIds;
        }

        this.id = id;
        this.title = title;
        this.body = body;
        this.timeBegan = timeBegan;
        this.externalId = externalId;
        this.externalUrl = externalUrl;
        this.isEnclave = isEnclave;
        this.created = created;
        this.updated = updated;

    }


    /**
     * Gets distribution type
     * @returns  A string indicating whether the report belongs to an enclave or not.
     */
    private _getDistributionType() {
        if (this.isEnclave === true) {
            return DistributionType.ENCLAVE;
        }
        return DistributionType.COMMUNITY;
    }
}