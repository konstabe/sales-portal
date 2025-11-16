import { APIResponse } from "@playwright/test";

export async function getTypedJson<T>(response: APIResponse): Promise<T> {
    const resp = await response.json();
    return resp as T;
}