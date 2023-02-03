import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { inputFeeSchema } from "../validation";

import Form from "../components/Form";
import { MainProps } from "../types";
import { feeModifier } from "../feeModifiers";

type ValidationInputFee = z.infer<typeof inputFeeSchema>;

const Main = ({ initialValue }: MainProps) => {
  const [fee, setFee] = useState(initialValue);

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
    if (
      date.includes(feeModifier.weekDayRushHourFee) &&
      hour >= feeModifier.startRushHourFee &&
      hour <= feeModifier.endRushHourFee
    ) {
      rushHourFee = feeModifier.rushHourFeeIncrementer;
    }

    let total = (cartValueFee + distanceFee + bulkFee) * rushHourFee;

    // ------ The following show the results of every input ------
    // console.log(`Cart Value Fee: ${cartValueFee}`);
    // console.log(`Distance Fee: ${distanceFee}`);
    // console.log(`Bulk Fee: ${bulkFee}`);
    // console.log(`Rush Hour Fee: x${rushHourFee}`);
    // console.log(`Total: ${total}`);

    if (total >= feeModifier.maxDeliveryFeeFee) {
      setFee(feeModifier.maxDeliveryFeeFee);
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
        Delivery Fee: <span className="font-bold text-2xl">{fee.toFixed(2)} €</span>
      </p>
    </div>
  );
};

export default Main;
