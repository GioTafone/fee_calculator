import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";

import Form from "../components/Form";
import { MainProps } from "../types";
import { inputFeeSchema } from "../validation";
import { feeModifier } from "../feeModifiers";
import { setUpValue } from "../setUpValue";

type ValidationInputFee = z.infer<typeof inputFeeSchema>;

const Main = ({ initialValue }: MainProps) => {
  const [fee, setFee] = useState(initialValue);

  let distanceFee = setUpValue.distanceFee;
  let cartValueFee = setUpValue.cartValueFee;
  let bulkFee = setUpValue.cartValueFee;
  let rushHourFee = setUpValue.rushHourFee;

  const onSubmit: SubmitHandler<ValidationInputFee> = (data) => {
    const inputCartValue = data.cartValue;
    const inputDistance = data.distance;
    const inputItems = data.itemsCount;
    const date = new Date(data.dateAndTime).toUTCString();
    const hour = new Date(data.dateAndTime).getHours();

    if (inputCartValue >= feeModifier.cartValueFreeDelivery) {
      setFee(feeModifier.freeDeliveryFee);
      return;
    }
    if (inputCartValue <= feeModifier.smallPurchaseSurcharge) {
      cartValueFee = feeModifier.smallPurchaseSurcharge - inputCartValue;
    }
    if (inputDistance >= feeModifier.longDistanceSurcharge) {
      distanceFee = Math.ceil(
        inputDistance / feeModifier.distanceFeeIncrementer
      );
    }
    if (
      inputItems >= feeModifier.bulkFeeIncrementer &&
      inputItems <= feeModifier.extraBulkFeeIncrementer
    ) {
      bulkFee =
        (inputItems - feeModifier.bulkFeeIncrementer) / 2 +
        feeModifier.bulkBaseFee;
    }
    if (inputItems >= feeModifier.extraBulkFeeIncrementer) {
      bulkFee =
        (inputItems - feeModifier.bulkFeeIncrementer) / 2 +
        feeModifier.bulkBaseFee +
        feeModifier.extraBulkFeeSurcharge;
    }

    feeModifier.rushHourWeekDays.map((day) => {
      if (
        date.includes(day) &&
        hour >= feeModifier.startRushHourFee &&
        hour <= feeModifier.endRushHourFee
      ) {
        rushHourFee = feeModifier.rushHourFeeIncrementer;
      }
      return rushHourFee;
    });

    let total = (cartValueFee + distanceFee + bulkFee) * rushHourFee;

    // ------ The following show the results of every input ------
    console.log(`Cart Value Fee: ${cartValueFee}`);
    console.log(`Distance Fee: ${distanceFee}`);
    console.log(`Bulk Fee: ${bulkFee}`);
    console.log(`Rush Hour Fee: x${rushHourFee}`);
    console.log(`Total: ${total}`);

    setFee(total);

    if (total >= feeModifier.maxDeliveryFeeFee) {
      setFee(feeModifier.maxDeliveryFeeFee);
      return;
    }
  };

  return (
    <div className="border-4 rounded-2xl bg-primaryWhite lg:col-span-4">
      <h4 className="border-b-2 border-b-primaryGreen font-bold text-2xl text-center mx-7 py-5">
        Calculator fee
      </h4>
      <Form onSubmit={onSubmit} />
      <p className="border-t-2 border-t-primaryGreen text-center mx-7 py-5">
        Delivery Fee:{" "}
        <span className="font-bold text-2xl">{fee.toFixed(2)} €</span>
      </p>
    </div>
  );
};

export default Main;
