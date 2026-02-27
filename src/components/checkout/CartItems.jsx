import React from "react";
import Link from "next/link";
import { handleImageLink } from "@/helpers/functions";
import SaudiRiyalIcon from "@/assets/images/saudi-riyal.svg";
import EmptyCartIcon from "./assets/empty.svg";

const CartItems = ({ cart }) => {
  return (
    <div className="cart-products">
      <ul>
        {cart?.items?.length ? (
          cart?.items?.map((item, idx) => {
            return (
              <li
                className="d-flex align-items-center justify-content-between mb-3"
                key={idx}
              >
                <div className="product d-flex align-items-center gap-3">
                  <div className="img position-relative">
                    <img
                      src={handleImageLink(item?.product?.image)}
                      alt={item?.product?.name}
                      width={105}
                      height={117}
                    />
                    <span className="quantity-badge position-absolute d-flex align-items-center justify-content-center">
                      {item?.quantity}
                    </span>
                  </div>
                  <div className="info">
                    <p>{item?.category?.name}</p>
                    <Link href={`/products/${item?.product?.slug}`}>
                      <a>{item?.product?.name}</a>
                    </Link>
                  </div>
                </div>
                <div className="price d-flex flex-column align-items-center justify-content-center gap-1">
                  {item?.product?.sale_price ? (
                    <>
                      <span className="sale-price">
                        {item?.product?.sale_price}
                        <SaudiRiyalIcon width={20} height={20} stroke="#000" />
                      </span>
                      <span className="old-price">
                        {item?.product?.price}
                        <SaudiRiyalIcon width={20} height={20} stroke="#000" />
                      </span>
                    </>
                  ) : (
                    <span className="original-price">
                      {item?.product?.price}
                      <SaudiRiyalIcon width={20} height={20} stroke="#000" />
                    </span>
                  )}
                </div>
              </li>
            );
          })
        ) : (
          <div className="empty-cart d-flex flex-column align-items-center justify-content-center">
            <EmptyCartIcon />
            <h4>سلة التسوق فارغة</h4>
            <Link href="/">
              <a className="btn">ابدأ التسوق</a>
            </Link>
          </div>
        )}
      </ul>
    </div>
  );
};

export default CartItems;
