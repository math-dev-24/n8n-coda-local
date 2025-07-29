import * as coda from "@codahq/packs-sdk";
import { QueryParams } from "../types";
import { UrlService } from "./url";

export class N8nService {
  constructor(private urlService: UrlService) {}

  /**
   * Déclenche un workflow n8n
   * @param id - ID du workflow
   * @param data - Données à envoyer au workflow
   * @param testMode - Mode test ou production
   * @param context - Contexte d'exécution Coda
   */
  async triggerWorkflow(
    id: string,
    data: any[],
    testMode: boolean,
    context: coda.ExecutionContext
  ): Promise<any> {
    if (this.urlService.options.method !== "GET" && 
        this.urlService.options.method !== "HEAD" && 
        data.length > 0) {
      this.urlService.options.body = JSON.stringify({ items: data });
    }
    return this.urlService.executeRequest(context, testMode ? "test" : "production");
  }

  /**
   * Récupère la liste des utilisateurs
   * @param context - Contexte d'exécution Coda
   * @param limit - Limite du nombre d'utilisateurs
   * @param includeRole - Inclure les rôles
   * @param projectId - ID du projet
   * @param cursor - Cursor de la requête
   */
  async getUsers(
    context: coda.ExecutionContext,
    limit: number = 10,
    includeRole: boolean = false,
    projectId: string = "",
    cursor: string = ""
  ): Promise<any> {
    return this.urlService.executeRequestWithParams(context, {
      limit: limit.toString(),
      includeRole: includeRole.toString(),
      projectId: projectId,
      cursor: cursor,
    } as QueryParams);
  }

  /**
   * Récupère la liste des workflows
   * @param context - Contexte d'exécution Coda
   * @param cursor - Cursor de la requête
   */
  async getWorkflows(context: coda.ExecutionContext, cursor: string = ""): Promise<any> {
    return this.urlService.executeRequestWithParams(context, {
      cursor: cursor,
    });
  }

  /**
   * Méthode générique pour exécuter des requêtes selon le type
   * @param context - Contexte d'exécution Coda
   * @param params - Paramètres optionnels
   * @param mode - Mode pour les workflows (test/production)
   */
  async executeRequest(
    context: coda.ExecutionContext,
    params: QueryParams = {},
    mode: "test" | "production" = "production"
  ): Promise<any> {
    if (this.urlService.isWorkflowRoute()) {  
      return this.urlService.executeRequest(context, mode);
    } else if (Object.keys(params).length > 0) {
      return this.urlService.executeRequestWithParams(context, params);
    } else {
      return this.urlService.executeRequest(context);
    }
  }

  /**
   * Récupère la liste des tags
   * @param context - Contexte d'exécution Coda
   * @param limit - Limite du nombre de tags
   * @param cursor - Cursor de la requête
   */
  async getTags(context: coda.ExecutionContext, limit: number = 100, cursor: string = ""): Promise<any> {
    return this.urlService.executeRequestWithParams(context, {
      limit: limit,
      cursor: cursor,
    });
  }

  /**
   * Récupère la liste des rôles
   * @param context - Contexte d'exécution Coda
   * @param limit - Limite du nombre de rôles
   * @param cursor - Cursor de la requête
   */
  async getRoles(context: coda.ExecutionContext, limit: number = 100, cursor: string = ""): Promise<any> {
    return this.urlService.executeRequestWithParams(context, {
      limit: limit,
      cursor: cursor,
    });
  }

  /**
   * Supprime un projet
   * @param context - Contexte d'exécution Coda
   * @param projectId - ID du projet
   */
  async deleteProject(context: coda.ExecutionContext, projectId: string): Promise<any> {
    return this.urlService.executeRequestWithParams(context, { id: projectId });
  }
}
