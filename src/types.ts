export type InputBarsProps = {
  handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  cartValue: number;
  distance: number;
  itemsCount: number;
};

export type FormProps = {
  handleFee: React.Dispatch<React.SetStateAction<number>>;
};