import Image from "next/future/image";
import Link from "next/link";
import React, { useState } from "react";
import CartIcon from "./assets/cart.svg";

const ProductBlock = ({ item }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="block">
      <div className="img">
        <Image
          src={item?.image}
          alt={item?.name}
          width={340}
          height={200}
          loading="lazy"
        />
        <Link href={`/products/${item?.id}`}>
          <a> </a>
        </Link>
      </div>
      <div className="info">
        <div className="title">
          <Link href={`/products/${item?.id}`}>
            <a>{item?.name}</a>
          </Link>
        </div>
        <div className="description">{item?.description}</div>
        <div className="price">
          ${item?.price.toFixed(2)}
          <div className="quantity-control">
            <button
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            >
              -
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
        </div>
        <div className="btns">
          <Link href={`/products/${item?.id}`}>
            <a>مزيد من التفاصيل</a>
          </Link>
          <button className="add-to-cart">
            <CartIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductBlock;
