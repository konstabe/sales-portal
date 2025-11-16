import { APIResponse, expect } from "@playwright/test";
import Ajv from "ajv";

const ajv = new Ajv();  

export function validateJsonSchema(body: unknown, schema: object) {
    const validate = ajv.compile(schema);
    const isValid = validate(body);

    if (!isValid) {
        console.error("JSON schema validation failed:");
        console.error(validate.errors);

        expect.soft(isValid, `Response ${JSON.stringify(body)} does NOT match JSON schema`).toBe(true);
    } else {
        console.log("JSON schema is valid");
    }

    return isValid;
}

interface ExpectedResponse {
    status: number;
    schema?: object;
    IsSuccess?: boolean;
    ErrorMessage?: string | null;
}

export async function validateResponse(response: APIResponse, expected: ExpectedResponse) {
    expect.soft(response.status(),`Response status should be ${expected.status}`).toBe(expected.status);

    let body: any;
    try {
        body = await response.json();
    } catch (e) {
        expect.soft(false, "Response body is not valid JSON").toBe(true);
        return;
    }

    if (expected.schema) {
        validateJsonSchema(body, expected.schema);
    }

    if (expected.IsSuccess !== undefined) {
        expect.soft(body?.IsSuccess,`IsSuccess should be ${expected.IsSuccess}`).toBe(expected.IsSuccess);
    }

    if (expected.ErrorMessage !== undefined) {
        expect.soft(body?.ErrorMessage,`ErrorMessage should be ${expected.ErrorMessage}`).toBe(expected.ErrorMessage);
    }

    return body;
}

