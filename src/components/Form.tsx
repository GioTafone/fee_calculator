import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { inputFeeSchema } from "../validation";
import { FormProps } from "../types";

type ValidationInputFee = z.infer<typeof inputFeeSchema>;

const Form = ({ onSubmit }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationInputFee>({
    resolver: zodResolver(inputFeeSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <label htmlFor="cartValue" className="font-bold px-10 my-1">Cart Value</label>
      <input
        type="number"
        placeholder="Type Amount"
        id="cartValue"
        {...register("cartValue", { valueAsNumber: true })}
        className="mx-10 px-2 py-1 border border-primaryGreen rounded-lg"
      />
      <p>
        {errors.cartValue && (
          <span className="px-10 text-xs text-primaryRed">
            {errors.cartValue.message}
          </span>
        )}
      </p>
      <label htmlFor="distance" className="font-bold px-10 my-1">Distance</label>
      <input
        type="number"
        placeholder="Type Distance"
        id="distance"
        {...register("distance", { valueAsNumber: true })}
        className="mx-10 px-2 py-1 border border-primaryGreen rounded-lg"
      />
      <p>
        {errors.distance && (
          <span className="px-10 text-xs text-primaryRed">
            {errors.distance.message}
          </span>
        )}
      </p>
      <label htmlFor="items" className="font-bold px-10 my-1">Number of Items</label>
      <input
        type="number"
        placeholder="Type number of items"
        id="items"
        {...register("itemsCount", { valueAsNumber: true })}
        className="mx-10 px-2 py-1 border border-primaryGreen rounded-lg"
      />
      <p>
        {errors.itemsCount && (
          <span className="px-10 text-xs text-primaryRed">
            {errors.itemsCount.message}
          </span>
        )}
      </p>

      <label htmlFor="dateAntTime" className="font-bold px-10 my-1">Pick a Time</label>
      <input
        type="datetime-local"
        id="dateAntTime"
        {...register("dateAndTime", { valueAsDate: true })}
        className="mx-10 px-2 py-1 border border-primaryGreen rounded-lg"
      />
      {errors.dateAndTime && (
        <span className="px-10 text-xs text-primaryRed">
          {errors.dateAndTime.message}
        </span>
      )}
      <button
        type="submit"
        className="font-bold text-lg mx-10 my-4 px-2 py-1 rounded-lg bg-primaryBlack text-primaryWhite"
      >
        Calculate
      </button>
    </form>
  );
};

export default Form;
