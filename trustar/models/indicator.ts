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
    whiteListed?: boolean;
    weight?: number;
    reason?: string;
    firstSeen?: number;
    lastSeen?: number;
    sightings?: number;
    source?: string;
    notes?: string;
    tags?: object;
    enclaveIds?: object;
}

/**
 * Class definition for an Indicator
 * @param types A list of all valid indicator types. 
 */
export class Indicator extends BaseModel {

    static readonly types = Object.keys(IndicatorType).map(k => IndicatorType[k as any])

    value: string;
    type?: string;
    priorityLevel?: string;
    correlationCount?: number;
    whiteListed?: boolean;
    weight?: number = 1 | 0;
    reason?: string;
    firstSeen?: number;
    lastSeen?: number;
    sightings?: number;
    source?: string;
    notes?: string;
    tags?: Array<Tag>;
    enclaveIds?: Array<string>;


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
    constructor({value, type, priorityLevel, correlationCount, whiteListed, weight, reason, firstSeen, 
        lastSeen, sightings, source, notes, tags, enclaveIds}: {value: string, type?: string, priorityLevel?: string, 
        correlationCount?: number, whiteListed?: boolean, weight?: number, reason?: string, firstSeen?: number, lastSeen?: number,
        sightings?: number, source?: string, notes?: string, tags?: Array<Tag>, enclaveIds?: Array<string>}) {
            
            super();
            this.value = value;
            this.type = type;
            this.priorityLevel = priorityLevel;
            this.correlationCount = correlationCount;
            this.whiteListed = whiteListed;
            this.weight = weight;
            this.reason = reason;
            this.firstSeen = firstSeen;
            this.lastSeen = lastSeen;
            this.sightings = sightings;
            this.source = source;
            this.notes = notes;
            this.tags = tags;
            this.enclaveIds = enclaveIds;
        }

    static decodeTags(tagArray: Array<TagJSON>) {
        return tagArray.forEach(tag => new Tag(tag));
    }

    static fromJSON<T extends IndicatorJSON>(json: T): Indicator {
        let indicator = Object.create(Indicator.prototype)
        return Object.assign(indicator, json, {
            tags: this.decodeTags((json.tags as Array<TagJSON>))
        })
    }
}

