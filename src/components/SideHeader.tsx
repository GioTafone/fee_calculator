import React from "react";

const SideHeader = () => {
  return (
    <div className="lg:col-span-5 flex flex-col">
      <h1 className="text-7xl font-extrabold overflow-y-hidden m-10">
        <span className="uppercase text-primaryWhite">buddy</span>
        <br />
        DELIVERY
      </h1>
      <h3 className="text-3xl font-extrabold overflow-y-hidden m-10">
        Your <span className="uppercase text-primaryWhite">buddy</span> will
        always get you what you need<span className="text-primaryWhite">.</span>
      </h3>
    </div>
  );
};

export default SideHeader;
