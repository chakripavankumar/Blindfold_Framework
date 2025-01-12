import {z}  from "zod"

export const createAccountSchema=z.object ({
    username:  z.string().min(3, "name is requied").max(20),
    password:  z.string().min(8, "minumum lenght should  be more than 8 characters").max(20),
    name:z.string().min(3, "name is requied").max(20),
})

export const SigninSchema = z.object({
    username:  z.string().min(3, "name is requied").max(20),
    password:  z.string(),
})
export const CreateRoomSchema = z.object({
    name: z.string().min(3).max(20),
})
