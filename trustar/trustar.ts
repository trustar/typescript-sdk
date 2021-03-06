import { ApiClient } from "./api_client";

const fs = require("fs");

export interface TrustarConfig {
  authEndpoint?: string;
  apiEndpoint?: string;
  userApiKey: string;
  userApiSecret: string;
  retry?: boolean;
  maxWaitTime?: number;
  clientType?: string;
  clientVersion?: string;
  stationBaseUrl?: string;

  [index: string]: any;
}

/**
 * SDK main class to interact with TruSTAR API.
 */
export class TruStar {
  config: TrustarConfig;
  apiClient: ApiClient;

  readonly REQUIRED_FIELDS = ["userApiKey", "userApiSecret"];

  readonly DEFAULT_FIELDS: { [key: string]: any } = {
    authEndpoint: "https://api.trustar.co/oauth/token",
    apiEndpoint: "https://api.trustar.co/api/1.3",
    stationBaseUrl: "https://station.trustar.co",
    clientType: "JS_SDK",
    clientMetatag: null,
    retry: true,
    maxWaitTime: 60,
  };

  /**
   * Constructs and sets variables according configuration.
   * @param config SDK Configuration object used to instantiate class.
   * config parameter is optional. If not passed, it will try
   * to read a JSON file on Project's root named 'trustar.config.json'
   *
   * Required properties on config object are 'user_api_key' and
   * 'user_api_secret'. Both can be found on TruSTAR's station.
   *
   * Other optional keys, and their defaults if not passed, are listed below:
   *
   * auth_endpoint: URL used to obtain OAuth2 tokens.
   * Default: https://api.trustar.co/oauth/token.
   *
   * api_endpoint: base URL used for making API calls.
   * Default: https://api.trustar.co/api/1.3.
   *
   * retry: whether to wait and retry requests that fail with 429.
   * Default: true.
   *
   * max_wait_time: fail if 429 wait time is greater than this (seconds).
   * Default: 60.
   *
   * client_type: the name of the client being used. Default: JS_SDK
   *
   * client_version: the version of the client being used.
   *
   * client_metatag: any additional information. (Usually used to identify
   * which app or user is using the SDK). Default: null
   */
  constructor(config?: TrustarConfig) {
    this.config = config ? config : this.readConfigFile();

    this.REQUIRED_FIELDS.forEach((value) => {
      if (!(value in this.config)) {
        throw new Error(`config must have: ${value} field`);
      }
    });

    Object.keys(this.DEFAULT_FIELDS).forEach((key) => {
      if (!(key in this.config)) {
        this.config[key] = this.DEFAULT_FIELDS[key];
      }
    });

    this.config["client_version"] = this.readVersionFile();
    this.apiClient = new ApiClient(this.config);

    // managers that will handle requests and logic to
    // reports, indicators, etc. endpoints

    // this.reportManager = new ReportManager(this.apiClient)
    // this.indicatorManager = new ReportManager(this.apiClient)
    // this.tagManager = new TagManager(this.apiClient)
    // this.phishingManager = new PhishingManager(this.apiClient)
  }

  /**
   * Reads a JSON file and returns a JS object.
   * @param path path including filename to json file
   */
  readAndGetJSON(path: string): { [key: string]: any } {
    let jsonString: string = fs.readFileSync(path, "utf-8");
    let jsObject: object = JSON.parse(jsonString);
    return jsObject;
  }

  /**
   * Reads trustar.config.json file in project root and returns a JS object.
   */
  readConfigFile(): any {
    let configJson: object = this.readAndGetJSON("trustar.config.json");
    return configJson;
  }

  /**
   * Reads version.json file in project root and returns a JS object.
   */
  readVersionFile(): any {
    let versionJson: { [key: string]: string } = this.readAndGetJSON(
      "version.json"
    );
    return versionJson["sdkVersion"];
  }

  async ping() {
    return await this.apiClient.get("ping");
  }
}
