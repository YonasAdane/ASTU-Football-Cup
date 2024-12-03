import {z} from "zod";

export const createPlayerSchema = z.object({
    name: z.string(),
    // avatar:z.string(),
    // club: z.string(),
    position: z.string(), 
    jerseyNumber: z.coerce.number(),
    goals: z.coerce.number(),
    assist:z.coerce.number()
  });
 
export const updatePlayerSchema=createPlayerSchema;