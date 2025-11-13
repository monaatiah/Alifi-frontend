import React from "react";

const SecMainTitle = ({ secSubTitle, secTitle, secDescription }) => {
  return (
    <div className="section-title">
      <div className="inner">
        <span data-aos="fade-up" data-aos-duration="1000">
          {secSubTitle}
        </span>
        <h2 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
          {secTitle}
        </h2>
        <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
          {secDescription}
        </p>
      </div>
    </div>
  );
};

export default SecMainTitle;
