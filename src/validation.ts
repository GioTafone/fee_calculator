import { z } from "zod";

export const inputFeeSchema = z.object({
  cartValue: z
    .number()
    .positive({ message: "Cart value <cannot be a negative number>" })
    .min(0.01, { message: "Type the amount of the cart value" })
    .multipleOf(0.01, {message: "Partials of € cents non accepted"}),
  distance: z
    .number()
    .positive({ message: "Distance cannot be a negative number" })
    .int({ message: "Only integers numbers are valid" })
    .max(20000, { message: "Distance must be less than 20000 meters (20Km)" }),
  itemsCount: z
    .number()
    .positive({ message: "Number of items cannot be a negative number" })
    .int({ message: "Only integers numbers are valid" })
    .min(1, { message: "Type the amount of items" })
    .max(500, { message: "Number of items must be below 500" }),
  dateAndTime: z
    .date()
    .min(new Date(), {
      message:
        "Cannot deliver in this very moment or in the past just yet, but we are working on it! :)",
    }),
});
