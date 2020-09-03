import { BaseModel } from "./base"


export interface IntelligenceSourceJSON {
    key?: string;
    name?: string;
}

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
    constructor(intelligenceSource: IntelligenceSourceJSON) {

        super();
        this.key = intelligenceSource.key;
        this.name = intelligenceSource.name;
    }

    static fromJSON(json: string): IntelligenceSource {
        const intelSourceJSON = JSON.parse(json);
        return new IntelligenceSource(intelSourceJSON);
    }
}
