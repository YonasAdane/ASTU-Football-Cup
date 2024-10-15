import { z } from 'zod';

export const createMatchSchema = z.object({
    clubOneId:z.string(),
    clubTwoId:z.string(),
    date:z.string().date()
})

export const updateMatchSchema = z.object({
    ClubOne: z.object({
      club: z.string().optional(), 
      score: z.number().optional(),
      lineup: z.array(z.number()).optional(),
      straitLineUp: z.array(z.object({
        player: z.string().optional(), 
        position: z.object({
          Number: z.number().optional(),
          name: z.string().optional(),
        }).optional(),
      })).optional(),
      bench: z.array(z.string()).optional(), 
    }).optional(),
    ClubTwo: z.object({
      club: z.string().optional(),
      score: z.number().optional(),
      lineup: z.array(z.number()).optional(),
      straitLineUp: z.array(z.object({
        player: z.string().optional(),
        position: z.object({
          Number: z.number().optional(),
          name: z.string().optional(),
        }).optional(),
      })).optional(),
      bench: z.array(z.string()).optional(),
    }).optional(),
    date: z.date().optional(),
    status: z.enum(['scheduled', 'ongoing', 'finished']).optional(),
    goals: z.array(z.object({
      club: z.string().optional(),
      player: z.string().optional(),
      time: z.string().optional(),
      assist: z.union([z.string(), z.undefined()]).optional(), // Allow either ObjectId or undefined
    })).optional(),
    cards: z.array(z.object({
      club: z.string().optional(),
      player: z.string().optional(),
      time: z.string().optional(),
      color: z.enum(['red', 'yellow']).optional(),
    })).optional(),
    manOfTheMatch: z.string().optional(),
    comments: z.array(z.object({
      body: z.string().optional(),
      date: z.date().optional(),
    })).optional(),
  });
export const addGoalMatchSchema = z.array(z.object({
        club: z.string().optional(),
        player: z.string().optional(),
        time: z.string().optional(),
        assist: z.union([z.string(), z.undefined()]).optional(), // Allow either ObjectId or undefined
}));
export const addCardSchema=z.array(z.object({
    club: z.string().optional(),
    player: z.string().optional(),
    time: z.string().optional(),
    color: z.enum(['red', 'yellow']).optional(),
  }));
