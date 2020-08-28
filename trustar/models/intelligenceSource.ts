import { BaseModel } from "./base"


/**
 * Intelligence source
 */
export class IntelligenceSource extends BaseModel {

    key?: string;
    name?: string;


    /**
     * Creates an instance of intelligence source.
     * @param [key] A string that identifies the source. i.e. "virustotal"
     * @param [name] The human-readable name of the source. i.e. "VirusTotal"
     */
    constructor(key?: string, name?: string) {

        super();
        this.key = key;
        this.name = name;
    }
}
