import Main from "./components/Main";
import SideHeader from "./components/SideHeader";
import { feeModifier } from "./feeModifiers";

const App = () => {
  return (
    <div className="bg-primaryGreen h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-9 gap-12 mx-10 my-5 md:mx-24 md:mt-10">
        <SideHeader />
        <Main initialValue={feeModifier.initialFeeValue}/>
      </div>
    </div>
  );
};

export default App;
