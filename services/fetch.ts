import * as coda from "@codahq/packs-sdk";
import { FetchOptions } from "../types";



export const fetcher = async (
    url: string,
    options: FetchOptions = {},
    context: coda.ExecutionContext
) => {

    const {
        method = 'GET',
        headers = { 'Content-Type': 'application/json' },
        body
    } = options;

    if ((method === 'GET' || method === 'HEAD') && body) {
        throw new coda.UserVisibleError(
            `Cannot send body with ${method} request`
        );
    }

    try {
        const response = await context.fetcher.fetch({
            url,
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        });

        if (response.status >= 400) {
            throw new coda.UserVisibleError(
                `HTTP ${response.status}: Request failed`
            );
        }

        return response.body;
    } catch (error) {
        if (error instanceof coda.UserVisibleError) {
            throw error;
        } else if (error instanceof Error) {
            throw new coda.UserVisibleError(error.message);
        } else {
            throw new coda.UserVisibleError('An unknown error occurred');
        }
    }
};