import React from "react";
import logo from "../assets/unsplash_logo.svg";
type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="h-screen flex flex-col items-center  justify-center">
      {/* add a scaling up animation to the logo  */}
      <figure>
        <img src={`${logo}`} alt="logo" className="scaleup" />
      </figure>
    </div>
  );
};
export default Loading;
