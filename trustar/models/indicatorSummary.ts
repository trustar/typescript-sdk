import { BaseModel } from "./base"
import { IntelligenceSource } from "./intelligenceSource"

export class IndicatorSummary extends BaseModel {

    value?: string;
    indicatorType?: string;
    reportId?: string;
    enclaveId?: string;
    source?: IntelligenceSource;
    score?: IndicatorScore;
    created?: number;
    updated?: number;
    description?: string;
    attributes?: Array<Attribute>;
    severityLevel?: number = 0 | 1 | 2 | 3;


    /**
     * Creates an instance of indicator summary.
     * @param [value] The indicator's value.
     * @param [indicatorType] The indicator's type.
     * @param [reportId] The ID of the report for this summary.
     * @param [enclaveId] The ID of the report's enclave.
     * @param [source] An object containing information about the source of the report.
     * @param [score] The score of the report, according to the source.
     * @param [created] The first seen timestamp of the indicator.
     * @param [updated] The last seen or updated timestamp of the indicator.
     * @param [description] A description of the indicator according to the source.
     * @param [attributes] A list of attributes about the indicator, according to the source.
     * @param [severityLevel] A normalized representation of the score from this source if one exists.
     *                     This is an integer between and 0 and 3; 0 being the lowest score.
     */
    constructor(value?: string, indicatorType?: string, reportId?: string, enclaveId?: string,
        source?: IntelligenceSource, score?: IndicatorScore, created?: number, updated?: number,
        description?: string, attributes?: Array<Attribute>, severityLevel?: number) {
 
        super();
        this.value = value;
        this.indicatorType = indicatorType;
        this.reportId = reportId;
        this.enclaveId = enclaveId;
        this.source = source;
        this.score = score;
        this.created = created;
        this.updated = updated;
        this.description = description;
        this.attributes = attributes;
        this.severityLevel = severityLevel;
    }
}

class IndicatorScore {}
class Attribute {}