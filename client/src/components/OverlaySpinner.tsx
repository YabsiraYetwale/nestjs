import React from "react";
import RiseLoader from "react-spinners/RiseLoader";

interface Props {
  text?: string;
  isLoading: boolean;
}

const OverlaySpinner = ({ text, isLoading }: Props) => {
  return (
    <div
      className={`z-100 bg-gray-100 bg-opacity-5 absolute top-0 bottom-0 left-0 right-0  h-full  ${
        isLoading ? "flex" : "hidden"
      } flex-col items-center justify-center`}
    >
      <div className="flex flex-co relative gap-4 items-center justify-center sm:-top-96 lg:-top-24 2xl:top-0">
        <RiseLoader loading={isLoading} color="rgb(59 130 246)" />
        <p className="font-semibold text-lg text-gray-500">{text!}</p>
      </div>
    </div>
  );
};

export default OverlaySpinner;
