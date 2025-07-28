import * as coda from "@codahq/packs-sdk";
import { FetchOptions, Method, Mode, QueryParams, URL_CONFIG } from "../types";
import { LIST_URL, type ListNameUrlAvailable } from "../const";
import { fetcher } from "./fetch";

export class UrlService {
    /**
     * @param baseUrl - URL de base
     * @param route - Route de l'URL
     * @param workflowId - ID du workflow
     * @param options - Options de la requête
     * @param params - Paramètres de la requête
     */
    constructor(
        private baseUrl: string,
        private route: ListNameUrlAvailable,
        private workflowId?: string,
        public options?: FetchOptions,
        public params?: QueryParams
    ) {
        if (!this.baseUrl || this.baseUrl.trim() === '') {
            throw new Error("Base URL is required and cannot be empty");
        }
        if (!this.route) {
            throw new Error("Route is required");
        }

        const config = this.getUrlConfig();
        this.options = { method: config.method as Method };
        this.params = {};
    }

    /**
     * @param mode - Mode de test ou production
     * @returns L'URL avec l'ID du workflow
     */
    public getUrlWithWorkflowId(mode: "test" | "production"): string {
        let url = `${this.baseUrl}/webhook/${this.workflowId}`;
        if (mode === "test") {
            url = `${this.baseUrl}/webhook-test/${this.workflowId}`;
        }
        return url;
    }

    /**
     * @returns L'URL avec les paramètres
     */
    public getUrl(): string {
        const config = this.getUrlConfig();
        return `${this.baseUrl}/api/v1${config.url}`;
    }
    
    public buildUrl(url: string, params: QueryParams = {}): string {
        try {
            const cleanUrl = this.cleanUrl(url);
            
            const validParams = Object.entries(params)
                .filter(([_, value]) => value !== undefined && value !== null && value !== "")
                .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
            
            if (validParams.length === 0) {
                return cleanUrl;
            }
            
            const separator = cleanUrl.includes('?') ? '&' : '?';
            return `${cleanUrl}${separator}${validParams.join('&')}`;
        } catch (error) {
            throw new Error(`Invalid URL: ${url}. Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    /**
     * Vérifie si la route est une route de workflow
     * @returns true si la route est une route de workflow, false sinon
     */
    public isWorkflowRoute(): boolean {
        return this.route === "triggerWorkflow" && this.workflowId !== undefined;
    }

    /**
     * Exécute la requête
     * @param context - Contexte d'exécution Coda
     * @param mode - Mode de test ou production
     * @returns La réponse de la requête
     */
    public async executeRequest(context: coda.ExecutionContext, mode: Mode = "production"): Promise<any> {
        if (this.isWorkflowRoute()) {
            return this.executeWorkflowRequest(context, mode);
        }
        return this.executeStandardRequest(context);
    }

    /**
     * Exécute la requête avec les paramètres
     * @param context - Contexte d'exécution Coda
     * @param params - Paramètres de la requête
     * @returns La réponse de la requête
     */
    public async executeRequestWithParams(context: coda.ExecutionContext, params: QueryParams = {}): Promise<any> {
        const url = this.buildUrl(this.getUrl(), params);
        return fetcher(url, this.options, context);
    }

    /**
     * Exécute la requête
     * @param context - Contexte d'exécution Coda
     * @returns La réponse de la requête
     */
    goFetch(context: coda.ExecutionContext): Promise<any> {
        return this.executeRequest(context);
    }

    /**
     * Exécute la requête de workflow
     * @param context - Contexte d'exécution Coda
     * @param mode - Mode de test ou production
     * @returns La réponse de la requête
     */
    goFetchWorkflow(context: coda.ExecutionContext, mode: Mode): Promise<any> {
        return this.executeWorkflowRequest(context, mode);
    }

    /**
     * @returns La configuration de l'URL
     */
    private getUrlConfig(): URL_CONFIG {
        if (!this.route) {
            throw new Error("Route is not defined");
        }
        
        const urlConfig = LIST_URL[this.route];
        if (!urlConfig) {
            const availableRoutes = Object.keys(LIST_URL).join(', ');
            throw new Error(`URL config for route "${this.route}" not found. Available routes: ${availableRoutes}`);
        }
        return urlConfig;
    }

    /**
     * @param context - Contexte d'exécution Coda
     * @param mode - Mode de test ou production
     * @returns La réponse de la requête
     */
    private async executeWorkflowRequest(context: coda.ExecutionContext, mode: Mode): Promise<any> {
        const url = this.getUrlWithWorkflowId(mode);
        return fetcher(url, this.options, context);
    }

    /**
     * @param context - Contexte d'exécution Coda
     * @returns La réponse de la requête
     */
    private async executeStandardRequest(context: coda.ExecutionContext): Promise<any> {
        return fetcher(this.buildUrl(this.getUrl()), this.options, context);
    }

    /**
     * @param url - URL à nettoyer
     * @returns L'URL nettoyée
     */
    private cleanUrl(url: string): string {
        return url.replace(/^@/, '').replace(/\/$/, '').replace(/^\//, '');
    }
}