import { BaseModel } from "./base"
import { IntelligenceSource, IntelligenceSourceJSON } from "./intelligenceSource"


export interface IndicatorSummaryJSON {
  value?: string | null;
  indicatorType?: string | null;
  reportId?: string | null;
  enclaveId?: string | null;
  source?: object | null;
  score?: IndicatorScore | null;
  created?: number | null;
  updated?: number | null;
  description?: string | null;
  attributes?: IndicatorAttribute[] | null;
  severityLevel?: number | null;
}

export class IndicatorSummary extends BaseModel {

  value?: string | null;
  indicatorType?: string | null;
  reportId?: string | null;
  enclaveId?: string | null;
  source?: object | null;
  score?: IndicatorScore | null;
  created?: number | null;
  updated?: number | null;
  description?: string | null;
  attributes?: IndicatorAttribute[] | null;
  severityLevel?: number | null;


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
  constructor(indicatorSummary: IndicatorSummaryJSON) {

    super();

    this.value = indicatorSummary.value;
    this.indicatorType = indicatorSummary.indicatorType;
    this.reportId = indicatorSummary.reportId;
    this.enclaveId = indicatorSummary.enclaveId;
    this.source = indicatorSummary.source ? new IntelligenceSource(indicatorSummary.source) : undefined;
    this.score = indicatorSummary.score ? new IndicatorScore(indicatorSummary.score) : undefined;
    this.created = indicatorSummary.created;
    this.updated = indicatorSummary.updated;
    this.description = indicatorSummary.description;
    this.attributes = indicatorSummary.attributes ? IndicatorSummary.decodeAttributes(indicatorSummary.attributes) : undefined;
    this.severityLevel = indicatorSummary.severityLevel;
  }


  /**
   * Decodes attributes
   * @param attrArray An array of objects representing indicator attributes.
   * @returns attributes An array of IndicatorAttribute objects.
   */
  static decodeAttributes(attrArray: IndicatorAttributeJSON[]): IndicatorAttribute[] {
    return attrArray.map(attribute => new IndicatorAttribute(attribute));
  }


  /**
   * FromJSON
   * @param json 
   * @returns json 
   */
  static fromJSON(json: string): IndicatorSummary {
    const summaryJSON = JSON.parse(json);
    return new IndicatorSummary(summaryJSON);
  }
}

interface IndicatorScoreJSON {
  name?: string | null;
  value?: string | null;
}

/**
 * Indicator score
 */
export class IndicatorScore extends BaseModel {

  name?: string | null;
  value?: string | null;

  /**
   * Creates an instance of indicator score.
   * @param [name] The name of the score type, e.g. "Risk Score"
   * @param [value] The value of the score, as extracted from the source. 
   */
  constructor(indicatorScore: IndicatorScoreJSON) {

    super();
    this.name = indicatorScore.name;
    this.value = indicatorScore.value;
  }


  /**
   * FromJSON
   * @param json A JSON string representing and indicator score.
   * @returns json An IndicatorScore object.
   */
  static fromJSON(json: string): IndicatorScore {
    const scoreJSON = JSON.parse(json);
    return new IndicatorScore(scoreJSON);
  }
}


interface IndicatorAttributeJSON {
  name?: string | null;
  value?: string | null;
  logicalType?: string | null;
  description?: string | null;
}

/**
 * IndicatorAttribute
 */
export class IndicatorAttribute extends BaseModel {

  name?: string | null;
  value?: string | null;
  logicalType?: string | null;
  description?: string | null;


  /**
   * Creates an instance of indicator attribute.
   * @param [name] The name of the attribute, e.g. "Threat Actors".
   * @param [value] The value of the attribute, e.g. "North Korea".
   * @param [logicalType] Describes how to interpret the value field; i.e. could be a timestamp if value is number.
   * @param [description] A description of how to interpret the attribute. Corresponds to an attribute name.
   */
  constructor(indicatorAttribute: IndicatorAttributeJSON) {

    super();

    this.name = indicatorAttribute.name;
    this.value = indicatorAttribute.value;
    this.logicalType = indicatorAttribute.logicalType;
    this.description = indicatorAttribute.description;

  }


  /**
   * FromJSON
   * @param json A JSON string representing an indicator attribute.
   * @returns An IndicatorAttribute object.
   */
  static fromJSON(json: string) {
    const indicatorAttributeJSON = JSON.parse(json);
    return new IndicatorAttribute(indicatorAttributeJSON);
  }
}
