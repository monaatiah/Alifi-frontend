import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Range, getTrackBackground } from "react-range";
import SaudiRiyalIcon from "@/assets/images/saudi-riyal.svg";

const PriceRange = ({ value, onChange }) => {
  const { locale } = useRouter();
  const MIN = 0;
  const MAX = 10000;
  const [values, setValues] = useState([MIN, MAX]);

  // Update internal state when parent prop changes
  useEffect(() => {
    if (value) {
      setValues([value.min, value.max]);
    }
  }, [value]);

  const handleChange = (newValues) => {
    setValues(newValues);
    if (onChange) {
      onChange({ min: newValues[0], max: newValues[1] });
    }
  };
  return (
    <div>
      <div className="price-text d-flex justify-content-center align-items-center gap-4">
        <span>السعر</span>
        <div className="d-flex gap-2 align-items-center">
          {values[0]} <SaudiRiyalIcon width={18} height={18} stroke="#000" /> -{" "}
          {values[1]} <SaudiRiyalIcon width={18} height={18} stroke="#000" />
        </div>
      </div>
      <Range
        values={values}
        min={MIN}
        max={MAX}
        rtl={locale === "ar" ? true : false}
        onChange={handleChange}
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
                height: "6px",
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
