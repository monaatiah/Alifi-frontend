import Link from "next/link";
import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import EmptyCartIcon from "./assets/images/empty.svg";
import SaudiRiyalIcon from "@/assets/images/saudi-riyal.svg";
import Image from "next/future/image";
import { handleImageLink } from "@/helpers/functions";
import Swal from "sweetalert2";
import { removeFromCart } from "@/store/actions";

const CartSidebar = ({ show, onClose, openCartSidebar }) => {
  const dispatch = useDispatch();
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

  return (
    <div
      className={
        show || openCartSidebar ? "cart-sidebar active" : "cart-sidebar"
      }
    >
      <div className="cart-head d-flex align-items-center justify-content-between gap-2">
        <h4 className="d-flex align-items-center gap-2">
          سلة التسوق
          <span className="item-count d-flex align-items-center justify-content-center">
            {cart?.items?.length || 0}
          </span>
        </h4>
        <button type="button" aria-label="close sidebar" onClick={onClose}>
          <IoCloseOutline />
        </button>
      </div>
      <div className="cart-body">
        {cart?.items?.length > 0 ? (
          <ul className="cart-items d-flex flex-column gap-4">
            {cart.items.map((item) => (
              <li
                key={item.id}
                className="cart-item d-flex align-items-center gap-3"
              >
                <div className="img">
                  <Image
                    src={handleImageLink(item?.product?.image)}
                    alt={item?.product?.name}
                    width={105}
                    height={117}
                  />
                </div>
                <div className="info">
                  <Link href={`/products/${item?.product?.slug}`}>
                    <a>{item?.product?.name}</a>
                  </Link>
                  <p className="price d-flex align-items-center gap-4">
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
                            stroke="#000"
                          />
                        </span>
                      </>
                    ) : (
                      <span className="original-price">
                        {item?.product?.price}
                        <SaudiRiyalIcon width={20} height={20} stroke="#000" />
                      </span>
                    )}
                  </p>
                  <p className="d-flex align-items-center gap-3">
                    <span className="quantity">الكمية: {item?.quantity}</span>
                    <button
                      type="button"
                      aria-label="remove item"
                      className="remove-btn"
                      onClick={() => handleDeleteItem(item?.id)}
                    >
                      حذف
                    </button>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-cart d-flex flex-column align-items-center justify-content-center">
            <EmptyCartIcon />
            <h4>سلة التسوق فارغة</h4>
            <Link href="/shop">
              <a className="btn">ابدأ التسوق</a>
            </Link>
          </div>
        )}
      </div>
      <div className="cart-footer">
        <ul className="cart-summary d-flex flex-column gap-2">
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
                <SaudiRiyalIcon width={20} height={20} stroke="#000" />
              </span>
            </li>
          )}
          <li className="d-flex align-items-center justify-content-between total">
            المجموع النهائي
            <span>
              {cart?.total}
              <SaudiRiyalIcon width={20} height={20} stroke="#7267c3" />
            </span>
          </li>
        </ul>
        <div className="btns d-flex align-items-center justify-content-between gap-3">
          <Link href="/cart">
            <a className="btn">عرض السلة</a>
          </Link>
          <Link href="/checkout">
            <a className="btn">الدفع</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
