import Main from "./components/Main";
import SideHeader from "./components/SideHeader";

const App = () => {
  return (
    <div className="bg-primaryGreen h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-9 gap-12 mx-24 mt-10">
        <Main />
        <SideHeader />
      </div>
    </div>
  );
};

export default App;
