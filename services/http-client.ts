import * as coda from "@codahq/packs-sdk";
import { FetchOptions, Method, QueryParams } from "../types";
import { fetcher } from "./fetch";

export class HttpClient {
    constructor(private urlBuilder: any) {}

    /**
     * Exécute une requête HTTP standard
     */
    async executeRequest(
        url: string,
        options: FetchOptions,
        context: coda.ExecutionContext
    ): Promise<any> {
        return fetcher(url, options, context);
    }

    /**
     * Exécute une requête avec paramètres
     */
    async executeRequestWithParams(
        baseUrl: string,
        params: QueryParams,
        options: FetchOptions,
        context: coda.ExecutionContext
    ): Promise<any> {
        const url = this.urlBuilder.buildUrlWithParams(baseUrl, params);
        return fetcher(url, options, context);
    }

    /**
     * Prépare les options de requête pour une route donnée
     */
    prepareRequestOptions(route: string, data?: any): FetchOptions {
        const config = this.urlBuilder.getUrlConfig(route);
        const options: FetchOptions = {
            method: config.method as Method
        };

        if (data && config.method !== "GET" && config.method !== "HEAD") {
            options.body = JSON.stringify(data);
        }

        return options;
    }
} 