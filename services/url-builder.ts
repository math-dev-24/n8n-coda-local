import { URL_CONFIG } from "../types";
import { LIST_URL, type ListNameUrlAvailable } from "../const";
import { QueryParams } from "../types";

export class UrlBuilder {
    constructor(
        private _baseUrl: string,
        private _version: string = "v1"
    ) {
        if (!this._baseUrl || this._baseUrl.trim() === '') {
            throw new Error("Base URL is required and cannot be empty");
        }
    }

    get baseUrl(): string {
        return this._baseUrl;
    }

    /**
     * @param route - Nom de la route
     * @returns URL de base pour une route donnée
     */
    buildBaseUrl(route: ListNameUrlAvailable): string {
        const config: URL_CONFIG = this.getUrlConfig(route);
        return `${this._baseUrl}/api/${this._version}${config.url}`;
    }

    /**
     * @param workflowId - ID du workflow
     * @param mode - Mode de l'URL
     * @returns URL pour un webhook de workflow
     */
    buildWebhookUrl(workflowId: string, mode: "test" | "production"): string {
        if (!workflowId) {
            throw new Error("Workflow ID is required for webhook URLs");
        }

        const path = mode === "test" ? "webhook-test" : "webhook";
        return `${this._baseUrl}/${path}/${workflowId}`;
    }

    /**
     * @param url - URL à nettoyer
     * @param params - Paramètres de la requête
     * @returns URL avec des paramètres de requête
     */
    buildUrlWithParams(url: string, params: QueryParams = {}): string {
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
     * @param url - URL à remplacer
     * @param params - Paramètres de la requête
     * @returns URL avec des paramètres de requête
     */
    replaceUrlParams(url: string, params: Record<string, string>): string {
        let result = url;
        Object.entries(params).forEach(([key, value]) => {
            result = result.replace(`:${key}`, value);
        });
        return result;
    }

    /**
     * @param route - Nom de la route
     * @returns Configuration de la route
     */
    getUrlConfig(route: ListNameUrlAvailable): URL_CONFIG {
        const urlConfig: URL_CONFIG = LIST_URL[route];
        if (!urlConfig) {
            const availableRoutes = Object.keys(LIST_URL).join(', ');
            throw new Error(`URL config for route "${route}" not found. Available routes: ${availableRoutes}`);
        }
        return urlConfig;
    }

    /**
     * @param url - URL à nettoyer
     * @returns URL nettoyée
     */
    private cleanUrl(url: string): string {
        return url.replace(/^@/, '').replace(/\/$/, '').replace(/^\//, '');
    }
} 