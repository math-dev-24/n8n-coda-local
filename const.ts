import { URL_CONFIG } from "./types";

export const LIST_URL: Record<string, URL_CONFIG> = {
    // Webhook
    triggerWorkflow: {
        method: "POST",
        url: "/webhook",
    },
    // User
    getUsers: {
        method: "GET",
        url: "/users"
    },
    createUser: {
        method: "POST",
        url: "/users",
        body: [
            {
                id: "email",
                type: "string",
            },
            {
                id: "role",
                type: "string",
            },
        ],
    },
    deleteUser: {
        method: "DELETE",
        url: "/users/:id",
        params: [
            {
                id: "id",
                type: "string",
            },
        ],
    },
    updateUserRole: {
        method: "PUT",
        url: "/users/:id/role",
        params: [
            {
                id: "id",
                type: "string",
            },
        ],
        body: [
            {
                id: "newRoleName",
                type: "string",
            },
        ],
    },

    // Workflow
    getWorkflows: {
        method: "GET",
        url: "/workflows",
    },
    deleteWorkflow: {
        method: "DELETE",
        url: "/workflows/:id",
        params: [
            {
                id: "id",
                type: "string",
            },
        ],
    },
    getWorkflow: {
        method: "GET",
        url: "/workflows/:id",
        params: [
            {
                id: "id",
                type: "string",
            },
        ],
    },
    activateWorkflow: {
        method: "POST",
        url: "/workflows/:id/activate",
        params: [
            {
                id: "id",
                type: "string",
            },
        ],
    },
    deactivateWorkflow: {
        method: "POST",
        url: "/workflows/:id/deactivate",
        params: [
            {
                id: "id",
                type: "string",
            },
        ],
    },

    // Tag
    getTags: {
        method: "GET",
        url: "/tags",
    },
    createTag: {
        method: "POST",
        url: "/tags",
        body: [
            {
                id: "name",
                type: "string",
            },
        ],
    },
    getTag: {
        method: "GET",
        url: "/tags/:id",
        params: [
            {
                id: "id",
                type: "string",
            },
        ],
    },
    deleteTag: {
        method: "DELETE",
        url: "/tags/:id",
        params: [
            {
                id: "id",
                type: "string",
            },
        ],
    },
    updateTag: {
        method: "PUT",
        url: "/tags/:id",
        params: [
            {
                id: "id",
                type: "string",
            },
        ],
        body: [
            {
                id: "name",
                type: "string",
            },
        ],
    },

    // Variable
    getVariables: {
        method: "GET",
        url: "/variables",
    },
    createVariable: {
        method: "POST",
        url: "/variables",
        body: [
            {
                id: "key",
                type: "string",
            },
            {
                id: "value",
                type: "string",
            },
        ],
    },
    getVariable: {
        method: "GET",
        url: "/variables/:id",
        params: [
            {
                id: "id",
                type: "string",
            },
        ],
    },
    deleteVariable: {
        method: "DELETE",
        url: "/variables/:id",
        params: [
            {
                id: "id",
                type: "string",
            },
        ],
    },

    // Project
    getProjects: {
        method: "GET",
        url: "/projects",
    },
    getProject: {
        method: "GET",
        url: "/projects/:id",
        params: [
            {
                id: "id",
                type: "string",
            },
        ],
    },
    deleteProject: {
        method: "DELETE",
        url: "/projects/:id",
        params: [
            {
                id: "id",
                type: "string",
            },
        ],
    },
}

export type ListNameUrlAvailable = keyof typeof LIST_URL;