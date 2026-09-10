import React from "react";
import { Col } from "react-bootstrap";

const PaymentMethods = ({ paymentMethodOptions, register }) => {
  return (
    <Col lg={12}>
      <div className="cart-coupon">
        <div className="head">
          <h4>طريقة الدفع</h4>
        </div>
        <div className="form-group">
          {paymentMethodOptions.length ? (
            <ul className="w-100 d-flex flex-column gap-3">
              {paymentMethodOptions.map((method) => (
                <li key={method.value}>
                  <label className="d-flex align-items-center gap-3">
                    <input
                      type="radio"
                      value={method.value}
                      {...register("payment_method", {
                        required: true,
                      })}
                    />
                    <span>{method.label}</span>
                  </label>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mb-0" role="status">
              لا توجد طرق دفع متاحة حالياً.
            </p>
          )}
        </div>
      </div>
    </Col>
  );
};

export default PaymentMethods;
