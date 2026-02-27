import React from "react";

const CouponBox = ({ couponCode, setCouponCode, onCouponAction }) => {
  return (
    <div className="cart-coupon mb-4">
      <div className="head">
        <h4>تخفيض</h4>
        <span>أدخل رمز القسيمة أدناه لتطبيقه</span>
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="رمز القسيمة"
          className="form-control"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <button type="button" className="btn" onClick={onCouponAction}>
          تطبيق القسيمة
        </button>
      </div>
    </div>
  );
};

export default CouponBox;
