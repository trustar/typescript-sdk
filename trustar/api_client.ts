import * as request from "superagent";
import { TrustarConfig } from "./trustar";

/**
 * Client to interact with TruSTAR's API
 */
export class ApiClient {
  readonly AUTH_PARAMS: object = { grant_type: "client_credentials" };
  readonly INVALID_TOKEN_ERRORS: string[] = [
    "Expired oauth2 access token",
    "Invalid oauth2 access token",
  ];
  authEndpoint: string;
  apiEndpoint: string;
  stationBaseUrl: string;
  userApiKey: string;
  userApiSecret: string;
  clientType: string;
  verify: boolean;
  retry: boolean;
  maxWaitTime: number;
  clientMetatag: string;
  clientVersion: string;
  token: string | null;

  /**
   * Constructs and configures the instance according to values passed
   * on config.
   *
   * @param config TruSTAR config with values such as API key and secret
   * or auth_endpoint to interact with TruSTAR API.
   */
  constructor(config: TrustarConfig) {
    this.authEndpoint = config.authEndpoint!;
    this.apiEndpoint = config.apiEndpoint!;
    this.stationBaseUrl = config.stationBaseUrl!;
    this.userApiKey = config.userApiKey;
    this.userApiSecret = config.userApiSecret;
    this.clientType = config.clientType!;
    this.verify = config.verify!;
    this.retry = config.retry!;
    this.maxWaitTime = config.maxWaitTime!;
    this.clientMetatag = config.clientMetatag;
    this.clientVersion = config.clientVersion!;
    this.token = null;
  }

  /**
   * Retrieves the OAuth2 token generated by the user's API key and API secret.
   * Sets the instance property 'token' to this new token.
   * If the current token is still alive, the server will simply return that.
   */
  async refreshToken() {
    try {
      const res = await request
        .post(this.authEndpoint)
        .query(this.AUTH_PARAMS)
        .auth(this.userApiKey, this.userApiSecret);

      this.token = res.body["access_token"];
    } catch (err) {
      throw new Error("Unable to get token");
    }
  }

  /**
   * Returns the token.  If no token has been generated yet, gets one first.
   * @returns The OAuth2 token.
   */
  async getToken(): Promise<string> {
    if (!this.token) await this.refreshToken();
    return this.token!;
  }

  /**
   * Create headers dictionary for a request.
   * @param is_json Whether the request body is in json format.
   *
   * @returns The headers object.
   */
  async getHeaders(isJson: boolean = false): Promise<object> {
    let token: string = await this.getToken();
    let headers: { [key: string]: any } = {
      Authorization: `Bearer ${token}`,
    };
    if (this.clientType) {
      headers["Client-Type"] = this.clientType;
    }

    if (this.clientMetatag) {
      headers["Client-Metatag"] = this.clientMetatag;
    }

    if (this.clientVersion) {
      headers["Client-Version"] = this.clientVersion;
    }

    if (isJson) {
      headers["Content-Type"] = "application/json";
    }

    return headers;
  }

  /**
   * Sleeps for some milliseconds when 429s received.
   * @param ms milliseconds to sleep.
   */
  delayNextRequest(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Checks if an object is empty or not
   * @param obj object to check
   */
  isEmpty(obj: object): boolean {
    return Object.keys(obj).length === 0;
  }

  /**
   * Generic request method that handles logic to interact with different
   * TruSTAR's endpoints.
   * @param method The method of the request: GET, PUT, POST or DELETE.
   * @param path Endpoint path of the request.
   * @param headers headers that will be merged with the base headers
   * for the SDK.
   * @param params Query params that'll be send with the request.
   * @param data Data to include in request body.
   */
  async request(
    method: string,
    path: string,
    headers?: object,
    params: object = {},
    data?: object
  ): Promise<request.Response> {
    let retry: boolean = this.retry;
    let attempted: boolean = false;
    let response: request.Response;
    while (!attempted || retry) {
      let isJson: boolean = ["POST", "PUT"].includes(method);
      let baseHeaders: object = await this.getHeaders(isJson);
      if (headers && this.isEmpty(headers)) {
        baseHeaders = { ...baseHeaders, ...headers };
      }

      let url: string = `${this.apiEndpoint}/${path}`;
      try {
        response = await request(method, url)
          .set(baseHeaders)
          .query(params)
          .send(data);

        attempted = true;
        retry = false;
      } catch (err) {
        if (err instanceof SyntaxError) {
          response = err["rawResponse"];
          break; // Handles responses that do not return JSON format
        }

        if (this.expiredToken(err.response)) {
          this.refreshToken();
          continue;
        }

        if (retry && err.status == 429) {
          let responseBody: { [key: string]: any };
          responseBody = JSON.parse(err.response.text);
          let waitTime: number = Math.ceil(responseBody.waitTime);

          if (waitTime <= this.maxWaitTime * 1000) {
            await this.delayNextRequest(waitTime);
            continue;
          }
        }

        let err_msg: string = this.getErrorMessage(err.status, err.response);
        throw new Error(err_msg);
      }
    }
    return response!;
  }

  /**
   * Determine whether the given response indicates that the token is expired.
   * @param response HTTP response object.
   * @returns true if reponse indicates that token is expired, false if not.
   */
  expiredToken(response: request.ResponseError): boolean {
    if (response.status == 400) {
      let responseBody: { [key: string]: any } = JSON.parse(response["text"]);
      let errDescription: string = responseBody["error_description"];
      if (this.INVALID_TOKEN_ERRORS.includes(errDescription)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Forms a custom error message with status code, trace id and
   * Client/Server side.
   * @param status HTTP Status code
   * @param response HTTP Response
   */
  getErrorMessage(status: number, response: request.Response): string {
    let message: string;
    try {
      let traceId: string = response.header["trace-id"]!;
      let side: string = status < 500 ? "Client" : "Server";
      message = `${status} ${side} Error (Trade-Id: ${traceId})`;
    } catch (err) {
      message = "Unknown Error.";
    }
    return message;
  }

  /**
   * Method for GET requests. They will be fowarded to the request method
   * with headers, params, and data.
   * @param path Endpoint path.
   * @param headers Headers to be added to the HTTP request.
   * @param params Params to be added to the HTTP request.
   * @param data Body data to be added to the HTTP request.
   */
  async get(
    path: string,
    headers?: object,
    params: object = {},
    data?: object
  ) {
    return await this.request("GET", path, headers, params, data);
  }

  /**
   * Method for POST requests. They will be fowarded to the request method
   * with headers, params, and data.
   * @param path Endpoint path.
   * @param headers Headers to be added to the HTTP request.
   * @param params Params to be added to the HTTP request.
   * @param data Body data to be added to the HTTP request.
   */
  async post(
    path: string,
    headers?: object,
    params: object = {},
    data?: object
  ) {
    return await this.request("POST", path, headers, params, data);
  }
}
