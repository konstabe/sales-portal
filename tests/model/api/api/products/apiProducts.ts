import { APIRequestContext } from "@playwright/test";
import { APICore } from "../apiCore";
import { createProductSchema, getProductsSchema } from "../../schemas/product/productSchema";
import { apiConfig, STATUS_CODES } from "../../config";
import { createRandomProductData } from "../../common/createProductData";

export class APIProducts extends APICore {
    constructor(private readonly request: APIRequestContext){super()}

    async createProduct(loginToken: string, product:Partial<ProductPayload> = {}, invertValidation: boolean = false) {
        const createProductResponse = await this.request.post(apiConfig.baseURL + apiConfig.endpoints.product.create, {
            data: {...createRandomProductData(),...product},
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${loginToken}`,
            }
        });

        await this.validateResponse(createProductResponse, {
            status: STATUS_CODES.CREATED,
            schema: createProductSchema,
            IsSuccess: true,
            ErrorMessage: null,
            inverted: invertValidation
        });

        return createProductResponse;    
    }

    async getAllProduct(loginToken:string){
        const getAllProductResponse =  await this.request.get(apiConfig.baseURL + apiConfig.endpoints.product.get, {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${loginToken}`,
            }
        });

        await this.validateResponse(getAllProductResponse, {
            status: STATUS_CODES.SUCCESS,
            schema: getProductsSchema,
            IsSuccess: true,
            ErrorMessage: null,
        });

        return getAllProductResponse;
    }

    async deleteProductById(id: string, loginToken: string) {
        const deleteProductResponse = await this.request.delete(apiConfig.baseURL + apiConfig.endpoints.product.delete(id), {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${loginToken}`,
            }
        });

        await this.validateResponse(deleteProductResponse, {
            status: STATUS_CODES.DELETED
        });

        return deleteProductResponse;
    }
}