import { validateResponse } from "../../common/utils";
import { loginSchema } from "../../schemas/session/loginSchema";
import { apiConfig, STATUS_CODES } from "../config";
import { APIRequestContext } from "@playwright/test";


export const loginAndReturnToken = async (request: APIRequestContext) => {
    const loginResponse = await request.post(`${apiConfig.baseURL}${apiConfig.endpoints.login}`, {
        data: {
            username: process.env.ADMIN_USER, 
            password: process.env.ADMIN_PASS
        },
        headers: {
            "content-type": "application/json",
        },
    });

    await validateResponse(loginResponse, {
        status: STATUS_CODES.SUCCESS,
        schema: loginSchema,
        IsSuccess: true,
        ErrorMessage: null,
    });

    const headers = loginResponse.headers();
    const token = headers["authorization"]!;

    return token;
}