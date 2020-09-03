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


  const enclaveID = '111e-222d-333c-444b-555a';
  const enclaveName = 'Test Enclave Name';
  const enclaveType = 'PRIVATE';
  const enclaveJson = JSON.stringify({id: enclaveID,
                                      name: enclaveName, 
                                      type: enclaveType});

  describe('Enclave', function() {
    let enclave = Object.create(Enclave.Enclave.prototype);
    it('Create Enclave object from JSON string', function() {
      let enclaveFromJSON = Enclave.Enclave.fromJSON(JSON.parse(enclaveJson));
      expect(enclaveFromJSON.id).to.equal(enclaveID);
      expect(enclaveFromJSON.name).to.equal(enclaveName);
      expect(enclaveFromJSON.type).to.equal(enclaveType);
    })

    it('removeNulls should remove null field from Object', function() {
      let enclaveNoName = Object.assign(enclave, {
        id: enclaveID,
        name: undefined,
        type: enclaveType
      });
      enclaveNoName.removeNulls()
      expect(enclaveNoName).to.not.have.keys({name: undefined});
    })
  })
})
