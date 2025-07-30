import * as coda from "@codahq/packs-sdk";
import { UrlBuilder } from "./url-builder";
import { HttpClient } from "./http-client";

export class ProjectService {
    constructor(
        private _urlBuilder: UrlBuilder,
        private _httpClient: HttpClient
    ) {}

    get urlBuilder(): UrlBuilder {
        return this._urlBuilder;
    }

    /**
     * @param context - Contexte d'exécution Coda
     * @param limit - Limite du nombre de projets
     * @param cursor - Cursor de la requête
     * @returns Réponse de l'API
     */
    async getProjects(
        context: coda.ExecutionContext,
        limit: number = 100,
        cursor: string = ""
    ): Promise<any> {
        const url = this._urlBuilder.buildBaseUrl("getProjects");
        const options = this._httpClient.prepareRequestOptions("getProjects");
        const params = {
            limit: limit.toString(),
            ...(cursor && { cursor })
        };
        
        return this._httpClient.executeRequestWithParams(url, params, options, context);
    }

    /**
     * @param projectId - ID du projet
     * @param context - Contexte d'exécution Coda
     * @returns Réponse de l'API
     */
    async getProject(
        projectId: string,
        context: coda.ExecutionContext
    ): Promise<any> {
        const baseUrl = this._urlBuilder.buildBaseUrl("getProject");
        const url = this._urlBuilder.replaceUrlParams(baseUrl, { id: projectId });
        const options = this._httpClient.prepareRequestOptions("getProject");
        
        return this._httpClient.executeRequest(url, options, context);
    }

    /**
     * @param name - Nom du projet
     * @param description - Description du projet
     * @param context - Contexte d'exécution Coda
     * @returns Réponse de l'API
     */
    async createProject(
        name: string,
        context: coda.ExecutionContext
    ): Promise<any> {
        const url = this._urlBuilder.buildBaseUrl("createProject");
        const options = this._httpClient.prepareRequestOptions("createProject", { name });
        
        return this._httpClient.executeRequest(url, options, context);
    }

    /**
     * @param projectId - ID du projet
     * @param name - Nouveau nom du projet
     * @param description - Nouvelle description du projet
     * @param context - Contexte d'exécution Coda
     * @returns Réponse de l'API
     */
    async updateProject(
        projectId: string,
        name: string,
        description: string,
        context: coda.ExecutionContext
    ): Promise<any> {
        const baseUrl = this._urlBuilder.buildBaseUrl("updateProject");
        const url = this._urlBuilder.replaceUrlParams(baseUrl, { id: projectId });
        const options = this._httpClient.prepareRequestOptions("updateProject", { name, description });
        
        return this._httpClient.executeRequest(url, options, context);
    }

    /**
     * @param projectId - ID du projet
     * @param context - Contexte d'exécution Coda
     * @returns Réponse de l'API
     */
    async deleteProject(
        projectId: string,
        context: coda.ExecutionContext
    ): Promise<any> {
        const baseUrl = this._urlBuilder.buildBaseUrl("deleteProject");
        const url = this._urlBuilder.replaceUrlParams(baseUrl, { id: projectId });
        const options = this._httpClient.prepareRequestOptions("deleteProject");
        
        return this._httpClient.executeRequest(url, options, context);
    }

    /**
     * @param projectId - ID du projet
     * @param userId - ID de l'utilisateur
     * @param role - Rôle de l'utilisateur dans le projet
     * @param context - Contexte d'exécution Coda
     * @returns Réponse de l'API
     */
    async addUserToProject(
        projectId: string,
        userId: string,
        role: string,
        context: coda.ExecutionContext
    ): Promise<any> {
        const baseUrl = this._urlBuilder.buildBaseUrl("addUserToProject");
        const url = this._urlBuilder.replaceUrlParams(baseUrl, { id: projectId });
        const options = this._httpClient.prepareRequestOptions("addUserToProject", { userId, role });
        
        return this._httpClient.executeRequest(url, options, context);
    }

    /**
     * @param projectId - ID du projet
     * @param userId - ID de l'utilisateur
     * @param context - Contexte d'exécution Coda
     * @returns Réponse de l'API
     */
    async removeUserFromProject(
        projectId: string,
        userId: string,
        context: coda.ExecutionContext
    ): Promise<any> {
        const baseUrl = this._urlBuilder.buildBaseUrl("removeUserFromProject");
        const url = this._urlBuilder.replaceUrlParams(baseUrl, { id: projectId });
        const options = this._httpClient.prepareRequestOptions("removeUserFromProject", { userId });
        
        return this._httpClient.executeRequest(url, options, context);
    }

    /**
     * @param projectId - ID du projet
     * @param context - Contexte d'exécution Coda
     * @returns Réponse de l'API
     */
    async getProjectUsers(
        projectId: string,
        context: coda.ExecutionContext
    ): Promise<any> {
        const baseUrl = this._urlBuilder.buildBaseUrl("getProjectUsers");
        const url = this._urlBuilder.replaceUrlParams(baseUrl, { id: projectId });
        const options = this._httpClient.prepareRequestOptions("getProjectUsers");
        
        return this._httpClient.executeRequest(url, options, context);
    }
} 