import { z } from "zod";
export const LoginSchema=z.object({
    email:z.string(),
    password:z.string()
})
export const RegisterSchema=z.object({
    name:z.string(),
    email:z.string(),
    password:z.string()
})