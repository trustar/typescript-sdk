import * as Base from "../trustar/models/base";
import * as Enclave from "../trustar/models/enclave";
import * as Indicator from "../trustar/models/indicator";
import * as IndicatorSummary from "../trustar/models/indicatorSummary";
import * as IntelligenceSource from "../trustar/models/intelligenceSource";
import * as NumberedPage from "../trustar/models/numberedPage";
import * as Report from "../trustar/models/report";
import * as RequestQuota from "../trustar/models/requestQuota";
import * as Tag from "../trustar/models/tag";


const chai = require('chai');
const should = chai.should();
const expect = chai.expect;

describe('BaseModel', function() {

  // Tests for all classes which inherit from BaseModel

  const firstSeen = 494035200000;
  const lastSeen = 1601942400000;

    // Enclave attributes
    const enclaveIDA = '111e-222d-333c-444b-555a';
    const enclaveIDB = '115e-224d-333c-442b-551a';
    const enclaveName = 'Test Enclave Name';
    const enclaveType = 'PRIVATE';
    const enclaveJson = JSON.stringify({
      id: enclaveIDA,
      name: enclaveName,
      type: enclaveType
    });

  describe('Enclave', function() {

    let enclave = Object.create(Enclave.Enclave.prototype);

    it('Create Enclave object from JSON string', function() {

      let enclaveFromJSON = Enclave.Enclave.fromJSON(enclaveJson);

      expect(enclaveFromJSON.id).to.equal(enclaveIDA);
      expect(enclaveFromJSON.name).to.equal(enclaveName);
      expect(enclaveFromJSON.type).to.equal(enclaveType);
      expect(enclaveFromJSON).to.be.instanceOf(Enclave.Enclave);
    })

    it('removeNulls should remove undefined field from Object', function() {

      let enclaveNoName = Object.assign(enclave, {
        id: enclaveIDA,
        name: undefined,
        type: enclaveType
      });
      enclaveNoName.removeNulls()
      expect(enclaveNoName).to.not.have.keys({name: undefined});
    })

    it('removeNulls should remove null field from Object', function() {

      let enclaveNoName = Object.assign(enclave, {
        id: enclaveIDA,
        name: null,
        type: enclaveType
      });
      enclaveNoName.removeNulls()
      expect(enclaveNoName).to.not.have.keys({name: null});
    })
  })

  describe('EnclavePermissions', function () {

    let enclavePermissionsObj = Object.create(Enclave.EnclavePermissions.prototype);

    it('Create EnclavePermissions object.', function () {

      const read = true, write = true, update = true;

      let enclavePermissions = Object.assign(enclavePermissionsObj, {
        id: enclaveIDA,
        name: enclaveName,
        type: enclaveType,
        read: read,
        write: write,
        update: update
      })

      expect(enclavePermissions).to.be.instanceOf(Enclave.EnclavePermissions);
      expect(enclavePermissions.id).to.equal(enclaveIDA);
      expect(enclavePermissions.read).to.equal(true);
    })
  })

  // Tag attributes
  const tagAName = 'Bad Indicator BAD!!';
  const tagAID = 'Bad Indicator BAD!!';
  const tagBName = 'Worse Indicator!';
  const tagBID = 'Worse Indicator!';
  const tagA = new Tag.Tag({
    name: tagAName,
    id: tagAID,
    enclaveId: enclaveIDA
  });
  const tagB = new Tag.Tag({
    name: tagBName,
    id: tagBID,
    enclaveId: enclaveIDB
  });

  // Indicator attributes
  const indicatorValue = '8.8.8.8';
  const indicatorType = 'IP';
  const priorityLevel = 'HIGH';
  const correlationCount = 34;
  const whitelisted = false;
  const weight = 1;
  const reason = 'Just because';
  const sightings = 200;
  const indicatorSource = 'VirusTotal';
  const notes = 'Nothing to see here.';
  const indicatorTags = [tagA, tagB];
  const enclaveIds = [enclaveIDA, enclaveIDB];
  const indicatorJson = JSON.stringify({
    value: indicatorValue,
    type: indicatorType,
    priorityLevel: priorityLevel,
    correlationCount: correlationCount,
    whitelisted: whitelisted,
    weight: weight,
    reason: reason,
    firstSeen: firstSeen,
    lastSeen: lastSeen,
    sightings: sightings,
    source: indicatorSource,
    notes: notes,
    tags: indicatorTags,
    enclaveIds: enclaveIds
  });

  describe('Indicator', function () {

    let indicatorFromJson = Indicator.Indicator.fromJSON(indicatorJson);

    it('Create Indicator object from JSON', function () {

      expect(indicatorFromJson.value).to.equal(indicatorValue);
      expect(indicatorFromJson.type).to.equal(indicatorType);
      expect(indicatorFromJson.priorityLevel).to.equal(priorityLevel);
      expect(indicatorFromJson.correlationCount).to.equal(correlationCount);
      expect(indicatorFromJson.whitelisted).to.equal(whitelisted);
      expect(indicatorFromJson.weight).to.equal(weight);
      expect(indicatorFromJson.reason).to.equal(reason);
      expect(indicatorFromJson.sightings).to.equal(sightings);
      expect(indicatorFromJson.source).to.equal(indicatorSource);
      expect(indicatorFromJson.notes).to.equal(notes);
      expect(indicatorFromJson.tags).to.eql(indicatorTags);
      expect(indicatorFromJson.enclaveIds).to.eql(enclaveIds);
      expect(indicatorFromJson).to.be.instanceOf(Indicator.Indicator);
      expect(indicatorFromJson.tags!.pop()).to.be.instanceOf(Tag.Tag);
    })
  })

  // IndicatorAttribute attributes
  const attributeAName = 'Indicator Type';
  const attributeAValue = 'campaign_id';
  const logicalAType = 'IP';

  const attributeBName = 'Relations Count';
  const attributeBValue = 0;
  const logicalBType = 'Number of Relations';

  const attributeAJSON = JSON.stringify({
    name: attributeAName,
    value: attributeAValue,
    logicalType: logicalAType
  });

  const attributeBJSON = JSON.stringify({
    name: attributeBName,
    value: attributeBValue,
    logicalType: logicalBType
  });

  describe('IndicatorAttribute', function () {
    
    it('Create IndicatorAttribuyte from JSON', function () {
      let indicatorAttribute = IndicatorSummary.IndicatorAttribute.fromJSON(attributeAJSON);
      expect(indicatorAttribute).to.be.instanceOf(IndicatorSummary.IndicatorAttribute);
    })
  })

  // IntelligenceSource attributes
  const sourceKey = 'virustotal';
  const sourceName = 'Virus Total';

  const intelSourceJSON = JSON.stringify({
    key: sourceKey,
    name: sourceName
  })

  const intelSource = IntelligenceSource.IntelligenceSource.fromJSON(intelSourceJSON);

  // IndicatorScore attributes
  const scoreName = 'Malicious Confidence';
  const scoreValue = 'high';

  const scoreJSON = JSON.stringify({
    name: scoreName,
    value: scoreValue
  });

  // IndicatorSummary attributes (that are different from or not in Indicator class)
  const reportId = '666';
  const indicatorScore = IndicatorSummary.IndicatorScore.fromJSON(scoreJSON);
  const created = 494035200000;
  const updated = 494035200001;
  const description = 'Malware ATTACK';
  const indicatorAttributeA = IndicatorSummary.IndicatorAttribute.fromJSON(attributeAJSON);
  const indicatorAttributeB = IndicatorSummary.IndicatorAttribute.fromJSON(attributeBJSON);
  const attributes = [indicatorAttributeA, indicatorAttributeB];
  const severityLevel = 3;

  const indicatorSummaryJSON = JSON.stringify({
    value: indicatorValue,
    indicatorType: indicatorType,
    reportId: reportId,
    enclaveId: enclaveIDA,
    source: intelSource,
    score: indicatorScore,
    created: created,
    updated: updated,
    description: description,
    attributes: attributes,
    severityLevel: severityLevel
  })

  describe('IndicatorSummary', function () {

    let indicatorSummary = IndicatorSummary.IndicatorSummary.fromJSON(indicatorSummaryJSON);

    it('Create IndicatorSummary from JSON', function () {

      expect(indicatorSummary.value).to.equal(indicatorValue);
      expect(indicatorSummary.indicatorType).to.equal(indicatorType);
      expect(indicatorSummary.reportId).to.equal(reportId);
      expect(indicatorSummary.enclaveId).to.equal(enclaveIDA);
      expect(indicatorSummary.source).to.eql(intelSource);
      expect(indicatorSummary.score).to.eql(indicatorScore);
      expect(indicatorSummary.created).to.equal(created);
      expect(indicatorSummary.updated).to.equal(updated);
      expect(indicatorSummary.description).to.equal(description);
      expect(indicatorSummary.attributes).to.eql(attributes);
      expect(indicatorSummary.severityLevel).to.equal(severityLevel);
      expect(indicatorSummary).to.be.instanceOf(IndicatorSummary.IndicatorSummary);
      expect(indicatorSummary.source).to.be.instanceOf(IntelligenceSource.IntelligenceSource);
      expect(indicatorSummary.score).to.be.instanceOf(IndicatorSummary.IndicatorScore);
      expect(indicatorSummary.attributes!.pop()).to.be.instanceOf(IndicatorSummary.IndicatorAttribute);
    })
  })
})
