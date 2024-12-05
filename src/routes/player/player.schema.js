import {z} from "zod";

export const createPlayerSchema = z.object({
    name: z.string(),
    avatar:z.string().optional(),
    // club: z.string(),
    position: z.string(), 
    jerseyNumber: z.coerce.number(),
    goals: z.coerce.number(),
    assist:z.coerce.number(),
    studentId:z.string().length(12),
    
  });
 
export const updatePlayerSchema=z.object({
  name: z.string().optional(),
  position: z.string().optional(), 
  jerseyNumber: z.coerce.number().optional(),
  goals: z.coerce.number().int().optional(),
  assist:z.coerce.number().optional(),
  studentId:z.string().length(12).optional(),
  redCard:z.number().int().nonnegative().optional(),
  yellowCard:z.number().int().nonnegative().optional(),
  club:z.string().optional(),
  status:z.string().optional(),
});