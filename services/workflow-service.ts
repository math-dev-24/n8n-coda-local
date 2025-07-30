import * as coda from "@codahq/packs-sdk";
import { Method, Mode } from "../types";
import { UrlBuilder } from "./url-builder";
import { HttpClient } from "./http-client";

export class WorkflowService {
    constructor(
        private _urlBuilder: UrlBuilder,
        private _httpClient: HttpClient
    ) {}

    get urlBuilder(): UrlBuilder {
        return this._urlBuilder;
    }

    /**
     * @param workflowId - ID du workflow
     * @param data - Données à envoyer
     * @param mode - Mode de l'URL
     * @param context - Contexte d'exécution Coda
     * @returns Réponse de l'API
     */
    async triggerWorkflow(
        workflowId: string,
        data: any[],
        mode: Mode,
        method: Method,
        context: coda.ExecutionContext
    ): Promise<any> {
        const url = this._urlBuilder.buildWebhookUrl(workflowId, mode);
        const options = this._httpClient.prepareRequestOptions("triggerWorkflow", data.length > 0 ? { items: data } : undefined, method);
        
        return this._httpClient.executeRequest(url, options, context);
    }

    /**
     * @param context - Contexte d'exécution Coda
     * @param cursor - Cursor de la requête
     * @returns Réponse de l'API
     */
    async getWorkflows(
        context: coda.ExecutionContext,
        cursor: string = ""
    ): Promise<any> {
        const url = this._urlBuilder.buildBaseUrl("getWorkflows");
        const options = this._httpClient.prepareRequestOptions("getWorkflows");
        const params = cursor ? { cursor } : {};
        
        return this._httpClient.executeRequestWithParams(url, params, options, context);
    }

    /**
     * @param workflowId - ID du workflow
     * @param context - Contexte d'exécution Coda
     * @returns Réponse de l'API
     */
    async getWorkflow(
        workflowId: string,
        context: coda.ExecutionContext
    ): Promise<any> {
        const baseUrl = this._urlBuilder.buildBaseUrl("getWorkflow");
        const url = this._urlBuilder.replaceUrlParams(baseUrl, { id: workflowId });
        const options = this._httpClient.prepareRequestOptions("getWorkflow");
        
        return this._httpClient.executeRequest(url, options, context);
    }

    /**
     * @param workflowId - ID du workflow
     * @param context - Contexte d'exécution Coda
     * @returns Réponse de l'API
     */
    async deleteWorkflow(
        workflowId: string,
        context: coda.ExecutionContext
    ): Promise<any> {
        const baseUrl = this._urlBuilder.buildBaseUrl("deleteWorkflow");
        const url = this._urlBuilder.replaceUrlParams(baseUrl, { id: workflowId });
        const options = this._httpClient.prepareRequestOptions("deleteWorkflow");
        
        return this._httpClient.executeRequest(url, options, context);
    }

    /**
     * @param workflowId - ID du workflow
     * @param context - Contexte d'exécution Coda
     * @returns Réponse de l'API
     */
    async activateWorkflow(
        workflowId: string,
        context: coda.ExecutionContext
    ): Promise<any> {
        const baseUrl = this._urlBuilder.buildBaseUrl("activateWorkflow");
        const url = this._urlBuilder.replaceUrlParams(baseUrl, { id: workflowId });
        const options = this._httpClient.prepareRequestOptions("activateWorkflow");
        
        return this._httpClient.executeRequest(url, options, context);
    }

    /**
     * @param workflowId - ID du workflow
     * @param context - Contexte d'exécution Coda
     * @returns Réponse de l'API
     */
    async deactivateWorkflow(
        workflowId: string,
        context: coda.ExecutionContext
    ): Promise<any> {
        const baseUrl = this._urlBuilder.buildBaseUrl("deactivateWorkflow");
        const url = this._urlBuilder.replaceUrlParams(baseUrl, { id: workflowId });
        const options = this._httpClient.prepareRequestOptions("deactivateWorkflow");
        
        return this._httpClient.executeRequest(url, options, context);
    }
} 