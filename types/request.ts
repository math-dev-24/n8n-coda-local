import * as coda from "@codahq/packs-sdk";

export interface FetchOptions {
    method?: Method;
    headers?: Record<string, string>;
    body?: any;
}

export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
export const listMethods: Method[] = ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"] as const;

export type QueryParams = Record<string, string | null | boolean | undefined | number>;

export type Mode = "test" | "production";


export type Fetcher = (
    url: string,
    options: FetchOptions,
    context: coda.ExecutionContext
) => Promise<any>;