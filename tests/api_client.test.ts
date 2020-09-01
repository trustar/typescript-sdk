import { ApiClient } from "../trustar/api_client";

var nock = require("nock");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

const expect = chai.expect;
chai.use(chaiAsPromised);

describe("Token", function () {
  const AUTH_ENDPOINT: string = "https://api.trustar.co/oauth/token";
  const API_KEY: string = "TEST_API_KEY";
  const API_SECRET: string = "TEST_API_SECRET";
  const TOKEN: string = "1234567890";
  const PING_REPONSE: object = { text: "pong" };

  beforeEach(function () {
    this.apiClient = new ApiClient({
      user_api_key: API_KEY,
      user_api_secret: API_SECRET,
      api_endpoint: "https://api.trustar.co/api/1.3",
      auth_endpoint: AUTH_ENDPOINT,
      client_type: "JS_SDK",
      client_metatag: "TEST_METATAG",
      client_version: "TEST_VERSION",
      verify: true,
      retry: true,
      max_wait_time: 60,
    });

    this.api = nock("https://api.trustar.co");
  });

  describe("Token happy path", function () {
    beforeEach(function () {
      this.api
        .post("/oauth/token")
        .basicAuth({ user: API_KEY, pass: API_SECRET })
        .query({ grant_type: "client_credentials" })
        .reply(200, {
          access_token: TOKEN,
        });

      this.expected_headers = {
        Authorization: "Bearer 1234567890",
        "Client-Type": "JS_SDK",
        "Client-Metatag": "TEST_METATAG",
        "Client-Version": "TEST_VERSION",
      };
    });

    it("should retrieve token succesfully", async function () {
      let token: string = await this.apiClient.getToken();
      expect(token).to.equal(TOKEN);
    });

    it("headers should be formed successfully", async function () {
      let headers: object = await this.apiClient.getHeaders(false);
      expect(headers).to.be.deep.equal(this.expected_headers);
    });

    it("should be able to retrieve basic GET http request", async function () {
      this.api.get("/api/1.3/ping").reply(200, PING_REPONSE);
      let response = await this.apiClient.get("ping");
      expect(response.body.text).to.equal("pong");
    });

    it("should fail first request due to expired token", async function () {
      let errorResponse = {
        error_description: "Expired oauth2 access token",
      };
      this.api.get("/api/1.3/ping").reply(function (url, body, cb) {
        cb(null, [400, errorResponse]);
      });
      this.api
        .post("/oauth/token")
        .basicAuth({ user: API_KEY, pass: API_SECRET })
        .query({ grant_type: "client_credentials" })
        .reply(200, {
          access_token: TOKEN,
        });
      this.api.get("/api/1.3/ping").reply(200, PING_REPONSE);
      let response = await this.apiClient.get("ping");
      expect(response.body.text).to.equal("pong");
    });

    it("should retrieve token succesfully and fail request to API", async function () {
      this.api.get("/api/1.3/ping").reply(function (url, body, cb) {
        cb(null, [401, { text: "body" }, { "trace-id": "TEST-trace-id" }]);
      });

      await expect(this.apiClient.get("ping")).to.be.rejectedWith(
        "401 Client Error (Trade-Id: TEST-trace-id)"
      );
    });

    it("should sleep 1 ms after receiving 429 (Too Many Requests)", async function () {
      let errorResponse = {
        waitTime: 1,
      };
      this.api.get("/api/1.3/ping").reply(function (url, body, cb) {
        cb(null, [429, errorResponse]);
      });
      this.api.get("/api/1.3/ping").reply(200, PING_REPONSE);
      let response = await this.apiClient.get("ping");
      expect(response.body.text).to.equal("pong");
    });
  });

  describe("Token failing path", function () {
    beforeEach(function () {
      this.api
        .post("/oauth/token")
        .basicAuth({ user: API_KEY, pass: API_SECRET })
        .query({ grant_type: "client_credentials" })
        .reply(function (url, body, cb) {
          cb(null, [401, { error: "Unauthorized" }]);
        });
    });

    it("should throw an error due to incorrect creds", async function () {
      await expect(this.apiClient.getToken()).to.be.rejectedWith(
        "Unable to get token"
      );
    });
  });
});
