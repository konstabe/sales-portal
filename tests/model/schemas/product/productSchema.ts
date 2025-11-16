import { obligatoryFieldsSchema, obligatoryRequredFields } from "../coreSchema";
import { productSchema } from "./productItemSchema";

export const createProductSchema = {
	type: "object",
	properties: {
		Product: productSchema,
		...obligatoryFieldsSchema,
	},
	required: ["Product", ...obligatoryRequredFields],
};

export const getProductsSchema = {
	type: "object",
	properties: {
		Products: { 
			type: "array", 
			items: productSchema,
			},     
		...obligatoryFieldsSchema,
	},
	required: ["Products", ...obligatoryRequredFields],
};

export const sortingProductSchema = {
	type: "object",
	properties: {
		sortField: {type: "string"},
		sortOrder: {type: "string"},
	},
	required: ["sortField", "sortOrder"]
};