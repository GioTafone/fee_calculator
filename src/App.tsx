import { useState } from "react";
import Form from "./components/Form";

const App = () => {
  const [fee, setFee] = useState(0);
  return (
    <div>
      <h1>Calculator fee</h1>
      <Form handleFee={setFee} />
      <p>Delivery Fee: {fee.toFixed(2)} €</p>
    </div>
  );
};

export default App;
