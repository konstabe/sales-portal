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

export interface ExpectedResponse {
    status: number;
    schema?: object;
    IsSuccess?: boolean;
    ErrorMessage?: string | null;

    inverted?: boolean; // true - схема игнорируется, проверяем обратное:
}


export async function validateResponse(response: APIResponse, expected: ExpectedResponse) {
    const { status, schema, IsSuccess, ErrorMessage, inverted } = expected;

    const actualStatus = response.status();

    if (!inverted) {
        expect.soft(actualStatus, `Response status should be ${status}`).toBe(status);
    } else {
        expect.soft(actualStatus, `Status should NOT be ${status} in inverted check`).not.toBe(status);
    }

    let body: any = null;

    if (schema || inverted || IsSuccess !== undefined || ErrorMessage !== undefined) {
        try {
            body = await response.json();
        } catch (e) {
            expect.soft(false, "Response body is not valid JSON").toBe(true);
            return;
        }
    }

    if (inverted) {
        expect.soft(body?.IsSuccess, "IsSuccess should be false in inverted mode").toBe(false);

        expect.soft(
            typeof body?.ErrorMessage === "string" && body.ErrorMessage.length > 0,
            "ErrorMessage should be non-empty in inverted mode"
        ).toBe(true);

        return;
    }

    if (IsSuccess !== undefined) {
        expect.soft(body?.IsSuccess, `IsSuccess should be ${IsSuccess}`).toBe(IsSuccess);
    }

    if (ErrorMessage !== undefined) {
        expect.soft(
            body?.ErrorMessage,
            `ErrorMessage should be ${ErrorMessage}`
        ).toBe(ErrorMessage);
    }

    if (schema) {
        validateJsonSchema(body, schema);
    }
}


