import Image from "next/future/image";
import Link from "next/link";
import React, { useState, memo } from "react";
import CartIcon from "./assets/cart.svg";
import { FaRegHeart } from "react-icons/fa6";

const ProductBlock = memo(({ item }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="product-block">
      <div className="img">
        <Image
          src={item?.image}
          alt={item?.name}
          width={340}
          height={200}
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
        />
        <Link href={`/products/${item?.id}`}>
          <a aria-label={item?.name}> </a>
        </Link>
        <button className="wishlist-btn" aria-label="add to wishlist">
          <FaRegHeart size={20} />
        </button>
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
          <button className="add-to-cart" aria-label="add to cart">
            <CartIcon />
          </button>
        </div>
      </div>
    </div>
  );
});

ProductBlock.displayName = "ProductBlock";

export default ProductBlock;
