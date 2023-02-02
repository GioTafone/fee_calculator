import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { inputFeeSchema } from "../validation";
import Form from "../components/Form";
import * as feeModifiers from "../feeModifiers";

type ValidationInputFee = z.infer<typeof inputFeeSchema>;

const Main = () => {
  const [fee, setFee] = useState(0);
  const [message, setMessage] = useState(false)
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

    if (inputCartValue >= feeModifiers.cartValueFreeDelivery) {
      setFee(feeModifiers.freeDeliveryFee);
      setMessage(true)
      return;
    }
    if (inputCartValue < feeModifiers.smallPurchaseSurcharge) {
      cartValueFee = feeModifiers.smallPurchaseSurcharge - inputCartValue;
    }
    if (inputDistance >= feeModifiers.longDistanceSurcharge) {
      distanceFee = Math.ceil(
        inputDistance / feeModifiers.distanceFeeIncrementer
      );
    }
    if (
      inputItems >= feeModifiers.bulkFeeIncrementer &&
      inputItems <= feeModifiers.extraBulkFeeIncrementer
    ) {
      bulkFee =
        (inputItems - feeModifiers.bulkFeeIncrementer) / 2 +
        feeModifiers.bulkBaseFee;
    }
    if (inputItems >= feeModifiers.extraBulkFeeIncrementer) {
      bulkFee =
        (inputItems - feeModifiers.bulkFeeIncrementer) / 2 +
        feeModifiers.bulkBaseFee +
        feeModifiers.extraBulkFeeSurcharge;
    }
    if (
      date.includes(feeModifiers.weekDayRushHourFee) &&
      hour >= feeModifiers.startRushHourFee &&
      hour <= feeModifiers.endRushHourFee
    ) {
      rushHourFee = feeModifiers.rushHourFeeIncrementer;
    }

    let total = (cartValueFee + distanceFee + bulkFee) * rushHourFee;

    console.log(`Cart Value Fee: ${cartValueFee}`);
    console.log(`Distance Fee: ${distanceFee}`);
    console.log(`Bulk Fee: ${bulkFee}`);
    console.log(`Rush Hour Fee: x${rushHourFee}`);
    console.log(`Total: ${total}`);

    if (total >= feeModifiers.maxDeliveryFeeFee) {
      setFee(feeModifiers.maxDeliveryFeeFee);
      return;
    }

    setFee(total);
  };
  
  return (
    <div className="border-4 rounded-2xl bg-primaryWhite lg:col-span-4">
      <h4 className="border-b-2 border-b-primaryGreen font-bold text-2xl text-center mx-7 py-5">
        Calculator fee
      </h4>
      <Form onSubmit={onSubmit} />
      <p className="border-t-2 border-t-primaryGreen text-center mx-7 py-5">
        Delivery Fee:{" "}
        {message ? <span className="font-bold">FREE</span> : <span className="font-bold">{fee.toFixed(2)} €</span>}
      </p>
    </div>
  );
};

export default Main;
