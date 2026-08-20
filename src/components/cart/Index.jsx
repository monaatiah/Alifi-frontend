import React, { useEffect } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import BestSellerProducts from "./BestSellerProducts";

import Image from "next/image";
import Link from "next/link";
import { MdClose } from "react-icons/md";
import SaudiRiyalIcon from "@/assets/images/saudi-riyal.svg";

import EmptyCartIcon from "./assets/empty.svg";
import { useDispatch, useSelector } from "react-redux";
import { handleImageLink } from "@/helpers/functions";
import {
  applyCoupon,
  removeCoupon,
  removeFromCart,
  updateCartItem,
} from "@/store/cart/actions";
import Swal from "sweetalert2";

const Index = () => {
  const dispatch = useDispatch();

  const [couponCode, setCouponCode] = React.useState("");

  const { cart } = useSelector((state) => state.cart);

  const handleDeleteItem = (itemId) => {
    Swal.fire({
      title: "هل أنت متأكد؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم، قم بالإزالة!",
      cancelButtonText: "إلغاء",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          removeFromCart({
            body: {
              item_id: itemId,
            },
          }),
        );
      }
    });
  };

  useEffect(() => {
    if (cart?.coupon_code) {
      setCouponCode(cart?.coupon_code);
    } else {
      setCouponCode("");
    }
  }, [cart?.coupon_code]);

  return (
    <div className={styles["cart-section"]}>
      {cart?.items?.length > 0 ? (
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
                {cart?.items?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center">
                        <button
                          className="remove-item"
                          aria-label="remove item"
                          onClick={() => handleDeleteItem(item?.id)}
                        >
                          <MdClose />
                        </button>
                      </td>
                      <td>
                        <div className="product-data d-flex align-items-center gap-4">
                          <div className="img">
                            <Image
                              src={handleImageLink(item?.product?.image)}
                              alt={item?.product?.name}
                              width={105}
                              height={117}
                            />
                          </div>
                          <div className="info">
                            <p>{item?.category?.name}</p>
                            <Link href={`/products/${item?.id}`}>
                              {item?.product?.name}
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="price d-flex flex-column align-items-center gap-1">
                          {item?.product?.sale_price ? (
                            <>
                              <span className="sale-price">
                                {item?.product?.sale_price}
                                <SaudiRiyalIcon
                                  width={20}
                                  height={20}
                                  stroke="#000"
                                />
                              </span>
                              <span className="old-price">
                                {item?.product?.price}
                                <SaudiRiyalIcon
                                  width={20}
                                  height={20}
                                  stroke="#c1c1c1"
                                />
                              </span>
                            </>
                          ) : (
                            <span className="original-price">
                              {item?.product?.price}
                              <SaudiRiyalIcon
                                width={20}
                                height={20}
                                stroke="#000"
                              />
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="quantity-control d-flex align-items-center justify-content-center gap-3">
                          <button
                            onClick={() => {
                              dispatch(
                                updateCartItem({
                                  body: {
                                    item_id: item?.id,
                                    quantity: item.quantity - 1,
                                  },
                                }),
                              );
                            }}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => {
                              if (
                                item?.product?.quantity_available != null &&
                                item.quantity >= item.product.quantity_available
                              ) {
                                return;
                              }

                              dispatch(
                                updateCartItem({
                                  body: {
                                    item_id: item?.id,
                                    quantity: item.quantity + 1,
                                  },
                                }),
                              );
                            }}
                            disabled={
                              item?.product?.quantity_available != null &&
                              item.quantity >= item.product.quantity_available
                            }
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className="total text-center">
                          {item?.price * item.quantity}
                          <SaudiRiyalIcon
                            width={20}
                            height={20}
                            stroke="#000"
                          />
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
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button
                    className="btn"
                    onClick={() => {
                      if (cart?.coupon_code) {
                        dispatch(removeCoupon({}));
                      } else {
                        if (!couponCode.trim()) {
                          Swal.fire({
                            icon: "error",
                            title: "خطأ",
                            text: "يرجى إدخال رمز القسيمة",
                            confirmButtonText: "حسناً",
                          });
                          return;
                        }
                        dispatch(
                          applyCoupon({
                            body: {
                              code: couponCode,
                            },
                          }),
                        );
                      }
                    }}
                  >
                    {cart?.coupon_code ? "حذف القسيمة" : "تطبيق القسيمة"}
                  </button>
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
                        قيمة الخصم
                        <span>
                          {cart?.discount}
                          <SaudiRiyalIcon
                            width={20}
                            height={20}
                            stroke="#000"
                          />
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
                <div className="btns d-flex align-items-center justify-content-end gap-2">
                  <Link href="/" className="btn">
                    متابعة التسوق
                  </Link>
                  <Link href="/checkout" className="btn">
                    إتمام عملية الشراء
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
          <Link href="/" className="btn">
            ابدأ التسوق
          </Link>
        </div>
      )}
      <BestSellerProducts />
    </div>
  );
};

export default Index;
