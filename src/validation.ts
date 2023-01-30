import { z } from 'zod'

export const inputFeeSchema = z.object({
    cartValue: z.number().positive({message: "Cart value must be a positive number"}).min(1, {message: "Insert cart value"}),
    distance: z.number().positive({message: "Distance must be a positive number"}).int({message: "Only integers numbers are valid"}),
    itemsCount: z.number().positive({message: "Number of items must be a positive number"}).int({message: "Only integers numbers are valid"}).min(1, {message: "Insert number of items"}),
    dateAndTime: z.date().min(new Date(), {message: "Cannot deliver in the past just yet, but we are working on it! :)"})
})