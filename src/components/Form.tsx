import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { inputFeeSchema } from "../validation";
import { FormProps } from "../types";
import {
  maxDeliveryFeeFee,
  freeDeliveryFee,
  distanceFeeIncrementer,
  bulkBaseFee,
  bulkFeeIncrementer,
  extraBulkFeeIncrementer,
  cartValueFreeDelivery,
  smallPurchaseSurcharge,
  longDistanceSurcharge,
  extraBulkFeeSurcharge,
  rushHourFeeIncrementer,
  weekDayRushHourFee,
  startRushHourFee,
  endRushHourFee,
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

  let distanceFee = 2;
  let cartValueFee = 0;
  let bulkFee = 0;
  let rushHourFee = 1;

  const onSubmit: SubmitHandler<ValidationInputFee> = (data) => {
    const inputCartValue = data.cartValue;
    const inputDistance = data.distance;
    const inputItems = data.itemsCount;
    const date = new Date(data.dateAndTime).toUTCString();
    const hour = new Date(data.dateAndTime).getHours();

    if (inputCartValue >= cartValueFreeDelivery) {
      handleFee(freeDeliveryFee);
      return;
    }
    if (inputCartValue < smallPurchaseSurcharge) {
      cartValueFee = smallPurchaseSurcharge - inputCartValue;
    }
    if (inputDistance >= longDistanceSurcharge) {
      distanceFee = Math.ceil(inputDistance / distanceFeeIncrementer);
    }
    if (
      inputItems >= bulkFeeIncrementer &&
      inputItems <= extraBulkFeeIncrementer
    ) {
      bulkFee = (inputItems - bulkFeeIncrementer) / 2 + bulkBaseFee;
    }
    if (inputItems >= extraBulkFeeIncrementer) {
      bulkFee =
        (inputItems - bulkFeeIncrementer) / 2 + bulkBaseFee + extraBulkFeeSurcharge;
    }
    if (
      date.includes(weekDayRushHourFee) &&
      hour >= startRushHourFee &&
      hour <= endRushHourFee
    ) {
      rushHourFee = rushHourFeeIncrementer;
    }

    let total = (cartValueFee + distanceFee + bulkFee) * rushHourFee;

    console.log(`Cart Value Fee: ${cartValueFee}`);
    console.log(`Distance Fee: ${distanceFee}`);
    console.log(`Bulk Fee: ${bulkFee}`);
    console.log(`Rush Hour Fee: x${rushHourFee}`);
    console.log(`Total: ${total}`);

    if (total >= maxDeliveryFeeFee) {
      handleFee(maxDeliveryFeeFee);
      return;
    }

    handleFee(total);
  };

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
