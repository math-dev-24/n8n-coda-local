import * as coda from "@codahq/packs-sdk";
import { FetchOptions, Fetcher } from "../types";

export const fetcher: Fetcher = async (
    url: string,
    options: FetchOptions,
    context: coda.ExecutionContext
): Promise<any> => {

    try {
        const response = await context.fetcher.fetch({
            url: url.toString(),
            method: options.method,
            headers: options.headers,
            body: options.body ? JSON.stringify(options.body) : undefined,
        });

        if (response.status >= 400) {
            throw new coda.UserVisibleError(
                `HTTP ${response.status}: Request failed`
            );
        }

        return response.body;
    } catch (error) {
        if(coda.StatusCodeError.isStatusCodeError(error)) {
            throw new coda.UserVisibleError(error.message);
        }
        throw new Error(error);
    }
};