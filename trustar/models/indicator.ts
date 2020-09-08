import { BaseModel } from "./base"
import { IndicatorType } from "./enum"
import { Tag, TagJSON } from "./tag"


/**
 * IndicatorJSON helper interface to convert Indicator to and from JSON.
 */
export interface IndicatorJSON {
    value: string;
    type?: string;
    priorityLevel?: string;
    correlationCount?: number;
    whitelisted?: boolean;
    weight?: number;
    reason?: string;
    firstSeen?: number;
    lastSeen?: number;
    sightings?: number;
    source?: string;
    notes?: string;
    tags?: Tag[];
    enclaveIds?: string[];
}

/**
 * Class definition for an Indicator
 * @param types A list of all valid indicator types. 
 */
export class Indicator extends BaseModel {

    static readonly types = Object.keys(IndicatorType).map(k => IndicatorType[k])

    value: string;
    type?: string;
    priorityLevel?: string;
    correlationCount?: number;
    whitelisted?: boolean;
    weight?: number;
    reason?: string;
    firstSeen?: number;
    lastSeen?: number;
    sightings?: number;
    source?: string;
    notes?: string;
    tags?: Tag[];
    enclaveIds?: string[];


    /**
     * Creates an Indicator instance.
     * 
     * @param value Value of indicator; i.e. "www.evil.com".
     * @param [type] Type of indicator; i.e. "URL".
     * @param [priorityLevel] The priority level of the indicator.
     * @param [correlationCount] The number of other indicators that are correlated with this indicator.
     * @param [whiteListed] Whether the indicator is whitelisted or not.
     * @param [weight] A binary value indicating whether a value is an indicator based on its context.
     * @param [reason] If the indicator's weight is 0, the reason why.
     * @param [firstSeen] The time this indicator was first seen.
     * @param [lastSeen] The time this indicator was last seen.
     * @param [sightings] The number of times this indicator was sighted.
     * @param [source] The source that the indicator was observed in.
     * @param [notes] Notes about the indicator.
     * @param [tags] A list of Tag objects associated with the indicator.
     * @param [enclaveIds] A list of enclaves that the indicator is found in.
     * 
     */
    constructor(indicator: IndicatorJSON) {
            
            super();
            this.value = indicator.value;
            this.type =  indicator.type;
            this.priorityLevel = indicator.priorityLevel;
            this.correlationCount = indicator.correlationCount;
            this.whitelisted = indicator.whitelisted;
            this.weight = indicator.weight;
            this.reason = indicator.reason;
            this.firstSeen = indicator.firstSeen;
            this.lastSeen = indicator.lastSeen;
            this.sightings = indicator.sightings;
            this.source = indicator.source;
            this.notes = indicator.notes;
            this.tags = indicator.tags ? Indicator.decodeTags(indicator.tags) : undefined;
            this.enclaveIds = indicator.enclaveIds;
        }

    static decodeTags(tagArray: TagJSON[]): Tag[] {
        return tagArray.map(tag => new Tag(tag));
    }

    static fromJSON(json): Indicator {
        const indicatorJSON = JSON.parse(json);
        return new Indicator(indicatorJSON);
    }
}

