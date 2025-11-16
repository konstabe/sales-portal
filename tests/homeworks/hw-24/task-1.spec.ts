// Написать смоук API тест на логин
//   - создать и проверить схему
//   - проверить статус
//   - проверить наличие токена в хедерах

import test, { expect } from "@playwright/test";
import { apiConfig, STATUS_CODES } from "../../model/api/config";
import dotenv from "dotenv";
import { validateResponse } from "../../model/common/utils";
import { loginSchema } from "../../model/schemas/session/loginSchema";

dotenv.config();

test(`login_api`, {tag:["@api","@smoke"]},async({request})=>{
    const loginResponse = await test.step(`validate schema`, async () => {
        const loginResponse = await request.post(apiConfig.baseURL + apiConfig.endpoints.login, {
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
        
        return loginResponse;
    })

    await test.step(`validate token`, async () => {
        const headers = loginResponse.headers();
        const token = headers["authorization"]!;
        expect(token).toBeTruthy();
    });
});