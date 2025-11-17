import { APIResponse } from "@playwright/test";
import { ExpectedResponse, validateResponse } from "../common/utils";

export abstract class APICore {
    async validateResponse(response: APIResponse, expected: ExpectedResponse){
        await validateResponse(response, expected);
    }

    async getTypedJson<T>(response: APIResponse): Promise<T> {
        const resp = await response.json();
        return resp as T;
    }
}