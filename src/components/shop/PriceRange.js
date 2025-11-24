import React, { useState } from "react";
import { useRouter } from "next/router";
import { Range, getTrackBackground } from "react-range";

const PriceRange = () => {
  const { locale } = useRouter();
  const MIN = 0;
  const MAX = 10000;
  const [values, setValues] = useState([MIN, MAX]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <output
        style={{ marginTop: "20px", width: "100%", fontSize: "12px" }}
        id="output"
      >
        {`السعر : ${values[0]}$ - ${values[1]}$`}
      </output>
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
                height: "3px",
                width: "100%",
                borderRadius: "50px",
                background: getTrackBackground({
                  values,
                  colors: ["#f1f1f1", "#F2782B", "#f1f1f1"],
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
