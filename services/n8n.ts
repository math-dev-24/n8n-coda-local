import * as coda from "@codahq/packs-sdk";
import { fetcher } from "./fetch";
import { Method, FetchOptions } from "../types";


export class N8nService {
  constructor(
    private baseUrl: string
  ) {}

  async triggerWorkflow(
    id: string,
    method: Method = 'GET',
    data: any[],
    testMode: boolean,
    context: coda.ExecutionContext
  ): Promise<any> {

    const options: FetchOptions = { method };
    
    if (method !== 'GET' && method !== 'HEAD' && data.length > 0) {
      options.body = JSON.stringify({ items: data });
    }

    const url = testMode ? `${this.baseUrl}/webhook-test/${id}` : `${this.baseUrl}/webhook/${id}`;
    
    const result = await fetcher(
      url,
      options,
      context
    );
    return result;
  }
} 