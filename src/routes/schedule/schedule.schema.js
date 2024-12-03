import z from "zod";
export const createScheduleSchema=z.object({
    matches: z.string(),
    date: z.object({
      begin:z.string(),
      end:z.string()
    }),
    venue: z.string()
})
export const updateScheduleSchema=createScheduleSchema;