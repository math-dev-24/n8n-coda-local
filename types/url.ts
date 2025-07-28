import { Method } from "./request";


export interface URL_CONFIG {
    method: Method,
    url: string,
    params?: record[];
    body?: record[];
}

export interface record {
    id: string;
    type: "string" | "number" | "boolean" | "array" | "object";
}