import {z} from "zod";

export const createPlayerSchema = z.object({
    name: z.string(),
    avatar:z.string(),
    club: z.string(),
    position: z.string(), 
    jerseyNumber: z.number(),
    goals: z.number(),
    assist:z.number()
  });
 
export const updatePlayerSchema=createPlayerSchema;