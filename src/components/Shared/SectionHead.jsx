import React from "react";

const SectionHead = ({ secTitle, secDescription }) => {
  return (
    <div className="section-head">
      <h2 data-aos="fade-up" data-aos-duration="1000">
        {secTitle}
      </h2>
      <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
        {secDescription}
      </p>
    </div>
  );
};

export default SectionHead;
