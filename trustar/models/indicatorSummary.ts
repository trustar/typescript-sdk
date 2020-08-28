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
    attributes?: Array<IndicatorAttribute>;
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
    constructor({value, indicatorType, reportId, enclaveId, source, score, created, updated, description,
        attributes, severityLevel}: {value?: string, indicatorType?: string, reportId?: string, enclaveId?: string,
        source?: IntelligenceSource, score?: IndicatorScore, created?: number, updated?: number,
        description?: string, attributes?: Array<IndicatorAttribute>, severityLevel?: number} = {}) {
 
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


/**
 * Indicator score
 */
class IndicatorScore extends BaseModel {

    name?: string;
    value?: string;

    /**
     * Creates an instance of indicator score.
     * @param [name] The name of the score type, e.g. "Risk Score"
     * @param [value] The value of the score, as extracted from the source. 
     */
    constructor({name, value}: {name?: string, value?: string} = {}) {
        
        super();
        this.name = name;
        this.value = value;
    }
}


/**
 * IndicatorAttribute
 */
class IndicatorAttribute extends BaseModel {

    name?: string;
    value?: string;
    logicalType?: string;
    description?: string;


    /**
     * Creates an instance of indicator attribute.
     * @param [name] The name of the attribute, e.g. "Threat Actors".
     * @param [value] The value of the attribute, e.g. "North Korea".
     * @param [logicalType] Describes how to interpret the value field; i.e. could be a timestamp if value is number.
     * @param [description] A description of how to interpret the attribute. Corresponds to an attribute name.
     */
    constructor({name, value, logicalType, description}: {name?: string, value?: string,
        logicalType?: string, description?: string} = {}) {
            
            super();
            this.name = name;
            this.value = value;
            this.logicalType = logicalType;
            this.description = description;

        }
}
