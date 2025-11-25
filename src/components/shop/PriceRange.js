import React, { useState } from "react";
import { useRouter } from "next/router";
import { Range, getTrackBackground } from "react-range";

const PriceRange = () => {
  const { locale } = useRouter();
  const MIN = 0;
  const MAX = 10000;
  const [values, setValues] = useState([MIN, MAX]);
  return (
    <div>
      <div className="price-text d-flex justify-content-center align-items-center gap-4">
        <span>السعر</span>
        <div className="d-flex gap-2">
          {values[0]} $ - {values[1]} $
        </div>
      </div>
      <Range
        values={values}
        min={MIN}
        max={MAX}
        rtl={locale === "ar" ? true : false}
        onChange={(values) => {
          setValues(values);
        }}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              display: "flex",
              width: "100%",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "12px",
                width: "100%",
                borderRadius: "5px",
                background: getTrackBackground({
                  values,
                  colors: ["#f2f2f2", "#F2782B", "#f2f2f2"],
                  min: MIN,
                  max: MAX,
                  rtl: locale === "ar" ? true : false,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            className="thumb"
            {...props}
            style={{
              ...props.style,
            }}
          >
            <div
              className="thumbInner"
              style={{
                backgroundColor: isDragged ? "#F2782B" : "#fff",
              }}
            />
          </div>
        )}
      />
    </div>
  );
};

export default PriceRange;
