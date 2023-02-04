import { z } from "zod";

export const inputFeeSchema = z.object({
  cartValue: z
    .number()
    .positive({ message: "Cart value must be a positive number" })
    .min(1, { message: "Insert cart value" }),
  distance: z
    .number()
    .positive({ message: "Distance must be a positive number" })
    .int({ message: "Only integers numbers are valid" })
    .max(20000, { message: "Distance must be less than 20000 meters (20Km)" }),
  itemsCount: z
    .number()
    .positive({ message: "Number of items must be a positive number" })
    .int({ message: "Only integers numbers are valid" })
    .min(1, { message: "Insert number of items" })
    .max(500, { message: "Number of items must be below 500" }),
  dateAndTime: z
    .date()
    .min(new Date(), {
      message:
        "Cannot deliver in this very moment or in the past just yet, but we are working on it! :)",
    }),
});
