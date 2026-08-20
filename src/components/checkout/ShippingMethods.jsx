import React from "react";
import { Col } from "react-bootstrap";

const ShippingMethods = ({ shippingMethodOptions, register }) => {
  return (
    <Col lg={12}>
      <div className="cart-coupon mt-4">
        <div className="head">
          <h4>طريقة الشحن</h4>
        </div>
        <div className="form-group">
          <ul className="w-100 d-flex flex-column gap-3">
            {shippingMethodOptions.map((method) => (
              <li key={method.value}>
                <label className="d-flex align-items-center gap-3">
                  <input
                    type="radio"
                    value={method.value}
                    {...register("shipping_method", {
                      required: true,
                    })}
                  />
                  <span>
                    {method.label}
                    {method.price > 0 ? ` — ${method.price}` : ""}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Col>
  );
};

export default ShippingMethods;
