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
  auth_endpoint: string;
  api_endpoint: string;
  user_api_key: string;
  user_api_secret: string;
  client_type: string;
  verify: boolean;
  retry: boolean;
  max_wait_time: number;
  client_metatag: string;
  client_version: string;
  token: string | null;

  /**
   * Constructs and configures the instance according to values passed
   * on config.
   *
   * @param config TruSTAR config with values such as API key and secret
   * or auth_endpoint to interact with TruSTAR API.
   */
  constructor(config: TrustarConfig) {
    this.auth_endpoint = config["auth_endpoint"]!;
    this.api_endpoint = config["api_endpoint"]!;
    this.user_api_key = config["user_api_key"];
    this.user_api_secret = config["user_api_secret"];
    this.client_type = config["client_type"]!;
    this.verify = config["verify"]!;
    this.retry = config["retry"]!;
    this.max_wait_time = config["max_wait_time"]!;
    this.client_metatag = config["client_metatag"];
    this.client_version = config["client_version"]!;
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
        .post(this.auth_endpoint)
        .query(this.AUTH_PARAMS)
        .auth(this.user_api_key, this.user_api_secret);

      this.token = res.body["access_token"];
    } catch (err) {
      // console.debug(err.response["error"]);
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
   * @param is_json Whether the request body is a json.
   *
   * @returns The headers object.
   */
  async getHeaders(is_json: boolean = false): Promise<object> {
    let token: string = await this.getToken();
    let headers: { [key: string]: any } = {
      Authorization: `Bearer ${token}`,
    };
    if (this.client_type) {
      headers["Client-Type"] = this.client_type;
    }

    if (this.client_metatag) {
      headers["Client-Metatag"] = this.client_metatag;
    }

    if (this.client_version) {
      headers["Client-Version"] = this.client_version;
    }

    if (is_json) {
      headers["Content-Type"] = "application/json";
    }

    return headers;
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
    params?: object,
    data?: object
  ): Promise<request.Response> {
    let retry: boolean = this.retry;
    let attempted: boolean = false;
    let response: request.Response;
    while (!attempted || !retry) {
      let base_headers: object = await this.getHeaders(true);
      if (headers) {
        base_headers = { ...base_headers, ...headers };
      }

      console.log(base_headers);

      let url: string = `${this.api_endpoint}/${path}`;
      try {
        let request_params: object = params || {};
        response = await request(method, url)
          .set(base_headers)
          .query(request_params)
          .send(data);

        attempted = true;
      } catch (err) {
        if (this.expiredToken(err.response)) {
          this.refreshToken();
        }

        if (retry && err.status == 429) {
          let responseBody: { [key: string]: any } = JSON.parse(
            err.response["text"]
          );
          let wait_time: number = Math.ceil(responseBody["waitTime"] / 1000);

          if (wait_time <= this.max_wait_time) {
            //sleep
          } else {
            break;
          }
        }

        let err_msg: string = this.getErrorMessage(err.status, err.response);
        console.log(err.response.error);
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
   *
   * @param status
   * @param response
   */
  getErrorMessage(status: number, response: request.Response): string {
    let trace_id: string = response.header["trace-id"]!;
    let side: string = status < 500 ? "Client" : "Server";
    let message: string = `${status} ${side} Error (Trade-Id: ${trace_id})`;
    return message;
  }

  /**
   *
   * @param path
   * @param params
   */
  async get(path: string, params?: object) {
    return await this.request("GET", path, undefined, params, undefined); // This may change
  }

  /**
   *
   * @param path
   * @param headers
   * @param params
   * @param data
   */
  async post(path: string, headers?: object, params?: object, data?: object) {
    return await this.request("POST", path, headers, params, data);
  }
}
