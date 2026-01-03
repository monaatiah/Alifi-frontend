import React, { useMemo } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import styles from "./styles/styles.module.scss";

import Image1 from "./assets/1.png";
import Image2 from "./assets/2.png";
import Image3 from "./assets/3.png";
import Image from "next/future/image";
import Link from "next/link";

import CartIcon from "./assets/cart.svg";

const Index = () => {
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

  return (
    <div className={styles["cart-section"]}>
      <Container>
        <Row>
          <Col lg={12}>
            <div className="message">
              <CartIcon />
              <h3>تم تأكيد طلبك بنجاح!</h3>
              <span>شكرًا لطلبك!</span>
              <p>تم استلام طلبك وسيتم تجهيز طلبك قريبًا.</p>
              <p>تم إرسال تفاصيل طلبك إلى بريدك الإلكتروني.</p>
            </div>
          </Col>
          <Col lg={12}>
            <div className="cart-table">
              <Table responsive>
                <thead>
                  <tr>
                    <th>منتج</th>
                    <th>السعر </th>
                    <th> الكمية</th>
                    <th>المجموع</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <div className="product-data d-flex align-items-center gap-4">
                            <div className="img">
                              <Image
                                src={item?.image}
                                alt={item?.name}
                                width={105}
                                height={117}
                              />
                            </div>
                            <div className="info">
                              <p>{item?.category?.name}</p>
                              <Link href={`/products/${item?.id}`}>
                                <a>{item?.name}</a>
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="price d-flex flex-column align-items-center gap-1">
                            <span>{item?.price} ر.س</span>
                            <strong>120 ر.س</strong>
                          </div>
                        </td>
                        <td>
                          <div className="quantity-control d-flex align-items-center justify-content-center gap-3">
                            <span>{item.quantity}</span>
                          </div>
                        </td>
                        <td>
                          <div className="total text-center">
                            {item?.price * item.quantity} ر.س
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </Col>
          <Col lg={6}>
            <div className="cart-coupon">
              <div className="head">
                <h4>معلومات الشحن</h4>
              </div>
              <ul>
                <li>الاسم الكامل: أحمد محمد</li>
                <li>رقم الهاتف: 0591234567</li>
                <li>البريد الإلكتروني: info@domain.com</li>
                <li>العنوان: شارع الملك فهد، الرياض</li>
                <li>المدينة: الرياض</li>
                <li>الرمز البريدي: 12345</li>
              </ul>
            </div>
          </Col>
          <Col lg={6}>
            <div className="cart-coupon">
              <div className="head">
                <h4> ملاحظة الطلب</h4>
              </div>
              <p>يرجى توصيل الطلب بين الساعة 3 و 5 مساءً. شكراً!</p>
            </div>
          </Col>

          <Col lg={12}>
            <div className="cart-summary">
              <div className="cart-total">
                <h4> ملخص الدفع</h4>
                <ul>
                  <li className="d-flex align-items-center justify-content-between">
                    المجموع الفرعي
                    <span>ر.س 75.00</span>
                  </li>
                  <li className="d-flex align-items-center justify-content-between">
                    الشحن
                    <span>ر.س 15.00</span>
                  </li>
                  <li className="d-flex align-items-center justify-content-between">
                    الخصم
                    <span>- ر.س 10.00</span>
                  </li>
                  <li className="d-flex align-items-center justify-content-between total">
                    المجموع
                    <span>ر.س 80.00</span>
                  </li>
                </ul>
              </div>
              <div className="btns d-flex align-items-center justify-content-end gap-2">
                <Link href="/">
                  <a className="btn">متابعة التسوق</a>
                </Link>
                <Link href="/">
                  <a className="btn btn-outline">إتمام الطلب</a>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Index;
