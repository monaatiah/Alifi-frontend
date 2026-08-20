import React from "react";
import { Col } from "react-bootstrap";
import SaudiRiyalIcon from "@/assets/images/saudi-riyal.svg";

const CartSummary = ({ cart }) => {
  return (
    <Col lg={12}>
      <div className="cart-summary">
        <div className="cart-total">
          <h4>سلة التسوق السعر الإجمالي</h4>
          <ul>
            <li className="d-flex align-items-center justify-content-between">
              إجمالي المنتجات
              <span>
                {cart?.subtotal}
                <SaudiRiyalIcon width={20} height={20} stroke="#000" />
              </span>
            </li>
            <li className="d-flex align-items-center justify-content-between">
              تكلفة الشحن
              <span>
                {cart?.shipping}
                <SaudiRiyalIcon width={20} height={20} stroke="#000" />
              </span>
            </li>
            {cart?.discount > 0 && (
              <li className="d-flex align-items-center justify-content-between">
                الخصم
                <span>
                  {cart?.discount}
                  <SaudiRiyalIcon width={20} height={20} stroke="#000" />
                </span>
              </li>
            )}
            <li className="d-flex align-items-center justify-content-between total">
              المجموع النهائي
              <span>
                {cart?.total}
                <SaudiRiyalIcon width={20} height={20} stroke="#000" />
              </span>
            </li>
          </ul>
        </div>
        <div className="btns d-flex align-items-center justify-content-center gap-2">
          <button type="submit" className="btn">
            اطلب الآن
          </button>
        </div>
      </div>
    </Col>
  );
};

export default CartSummary;
