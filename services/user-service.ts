import * as coda from "@codahq/packs-sdk";
import { UrlBuilder } from "./url-builder";
import { HttpClient } from "./http-client";

export class UserService {
    constructor(
        private _urlBuilder: UrlBuilder,
        private _httpClient: HttpClient
    ) {}

    get urlBuilder(): UrlBuilder {
        return this._urlBuilder;
    }

    /**
     * @param context - Contexte d'exécution Coda
     * @param limit - Limite du nombre d'utilisateurs
     * @param includeRole - Indique si le rôle doit être inclus
     * @param projectId - ID du projet
     * @param cursor - Cursor de la requête
     * @returns Réponse de l'API
     */
    async getUsers(
        context: coda.ExecutionContext,
        limit: number = 10,
        includeRole: boolean = false,
        projectId: string = "",
        cursor: string = ""
    ): Promise<any> {
        const url = this._urlBuilder.buildBaseUrl("getUsers");
        const options = this._httpClient.prepareRequestOptions("getUsers");
        const params = {
            limit: limit.toString(),
            includeRole: includeRole.toString(),
            ...(projectId && { projectId }),
            ...(cursor && { cursor })
        };
        
        return this._httpClient.executeRequestWithParams(url, params, options, context);
    }

    /**
     * @param userId - ID de l'utilisateur
     * @param context - Contexte d'exécution Coda
     * @returns Réponse de l'API
     */
    async getUser(
        userId: string,
        context: coda.ExecutionContext
    ): Promise<any> {
        const baseUrl = this._urlBuilder.buildBaseUrl("getUser");
        const url = this._urlBuilder.replaceUrlParams(baseUrl, { id: userId });
        const options = this._httpClient.prepareRequestOptions("getUser");
        
        return this._httpClient.executeRequest(url, options, context);
    }

    /**
     * @param email - Email de l'utilisateur
     * @param role - Rôle de l'utilisateur
     * @param context - Contexte d'exécution Coda
     * @returns Réponse de l'API
     */
    async createUser(
        email: string,
        role: string,
        context: coda.ExecutionContext
    ): Promise<any> {
        const url = this._urlBuilder.buildBaseUrl("createUser");
        const options = this._httpClient.prepareRequestOptions("createUser", { email, role });
        
        return this._httpClient.executeRequest(url, options, context);
    }

    /**
     * @param userId - ID de l'utilisateur
     * @param newRoleName - Nouveau rôle de l'utilisateur
     * @param context - Contexte d'exécution Coda
     * @returns Réponse de l'API
     */
    async updateUserRole(
        userId: string,
        newRoleName: string,
        context: coda.ExecutionContext
    ): Promise<any> {
        const baseUrl = this._urlBuilder.buildBaseUrl("updateUser");
        const url = this._urlBuilder.replaceUrlParams(baseUrl, { id: userId });
        const options = this._httpClient.prepareRequestOptions("updateUser", { newRoleName });
        
        return this._httpClient.executeRequest(url, options, context);
    }

    /**
     * @param userId - ID de l'utilisateur
     * @param context - Contexte d'exécution Coda
     * @returns Réponse de l'API
     */
    async deleteUser(
        userId: string,
        context: coda.ExecutionContext
    ): Promise<any> {
        const baseUrl = this._urlBuilder.buildBaseUrl("deleteUser");
        const url = this._urlBuilder.replaceUrlParams(baseUrl, { id: userId });
        const options = this._httpClient.prepareRequestOptions("deleteUser");
        
        return this._httpClient.executeRequest(url, options, context);
    }
} 