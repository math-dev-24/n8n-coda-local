import { Method } from "./request";


export interface URL_CONFIG {
    method: Method,
    url: string,
    body?: Record<string, any>
}