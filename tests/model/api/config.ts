import dotenv from "dotenv";
dotenv.config();

export const apiConfig = {
    baseURL: "http://localhost:8686",
    endpoints: {
        login: "/api/login",
        product: {
            create: "/api/products",
            get: "/api/products"
        }
    },
};

export enum STATUS_CODES {
    SUCCESS = 200,
    CREATED = 201
}