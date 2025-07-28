import { QueryParams } from "../types/request";

export default function buildUrl(baseUrl: string, params: QueryParams = {}): string {
  const url = new URL(baseUrl);
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      url.searchParams.append(key, String(value));
    }
  });
  
  return url.toString();
}