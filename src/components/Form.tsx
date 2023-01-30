import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { inputFeeSchema } from "../validation";
import { FormProps } from "../types";

import {
  maxFee,
  freeFee,
  cartValueCap,
  distanceFeeIncrementer,
  bulkFeeIncrementer,
} from "../feeModifiers";

type ValidationInputFee = z.infer<typeof inputFeeSchema>;

function Form({ handleFee }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationInputFee>({
    resolver: zodResolver(inputFeeSchema),
  });
  console.log(errors)

  let distanceFee = 2;
  let cartValueFee = 0;
  let bulkFee = 0;
  let rushHourFee = 1;

  const onSubmit: SubmitHandler<ValidationInputFee> = (data) => {
    const date = new Date(data.dateAndTime).toUTCString();
    const hour = new Date(data.dateAndTime).getHours();

    if (data.cartValue >= 100) {
      handleFee(freeFee);
      return;
    }

    if (data.cartValue < 10) {
      cartValueFee = cartValueCap - data.cartValue;
    }
    if (data.distance >= 1000) {
      distanceFee = Math.ceil(data.distance / distanceFeeIncrementer);
    }
    if (data.itemsCount >= 5 && data.itemsCount <= 12) {
      bulkFee = (data.itemsCount - bulkFeeIncrementer) / 2 + 0.5;
    }
    if (data.itemsCount >= 12) {
      bulkFee = (data.itemsCount - bulkFeeIncrementer) / 2 + 0.5 + 1.2;
    }

    if (date.includes("Fri") && hour >= 15 && hour <= 19) {
      rushHourFee = 1.2;
    }

    let total = (cartValueFee + distanceFee + bulkFee) * rushHourFee;

    console.log(`Cart Value Fee: ${cartValueFee}`);
    console.log(`Distance Fee: ${distanceFee}`);
    console.log(`Bulk Fee: ${bulkFee}`);
    console.log(`Rush Hour Fee: x${rushHourFee}`);
    console.log(`Total: ${total}`);

    if (total >= 15) {
      handleFee(maxFee);
      return;
    }

    handleFee(total);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
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
        </div>
        <div>
          <label htmlFor="dateAntTime">Select date and time of delivery</label>
          <input
            type="datetime-local"
            id="dateAntTime"
            {...register("dateAndTime", { valueAsDate: true })}
          />
        </div>
        {errors.dateAndTime && <span>{errors.dateAndTime.message}</span>}
        <button type="submit">Calculate</button>
      </form>
    </>
  );
}

export default Form;
