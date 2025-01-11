import {z} from "zod";
export const AccountSchema =  z.object ({
    name : z.string().min(3, "name is required"),
    type:z.enum(["CURRENT", "SAVINGS"]),
    balance:z.string().min(1, "initial balance is required"),
    isDefualt:z.boolean().default(false),
});