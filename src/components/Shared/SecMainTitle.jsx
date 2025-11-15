import React from "react";
import MainLogo from "../../assets/images/heading.svg";

const SecMainTitle = ({ secSubTitle, secTitle }) => {
  return (
    <div className="section-title">
      <div className="inner">
        <MainLogo />
        <p>{secSubTitle}</p>
        <h2>{secTitle}</h2>
      </div>
    </div>
  );
};

export default SecMainTitle;
