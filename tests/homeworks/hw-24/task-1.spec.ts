// Написать смоук API тест на логин
//   - создать и проверить схему
//   - проверить статус
//   - проверить наличие токена в хедерах

import { test } from "./common/fixtures";
import dotenv from "dotenv";
import { expect } from "@playwright/test";

dotenv.config();

test(`login_api`, {tag:["@api","@smoke"]},async({APILogin})=>{
    const token = await APILogin.loginWith({
        username: process.env.ADMIN_USER, 
        password: process.env.ADMIN_PASS
    });
    expect(token).toBeTruthy();
});