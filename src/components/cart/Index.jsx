import React, { useMemo, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import BestSellerProducts from "./BestSellerProducts";

import Image1 from "./assets/1.png";
import Image2 from "./assets/2.png";
import Image3 from "./assets/3.png";
import Image from "next/future/image";
import Link from "next/link";
import { MdClose } from "react-icons/md";

import EmptyCartIcon from "./assets/empty.svg";

const Index = () => {
  const [quantity, setQuantity] = useState(1);
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
      {products?.length > 0 ? (
        <Container>
          <div className="cart-table">
            <Table responsive>
              <thead>
                <tr>
                  <th></th>
                  <th>المنتجات داخل السلة</th>
                  <th>السعر الفردي</th>
                  <th>اختيار الكمية</th>
                  <th>المجموع</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center">
                        <button
                          className="remove-item"
                          aria-label="remove item"
                        >
                          <MdClose />
                        </button>
                      </td>
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
                          <button
                            onClick={() =>
                              setQuantity(quantity > 1 ? quantity - 1 : 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => setQuantity(quantity + 1)}>
                            +
                          </button>
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
          <Row>
            <Col lg={4}>
              <div className="cart-coupon">
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
            </Col>

            <Col lg={8}>
              <div className="cart-summary">
                <div className="cart-total">
                  <h4> إجمالي الدفع</h4>
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
                <div className="btns d-flex align-items-center justify-content-end gap-2">
                  <Link href="/">
                    <a className="btn">متابعة التسوق</a>
                  </Link>
                  <Link href="/checkout">
                    <a className="btn">إتمام عملية الشراء</a>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        <div className="empty-cart d-flex flex-column align-items-center justify-content-center">
          <EmptyCartIcon />
          <h4>سلة التسوق فارغة</h4>
          <Link href="/">
            <a className="btn">ابدأ التسوق</a>
          </Link>
        </div>
      )}
      <BestSellerProducts />
    </div>
  );
};

export default Index;
