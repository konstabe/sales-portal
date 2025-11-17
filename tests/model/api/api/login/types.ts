interface User {
    "_id": string
    "username": string,
    "firstName": string,
    "lastName": string,
    "roles": string[],
    "createdOn": string
}

interface LoginResponse extends BaseResponseBody {
    "User": User
}

interface LoginPayload {
    "username": string,
    "password": string
}
