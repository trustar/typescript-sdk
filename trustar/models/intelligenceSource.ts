import { BaseModel } from "./base"


export interface IntelligenceSourceJSON {
  key?: string | null;
  name?: string | null;
}

/**
 * Intelligence source
 */
export class IntelligenceSource extends BaseModel {

  key?: string | null;
  name?: string | null;


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


  /**
   * FromJSON
   * @param json A JSON string representing an intelligence source. 
   * @returns A =n IntelligenceSource object.
   */
  static fromJSON(json: string): IntelligenceSource {
    const intelSourceJSON = JSON.parse(json);
    return new IntelligenceSource(intelSourceJSON);
  }
}
