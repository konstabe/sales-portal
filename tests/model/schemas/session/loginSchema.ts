import { obligatoryFieldsSchema, obligatoryRequredFields } from "../coreSchema";
import { userSchema } from "./userSchema";

export const loginSchema = {
  type: "object",
  properties: {
    User: userSchema,
    ...obligatoryFieldsSchema,
  },
  required: ["User", ...obligatoryRequredFields],
};