import { z } from "zod"

export const createScoreboardSchema=z.object({
    clubId:z.string()
})
export const updateScoreboardSchema=z.object({
matchesPlayed:z.number(),
wins:z.number(),
draws:z.number(),
losses:z.number(),
goalsFor:z.number(),
goalsAgainst:z.number(),
goalDifference:z.number(),
points:z.number(),
})
