import { BaseModel } from "./base"
import { Tag } from "./tag"


/**
 * Class definition for Indicator
 * @param value Value of Indicator; i.e. "www.evil.com".
 * @param type Type of Indicator; i.e. "URL".
 * @param priorityLevel The priority level of the Indicator.
 * @param 
 */
export class Indicator extends BaseModel {

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

    constructor(value: string, type?: string, priorityLevel?: string, correlationCount?: number,
        whiteListed?: boolean, weight?: number, reason?: string, firstSeen?: number, lastSeen?: number,
        sightings?: number, source?: string, notes?: string, tags?: Array<Tag>, enclaveIds?: Array<string>) {
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
}

