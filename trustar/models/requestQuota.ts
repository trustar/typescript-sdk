import { BaseModel } from "./base"

export class RequestQuota extends BaseModel {

    guid: string;
    maxRequests: number;
    usedRequests: number;
    timeWindow: number;
    lastResetTime: number;
    nextResetTime: number;


    /**
     * Creates an instance of request quota.
     * @param guid The GUID of the counter
     * @param maxRequests The maximum number of requests allowed during the time window.
     * @param usedRequests The number of requests the user has used during the time window.
     * @param timeWindow The length of the time window in milliseconds.
     * @param lastResetTime The time that the counter was last reset, in milliseconds since epoch.
     * @param nextResetTime The time that the counter will next be reset, in milliseconds since epoch.
     */
    constructor({guid, maxRequests, usedRequests, timeWindow, lastResetTime, nextResetTime}:
            {guid: string, maxRequests: number, usedRequests: number, timeWindow: number, 
            lastResetTime: number, nextResetTime: number}) {

                super();
                this.guid = guid;
                this.maxRequests = maxRequests;
                this.usedRequests = usedRequests;
                this.timeWindow = timeWindow;
                this.lastResetTime = lastResetTime;
                this.nextResetTime = nextResetTime;

            }
}