import * as coda from "@codahq/packs-sdk";
import { UrlBuilder } from "./url-builder";
import { HttpClient } from "./http-client";

export class TagService {
    constructor(
        private _urlBuilder: UrlBuilder,
        private _httpClient: HttpClient
    ) {}

    get urlBuilder(): UrlBuilder {
        return this._urlBuilder;
    }

    /**
     * @param context - Contexte d'exécution Coda
     * @param limit - Limite du nombre de tags
     * @param cursor - Cursor de la requête
     * @returns Réponse de l'API
     */
    async getTags(
        context: coda.ExecutionContext,
        limit: number = 100,
        cursor: string = ""
    ): Promise<any> {
        const url = this._urlBuilder.buildBaseUrl("getTags");
        const options = this._httpClient.prepareRequestOptions("getTags");
        const params = {
            limit: limit.toString(),
            ...(cursor && { cursor })
        };
        
        return this._httpClient.executeRequestWithParams(url, params, options, context);
    }

    /**
     * @param tagId - ID du tag
     * @param context - Contexte d'exécution Coda
     * @returns Réponse de l'API
     */
    async getTag(
        tagId: string,
        context: coda.ExecutionContext
    ): Promise<any> {
        const baseUrl = this._urlBuilder.buildBaseUrl("getTag");
        const url = this._urlBuilder.replaceUrlParams(baseUrl, { id: tagId });
        const options = this._httpClient.prepareRequestOptions("getTag");
        
        return this._httpClient.executeRequest(url, options, context);
    }

    /**
     * @param name - Nom du tag
     * @param context - Contexte d'exécution Coda
     * @returns Réponse de l'API
     */
    async createTag(
        name: string,
        context: coda.ExecutionContext
    ): Promise<any> {
        const url = this._urlBuilder.buildBaseUrl("createTag");
        const options = this._httpClient.prepareRequestOptions("createTag", { name });
        
        return this._httpClient.executeRequest(url, options, context);
    }

    /**
     * @param tagId - ID du tag
     * @param name - Nouveau nom du tag
     * @param context - Contexte d'exécution Coda
     * @returns Réponse de l'API
     */
    async updateTag(
        tagId: string,
        name: string,
        context: coda.ExecutionContext
    ): Promise<any> {
        const baseUrl = this._urlBuilder.buildBaseUrl("updateTag");
        const url = this._urlBuilder.replaceUrlParams(baseUrl, { id: tagId });
        const options = this._httpClient.prepareRequestOptions("updateTag", { name });
        
        return this._httpClient.executeRequest(url, options, context);
    }

    /**
     * @param tagId - ID du tag
     * @param context - Contexte d'exécution Coda
     * @returns Réponse de l'API
     */
    async deleteTag(
        tagId: string,
        context: coda.ExecutionContext
    ): Promise<any> {
        const baseUrl = this._urlBuilder.buildBaseUrl("deleteTag");
        const url = this._urlBuilder.replaceUrlParams(baseUrl, { id: tagId });
        const options = this._httpClient.prepareRequestOptions("deleteTag");
        
        return this._httpClient.executeRequest(url, options, context);
    }
} 