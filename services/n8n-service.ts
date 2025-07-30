import * as coda from "@codahq/packs-sdk";
import { UrlBuilder } from "./url-builder";
import { HttpClient } from "./http-client";
import { WorkflowService } from "./workflow-service";
import { UserService } from "./user-service";
import { TagService } from "./tag-service";
import { RoleService } from "./role-service";
import { ProjectService } from "./project-service";
import { Method } from "../types";

export class N8nService {
    private _workflowService: WorkflowService;
    private _userService: UserService;
    private _tagService: TagService;
    private _roleService: RoleService;
    private _projectService: ProjectService;
    private _httpClient: HttpClient;

    constructor(baseUrl: string) {
        const urlBuilder = new UrlBuilder(baseUrl);
        this._httpClient = new HttpClient(urlBuilder);
        this._workflowService = new WorkflowService(urlBuilder, this._httpClient);
        this._userService = new UserService(urlBuilder, this._httpClient);
        this._tagService = new TagService(urlBuilder, this._httpClient);
        this._roleService = new RoleService(urlBuilder, this._httpClient);
        this._projectService = new ProjectService(urlBuilder, this._httpClient);
    }

    async triggerWorkflow(
        id: string,
        data: any[],
        testMode: boolean,
        method: Method,
        context: coda.ExecutionContext
    ): Promise<any> {
        return this._workflowService.triggerWorkflow(id, data, testMode ? "test" : "production", method, context);
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

    // Méthodes de tags
    async getTags(context: coda.ExecutionContext, limit: number = 100, cursor: string = ""): Promise<any> {
        return this._tagService.getTags(context, limit, cursor);
    }

    async getTag(tagId: string, context: coda.ExecutionContext): Promise<any> {
        return this._tagService.getTag(tagId, context);
    }

    async createTag(name: string, context: coda.ExecutionContext): Promise<any> {
        return this._tagService.createTag(name, context);
    }

    async updateTag(tagId: string, name: string, context: coda.ExecutionContext): Promise<any> {
        return this._tagService.updateTag(tagId, name, context);
    }

    async deleteTag(tagId: string, context: coda.ExecutionContext): Promise<any> {
        return this._tagService.deleteTag(tagId, context);
    }

    // Méthodes de rôles
    async getRoles(context: coda.ExecutionContext, limit: number = 100, cursor: string = ""): Promise<any> {
        return this._roleService.getRoles(context, limit, cursor);
    }

    async getRole(roleId: string, context: coda.ExecutionContext): Promise<any> {
        return this._roleService.getRole(roleId, context);
    }

    async createRole(name: string, description: string, context: coda.ExecutionContext): Promise<any> {
        return this._roleService.createRole(name, description, context);
    }

    async updateRole(roleId: string, name: string, description: string, context: coda.ExecutionContext): Promise<any> {
        return this._roleService.updateRole(roleId, name, description, context);
    }

    async deleteRole(roleId: string, context: coda.ExecutionContext): Promise<any> {
        return this._roleService.deleteRole(roleId, context);
    }

    async assignPermissionsToRole(roleId: string, permissions: string[], context: coda.ExecutionContext): Promise<any> {
        return this._roleService.assignPermissionsToRole(roleId, permissions, context);
    }

    // Méthodes de projets
    async getProjects(context: coda.ExecutionContext, limit: number = 100, cursor: string = ""): Promise<any> {
        return this._projectService.getProjects(context, limit, cursor);
    }

    async getProject(projectId: string, context: coda.ExecutionContext): Promise<any> {
        return this._projectService.getProject(projectId, context);
    }

    async createProject(name: string, context: coda.ExecutionContext): Promise<any> {
        return this._projectService.createProject(name, context);
    }

    async updateProject(projectId: string, name: string, description: string, context: coda.ExecutionContext): Promise<any> {
        return this._projectService.updateProject(projectId, name, description, context);
    }

    async deleteProject(projectId: string, context: coda.ExecutionContext): Promise<any> {
        return this._projectService.deleteProject(projectId, context);
    }

    async addUserToProject(projectId: string, userId: string, role: string, context: coda.ExecutionContext): Promise<any> {
        return this._projectService.addUserToProject(projectId, userId, role, context);
    }

    async removeUserFromProject(projectId: string, userId: string, context: coda.ExecutionContext): Promise<any> {
        return this._projectService.removeUserFromProject(projectId, userId, context);
    }

    async getProjectUsers(projectId: string, context: coda.ExecutionContext): Promise<any> {
        return this._projectService.getProjectUsers(projectId, context);
    }
} 