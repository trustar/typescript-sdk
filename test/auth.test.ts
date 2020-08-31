import { ApiClient } from "../trustar/api_client";

var nock = require("nock");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

const expect = chai.expect;
chai.use(chaiAsPromised);

describe("Auth", function () {
  const AUTH_ENDPOINT: string = "https://api.trustar.co/oauth/token";
  const API_KEY: string = "TEST_API_KEY";
  const API_SECRET: string = "TEST_API_SECRET";

  beforeEach(function () {
    this.apiClient = new ApiClient({
      user_api_key: API_KEY,
      user_api_secret: API_SECRET,
      api_endpoint: "https://api.trustar.co/api/1.3",
      auth_endpoint: AUTH_ENDPOINT,
      client_type: "JS_SDK",
      client_metatag: null, // change?
      verify: true,
      retry: false,
      max_wait_time: 60,
    });
    this.authApi = nock("https://api.trustar.co");
  });

  it("should retrieve token succesfully", async function () {
    let expected_token: string = "1234567890";
    this.authApi
      .post("/oauth/token")
      .basicAuth({ user: API_KEY, pass: API_SECRET })
      .query({ grant_type: "client_credentials" })
      .reply(200, {
        access_token: expected_token,
      });

    let token: string = await this.apiClient.getToken();
    expect(token).to.equal(expected_token);
  });

  it("should throw and error due to incorrect creds", async function () {
    this.authApi
      .post("/oauth/token")
      .basicAuth({ user: API_KEY, pass: API_SECRET })
      .query({ grant_type: "client_credentials" })
      .reply(function (url, body, cb) {
        cb(null, [401, { error: "Unauthorized" }]);
      });

    await expect(this.apiClient.getToken()).to.be.rejectedWith(
      "Unable to get token"
    );
  });
});
