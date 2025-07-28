import { URL_CONFIG } from "./types";

export const LIST_URL: Record<string, URL_CONFIG> = {
    triggerWorkflow: {
        method: "POST",
        url: "/webhook",
    },
    getUsers: {
        method: "GET",
        url: "/users",
    },
    createUser: {
        method: "POST",
        url: "/users",
    },
    getUser: {
        method: "GET",
        url: "/users/:id",
    },
    updateUser: {
        method: "PUT",
        url: "/users/:id",
    },
    getWorkflows: {
        method: "GET",
        url: "/workflows",
    },
    deleteWorkflow: {
        method: "DELETE",
        url: "/workflows/:id",
    },
    getWorkflow: {
        method: "GET",
        url: "/workflows/:id",
    },
    activateWorkflow: {
        method: "POST",
        url: "/workflows/:id/activate",
    },
    deactivateWorkflow: {
        method: "POST",
        url: "/workflows/:id/deactivate",
    },
    getTags: {
        method: "GET",
        url: "/tags",
    }
}

export type ListNameUrlAvailable = keyof typeof LIST_URL;