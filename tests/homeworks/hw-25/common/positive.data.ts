import { MANUFACTURERS } from "../../../model/api/common/manufactures";
import { CreateProductCase } from "./types";

export const createProductValidData: CreateProductCase[] = [
    {
        title: "valid_minimal_values",
        checkingValue: {
            name: "ABC",
            manufacturer: MANUFACTURERS.APPLE,
            price: 1,
            amount: 0,
            notes: ""
        }
    },
    {
        title: "valid_max_values",
        checkingValue: {
            name: "ABCDEFGHIJKLMNOPQRSTUVWXYZ12345678901234", // 40 chars
            manufacturer: MANUFACTURERS.SAMSUNG,
            price: 99999,
            amount: 999,
            notes: ""
        }
    },
    {
        title: "valid_name_with_single_space",
        checkingValue: {
            name: "Super Product",
            manufacturer: MANUFACTURERS.GOOGLE,
            price: 500,
            amount: 10,
            notes: ""
        }
    },
    {
        title: "valid_random_alphanumerical_name",
        checkingValue: {
            name: "X1A2B3",
            manufacturer: MANUFACTURERS.MICROSOFT,
            price: 49,
            amount: 5,
            notes: ""
        }
    },
    {
        title: "valid_medium_values",
        checkingValue: {
            name: "Product123",
            manufacturer: MANUFACTURERS.SONY,
            price: 100,
            amount: 50,
            notes: ""
        }
    },
    {
        title: "valid_edge_name_3chars",
        checkingValue: {
            name: "P1Q",    // min length
            manufacturer: MANUFACTURERS.XIAOMI,
            price: 250,
            amount: 1,
            notes: ""
        }
    },
    {
        title: "valid_tesla_combo",
        checkingValue: {
            name: "TESLA123",
            manufacturer: MANUFACTURERS.TESLA,
            price: 999,
            amount: 10,
            notes: "Electric vibes"
        }
    },
    {
        title: "valid_amazon_note",
        checkingValue: {
            name: "AmazonItem41",
            manufacturer: MANUFACTURERS.AMAZON,
            price: 199,
            amount: 2,
            notes: "Safe note without HTML"
        }
    }
];