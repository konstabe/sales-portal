type ProductPayload = Pick<Product, "name" | "amount" | "price" | "manufacturer">;

interface Product {
    "name": string,
    "amount": number,
    "price": number,
    "manufacturer": string,
    "createdOn": string,
    "notes": string,
    "_id": string
}

interface ProductResponse extends BaseResponseBody {
    "Product": Product
}

interface ProductListResponse extends BaseResponseBody {
    "Products": Product[],
}
