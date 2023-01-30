import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { inputFeeSchema } from "../validation";
import Form from "../components/Form";
import {
  maxDeliveryFeeFee,
  freeDeliveryFee,
  distanceFeeIncrementer,
  bulkBaseFee,
  bulkFeeIncrementer,
  extraBulkFeeIncrementer,
  extraBulkFeeSurcharge,
  cartValueFreeDelivery,
  smallPurchaseSurcharge,
  longDistanceSurcharge,
  rushHourFeeIncrementer,
  weekDayRushHourFee,
  startRushHourFee,
  endRushHourFee,
} from "../feeDatas";

type ValidationInputFee = z.infer<typeof inputFeeSchema>;

const Main = () => {
  const [fee, setFee] = useState(0);
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
      setFee(freeDeliveryFee);
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
        (inputItems - bulkFeeIncrementer) / 2 +
        bulkBaseFee +
        extraBulkFeeSurcharge;
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
      setFee(maxDeliveryFeeFee);
      return;
    }

    setFee(total);
  };
  return (
    <div>
      <h1>Calculator fee</h1>
      <Form onSubmit={onSubmit} />
      <p>Delivery Fee: {fee.toFixed(2)} €</p>
    </div>
  );
};

export default Main;
