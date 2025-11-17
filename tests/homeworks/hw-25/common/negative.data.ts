export const createProductNegativeData = [
    // name empty / missing
    {
        title: "name_missing",
        checkingValue: {
            manufacturer: "MFG",
            price: 10,
            amount: 5,
            notes: "ok"
        }
    },
    {
        title: "name_empty_string",
        checkingValue: {
            name: "",
            manufacturer: "MFG",
            price: 10,
            amount: 5,
            notes: "ok"
        }
    },

    // too short / too long
    {
        title: "name_less_than_3_chars",
        checkingValue: {
            name: "AB",
            manufacturer: "MFG",
            price: 10,
            amount: 5,
            notes: "ok"
        }
    },
    {
        title: "name_longer_than_40_chars",
        checkingValue: {
            name: "A".repeat(41),
            manufacturer: "MFG",
            price: 10,
            amount: 5,
            notes: "ok"
        }
    },

    // invalid characters
    {
        title: "name_with_special_symbols",
        checkingValue: {
            name: "Name!!!",
            manufacturer: "MFG",
            price: 10,
            amount: 5,
            notes: "ok"
        }
    },
    {
        title: "name_multiple_spaces",
        checkingValue: {
            name: "Bad  Name  Here",
            manufacturer: "MFG",
            price: 10,
            amount: 5,
            notes: "ok"
        }
    },
    {
        title: "name_with_non_alphanumeric",
        checkingValue: {
            name: "Имя123",
            manufacturer: "MFG",
            price: 10,
            amount: 5,
            notes: "ok"
        }
    },
        {
        title: "manufacturer_missing",
        checkingValue: {
            name: "GoodName",
            price: 10,
            amount: 5,
            notes: "ok"
        }
    },
    {
        title: "manufacturer_empty",
        checkingValue: {
            name: "GoodName",
            manufacturer: "",
            price: 10,
            amount: 5,
            notes: "ok"
        }
    },
        {
        title: "price_missing",
        checkingValue: {
            name: "GoodName",
            manufacturer: "MFG",
            amount: 5,
            notes: "ok"
        }
    },
    {
        title: "price_zero",
        checkingValue: {
            name: "GoodName",
            manufacturer: "MFG",
            price: 0,
            amount: 5,
            notes: "ok"
        }
    },
    {
        title: "price_negative",
        checkingValue: {
            name: "GoodName",
            manufacturer: "MFG",
            price: -10,
            amount: 5,
            notes: "ok"
        }
    },
    {
        title: "price_too_large",
        checkingValue: {
            name: "GoodName",
            manufacturer: "MFG",
            price: 100000,
            amount: 5,
            notes: "ok"
        }
    },
    {
        title: "price_non_number",
        checkingValue: {
            name: "GoodName",
            manufacturer: "MFG",
            price: "abc",
            amount: 5,
            notes: "ok"
        }
    },
        {
        title: "amount_missing",
        checkingValue: {
            name: "GoodName",
            manufacturer: "MFG",
            price: 10,
            notes: "ok"
        }
    },
    {
        title: "amount_negative",
        checkingValue: {
            name: "GoodName",
            manufacturer: "MFG",
            price: 10,
            amount: -1,
            notes: "ok"
        }
    },
    {
        title: "amount_too_big",
        checkingValue: {
            name: "GoodName",
            manufacturer: "MFG",
            price: 10,
            amount: 1000,
            notes: "ok"
        }
    },
    {
        title: "amount_non_numeric",
        checkingValue: {
            name: "GoodName",
            manufacturer: "MFG",
            price: 10,
            amount: "aaa",
            notes: "ok"
        }
    },
        {
        title: "notes_too_long",
        checkingValue: {
            name: "GoodName",
            manufacturer: "MFG",
            price: 10,
            amount: 5,
            notes: "A".repeat(251)
        }
    },
    {
        title: "notes_with_html_tags",
        checkingValue: {
            name: "GoodName",
            manufacturer: "MFG",
            price: 10,
            amount: 5,
            notes: "<b>bad</b>"
        }
    },
    {
        title: "notes_with_gt_symbol",
        checkingValue: {
            name: "GoodName",
            manufacturer: "MFG",
            price: 10,
            amount: 5,
            notes: "Invalid > note"
        }
    },
    {
        title: "notes_with_lt_symbol",
        checkingValue: {
            name: "GoodName",
            manufacturer: "MFG",
            price: 10,
            amount: 5,
            notes: "Invalid < note"
        }
    }
];


