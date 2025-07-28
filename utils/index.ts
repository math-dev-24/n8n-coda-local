import { ListNameUrlAvailable } from "../const";

/**
 * Types de requêtes disponibles
 */
export enum RequestType {
  WORKFLOW = "workflow",
  USER = "user",
  WORKFLOW_MANAGEMENT = "workflow_management",
  TAG = "tag"
}

/**
 * Détermine le type de requête basé sur la route
 */
export function getRequestType(route: ListNameUrlAvailable): RequestType {
  if (route === "triggerWorkflow") {
    return RequestType.WORKFLOW;
  }
  
  if (route.startsWith("user") || route === "users") {
    return RequestType.USER;
  }
  
  if (route.startsWith("workflow") && route !== "triggerWorkflow") {
    return RequestType.WORKFLOW_MANAGEMENT;
  }
  
  if (route.startsWith("tag")) {
    return RequestType.TAG;
  }
  
  return RequestType.USER; // Par défaut
}

/**
 * Vérifie si une route est un workflow
 */
export function isWorkflowRoute(route: ListNameUrlAvailable): boolean {
  return getRequestType(route) === RequestType.WORKFLOW;
}

/**
 * Vérifie si une route nécessite des paramètres d'URL
 */
export function requiresUrlParams(route: ListNameUrlAvailable): boolean {
  return route.includes(":id") || route.includes(":");
}

/**
 * Vérifie si une route nécessite un body
 */
export function requiresBody(route: ListNameUrlAvailable): boolean {
  const bodyRoutes = ["triggerWorkflow", "createUser", "updateUser", "activateWorkflow", "deactivateWorkflow"];
  return bodyRoutes.includes(route);
}

/**
 * Obtient le nom de la ressource à partir de la route
 */
export function getResourceName(route: ListNameUrlAvailable): string {
  if (route.startsWith("user")) {
    return "user";
  }
  if (route.startsWith("workflow")) {
    return "workflow";
  }
  if (route.startsWith("tag")) {
    return "tag";
  }
  return "unknown";
}