import * as coda from "@codahq/packs-sdk";
import { UrlBuilder } from "./url-builder";
import { HttpClient } from "./http-client";

export class RoleService {
    constructor(
        private _urlBuilder: UrlBuilder,
        private _httpClient: HttpClient
    ) {}

    get urlBuilder(): UrlBuilder {
        return this._urlBuilder;
    }

    /**
     * @param context - Contexte d'exécution Coda
     * @param limit - Limite du nombre de rôles
     * @param cursor - Cursor de la requête
     * @returns Réponse de l'API
     */
    async getRoles(
        context: coda.ExecutionContext,
        limit: number = 100,
        cursor: string = ""
    ): Promise<any> {
        const url = this._urlBuilder.buildBaseUrl("getRoles");
        const options = this._httpClient.prepareRequestOptions("getRoles");
        const params = {
            limit: limit.toString(),
            ...(cursor && { cursor })
        };
        
        return this._httpClient.executeRequestWithParams(url, params, options, context);
    }

    /**
     * @param roleId - ID du rôle
     * @param context - Contexte d'exécution Coda
     * @returns Réponse de l'API
     */
    async getRole(
        roleId: string,
        context: coda.ExecutionContext
    ): Promise<any> {
        const baseUrl = this._urlBuilder.buildBaseUrl("getRole");
        const url = this._urlBuilder.replaceUrlParams(baseUrl, { id: roleId });
        const options = this._httpClient.prepareRequestOptions("getRole");
        
        return this._httpClient.executeRequest(url, options, context);
    }

    /**
     * @param name - Nom du rôle
     * @param description - Description du rôle
     * @param context - Contexte d'exécution Coda
     * @returns Réponse de l'API
     */
    async createRole(
        name: string,
        description: string,
        context: coda.ExecutionContext
    ): Promise<any> {
        const url = this._urlBuilder.buildBaseUrl("createRole");
        const options = this._httpClient.prepareRequestOptions("createRole", { name, description });
        
        return this._httpClient.executeRequest(url, options, context);
    }

    /**
     * @param roleId - ID du rôle
     * @param name - Nouveau nom du rôle
     * @param description - Nouvelle description du rôle
     * @param context - Contexte d'exécution Coda
     * @returns Réponse de l'API
     */
    async updateRole(
        roleId: string,
        name: string,
        description: string,
        context: coda.ExecutionContext
    ): Promise<any> {
        const baseUrl = this._urlBuilder.buildBaseUrl("updateRole");
        const url = this._urlBuilder.replaceUrlParams(baseUrl, { id: roleId });
        const options = this._httpClient.prepareRequestOptions("updateRole", { name, description });
        
        return this._httpClient.executeRequest(url, options, context);
    }

    /**
     * @param roleId - ID du rôle
     * @param context - Contexte d'exécution Coda
     * @returns Réponse de l'API
     */
    async deleteRole(
        roleId: string,
        context: coda.ExecutionContext
    ): Promise<any> {
        const baseUrl = this._urlBuilder.buildBaseUrl("deleteRole");
        const url = this._urlBuilder.replaceUrlParams(baseUrl, { id: roleId });
        const options = this._httpClient.prepareRequestOptions("deleteRole");
        
        return this._httpClient.executeRequest(url, options, context);
    }

    /**
     * @param roleId - ID du rôle
     * @param permissions - Permissions à assigner au rôle
     * @param context - Contexte d'exécution Coda
     * @returns Réponse de l'API
     */
    async assignPermissionsToRole(
        roleId: string,
        permissions: string[],
        context: coda.ExecutionContext
    ): Promise<any> {
        const baseUrl = this._urlBuilder.buildBaseUrl("assignPermissionsToRole");
        const url = this._urlBuilder.replaceUrlParams(baseUrl, { id: roleId });
        const options = this._httpClient.prepareRequestOptions("assignPermissionsToRole", { permissions });
        
        return this._httpClient.executeRequest(url, options, context);
    }
} 