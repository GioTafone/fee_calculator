import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { inputFeeSchema } from "../validation";
import { FormProps } from "../types";

type ValidationInputFee = z.infer<typeof inputFeeSchema>;

function Form({ onSubmit }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationInputFee>({
    resolver: zodResolver(inputFeeSchema),
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="cartValue">Cart Value</label>
        <input
          type="number"
          placeholder="Type Amount"
          id="cartValue"
          {...register("cartValue", { valueAsNumber: true })}
        />
        {errors.cartValue && <span>{errors.cartValue.message}</span>}
        <br />
        <label htmlFor="distance">Distance</label>
        <input
          type="number"
          placeholder="Type Distance"
          id="distance"
          {...register("distance", { valueAsNumber: true })}
        />
        {errors.distance && <span>{errors.distance.message}</span>}
        <br />
        <label htmlFor="items">Number of Items</label>
        <input
          type="number"
          placeholder="Type number of items"
          id="items"
          {...register("itemsCount", { valueAsNumber: true })}
        />
        {errors.itemsCount && <span>{errors.itemsCount.message}</span>}
        <br />
        <label htmlFor="dateAntTime">Select date and time of delivery</label>
        <input
          type="datetime-local"
          id="dateAntTime"
          {...register("dateAndTime", { valueAsDate: true })}
        />
        {errors.dateAndTime && <span>{errors.dateAndTime.message}</span>}
        <br />
        <button type="submit">Calculate</button>
      </form>
    </>
  );
}

export default Form;
