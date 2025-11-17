import { faker } from "@faker-js/faker";
import { MANUFACTURERS } from "./manufactures";

const getRandomManufacture = () => {
    const values = Object.values(MANUFACTURERS);
    const manufacturer = values[Math.floor(Math.random() * values.length)];
    return manufacturer;
}

export const createRandomProductData = () => {
    return {
        name: faker.food.fruit() + Math.random().toString(36).substring(2, 6),
        price: Number(faker.finance.amount({dec:0})),
        amount: Number(faker.finance.amount({max:10, dec: 0})),
        manufacturer: getRandomManufacture(),
        notes: ""
    }
}
