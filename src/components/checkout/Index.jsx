import React, { useMemo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import Select from "react-select";
import countryList from "react-select-country-list";
import * as flags from "country-flag-icons/react/3x2";

import Image1 from "./assets/1.png";
import Image2 from "./assets/2.png";
import Image3 from "./assets/3.png";
import Link from "next/link";
import { useForm } from "react-hook-form";

const Index = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const countries = useMemo(() => countryList().getData(), []);
  const cities = useMemo(
    () => [
      { value: "riyadh", label: "الرياض" },
      { value: "jeddah", label: "جدة" },
      { value: "dammam", label: "الدمام" },
      { value: "mecca", label: "مكة المكرمة" },
      { value: "medina", label: "المدينة المنورة" },
    ],
    []
  );

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const products = useMemo(
    () => [
      {
        id: "prod-1",
        name: "Rosquillas Caseras para Perros",
        description:
          "أليفي منصة إلكترونية تجمع بين التسوق الذكي والمعرفة المتخصصة لعشّاق الحيوانات الأليفة",
        image: Image1,
        price: 12.0,
        category: { id: "cat-1", name: "الألعاب والإكسسوارات" },
        quantity: 1,
      },
      {
        id: "prod-2",
        name: "Juguete Interactivo para Gatos",
        description:
          "أليفي منصة إلكترونية تجمع بين التسوق الذكي والمعرفة المتخصصة لعشّاق الحيوانات الأليفة",
        image: Image2,
        price: 18.5,
        category: { id: "cat-2", name: "لوازم" },
        quantity: 2,
      },
      {
        id: "prod-3",
        name: "Cama Cómoda para Mascotas",
        description:
          "أليفي منصة إلكترونية تجمع بين التسوق الذكي والمعرفة المتخصصة لعشّاق الحيوانات الأليفة",
        image: Image3,
        price: 25.0,
        category: { id: "cat-3", name: "طعام" },
        quantity: 1,
      },
    ],
    []
  );

  const submitForm = (data) => {
    console.log("Form Data Submitted: ", data);
  };

  return (
    <div className={styles["checkout-section"]}>
      <Container>
        <form onSubmit={handleSubmit(submitForm())}>
          <Row>
            <Col lg={6}>
              <Row>
                <Col lg={12}>
                  <div className="form-head">
                    <h3>معلومات العميل</h3>
                  </div>
                </Col>
                <Col lg={12}>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="الاسم الكامل"
                      className="form-control"
                    />
                  </div>
                </Col>
                <Col lg={12}>
                  <div className="form-group">
                    <input
                      type="email"
                      placeholder="عنوان البريد الإلكتروني"
                      className="form-control"
                    />
                  </div>
                </Col>
                <Col lg={12}>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="رقم الهاتف"
                      className="form-control"
                    />
                  </div>
                </Col>
                <Col lg={12}>
                  <div className="form-group">
                    <label className="d-flex align-items-center gap-3">
                      <input type="radio" />
                      <span>إنشاء حساب (اختياري)</span>
                    </label>
                  </div>
                </Col>
                <div className="form-head mt-5">
                  <h3> التوصيل</h3>
                </div>
                <Col lg={6}>
                  <div className="form-group">
                    <Select
                      options={countries}
                      value={selectedCountry}
                      onChange={setSelectedCountry}
                      placeholder="الدولة"
                      formatOptionLabel={(country) => {
                        const FlagComponent = flags[country.value];
                        return (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            {FlagComponent && (
                              <FlagComponent
                                style={{ width: "24px", height: "16px" }}
                              />
                            )}
                            <span>{country.label}</span>
                          </div>
                        );
                      }}
                      styles={{
                        control: (base) => ({
                          ...base,
                          borderRadius: "50px",
                          border: "1px solid #e0e0e0",
                          padding: "8px 15px",
                          minHeight: "50px",
                          direction: "rtl",
                        }),
                        placeholder: (base) => ({
                          ...base,
                          textAlign: "right",
                          color: "#999",
                        }),
                        singleValue: (base) => ({
                          ...base,
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }),
                      }}
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="form-group">
                    <Select
                      options={cities}
                      value={selectedCity}
                      onChange={setSelectedCity}
                      placeholder="المدينة"
                      styles={{
                        control: (base) => ({
                          ...base,
                          borderRadius: "50px",
                          border: "1px solid #e0e0e0",
                          padding: "8px 15px",
                          minHeight: "50px",
                          direction: "rtl",
                        }),
                        placeholder: (base) => ({
                          ...base,
                          textAlign: "right",
                          color: "#999",
                        }),
                        singleValue: (base) => ({
                          ...base,
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }),
                      }}
                      formatOptionLabel={(city) => <span>{city.label}</span>}
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="رقم الهاتف"
                      className="form-control"
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="رمز بريدي"
                      className="form-control"
                    />
                  </div>
                </Col>
                <Col lg={12}>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="العنوان الكامل"
                      className="form-control"
                    />
                  </div>
                </Col>
                <Col lg={12}>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="ملاحظات التوصيل (اختياري)"
                      className="form-control"
                    />
                  </div>
                </Col>
                <Col lg={12}>
                  <div className="form-group">
                    <label className="d-flex align-items-center gap-3">
                      <input type="radio" />
                      <span>احفظ هذه المعلومات للمرات القادمة</span>
                    </label>
                  </div>
                </Col>
                <Col lg={12}>
                  <div className="cart-coupon mt-4">
                    <div className="head">
                      <h4>طريقة الشحن</h4>
                    </div>
                    <div className="form-group">
                      <ul className="w-100 d-flex flex-column gap-3">
                        <li>
                          <label className="d-flex align-items-center gap-3">
                            <input type="radio" name="shipping" />
                            <span>توصيل سريع (2-3 أيام) — 15 ر.س</span>
                          </label>
                        </li>
                        <li>
                          <label className="d-flex align-items-center gap-3">
                            <input type="radio" name="shipping" />
                            <span>توصيل عادي (4-6 أيام) — 8 ر.س</span>
                          </label>
                        </li>
                        <li>
                          <label className="d-flex align-items-center gap-3">
                            <input type="radio" name="shipping" />
                            <span>استلام من المتجر — مجاني</span>
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Col>
                <Col lg={12}>
                  <div className="cart-coupon">
                    <div className="head">
                      <h4>طريقة الدفع</h4>
                    </div>
                    <div className="form-group">
                      <ul className="w-100 d-flex flex-column gap-3">
                        <li>
                          <label className="d-flex align-items-center gap-3">
                            <input type="radio" name="payment" />
                            <span>الدفع عند الاستلام (COD)</span>
                          </label>
                        </li>
                        <li>
                          <label className="d-flex align-items-center gap-3">
                            <input type="radio" name="payment" />
                            <span>البطاقة الائتمانية (Visa / Mastercard)</span>
                          </label>
                        </li>
                        <li>
                          <label className="d-flex align-items-center gap-3">
                            <input type="radio" name="payment" />
                            <span>Apple Pay</span>
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={6}>
              <div className="cart-products">
                <ul>
                  {products?.map((product, idx) => {
                    return (
                      <li
                        className="d-flex align-items-center justify-content-between mb-3"
                        key={idx}
                      >
                        <div className="product d-flex align-items-center gap-3">
                          <div className="img position-relative">
                            <img
                              src={product.image.src}
                              alt={product.name}
                              width={105}
                              height={117}
                            />
                            <span className="quantity-badge position-absolute d-flex align-items-center justify-content-center">
                              {product.quantity}
                            </span>
                          </div>
                          <div className="info">
                            <p>{product?.category?.name}</p>
                            <Link href={`/products/${product?.id}`}>
                              <a>{product?.name}</a>
                            </Link>
                          </div>
                        </div>
                        <div className="price d-flex flex-column align-items-center justify-content-center gap-1">
                          <span>{product?.price} ر.س</span>
                          <strong>120 ر.س</strong>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
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
                  />
                  <button className="btn">تطبيق القسيمة</button>
                </div>
              </div>

              <div className="cart-coupon notes">
                <div className="head">
                  <h4>ملاحظة الطلب</h4>
                </div>
                <div className="form-group">
                  <textarea
                    placeholder="ملاحظات حول طلبك، على سبيل المثال، ملاحظات خاصة للتوصيل."
                    className="form-control"
                  />
                </div>
              </div>
            </Col>
            <Col lg={12}>
              <div className="cart-summary">
                <div className="cart-total">
                  <h4>سلة التسوق السعر الإجمالي</h4>
                  <ul>
                    <li className="d-flex align-items-center justify-content-between">
                      إجمالي المنتجات
                      <span>ر.س 75.00</span>
                    </li>
                    <li className="d-flex align-items-center justify-content-between">
                      تكلفة الشحن
                      <span>ر.س 15.00</span>
                    </li>
                    <li className="d-flex align-items-center justify-content-between">
                      الخصم
                      <span>- ر.س 10.00</span>
                    </li>
                    <li className="d-flex align-items-center justify-content-between total">
                      المجموع النهائي
                      <span>ر.س 80.00</span>
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
          </Row>
        </form>
      </Container>
    </div>
  );
};

export default Index;
