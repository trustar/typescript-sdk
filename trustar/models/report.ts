import { BaseModel } from "./base";
import { IdType, DistributionType } from "./enum";


export interface ReportJSON {
    id?: string;
    title?: string;
    body?: string;
    timeBegan?: Date | string | number;
    externalId?: string;
    externalUrl?: string;
    isEnclave?: boolean;
    enclaveIds?: string[] | string;
    created?: number;
    updated?: number;
}

/**
 * Report
 */
export class Report extends BaseModel {

    id?: string;
    title?: string;
    body?: string;
    timeBegan?: Date;
    externalId?: string;
    externalUrl?: string;
    isEnclave?: boolean = true;
    enclaveIds?: string[];
    created?: number;
    updated?: number;


    /**
     * Creates an instance of Report.
     * 
     * @param [id] The unique ID of the report.
     * @param [title] The report title.
     * @param [body] The report body.
     * @param [timeBegan] The time that the incident described in the report began. Should be either in milliseconds or
     *                    an ISO format Date object.
     * @param [externalId] An ID created by the external system from which the report was sourced.
     * @param [externalUrl] A URL link to the report in an external system.
     * @param [isEnclave] A boolean indicating whether the distribubtion type of a report is ENCLAVE or COMMUNITY
     * @param [enclaveIds] A list of the enclave IDs the report is associated with.
     * @param [created] The time the report was created.
     * @param [updated] The last time the report was updated.
     * 
     */
    constructor(report: ReportJSON) {
        
        super();

        if (typeof report.enclaveIds === 'string') {
            this.enclaveIds = [report.enclaveIds];
        } else {
            this.enclaveIds = report.enclaveIds;
        }

        this.id = report.id;
        this.title = report.title;
        this.body = report.body;
        this.externalId = report.externalId;
        this.externalUrl = report.externalUrl;
        this.isEnclave = report.isEnclave;
        this.created = report.created;
        this.updated = report.updated;

        if (report.timeBegan !== undefined) {
          this.timeBegan = Report.setTimeBegan(report.timeBegan);
        } else {
          this.timeBegan = report.timeBegan;
        }

    }

    /**
     * Sets time began
     * @param timeBegan A timestamp in ISO date format or milliseconds.
     * @returns A timestamp in ISO date format.
     */
    static setTimeBegan(timeBegan: Date | number | string | undefined): Date {
      if (typeof timeBegan == 'undefined') {
        timeBegan = Date.now();
      }

      if (typeof timeBegan === 'string' || typeof timeBegan === 'number') {
          timeBegan = new Date(timeBegan);
      }

      return timeBegan;
    }

    /**
     * Gets distribution type
     * @returns  A string indicating whether the report belongs to an enclave or not.
     */
    private getDistributionType() {
        if (this.isEnclave === true) {
            return DistributionType.ENCLAVE;
        }
        return DistributionType.COMMUNITY;
    }

    static fromJSON(json: string): Report {
      const reportJSON = JSON.parse(json);
      return new Report(reportJSON);
    }
}
