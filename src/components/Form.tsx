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
      <label htmlFor="cartValue" className="font-bold px-10 my-1">
        Cart Value - €
      </label>
      <input
        type="number"
        step="0.01"
        placeholder="Type Amount"
        id="cartValue"
        aria-label="Cart Value"
        aria-invalid={errors.cartValue ? "true" : "false"}
        {...register("cartValue", { required: true, valueAsNumber: true })}
        className="mx-10 px-2 py-1 border border-primaryGreen rounded-lg"
      />
      <p>
        {errors.cartValue && (
          <span className="px-10 text-xs text-primaryRed">
            {errors.cartValue.message}
          </span>
        )}
      </p>
      <label htmlFor="distance" className="font-bold px-10 my-1">
        Distance - m
      </label>
      <input
        type="number"
        placeholder="Type Distance"
        id="distance"
        aria-label="Distance"
        aria-invalid={errors.distance ? "true" : "false"}
        {...register("distance", { required: true, valueAsNumber: true })}
        className="mx-10 px-2 py-1 border border-primaryGreen rounded-lg"
      />
      <p>
        {errors.distance && (
          <span className="px-10 text-xs text-primaryRed">
            {errors.distance.message}
          </span>
        )}
      </p>
      <label htmlFor="itemsCount" className="font-bold px-10 my-1">
        Number of Items
      </label>
      <input
        type="number"
        placeholder="Type number of items"
        id="itemsCount"
        aria-label="Number of Items"
        aria-invalid={errors.itemsCount ? "true" : "false"}
        {...register("itemsCount", { required: true, valueAsNumber: true })}
        className="mx-10 px-2 py-1 border border-primaryGreen rounded-lg"
      />
      <p>
        {errors.itemsCount && (
          <span className="px-10 text-xs text-primaryRed">
            {errors.itemsCount.message}
          </span>
        )}
      </p>

      <label htmlFor="dateAndTime" className="font-bold px-10 my-1">
        Pick a Date and Time
      </label>
      <input
        type="datetime-local"
        id="dateAndTime"
        aria-label="Pick a Date and Time"
        aria-invalid={errors.dateAndTime ? "true" : "false"}
        {...register("dateAndTime", { required: true, valueAsDate: true })}
        className="mx-10 px-2 py-1 border border-primaryGreen rounded-lg"
      />
      {errors.dateAndTime && (
        <span className="px-10 text-xs text-primaryRed">
          {errors.dateAndTime.message}
        </span>
      )}
      <button
        type="submit"
        className="inline-block bg-primaryBlack text-primaryWhite mx-10 my-4 px-2 py-1 uppercase rounded shadow-xl hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primaryZinc active:text-primaryBlack active:shadow-lg transition duration-100 ease-in-out"
        aria-label="Calculate"
      >
        Calculate
      </button>
    </form>
  );
};

export default Form;
