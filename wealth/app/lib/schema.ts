import {z} from "zod";
export const AccountSchema =  z.object ({
    name : z.string().min(3, "name is required"),
    type:z.enum(["CURRENT", "SAVINGS"]),
    balance: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid balance format"),
    isDefault:z.boolean().default(false),
});