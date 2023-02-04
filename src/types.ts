import { SubmitHandler } from "react-hook-form";

export type InputBarsProps = {
  handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  cartValue: number;
  distance: number;
  itemsCount: number;
};

export type FormProps = {
  onSubmit: SubmitHandler<{
    cartValue: number;
    distance: number;
    itemsCount: number;
    dateAndTime: Date;
  }>;
};
export type MainProps = {
  initialValue: number;
};
