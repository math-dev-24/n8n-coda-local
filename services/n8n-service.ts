import * as coda from "@codahq/packs-sdk";
import { UrlBuilder } from "./url-builder";
import { HttpClient } from "./http-client";
import { WorkflowService } from "./workflow-service";
import { UserService } from "./user-service";

export class N8nService {
    private _workflowService: WorkflowService;
    private _userService: UserService;
    private _httpClient: HttpClient;

    constructor(baseUrl: string) {
        const urlBuilder = new UrlBuilder(baseUrl);
        this._httpClient = new HttpClient(urlBuilder);
        this._workflowService = new WorkflowService(urlBuilder, this._httpClient);
        this._userService = new UserService(urlBuilder, this._httpClient);
    }

    async triggerWorkflow(
        id: string,
        data: any[],
        testMode: boolean,
        context: coda.ExecutionContext
    ): Promise<any> {
        return this._workflowService.triggerWorkflow(id, data, testMode ? "test" : "production", context);
    }

    async getWorkflows(context: coda.ExecutionContext, cursor: string = ""): Promise<any> {
        return this._workflowService.getWorkflows(context, cursor);
    }

    async getWorkflow(workflowId: string, context: coda.ExecutionContext): Promise<any> {
        return this._workflowService.getWorkflow(workflowId, context);
    }

    async deleteWorkflow(workflowId: string, context: coda.ExecutionContext): Promise<any> {
        return this._workflowService.deleteWorkflow(workflowId, context);
    }

    async activateWorkflow(workflowId: string, context: coda.ExecutionContext): Promise<any> {
        return this._workflowService.activateWorkflow(workflowId, context);
    }

    async deactivateWorkflow(workflowId: string, context: coda.ExecutionContext): Promise<any> {
        return this._workflowService.deactivateWorkflow(workflowId, context);
    }

    // Méthodes d'utilisateur
    async getUsers(
        context: coda.ExecutionContext,
        limit: number = 10,
        includeRole: boolean = false,
        projectId: string = "",
        cursor: string = ""
    ): Promise<any> {
        return this._userService.getUsers(context, limit, includeRole, projectId, cursor);
    }

    async getUser(userId: string, context: coda.ExecutionContext): Promise<any> {
        return this._userService.getUser(userId, context);
    }

    async createUser(email: string, role: string, context: coda.ExecutionContext): Promise<any> {
        return this._userService.createUser(email, role, context);
    }

    async updateUserRole(userId: string, newRoleName: string, context: coda.ExecutionContext): Promise<any> {
        return this._userService.updateUserRole(userId, newRoleName, context);
    }

    async deleteUser(userId: string, context: coda.ExecutionContext): Promise<any> {
        return this._userService.deleteUser(userId, context);
    }

    // Méthodes génériques pour les autres entités
    async getTags(context: coda.ExecutionContext, limit: number = 100, cursor: string = ""): Promise<any> {
        const urlBuilder = new UrlBuilder(this._workflowService.urlBuilder.baseUrl);
        const url = urlBuilder.buildBaseUrl("getTags");
        const options = this._httpClient.prepareRequestOptions("getTags");
        const params = {
            limit: limit.toString(),
            ...(cursor && { cursor })
        };
        
        return this._httpClient.executeRequestWithParams(url, params, options, context);
    }

    async getRoles(context: coda.ExecutionContext, limit: number = 100, cursor: string = ""): Promise<any> {
        const urlBuilder = new UrlBuilder(this._workflowService.urlBuilder.baseUrl);
        const url = urlBuilder.buildBaseUrl("getRoles");
        const options = this._httpClient.prepareRequestOptions("getRoles");
        const params = {
            limit: limit.toString(),
            ...(cursor && { cursor })
        };
        
        return this._httpClient.executeRequestWithParams(url, params, options, context);
    }

    async deleteProject(context: coda.ExecutionContext, projectId: string): Promise<any> {
        const urlBuilder = new UrlBuilder(this._workflowService.urlBuilder.baseUrl);
        const baseUrl = urlBuilder.buildBaseUrl("deleteProject");
        const url = urlBuilder.replaceUrlParams(baseUrl, { id: projectId });
        const options = this._httpClient.prepareRequestOptions("deleteProject");
        
        return this._httpClient.executeRequest(url, options, context);
    }
} 