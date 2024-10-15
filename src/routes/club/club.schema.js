import { z } from 'zod';

export const createClubSchema = z.object({
    name:z.string(),
    coach:z.string(),
    logo:z.string()
})

export const updateClubScheme=z.object({
    name: z.string(),
        coach: z.string(),
        players: [z.string()],  
        logo:{
          public_id:z.string(),
          url:z.string()
        }  
})
