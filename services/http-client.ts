import * as coda from "@codahq/packs-sdk";
import { FetchOptions, Method, QueryParams } from "../types";
import { fetcher } from "./fetch";
import { UrlBuilder } from "./url-builder";

export class HttpClient {
    constructor(private urlBuilder: UrlBuilder) {}

    /**
     * @param url - URL de la requête
     * @param options - Options de la requête
     * @param context - Contexte d'exécution Coda
     * @returns Réponse de l'API
     */
    async executeRequest(
        url: string,
        options: FetchOptions,
        context: coda.ExecutionContext
    ): Promise<any> {
        return fetcher(url, options, context);
    }

    /**
     * @param baseUrl - URL de base
     * @param params - Paramètres de la requête
     * @param options - Options de la requête
     * @param context - Contexte d'exécution Coda
     * @returns Réponse de l'API
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
     * @param route - Route de l'API
     * @param data - Données à envoyer
     * @returns Options de requête
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