import { APIRequestContext } from "@playwright/test";
import { loginSchema } from "../../schemas/session/loginSchema";
import { APICore } from "../apiCore";
import { apiConfig, STATUS_CODES } from "../../config";

export class APILogin extends APICore {
    constructor (private readonly request: APIRequestContext){
        super();
    }
    
    async loginWith(requestData: LoginPayload) {
        console.log(requestData);
        
        const loginResponse = await this.request.post(`${apiConfig.baseURL}${apiConfig.endpoints.login}`, {
            data: requestData,
            headers: {
                "content-type": "application/json",
            },
        });
  
        await this.validateResponse(loginResponse, {
            status: STATUS_CODES.SUCCESS,
            schema: loginSchema,
            IsSuccess: true,
            ErrorMessage: null,
        });
    
        const headers = loginResponse.headers();
        const token = headers["authorization"]!;
    
        return token;
    }
}